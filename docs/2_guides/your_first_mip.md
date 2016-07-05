# 新手指南 - 创建你的第一个MIP页面

按照下面的步骤，首先，你可以学会如何创建一个基本的 MIP HTML 页面；然后，学会如何按照 MIP HTML 规范，对 MIP HTML 页面进行阶段性的验证；最后，文档会帮助你开发出你最终想要的的 MIP HTML 页面。

基本步骤包括：

1. 创建你的 **MIP HTML** 页面
- 引入图片
- 修改样式和布局
- 预览和验证
- 做好最终页面
- 最后截断

### 1. 创建你的**MIP HTML**页面

下面这段代码是一个 **MIP HTML** 的 demo 示例。你可以复制到 html 文件中，并根据规范添加你想要的元素。

```
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <title>文章大标题</title>
        <link rel="stylesheet" type="text/css" href="//m.baidu.com/static/ala/sf/static/js/miphtml_e49a9cb.css">
    </head>
    <body>
        <h1>欢迎使用MIP，这是你的第一个MIP页面！</h1>        
    </body>
    <script src="//www.baidu.com/nocache/zhixin/mip/miphtml_main_56aa51e.js"></script>   
</html>
```

上述代码中，body 中的内容十分简单，但是页面头部却包含较多但是不明显的代码，下面对 **MIP HTML** 中所需要的标签进行说明。

#### 所需要的标签

**MIP HTML**必须具备如下标签：

- 起始标签使用`<!doctype html>`

- 标签必须(MUST)加上 mip 标记，如:`` // TODO: 标记

- 必须(MUST)包含`<head>`和`<body>`标签

- 必须(MUST)在 head 标签中包含字符集申明：`<meta charset="utf-8">`，字符集统一为`utf-8`

- 必须(MUST)在 head 标签中包含 viewport 设置标签：`<meta name="viewport" content="width=device-width,minimum-scale=1">`，推荐(RECOMMENDED)包含`initial-scale=1`

- 必须(MUST)在 head 标签中包含`<script async src="https://m.baidu.com/miphtml/v0.js"></script>`

- 必须(MUST)在 head 标签中包含`<style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>`

- 必须包含`<script src="//www.baidu.com/nocache/zhixin/mip/miphtml_main_56aa51e.js"></script>`，来引入 **MIP JS** 库


// #### 可选的元数据 // TODO: 这啥？

// 除了光秃秃的要求，我们的例子还包括头部的schema.org的定义，这个定义对于**MIP**来说是不严格的。

### 2. 引入图片

在**MIP HTML**中，大多数HTML的基础标签都可以直接使用，但是一些特殊标签，比如`<img>`，被等效的或者是轻微增强的**MIP HTML'**自定义标签所代替（一些有问题的HTML标签完全被取缔了）。

下面以图片为例，说明 MIP 标签是如何将一张图片嵌入到页面中的。在 mip 中，使用自定义的mip-img标签对HTML的基础img标签进行了封装。使用方只需要提供一些图片的基本信息，后续的显示 & 自适应 & 加载策略等问题都不需要关注。下面是`<mip-img>`的使用示例：

```
<mip-img data-carousel="carousel" class="mip-element mip-img" src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
    <p class="mip-img-subtitle">带图片标题的类型</p>
</mip-img>
```

其中，`p.mip-img-subtitle`是可选的，表示图片的信息

### 3. 改变页面的样式和布局

#### 1）改变样式

**MIPs**是web页面，页面中的任何元素的样式都可以通过普通的css属性来设计。使用时，在页面的head部分引入css样式，在css中，可以通过类或者元素选择器进行选择要修改样式的dom元素。例如：

```
    <style mip-custom>
        /* any custom style goes here */
      body {
          background-color: white;
      }
      mip-img {
          background-color: gray;
          border: 1px solid black;
      }
</style>
```

每个**MIP**页面只允许有一个嵌入的css样式。

#### 控件的布局

**MIP**在部署页面中的元素的时候，遵循十分严格的规则，在一个普通的HTML页面中，你可以完全通过CSS来对元素进行布局，但是，在**MIP**页面中，出于对性能的考虑，**MIP**需要在一开始就知多所有元素的明确的尺寸大小。

### 4. 预览和验证

你可以通过一下方法，就像预览其他html站点一样预览mip页面：

- 直浏览其中打开（由于XMLHttpRequests失败可能会导致某些元素预览失败）
- 在本地起一个服务，像apache，nginx（tips: python -m SimpleHTTPServer 能够快速的在本地启一个服务器）

下一步，确保你的**MIP**页面是一个有效的**MIP**，不然第三方平台是检索不到你的页面的，可以按照如下步骤进行验证：

&nbsp;&nbsp;&nbsp;&nbsp;1） 在浏览其中打开页面

&nbsp;&nbsp;&nbsp;&nbsp;2） 在url中 添加'#development=1', 如：`http://localhost:8000/released.mips.html#development=1`

&nbsp;&nbsp;&nbsp;&nbsp;3）打开控制台， 验证错误

### 5. 如何在搜索引擎检索到你的页面

在某些情况下，你可能希望页面有**MIP**页面样式和非**MIP**页面样式，例如一篇新闻文章，在百度搜索中看到的是一个非**MIP**页面的样子，那么他该如何才能有一个**MIP**页面的样式呢？

#### 1）通过<link>标签连接页面

通过在页面的head中添加<link>来解决上述问题。

- 非mip页面，添加此标签，指明对应的mip页面

    <link rel=”miphtml” href=”http://domain/article.mip.html" />


- mip页面直接通过`<html mip>`表明


### 6. 最后一步

恭喜！你已经在本地测试了你的页面，并修复了的所有验证错误，这意味着你的第一个页面已经准备就绪了。

通过我们的文档，你可以了解**MIP**的工作流程以及所有元组，组件，通过更多的工具你可以更好的开发mip页面。

## MIP是如何提高性能的？

* 控制资源加载顺序
* MIP缓存机制
* 高效的MIP 运行环境


