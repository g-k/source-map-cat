var fs = require('fs');

var sourceMap = require('source-map');


var readSourceMap = function(mapFilename) {
  //  Reads a source map
  //
  //  Takes a source map filename
  //  Returns a sourceMapConsumer
  //  Throws for the file not existing and invalid JSON

  var map;

  if (!fs.existsSync(mapFilename)) {
    throw new Error(mapFilename + ": No such source map file");
  }

  var mapFileContents = fs.readFileSync(mapFilename, 'utf8');

  try {
    map = JSON.parse(mapFileContents);
  } catch (error) {
    throw new Error(mapFilename + ": Invalid JSON");
  }

  return new sourceMap.SourceMapConsumer(map);
};

var concatenateSourceMaps = function(sourceFilename, mapFilenames, output) {
  var generated = new sourceMap.SourceMapGenerator({
    //  The filename of the generated source (output) that this source
    //  map is associated with.
    file: sourceFilename
  });

  //  Last line of the concatenated script so far
  var combinedGeneratedLine = 0;

  mapFilenames.forEach(function(mapFilename) {
    var original = readSourceMap(mapFilename);

    //  Last line of the current map source when eachMapping finishes
    var originalLastLine = null;

    original.eachMapping(function(mapping) {
      generated.addMapping({
        generated: {
          line: combinedGeneratedLine + mapping.generatedLine,
          column: mapping.generatedColumn
        },
        original: {
          line: mapping.originalLine,
          column: mapping.originalColumn
        },
        source: mapping.source  //  Original source file
      });

      originalLastLine = mapping.generatedLine;
    });

    //  Add lines of the current map source file to our concatenated file
    combinedGeneratedLine += originalLastLine;
  });

  output.write(generated.toString());
};

module.exports = {
  read: readSourceMap,
  cat: concatenateSourceMaps
};
