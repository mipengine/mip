# 开始

## 什么是MIB

MIB（Mobile Instant Baidu）是一个构建web页面的方法，他能够快速的渲染出静态内容。MIB主要由三部分组织成：

- MIB HTML
- MIB JS
- MIB Cache

为了提高性能，**MIB HTML** 对基础的HTML做了一些限制，也进行了一些扩展，它能够在基础的HTML上构建更佳丰富的内容。**MIB JS**库是用来保证MIB HTML页面的快速渲染。**MIB Cache**用于MIB页面的高速缓存。

### 1. MIB HTML

**MIB HTML**用定制的MIB特性对基础的HTML进行了扩展，下面是一段最简单的MIB HTML代码示例：

```
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="stylesheet" type="text/css" href="//m.baidu.com/static/ala/sf/static/js/mibhtml_e49a9cb.css">
        <style>
            /* 头部信息 */
            .o-head-info {display: block;padding: 20px 17px 0;color: #6a6a6a;font-size: 13px; overflow: hidden;
            }
            /* 发布来源 */
            .o-head-tag {
                float: left;
            }
            /* 发布时间 */
            .o-head-time {
                float: right;
            }
            /* 文章大标题 */
            .o-head-title h3 {
                margin-top: 0;
                line-height: 34px;
                text-align: justify;
                font-size: 22px;
                color: #333;
            }
            /* 其他自定义样式（自己的样式写在这里，使用 o-page- 开头）*/
            .o-page-test01 {
                background: yellow;
                font-style: italic;
            }
        </style>
    </head>
    <body>Hello World!</body>
    <script src="//www.baidu.com/nocache/zhixin/mib/mibhtml_main_56aa51e.js"></script>   
</html>
```
**MIB HTML**页面中的标签有两种，一种是常规的HTML标签，另一种是替代常规标签的MIB特异性标签。MIB特异性标签叫做MIB组件，MIB组件的作用是提高页面的性能。

例如，`mib-img`标签，及时在不支持响应式图片的浏览器中也能够完全支持响应式图片的srcset属性。

### 2. MIB JS

**MIB JS**库能够管理资源的加载，并提供上面提到过的自定义MIB标签，用这种方式确保页面的快速渲染，提高页面的各个方面的性能。

**MIB JS**最大的优点是，他能够异步加载所有外部资源，因此页面渲染不会被页面中的元素阻塞，从而提高了页面渲染的速度。

**MIB JS**还包括所有iframe的沙盒、在资源加载之前提前计算出页面元素的布局以及禁用缓慢css选择器等技术性能。

如果你不满足于只了解**MIB JS**的优点，可以通过阅读**MIB HTML**说明来充分了解MIB的优缺点。

### 3. MIB CDN

**MIB CDN**就是基于代理的内容分发网络（Content Delivery Network, CND），是用来提供所有的MIB文档的。它可以读取病缓存MIB HTML页面，并自动提升页面性能。在使用MIB Cache的时候，所有的文档，js文件都是通过HTTP2.0的最大效率从同一来源加载的。

**MIB CDN**还带有一个内置的验证系统，该系统是用来确认页面是否可以有正常工作的，并且此系统并不依赖于任何外部资源。验证系统通过对页面中的标签进行一系列的验证来检查页面是否符合MIB HTML规范。

还有另一种验证器会与每一个MIB页面绑定，当页面进行渲染的时候，这种验证器可以直接在浏览器的控制台中输出页面的错误；并且随着代码逻辑的变化，向你展示其对页面性能以及用户体验的影响。

## 创建你的第一个MIB页面

MIB文档会帮助你学习如何创建一个基本的**MIB HTML**页面，如何按照MIB规范，对你自己的MIB页面进行阶段性的验证；并且，文档会帮助你开发出你最终想要的的**MIB**页面，具体步骤大致如下：

1. 创建你的**MIB HTML**页面
- 引入图片
- 修改样式和布局
- 预览和验证
- 做好最终页面
- 最后截断

### 1. 创建你的**MIB HTML**页面

下面这段代码是一个**MIB HTML**的demo示例。你可以复制如下代码到html文件中，并根据规范添加你想要的元素来查看效果。

```
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <title>文章大标题</title>
        <link rel="stylesheet" type="text/css" href="//m.baidu.com/static/ala/sf/static/js/mibhtml_e49a9cb.css">
        <style>
            /* 头部信息 */
            .o-head-info {display: block;padding: 20px 17px 0;color: #6a6a6a;font-size: 13px; overflow: hidden;
            }
            /* 发布来源 */
            .o-head-tag {
                float: left;
            }
            /* 发布时间 */
            .o-head-time {
                float: right;
            }
            /* 文章大标题 */
            .o-head-title h3 {
                margin-top: 0;
                line-height: 34px;
                text-align: justify;
                font-size: 22px;
                color: #333;
            }
            /* 其他自定义样式（自己的样式写在这里，使用 o-page- 开头）*/
            .o-page-test01 {
                background: yellow;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <h1>欢迎适用MIB</h1>        
    </body>
    <script src="//www.baidu.com/nocache/zhixin/mib/mibhtml_main_56aa51e.js"></script>   
</html>
```

上述代码中，body中的内容十分简单，但是页面头部却包含比较多但是不明显的代码，下面对**MIB HTML**中所需要的标签进行说明。

#### 所需要的标签

**MIB HTML**必须具备如下标签：

- 起始标签使用`<!doctype html>`

- 标签必须(MUST)加上mib标记，如:`

- 必须(MUST)包含<head>和<body>标签

- 必须(MUST)在head标签中包含字符集申明：`<meta charset="utf-8">`，字符集统一为`utf-8`

- 必须(MUST)在head标签中包含viewport设置标签：`<meta name="viewport" content="width=device-width,minimum-scale=1">`，推荐(RECOMMENDED)包含`initial-scale=1`

- 必须(MUST)在head标签中包含`<script async src="https://m.baidu.com/mibhtml/v0.js"></script>`

- 必须(MUST)在head标签中包含`<style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>`

- 必须包含`<script src="//www.baidu.com/nocache/zhixin/mib/mibhtml_main_56aa51e.js"></script>`，来引入**MIB JS**库


// #### 可选的元数据

// 除了光秃秃的要求，我们的例子还包括头部的schema.org的定义，这个定义对于**MIB**来说是不严格的。

### 2. 引入图片

在**MIB HTML**中，大多数HTML的基础标签都可以直接使用，但是一些特殊标签，比如`<img>`，被等效的或者是轻微增强的**MIB HTML'**自定义标签所代替（一些有问题的HTML标签完全被取缔了）。

下面以图片为例，说明MIB标签是如何将一张图片嵌入到页面中的。在mib中，使用自定义的mib-img标签对HTML的基础img标签进行了封装。使用方只需要提供一些图片的基本信息，后续的显示 & 自适应 & 加载策略等问题都不需要关注。下面是`<mib-img>`的使用示例：

```
<mib-img data-carousel="carousel" class="mib-element mib-img" src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
    <p class="mib-img-subtitle">带图片标题的类型</p>
</mib-img>
```

其中，`p.mib-img-subtitle`是可选的，表示图片的信息

### 3. 改变页面的样式和布局

#### 1）改变样式

**MIBs**是web页面，页面中的任何元素的样式都可以通过普通的css属性来设计。使用时，在页面的head部分引入css样式，在css中，可以通过类或者元素选择器进行选择要修改样式的dom元素。例如：

```
    <style amp-custom>
        /* any custom style goes here */
      body {
          background-color: white;
      }
      mib-img {
          background-color: gray;
          border: 1px solid black;
      }
</style>
```

每个**MIB**页面只允许有一个嵌入的css样式。

#### 控件的布局

**MIB**在部署页面中的元素的时候，遵循十分严格的规则，在一个普通的HTML页面中，你可以完全通过CSS来对元素进行布局，但是，在**MIB**页面中，出于对性能的考虑，**MIB**需要在一开始就知多所有元素的明确的尺寸大小。

### 4. 预览和验证

你可以通过一下方法，就像预览其他惊天html站点一样预览mib页面：

- 直浏览其中打开（由于XMLHttpRequests失败可能会导致某些元素预览失败）
- 在本地起一个服务，像apache，nginx（tips: python -m SimpleHTTPServer 能够快速的在本地启一个服务器）

下一步，确保你的**MIB**页面是一个有效的**MIB**，不然第三方平台是检索不到你的页面的，可以按照如下步骤进行验证：

&nbsp;&nbsp;&nbsp;&nbsp;1） 在浏览其中打开页面

&nbsp;&nbsp;&nbsp;&nbsp;2） 在url中 添加'#development=1', 如：`http://localhost:8000/released.amp.html#development=1`

&nbsp;&nbsp;&nbsp;&nbsp;3）打开控制台， 验证错误

### 5. 如何在搜索引擎检索到你的页面

在某些情况下，你可能希望页面有**MIB**页面样式和非**MIB**页面样式，例如一篇新闻文章，在百度搜索中看到的是一个非**MIB**页面的样子，那么他该如何才能有一个**MIB**页面的样式呢？

#### 1）通过<link>标签连接页面

通过在页面的head中添加<link>来解决上述问题。

- 非mib页面，添加此标签，指明对应的mib页面

    <link rel=”mibhtml” href=”http://domain/article.mib.html" />


- mib页面直接通过`<html mib>`表明


### 6. 最后一步

恭喜！你已经在本地测试了你的页面，并修复了的所有验证错误，这意味着你的第一个页面已经准备就绪了。

通过我们的文档，你可以了解**MIB**的工作流程以及所有元组，组件，通过更多的工具你可以更好的开发mib页面。

## MIB是如何提高性能的？（暂未支持）

