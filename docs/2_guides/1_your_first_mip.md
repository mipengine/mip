# 新手指南 - 创建你的第一个MIP页面

按照下面的步骤，首先，你可以学会如何创建一个基本的 MIP HTML 页面；然后，学会如何按照 MIP HTML 规范，对 MIP HTML 页面进行阶段性的验证；最后，你可以开发出你最终想要的的 MIP HTML 页面。

基本步骤包括：

1. 创建基础的 MIP HTML 页面
- 引入图片
- 修改样式和布局
- 预览和验证
- 做好最终页面
- 最后一步

## 1. 创建基础的 MIP HTML 页面

下面这段代码是一个基础的 MIP HTML 的 demo 示例。你可以复制到html文件中，并根据规范添加你想要的元素。需要注意的是页面中必须加载css文件`//m.baidu.com/static/ala/sf/static/css/miphtml_xxxxxx.css` 和 js文件`//m.baidu.com/static/ala/sf/static/js/miphtml_main_xxxxxx.js`，`xxxxxx`是版本号，版本号会根据功能的升级而不同，开发中可以根据文档中的说明进行加载。

```
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <title>文章大标题</title>
        <link rel="stylesheet" type="text/css" href="//m.baidu.com/static/ala/sf/static/css/miphtml_c0c6e10.css">
    </head>
    <body>
        <h1>欢迎使用MIP，这是你的第一个MIP页面！</h1>        
    </body>
    <script src="//m.baidu.com/static/ala/sf/static/js/miphtml_main_91d6a5e.js"></script>   
</html>
```

上述代码中，body 中的内容十分简单，但是页面头部却包含较多但是不明显的代码，MIP HTML中的标签规范请参考[MIP HTML 规范](http://mip.baidu.com/#./docs/3_reference/standard.md)。

## 2. 引入图片

MIP HTML 中用 mip 组件 `<mip-img>` 代替了 html原生的 `<img>` 标签，具体使用方法参考 [mip-img图片组件](http://mip.baidu.com/#./docs/4_components/img-mip.md)。

## 3. 改变页面的样式和布局

MIP HTML 中，可以自己定义样式，具体方法如下：

### 1）改变样式

MIP HTML 是web页面，页面中的任何元素的样式都可以通过普通的css属性来设计。使用时，在页面的head部分引入css样式，在css中，可以通过类或者元素选择器进行选择要修改样式的dom元素。例如：

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

需要注意的是：每个 MIP HTML 页面只允许有一个嵌入的css样式，并且`<style>` 标签需要标记自定义样式，即写成 `<style mip-custo>`。

### 2)控件的布局

出于对性能的考虑，MIP HTML 页面赞不支持第三方通过css来对元素进行布局。

## 4. 预览和验证

像预览其他html站点一样预览 MIP HTML 页面，有如下方法：

- 直浏览其中打开（由于XMLHttpRequests失败可能会导致某些元素预览失败）
- 在本地部署一个服务，像apache，nginx（tips: python -m SimpleHTTPServer 能够快速的在本地启一个服务器）

下一步，确保你的**MIP**页面是一个有效的**MIP**，不然第三方平台是检索不到你的页面的，可以按照如下步骤进行验证：

- 1） 在浏览其中打开页面

- 2）打开控制台， 验证错误

<!-- ## 5. 如何在搜索引擎检索到你的页面

在某些情况下，你可能希望页面有**MIP**页面样式和非**MIP**页面样式，例如一篇新闻文章，在百度搜索中看到的是一个非**MIP**页面的样子，那么他该如何才能有一个**MIP**页面的样式呢？

### 1）通过<link>标签连接页面

通过在页面的head中添加<link>来解决上述问题。

- 非mip页面，添加此标签，指明对应的mip页面

    <link rel=”miphtml” href=”http://domain/article.mip.html" />


- mip页面直接通过`<html mip>`表明 -->


## 6. 最后一步

恭喜！走到这一步表明你已经在本地测试了你的页面，并修复了的所有验证错误，这意味着你的第一个页面已经准备就绪了。

通过我们的文档，你可以了解**MIP**的工作流程以及组件等，这些都可以帮助你更好的开发MIP页面。

## MIP是如何提高性能的？

* 控制资源加载顺序
* MIP缓存机制
* 高效的MIP 运行环境


