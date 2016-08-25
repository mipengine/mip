# demo示例

## 引入css样式

&lt; link type="text/css" rel="stylesheet" href="https://mipcache.bdstatic.com/static/mipmain-v0.0.1.css" &gt;

## 引入js组件（已包含jq、amd）

&lt;script src="https://mipcache.bdstatic.com/static/mipmain-v1.0.0.js" &gt;&lt;/script&gt;

## 一个完整的例子

```
<!DOCTYPE html>
<html mip>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <title>MIP DEMO</title>
    <link rel="stylesheet" href="https://mipcache.bdstatic.com/static/mipmain-v1.0.0.css">
    <!-- 在standard html中添加 -->
    <link rel="miphtml" href="页面h5 url">
    <!-- 在mip html中添加 -->
    <link rel="standardhtml" href="页面h5 url">
    <noscript>
        <style mip-officialrelease>
            body {
                -webkit-animation:none;
                   -moz-animation:none;
                    -ms-animation:none;
                        animation:none
            }
        </style>
    </noscript>
</head>
<body>
    <p class="mip-text">这是一个段落，纯文本形式</p>
    <div class="mip-img-container">
        <mip-img data-carousel="carousel" class="mip-element mip-img" src="//m.baidu.com/static/index/plus/plus_logo.png"></mip-img>
    </div>
    <div class="mip-img-container">
        <mip-img data-carousel="carousel" class="mip-element mip-img" src="//m.baidu.com/static/index/plus/plus_logo.png">
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
    <div class="adv">
        <mip-embed type="ad-comm" tpl="onlyImg" href="//m.baidu.com/s?word=百度" data-size="1242 180" src="//m.baidu.com/static/search/ala/ad_1.png">
        </mip-embed>
    </div>
    <div class="mip-adbd">
      <mip-embed type="ad-baidu" cproid="u2697394"></mip-embed>
    </div>

    

<script src="https://mipcache.bdstatic.com/static/mipmain-v1.0.0.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1.0/mip-ad.js"></script>
</body>
</html>
```

其中，`p.mip-img-subtitle`是可选的，表示图片的信息

## 插入文本

对应mip规范中的纯文本，和后面的`mip-html`兼容

* 基本使用

```
<p class="mip-text">我是一段文本</p>
```

## 自定义样式

为了满足个性化需求，`mip-html`的方式承接所有需要自定义的标签 & 样式。封装了常用的文本对齐、文本加粗、背景、字号、有序列表、无序列表、引用、下划线等

* 基本使用

```
<div class="mip-html">
    // 自定义的内容
</div>
```

注：所有用户的自定义内容都必须在`.mip-html`中

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
