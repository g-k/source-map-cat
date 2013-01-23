fs = require 'fs'

sourceMap = require 'source-map'


readSourceMap = (mapFilename) ->
  # Reads a source map
  #
  # Takes a source map filename
  # Returns a sourceMapConsumer
  # Throws for the file not existing and invalid JSON

  if not fs.existsSync mapFilename
    throw new Error "#{mapFilename}: No such source map file"

  mapFileContents = fs.readFileSync mapFilename, 'utf8'

  try
    map = JSON.parse mapFileContents
  catch error
    throw new Error "#{mapFilename}: Invalid JSON"

  consumer = new sourceMap.SourceMapConsumer map

  return consumer


concatenateSourceMaps = (sourceFilename, mapFilenames, output) ->

  generated = new sourceMap.SourceMapGenerator({
    # The filename of the generated source (output) that this source
    # map is associated with.
    file: sourceFilename
  })

  # Last line of the concatenated script so far
  combinedGeneratedLine = 0

  for mapFilename in mapFilenames
    original = readSourceMap mapFilename

    # Last line of the current map source when eachMapping finishes
    originalLastLine = null

    original.eachMapping (mapping) ->
      generated.addMapping(
        generated:
          line: combinedGeneratedLine + mapping.generatedLine
          column: mapping.generatedColumn
        original:
          line: mapping.originalLine
          column: mapping.originalColumn
        source: mapping.source  # Original source file
      )

      originalLastLine = mapping.generatedLine

    # Add lines of the current map source file to our concatenated file
    combinedGeneratedLine += originalLastLine

  output.write generated.toString()


module.exports =
  read: readSourceMap
  cat: concatenateSourceMaps