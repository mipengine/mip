export PORT=9877
export KARMA_BIN=./node_modules/karma/bin/karma
export TEST=$(KARMA_BIN) --port $(PORT)

.PHONY: clean build debug

# release: core and extensions
default:
	 fis3 release -d ./dist
# build and serve
debug: build
	 fis3 server start --root=./ --port=8056
build: 
	 fis3 release debug -d ./dist
test: test-build
	$(TEST) start --reporters mocha

test-build:
	fis3 release -d ./dist test

test-report: test-build
	$(TEST) start --reporters mocha,html,coverage

test-watch: test-build
	$(TEST) start --auto-watch --no-single-run

test-listen: test-build
	$(TEST) start --browsers --no-single-run

test-run:
	$(TEST) run

clean:
	rm -rf ./dist

