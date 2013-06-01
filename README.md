### cat for Javascript source maps

#### Install:

```shell
» npm install --global --production source-map-cat
```

#### Usage:

```shell
» source-map-cat -h
usage: source-map-cat [-h] [-v] -f SOURCE_FILE [source maps [source maps ...]]

cat for JS source maps

Positional arguments:
  source maps           source maps to concatenate

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -f SOURCE_FILE, --source-file SOURCE_FILE
                        source file name
» # Concatenate JS files
» cat jquery-1.9.0.min.js hello.js > jquery-hello.js

» # Append source map url to combined file (or use HTTP X-SourceMap header)
» echo '//@ sourceMappingURL=jquery-hello.js.map' >> jquery-hello.js

» # Concatenate source maps
» source-map-cat --source-file jquery-hello.js \
     hello.js.map jquery-1.9.0.min.map > jquery-hello.js.map
```

See `./test/Makefile` for a more complete example.

#### Useful Links:

* [browserify-sourcemap-example](https://github.com/thlorenz/browserify-sourcemap-example)
* [Mozilla's source-map node module](https://github.com/mozilla/source-map)
* [HTML5 Rocks Source Maps tutorial](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
* [CSS Ninja Multi-level source map article](http://www.thecssninja.com/javascript/multi-level-sourcemaps)
* The [new sections part of the source-map spec](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#heading=h.535es3xeprgt) should save some space
* [Nick Fitzgerald's weblog](http://fitzgeraldnick.com/weblog/)
* [Generating source maps](http://qfox.nl/weblog/281)
* [Source map visualizer tool](http://sourcemapper.qfox.nl/)
* [Mozilla Hacks: Compiling to JavaScript, and Debugging with Source Maps](https://hacks.mozilla.org/2013/05/compiling-to-javascript-and-debugging-with-source-maps/)
* [Source map visualization (with colors)](http://sokra.github.io/source-map-visualization/)

##### Tools and Languages with Source Map Support

* [browserify V2 debug mode](https://github.com/substack/node-browserify)
* [closure compiler](http://code.google.com/p/closure-compiler/wiki/SourceMaps)
* [coffeescript 1.6+](http://coffeescript.org/)
* [coffeescript redux](https://github.com/michaelficarra/CoffeeScriptRedux)
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify#sourcemap)
* JSMmin source map [node module](https://github.com/twolfson/node-jsmin-sourcemap)
and [grunt plugin](https://github.com/twolfson/grunt-jsmin-sourcemap)
* [typescript](http://www.typescriptlang.org/)
* [UglifyJS 2](https://github.com/mishoo/UglifyJS2)
