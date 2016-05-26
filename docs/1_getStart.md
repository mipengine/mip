# 开始

## 什么是MIB

MIB（mobile page in baidu）是一个构建web页面的方法，他能够快速的渲染出静态内容。MIB主要由三部分组织成：

- MIB HTML
- MIB JS
- MIB Cache

**MIB HTML** 是有限制的HTML，以此来提高性能， 并且，对HTML进行了扩展，在基础的HTML上构建更佳丰富的内容。**MIB JS**库用来保证MIB页面的快速渲染。**MIB Cache**用于MIB页面的高速缓存。

### MIB HTML

**MIB HTML**用定制的MIB特性对基础的HTML进行了扩展，下面是一段最简单的MIB HTML：

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
    <body>Hello World!</body>
    <script src="//www.baidu.com/nocache/zhixin/mib/mibhtml_main_56aa51e.js"></script>   
</html>
```
**MIB HTML**页面中的大多数标签仍然是常规的HTML标签，但是一些HTML标签被MIB-xx特定标签所代替，这些自定义的MIB-xx元素，叫做MIB组件，这些组件提高了页面的性能。

### MIB JS

**MIB JS**库实现了所有MIB的最佳性能实践，他能够管理资源的加载，并提供上述自定义MIB标签，以此来确保页面的快速渲染。

**MIB JS**最大的优点是，他能够异步加载所有外部资源，因此提高了页面渲染的速度。

**MIB JS**的其他技术性能还包括所有iframe的沙盒、在资源加载之前提前计算出页面元素的布局以及禁用缓慢css选择器。

通过阅读**MIB HTML**规范能够了解更多。

### MIB Cache（暂不支持）



## 创建你的第一个MIB页面

在我们的文档中，你将学习如何创建一个基本的**MIB HTML**页面，如何阶段性的验证他是符合**MIB**规范的，如何只做出最终的**MIB**页面。

- 创建你的**MIB HTML**页面
- 引入图片
- 修改样式和布局
- 预览和验证
- 做好最终页面
- 最后截断

### 创建你的**MIB HTML**页面

下面这段代码是一个最简单的**MIB HTML**的示例。

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

- 以`<!DOCTYPE html>`开始

- 包含一个最高级别的`<html lang="zh">`

- 包含普通`<head>`和`<body>`HTML标签

- `<meta charset="utf-8">`作为head的第一个子标签

- head标签中必须包含`<meta name="viewport" content="width=device-width,minimum-scale=1">`,最好在此标签中加入`initial-scale=1`

- 必须包含<script src="//www.baidu.com/nocache/zhixin/mib/mibhtml_main_56aa51e.js"></script>，来引入**MIB JS**库

#### 可选的元数据

除了光秃秃的要求，我们的例子还包括头部的schema.org的定义，这个定义对于**MIB**来说是不严格的。

### 引入图片

在**MIB HTML**中，大多数HTML标签可以直接使用，但是一些标签，比如`<img>`，被相等或者是轻微增强的**MIB HTML'**标签所代替（一些有问题的标签完全被取缔）。

下面以图片为例，说明MIB标签是如何将一张图片嵌入到页面中的.mib规范中，封装了img标签，使用自定义的mib-img标签。使用方只需要提供一些图片的基本信息，后续的显示 & 自适应 & 加载策略等都不需要关注.

```
<mib-img data-carousel="carousel" class="mib-element mib-img" src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
    <p class="mib-img-subtitle">带图片标题的类型</p>
</mib-img>
```

其中，`p.mib-img-subtitle`是可选的，表示图片的信息

### 改变样式和布局

#### 改变样式

**MIBs**是web页面，页面一节页面中的任何元素的样式都可以通过普通的css属性类设计。在页面的head部分引入css样式，其中可以通过累或者元素选择器进行选择。例如：


```
    <style>
        .o-head-info {
            display: block;
            padding: 20px 17px 0;
            color: #6a6a6a;
            font-size: 13px;
            overflow: hidden;
        }
    </style>
```

每个**MIB**页面只允许有一个嵌入的css样式。

#### 控件的布局

**MIB**在部署页面中的元素的时候，遵循十分严格的规则，在衣蛾普通的HTML页面中，你可以完全通过CSS来对元素进行布局，但是，在**MIB**页面中，出于对性能的考虑，**MIB**需要在一开始就知多所有元素的明确的尺寸大小。

### 预览和验证

你可以通过一下方法，就像预览其他惊天html站点一样预览mib页面：

- 直浏览其中打开（由于XMLHttpRequests失败可能会导致某些元素预览失败）
- 在本地起一个服务，像apache，nginx（tips: python -m SimpleHTTPServer 能够快速的在本地启一个服务器）

下一步，确保你的**MIB**页面是一个有效的**MIB**，也就是说他不回被第三方平台检索到，可以按照如下步骤进行验证：

1. 在浏览其中打开页面
2. 在url中 添加'#development=1',如：`http://localhost:8000/released.amp.html#development=1`
3. 打开控制台， 验证错误

### 使你的页面被发现

在某些情况下，你可能希望页面有**MIB**页面样式和非**MIB**页面样式，例如在一片新闻文章，在百度搜索中看到的是一个非**MIB**页面的样子，那么他该如何才能有一个**MIB**页面的样式呢

#### 用<link>连接页面


### 最后一步

恭喜！你已经测试了你的页面在本地病修复了的所有验证错误，这意味着你的第一个页面已经准备就绪了。

通过目录大纲，你可以了解**MIB**的工作流程以及所有元素行为，通过更多的工具你可以了解到内容生产。

## MIB是如何提高性能的？（暂未支持）

# MIB入门教程

## 创建MIB页面

### CSS布局

和所有的页面一样，MIB页面也是通过CSS进行页面布局的，但是根据规范，你不能引入额外的CSS样式文件；同时，由于考虑到性能的问题，一些样式也不能使用；不能使用内敛样式属性也。

所有的CSS必须放在dom结构的head中。

#### CSS预处理起（暂未支持）

### 布局（暂未支持）

## Iframes 和 Media的使用介绍

### iframe

MIB页面中用**mib-iframe**代替iframe元素。

### Media

包括img，animate img，video以及audio资源。

暂时只支持img

## 创建第三方组件（暂未支持）

## 如何使你的MIB页面被发现

在某些情况下，你可能希望页面有MIB页面样式和非MIB页面样式，例如在一片新闻文章，在百度搜索中看到的是一个非MIB页面的样子，那么你该如何才能有一个MIB页面的样式呢？

### 通过<link>标签连接页面

通过在页面的head中添加<link>来解决上述问题。

- 非mib页面，添加此标签，指明对应的mib页面

    <link rel=”mibhtml” href=”http://domain/article.mib.html" />


- mib页面直接通过`<html mib>`表明

## MIB页面校验（暂未支持）

## 配置分析（暂未支持）


# MIB API说明 

## mib-ad

描述|提供了一个广告容器用来显示广告，目前只支持https的广告
----|----
可用性|稳定
支持布局| 
示例|

### 说明

```
<mib-ad tpl="onlyImg" src="//m.baidu.com/s?word=百度" data-size="1242 180" data-img="//m.baidu.com/static/search/ala/ad_1.png" class="mib-element"><a href="//m.baidu.com/s?word=百度">
```

## mib-img

描述|用自定义的mib-img标签封装了html原生img标签
----|----
可用性|稳定
所需脚本|
支持布局| 
示例|

### 属性

- **tpl**

    广告类型（无图，单图，多图，目前只有单图类型）

- **src**

    跳转地址

- **data-size**

    图片大小

- **data-img**

    图片地址
   

### 样式

mib-img暂时不支持css重写样式

### 验证




## mib-pix

描述|用通用https代理组件
----|----
可用性|稳定
示例|

### 说明

接入方提供一个接收请求的服务地址，例如：//yourselfdomain/mib/tj.gif，如果服务地址不支持HTTPS，可以使用百度提供的HTTPS代理服务使用MIB提供的插件，向服务地址定向发送请求。如：

```
    <mib-pix src="//yourselfdomain/miburl/tj.gif?t={TIME}&title={TITLE}&host={HOST}&from=baidu"></mib-pix>
```

MIB会自动匹配参数，生成请求地址，例如：//yourselfdomain/miburl/tj.gif?t=1459415529464&title=MIB_PIX_DEMO&host=mib.bdstatic.com&from=baidu

- 目前支持的参数: {TIME}，{TITLE}，{HOST}

### 属性

- **src**

	资源方服务地址
	
## mib-baidu-tj
    
描述|百度统计组件，用于统计页面数据
----|----
可用性|稳定
示例|

### 说明

MIB提供百度统计的插件，便于分析页面数据，需要提前到百度统计这边创建站点，会自动生成js代码
使用提取工具提取token，并使用MIB提供的插件，代码示例：

```
    <mib-baidu-tj token="02890d4a309827eb62bc3335b2b28f7f"></mib-baidu-tj>
```

## mib-recommend

描述|推荐热词组件
----|----
可用性|稳定
示例|

### 说明

**mib-recommend**组件提供统一样式的相关推荐和新闻热点模块，需求方只需要根据规范在dom结构中加入组件即可。代码示例：

```
    <mib-recommend></mib-recommend>
    <div class="recommends">
        <div class="recommends-header">相关推荐</div>
    </div>
    <div class="hotpoint">
        <div class="hotpoint-header">新闻热点</div>
    </div>
```

## 组件扩展（暂未支持）

## 实验组件（暂未支持）

## MIB HTML规范

### 头部适用规范

- 起始标签使用`<!doctype html>`
- 标签必须(MUST)加上mib标记，如:`
- 必须(MUST)包含<head>和<body>标签
- 必须(MUST)在head标签中包含字符集申明：`<meta charset="utf-8">`，字符集统一为`utf-8`
- 必须(MUST)在head标签中包含viewport设置标签：`<meta name="viewport" content="width=device-width,minimum-scale=1">`，推荐(RECOMMENDED)包含`initial-scale=1`
- 必须(MUST)在head标签中包含`<script async src="https://m.baidu.com/mibhtml/v0.js"></script>`
- 必须(MUST)在head标签中包含`<style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>`

### 页面元素使用规范

在MIB HTML中，我们将禁止使用部分对页面性能以及安全有较大影响的标签，并将部分html标签做替换，使用mib的特有标签（例如标签会被标签代替）:

标签|使用范围
----|----
img|替换为mib-img标签
video|替换为mib-video
audio|替换为mib-audio
iframe|替换为mib-iframe
style|仅允许在head标签中的style标签中使用
svg|允许使用svg标签
button|允许使用
frame|禁止使用
frameset|禁止使用
object|禁止使用
param|禁止使用
applet|禁止使用
embed|禁止使用
form|禁止使用
input elements|禁止使用，包括：input,textareaa,select,option
link|不允许使用link标签进行样式表的加载
a|href属性不允许使用javascript:协议，使用时，跳转便签的target属性需要设置为`_blank`

## MIB验证错误 

# MIB 规范文档&校验list