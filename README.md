## MIB(Mobile page In Baidu)源码

### 环境依赖

#### 编译环境

依赖fis3，需要插件`fis3-hook-module`、`fis-parse-less`

```
npm install -g fis3
npm install -g fis3-hook-module
npm install -g fis-parse-less
```

注：公司内网服务器，没有外网权限安装fis3的方法

```
1. 安装nodejs：jumbo安装nodejs（如果不知道，babel.baidu.com搜索一下）
2. npm config set registry http://registry.npm.baidu.com
    文档http://npm.baidu.com/
    如有问题尝试如下备用镜像：
    http://db-bldev.db01.baidu.com:8282/
    文档：http://pip.baidu.com/
```

#### 编译命令说明

```
# 默认编译：包括压缩、md5等
make

# 开发者模式：包括文件监听
make dev
```

### 使用须知

直接clone该项目后，`dist`目录下为产出后的总js和css文件，直接引入即可
