export PORT=9877
export KARMA_BIN=./node_modules/karma/bin/karma
export TEST=$(KARMA_BIN) --port $(PORT)

.PHONY: clean

# make 默认make命令只做编译
default:
	 fis3 release -d ./dist
# 开发这模式：此种模式下，会开启本地服务器，并且监听src下文件，实时编译，看效果
debug:
	 fis3 server start --root=./ --port=8056
	 fis3 release debug -d ./dist
doc:
	node renderDoc.js
mipmain:
	fis3 release -d ./dist mipmain
css:
	fis3 release -d ./dist css
ext:
	fis3 release -d ./dist extensions

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

