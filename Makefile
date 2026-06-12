.PHONY: dev check build test

dev:
	npm run dev

check:
	npm run check

build:
	npm run build

test: check build
