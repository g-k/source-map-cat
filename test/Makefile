TSC := ../node_modules/.bin/tsc

JQUERY_HOST := http://code.jquery.com/
JQUERY_FILES := jquery-1.9.0.js jquery-1.9.0.min.js jquery-1.9.0.min.map


# http://www.gnu.org/software/make/manual/make.html#Automatic-Variables
jquery%:
	curl --remote-name-all $(addprefix $(JQUERY_HOST),$@)


test-setup: $(JQUERY_FILES)
	# Create or find files with source maps

	$(TSC) --sourcemap hello.ts  # makes sourcemap and js

	# Strip source map url
	sed -i '.bak' '/sourceMappingURL/d' hello.js jquery-1.9.0.min.js
	rm hello.js.bak jquery-1.9.0.min.js.bak

	# Concatenate JS files
	cat jquery-1.9.0.min.js hello.js > jquery-hello.js

	# Concatenate source maps
	../bin/source-map-cat.js --source-file jquery-hello.js \
	     hello.js.map jquery-1.9.0.min.map > jquery-hello.js.map

	# Append source map url to combined file (or use HTTP X-SourceMap header)
	echo '//@ sourceMappingURL=jquery-hello.js.map' >> jquery-hello.js

	# Generate a test HTML page
	echo '<script src="jquery-hello.js"></script>' > index.html

	@echo "Serve and test!"

	# Serve
	@echo 'python -m SimpleHTTPServer 3000 localhost'

	# Open tab to check
	@echo 'python -m webbrowser -t http://localhost:3000/'

	# Enable source maps in developer tools
	# See concatenated source, original source files
	# original sources and breakpoints should map correctly
	# i.e. clicking a line in the combined source should set a
	# breakpoint in the source file it mapped from

clean:
	-rm *.bak hello.js jquery-hello.js *.map index.html


.PHONY: test-setup clean
