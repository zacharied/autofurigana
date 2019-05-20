LIBFILE := autofurigana.js
LIBFILE_MIN := $(LIBFILE:.js=.min.js)

all: minify

clean:
	rm $(LIBFILE_MIN)

minify:
	curl -X POST -s --data-urlencode 'input@$(LIBFILE)' https://javascript-minifier.com/raw > $(LIBFILE_MIN)

.PHONY: all
