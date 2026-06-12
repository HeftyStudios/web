.PHONY: check build test

check:
	npm run check

build:
	npm run build

test: check build
