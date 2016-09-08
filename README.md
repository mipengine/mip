## MIP(Mobile page In Baidu)源码

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
make debug

# 运行一次测试
make test

# 生成测试报告 dist/test-coverate, dist/test-result
make test-report

# 监听测试目录（./dist）
make test-watch
# 构建测试目录（将会触发一次测试）
make test-build

# 手机端测试
make test-listen
# 用任何浏览器访问上述命令提示的URL
# 执行测试
make test-run
```

### 使用须知

直接clone该项目后，`dist`目录下为产出后的总js和css文件，直接引入即可

### 快速开始

注：本wiki为初始版本，时效性不能保证，请以最新改动为准

#### 文件引入

* 引入css样式

```
<link type="text/css" rel="stylesheet" href="http://cq02-wise-sftc6.cq02.baidu.com:8524/static/css/mip-common.css">
```

* 引入js组件（已包含jq、amd）

```
<script src="http://cq02-wise-sftc6.cq02.baidu.com:8524/static/js/miphtml_main.js"></script>
```

* 一个完整的例子

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <title>MIP DEMO</title>
    <link rel="stylesheet" href="http://cq02-wise-sftc6.cq02.baidu.com:8524/static/css/mip-common.css">
</head>
<body>
    <p class="mip-text">这是一个段落，纯文本形式</p>
    <div class="mip-img-container">
        <mip-img data-carousel="carousel" class="mip-element mip-img" src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg"></mip-img>
    </div>
    <div class="mip-img-container">
        <mip-img data-carousel="carousel" class="mip-element mip-img" src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
            <p class="mip-img-subtitle">带图片标题的类型</p>
        </mip-img>
    </div>
    <p class="mip-text">这是另一个段落，纯文本形式</p>
    <div class="mip-html">
        <p style="text-align:center">自定义的文字居中</p>
    </div>
    <div class="mip-html">
        <p>
            <span style="color:#f00">自定义的红色字体</span>
        </p>
    </div>
    <div class="mip-html">
        <p>
            <span><strong>自定义的加粗字体</strong></span>
        </p>
    </div>
<script src="http://cq02-wise-sftc6.cq02.baidu.com:8524/static/js/miphtml_main.js"></script>
</body>
</html>
```

#### 插入图片

mip规范中，封装了img标签，使用自定义的mip-img标签。使用方只需要提供一些图片的基本信息，后续的显示 & 自适应 & 加载策略等都不需要关注

* 基本使用

```
<mip-img data-carousel="carousel" class="mip-element mip-img" src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
    <p class="mip-img-subtitle">带图片标题的类型</p>
</mip-img>
```

其中，`p.mip-img-subtitle`是可选的，表示图片的信息

#### 插入文本

对应mip规范中的纯文本，和后面的`mip-html`兼容

* 基本使用

```
<p class="mip-text">我是一段文本</p>
```

#### 自定义样式

为了满足个性化需求，`mip-html`的方式承接所有需要自定义的标签 & 样式。封装了常用的文本对齐、文本加粗、背景、字号、有序列表、无序列表、引用、下划线等

* 基本使用

```
<div class="mip-html">
    // 自定义的内容
</div>
```

__注：__所有用户的自定义内容都必须在`.mip-html`中

* 加粗

```
<strong>加粗字体</strong>
```

* 居左、居中

其中，居左不需要做特殊处理，居右需要设置`text-align:  center`

```
<p style="text-align: center">居中文本</p>
```

* 列表

有序

```
<ol>
    <li>列表1</li>
    <li>列表2</li>
</ol>
```

无序

```
<ul>
    <li>列表1</li>
    <li>列表2</li>
</ul>
```

* 字体颜色、背景色

和前面的机制一样，都是通过加style来解决

```
<p style="font-color: #f00">红色文字</p>
```

* 下划线(u)

```
<u>带下划线</u>
```

* 引用

```
<blockquote>引用主体</blockquote>
```
