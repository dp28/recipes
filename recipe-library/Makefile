PHONY: test

install: node_modules

dist: node_modules $(shell find src -name "*.ts")
	npm run compile

test: node_modules
	npm test

node_modules: package.json
	npm install
