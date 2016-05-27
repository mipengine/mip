# MIB API说明 

## mib-img图片组件

描述|用自定义的mib-img标签封装了html原生img标签
----|----
可用性|稳定
所需脚本|
支持布局| 
示例|

### 1. 使用

```
<mib-img data-carousel="carousel" class="mib-element mib-img" src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
    <p class="mib-img-subtitle">带图片标题的类型</p>
</mib-img>
```
### 2. 属性

- **src**

    与img标签的src属性相同。值必须是一个url。同时，我们建议url的图片是可被浏览器缓存的，这样可以提高用户的访问速度。

- **data-carousel**

    设置图片资源是否可被轮播，可选使用。当添加此属性并设置值为carousel时，图片可在页面中轮播。

- **alt**

    与img标签的alt属性相同。

- **class**

    与img标签的class属性相同，用于标识元素，设置元素样式。

除了上述属性外，mib-img还自带图片名字的设置，写在mib-img-subtitle中即可。

### 3. 样式

mib-img暂时不支持css重写样式

### 4. 验证（赞不支持）

### 5. 是否基础组件

**是**

## mib-pix通用统计组件

描述|用通用https代理组件
----|----
可用性|稳定
示例|

### 1. 使用

接入方提供一个接收请求的服务地址，例如：//yourselfdomain/mib/tj.gif，如果服务地址不支持HTTPS，可以使用百度提供的HTTPS代理服务使用MIB提供的插件，向服务地址定向发送请求。如：

```
    <mib-pix src="//yourselfdomain/miburl/tj.gif?t={TIME}&title={TITLE}&host={HOST}&from=baidu"></mib-pix>
```

MIB会自动匹配参数，生成请求地址，例如：//yourselfdomain/miburl/tj.gif?t=1459415529464&title=MIB_PIX_DEMO&host=mib.bdstatic.com&from=baidu

- 目前支持的参数: {TIME}，{TITLE}，{HOST}

### 2. 属性

- **src**

	资源方服务地址
	
### 3. 是否基础组件

**是**
	
## mib-baidu-tj百度统计组件
    
描述|百度统计组件，用于统计页面数据
----|----
可用性|稳定
示例|

### 1. 使用

MIB提供百度统计的插件，便于分析页面数据，需要提前到百度统计这边创建站点，会自动生成js代码
使用提取工具提取token，并使用MIB提供的插件，代码示例：

```
    <mib-baidu-tj token="02890d4a309827eb62bc3335b2b28f7f"></mib-baidu-tj>
```

### 2. 属性

- **token**

	通过提取工具提取的token值
	
### 3. 是否基础组件

**是**

## mib-ad广告组件

描述|提供了一个广告容器用来显示广告，目前只支持https的广告
----|----
可用性|稳定
支持布局| 
示例|

### 1. 使用

```
<mib-ad tpl="onlyImg" src="//m.baidu.com/s?word=百度" data-size="1242 180" data-img="//m.baidu.com/static/search/ala/ad_1.png" class="mib-element"><a href="//m.baidu.com/s?word=百度">
```
### 2. 属性

- **tpl**

    广告类型（无图，单图，多图，目前只有单图类型）

- **src**

    跳转地址

- **data-size**

    图片大小

- **data-img**

    图片地址
    
### 3. 是否基础组件

**否**


## mib-recommend推荐和热词组件

描述|推荐热词组件
----|----
可用性|稳定
示例|

### 1. 使用

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
### 2. 属性

暂无

### 3. 是否基础组件

**否**

## 组件扩展（暂未支持）

## 实验组件（暂未支持）

# MIB 规范文档&校验list