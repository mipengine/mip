# MIB入门教程

## 创建响应式MIB页面(暂未支持)

在MIB页面中，只需要在页面元素中加上属性`layout=responsive`，它就是响应式的了。

- 创建响应式图片
- 在页面中引入样式
- 尺寸和位置元素
- 验证样式和布局

### 1. 创建响应式图片

所有从外部引入的资源（也包括图片），在引入的时候都比如指定其大小和位置，这样才不会引起页面的跳转和回流。

在创建响应式图片的时候，需要明确图片的长，宽，同时要设置属性layout是responsive；并且，为了适应不同的窗口尺寸，需要指明图片的srcset。如下例：

```
<mib-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg" 640w,
           "/img/narrow.jpg" 320w
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</mib-img>
```
`mib-img`会自动适应其父容器的宽度，图片的高度会根据图片的宽度进行等比例缩放。

### 2. 在页面中引入样式（暂未支持）

所有的自定义样式都要加在头部的`<style mib-custom>`标签中，如：

```
    
```


### CSS布局

和所有的页面一样，MIB页面也是通过CSS进行页面布局的，但是根据规范，你不能引入额外的CSS样式文件；同时，由于考虑到性能的问题，一些样式也不能使用；不能使用内敛样式属性也。

所有的CSS必须放在dom结构的head中。

#### CSS预处理起（暂未支持）

### 布局（暂未支持）

## Iframes 和 Media的使用介绍

### 1. iframe

MIB页面中用**mib-iframe**代替iframe元素。

### 2. Media

包括img，animate img，video以及audio资源。

暂时只支持img

## 创建第三方组件（暂未支持）

## 如何使你的MIB页面被发现

在某些情况下，你可能希望页面有MIB页面样式和非MIB页面样式，例如在一片新闻文章，在百度搜索中看到的是一个非MIB页面的样子，那么你该如何才能有一个MIB页面的样式呢？

#### 1） 通过<link>标签连接页面

通过在页面的head中添加<link>来解决上述问题。

- 非mib页面，添加此标签，指明对应的mib页面

    <link rel=”mibhtml” href=”http://domain/article.mib.html" />


- mib页面直接通过`<html mib>`表明

#### 2） 如果只有一个页面

如果你只有一个MIB页面，那么也需要通过`<html mib>`表明

### 1. 通过增加meta标签使MIB集成到第三方页面中

对于一些第三方的站点，这些站点嵌入了mib或者引入了mib，他们除了要只知道这是一个mib页面之外还要了解一些mib页面的开发的细节。比如：这个页面是一个新闻文章，还是一个视频，因此页面需要有一个摘要来进行简短的描述，同时也需要一个小的示意图。

不只是mib页面有这个问题，所有的web页面都有这个问题。在一些平台上，meta标签不是必须的，但也有一些平台确实一定要加的，如果没有按照规范添加正确的meta标签，平台就不会正确展现你的页面内容。

### 1）Schema.org

Schema.org能够适用于大多数搜索引擎，对meta标签中的各种情况，它都提供了开放词汇进行添加。

在MIB页面中，meta可以包含特定的上下文内容，比如一篇新闻文章，他就可以添加标题，发布日期以及预览图像

示例：

```
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
```

#### 2) 适用与更多平台的meta标签

可以通过网络来学习其他方法


## MIB页面校验（暂未支持）

## 配置分析（暂未支持）


