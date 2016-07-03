# mip-ad广告组件

描述|提供了一个广告容器用来显示广告，目前只支持https的广告
----|----
可用性|稳定
所需脚本|mip-ad.js
支持布局|banner, noneImg, oneImg, moreImg 
示例|  // 连接待定

## 1. 使用

```
- banner
<mip-ad 
    tpl="banner" 
    src="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    data-img="//m.baidu.com/static/search/ala/ad_1.png" >
</mip-ad>

- 无图
<mip-ad 
    tpl="noneImg" 
    src="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    data-img="//m.baidu.com/static/search/ala/ad_1.png" >
</mip-ad>

- 单图
<mip-ad 
    tpl="oneImg" 
    src="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    data-img="//m.baidu.com/static/search/ala/ad_1.png" >
</mip-ad>

-多图
<mip-ad 
    tpl="moreImg" 
    src="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    data-img="//m.baidu.com/static/search/ala/ad_1.png" >
</mip-ad>
```
## 2. 属性

- **tpl**

    广告类型（无图，单图，多图，目前只有单图类型）

- **src**

    跳转地址

- **data-size**

    图片大小

- **data-img**

    图片地址