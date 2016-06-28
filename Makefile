# make 默认make命令只做编译
default:
	 fis3 release -d dist
# 开发这模式：此种模式下，会开启本地服务器，并且监听src下文件，实时编译，看效果
dev:
	 fis3 server start --root=./ --port=8056
	 fis3 release dev -d dist -w
