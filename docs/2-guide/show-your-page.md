# 让搜索发现你的页面

在某些情况下，站点对于同一个html页面，可能存在两种，一个是mip html，一个是standard html。
当百度检索到你页面的standard html时，你可以通过在mip中添加如下的代码，以保证百度更好的检索到你的mip html，同时也可以让你的mip html更好的继承standard html的权重等相关策略信息。

## 在head中添加link标签让百度搜索发现你的页面

### 两种页面同时存在

    在standard html中添加：

    <link rel="miphtml" href="https://m.baidu.com/static/ala/mip/mip-demo.html">

    在mip html中添加：

    <link rel="standardhtml" href="https://m.baidu.com/static/ala/mip/mip-demo.html">

### 如果只有mip html
	
	同样需要添加，指向自己：
    
    <link rel="standardhtml" href="https://m.baidu.com/static/ala/mip/mip-demo.html">

## 通过添加meta标签集成第三方平台

对于一些第三方的站点，这些站点嵌入了mip或者引入了mip，他们除了要只知道这是一个mip页面之外还要了解一些mip页面的开发的细节。比如：这个页面是一个新闻文章，还是一个视频，因此页面需要有一个摘要来进行简短的描述，同时也需要一个小的示意图。

不只是mip页面有这个问题，所有的web页面都有这个问题。在一些平台上，meta标签不是必须的，但也有一些平台确实一定要加的，如果没有按照规范添加正确的meta标签，平台就不会正确展现你的页面内容。

### 1）Schema.org

schemas 标记，即 html 标签，站长可以使用这些标签来以搜索引擎认可的方式来标记他们的网页。

Schema.org 是一份公开的、标准的 schema 词汇表，它能够给站长们参考使用。同时能帮助搜索引擎理解网页上的信息，从而让搜索结果内容更丰富，用户搜索到的页面也就更精准。


示例
```
 <script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "https://www.baidu.com/nocache/zhixin/mib/mip-demo.html",
    "headline": "标题",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "百度 MIP 页面 demo",
    "author": {
      "@type": "Person",
      "name": "Baidu"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Baidu",
      "logo": {
        "@type": "ImageObject",
        "url": "//m.baidu.com/static/index/plus/plus_logo.png",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "//m.baidu.com/static/index/plus/plus_logo.png",
      "height": 2000,
      "width": 800
    }
  }
</script>
```
可以通过[资源引入/schema](http://sfe.baidu.com/#/资源引入/Schemas标记)了解更多。
