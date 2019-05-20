LIBFILE := autofurigana.js
LIBFILE_MIN := $(LIBFILE:.js=.min.js)

all: minify

clean:
	rm $(LIBFILE_MIN)

minify:
	sed 's/^module\.exports\.//' "$(LIBFILE)" > "$(LIBFILE).temp"
	curl -X POST -s --data-urlencode 'input@$(LIBFILE).temp' https://javascript-minifier.com/raw > "$(LIBFILE_MIN)"
	rm "$(LIBFILE).temp"

test:
	node test.js

.PHONY: all test
