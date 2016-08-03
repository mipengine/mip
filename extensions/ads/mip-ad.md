# mip-ad

mip-ad 用来支持站长添加网页内自定义广告，主要包括连接、图文，多图，banner四种形式，这类广告可以制定大小也可以被用户关闭。

描述|提供了一个广告容器用来显示广告，目前只支持https的广告
----|----
可用性|稳定
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-ad.js#
支持布局|noneImg, 无图, 单图, 多图 
示例|官网上线后增加示例

## 1. 使用

基础广告组件有四种样式，四种样式通过tpl参数进行区分，分别是：banner（onlyImg），无图（noneImg），单图（oneImg），多图（moreImg），下面是组件的使用代码示例：

```
- banner
<mip-ad 
    type="ad-comm"
    tpl="onlyImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>

- 无图
<mip-ad 
    type="ad-comm"
    tpl="noneImg" 
    href="//m.baidu.com/s?word=百度" 
    data-title="广告标题">
</mip-ad>

- 单图
<mip-ad 
    type="ad-comm"
    tpl="oneImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2357051511,2286288825&fm=11&gp=0.jpg" 
    data-title="广告标题">
</mip-ad>

-多图
<mip-ad 
    type="ad-comm"
    tpl="moreImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4009078664,3186400936&fm=111&gp=0.jpg;https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=521986262,2379149184&fm=21&gp=0.jpg;https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=195400779,4163278668&fm=21&gp=0.jpg" 
    data-ads="这里是广告摘要;这里是广告摘要" 
    data-txt="这里是图片标题;这里是图片标题;这里是图片标题啊啊啊"
    data-title="这里是广告标题这里是广告标题标">
</mip-ad>
```

## 2. 属性

基础广告组件所涉及的属性有：广告类型（type），展示类型（tpl），跳转地址（href），图片大小（data-size），图片地址（src），广告标题（data-title），广告子标题（data-txt）以及广告摘要（data-ads）

- **广告类型（type）**
    
    - 是否必填：是

    - 说明：广告类型（ad-comm/通用广告，ad-baidu/网盟广告）

- **广告类型（tpl）**
    
    - 是否必填：是

    - 说明：展示类型（banner，无图，单图，多图）

- **跳转地址（href）**

    - 是否必填：是

    - 说明：跳转地址

- **图片地址（src）**

    - 是否必填：是，（无图）否

    - 说明：图片地址，在多图类型下，多张图片的地址用半角分号(;)分隔开

- **图片大小（data-size）**

    - 是否必填：否（广告类型为banner时，必填）

    - 说明：图片大小, 用来设定图片的宽高比，在有图片的情况下需要设置

- **广告标题（data-title）**

    - 是否必填：（banner，多图）否；（无图，单图）是

    - 说明：广告标题，可设置为广告描述

- **广告子标题（data-txt）**
    
    - 是否必填：否

    - 说明：广告子标题，多图时可用

- **广告摘要（data-ads）**

	- 是否必填：否

    - 说明：广告摘要，多图时可用

