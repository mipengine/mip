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