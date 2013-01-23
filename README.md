### cat for Javascript sourcemaps

Install:

```shell
npm install --global source-map-cat
```

Example Usage (run from project test directory):

```shell
# Create or find files with source maps

../node_modules/typescript/bin/tsc --sourcemap hello.ts

../node_modules/coffee-script-redux/bin/coffee --js -i goodbye.coffee > goodbye.js
../node_modules/coffee-script-redux/bin/coffee --source-map -i goodbye.coffee > goodbye.js.map

curl --remote-name-all \
     http://code.jquery.com/jquery-1.9.0.js \
     http://code.jquery.com/jquery-1.9.0.min.js \
	 http://code.jquery.com/jquery-1.9.0.min.map

# Strip source map urls
sed -i '.bak' '/sourceMappingURL/d' hello.js goodbye.js jquery-1.9.0.min.js

# Concatenate JS files
cat hello.js goodbye.js jquery-1.9.0.min.js > hello-goodbye-jquery-min.js

# Concatenate source maps
source-map-cat --source-file hello-goodbye-jquery-min.js \
    hello.js.map goodbye.js.map jquery-1.9.0.min.map > hello-goodbye-jquery-min.js.map

# Append source map url to combined file (or use HTTP X-SourceMap header)
echo '//@ sourceMappingURL=hello-goodbye-jquery-min.js.map' >> hello-goodbye-jquery-min.js

# Generate a test HTML page
echo '<script src="hello-goodbye-jquery-min.js"></script>' > index.html

# Serve
python -m SimpleHTTPServer 3000 localhost

# Open tab to check
python -m webbrowser -t http://localhost:3000/

# Enable source maps in developer tools
# Should see concatenated source
# and original sources and breakpoints should map correctly.
```

#### Related Links:

* [Mozilla's source-map node module](https://github.com/mozilla/source-map)
* [HTML5 Rocks Source Maps tutorial](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
* [CSS Ninja Multi-level source map article](http://www.thecssninja.com/javascript/multi-level-sourcemaps)
* The [new sections part of the source-map spec](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#heading=h.535es3xeprgt) should save some space
* [Nick Fitzgerald's weblog](http://fitzgeraldnick.com/weblog/)

##### Tools and Languages with Source Map Support

* [closure compiler](http://code.google.com/p/closure-compiler/wiki/SourceMaps)
* [coffeescript redux](https://github.com/michaelficarra/CoffeeScriptRedux)
* JSMmin source map [node module](https://github.com/twolfson/node-jsmin-sourcemap)
and [grunt plugin](https://github.com/twolfson/grunt-jsmin-sourcemap)
* [typescript](http://www.typescriptlang.org/)
* [UglifyJS 2](https://github.com/mishoo/UglifyJS2)
