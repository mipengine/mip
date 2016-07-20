# make 默认make命令只做编译
default:
	 fis3 release prod -d dist
# 开发这模式：此种模式下，会开启本地服务器，并且监听src下文件，实时编译，看效果
dev:
	 fis3 server start --root=./ --port=8056
	 fis3 release dev -d dist -wL
doc:bbaid
	node renderDoc.js
mip:
	fis3 release --dest=./build --file=buildconf/src.js --root=./newsrc
builtins:
	fis3 release --dest=./dist --file=buildconf/builtins.js --root=./
ext:
	fis3 release --dest=./dist --file=buildconf/extensions.js --root=./
