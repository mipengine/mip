# make 默认make命令只做编译
default:
	 fis3 release --dest=./build --file=buildconf/src.js --root=./src
	 fis3 release --dest=./build --file=buildconf/builtins.js --root=./
	 fis3 release --dest=./dist --file=buildconf/extensions.js --root=./
	 fis3 release --dest=./dist --file=buildconf/package.js --root=./
	 fis3 release --dest=./dist --file=buildconf/css.js --root=./less
# 开发这模式：此种模式下，会开启本地服务器，并且监听src下文件，实时编译，看效果
debug:
	 fis3 server start --root=./ --port=8056
	 fis3 release debug --dest=./build --file=buildconf/src.js --root=./src
	 fis3 release debug --dest=./build --file=buildconf/builtins.js --root=./
	 fis3 release debug --dest=./dist --file=buildconf/extensions.js --root=./
	 fis3 release debug --dest=./dist --file=buildconf/package.js --root=./
	 fis3 release debug --dest=./dist --file=buildconf/css.js --root=./less
doc:
	node renderDoc.js
mip:
	fis3 release --dest=./build --file=buildconf/src.js --root=./src
builtins:
	fis3 release --dest=./build --file=buildconf/builtins.js --root=./
ext:
	fis3 release --dest=./dist --file=buildconf/extensions.js --root=./
package:
	fis3 release --dest=./dist --file=buildconf/package.js --root=./
