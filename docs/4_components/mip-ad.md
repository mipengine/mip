# mip-ad基础广告组件

描述|提供了一个广告容器用来显示广告，目前只支持https的广告
----|----
可用性|稳定
所需脚本|mip-ad.js
支持布局|banner, 无图, 单图, 多图 
示例|  // 连接待定

## 1. 使用

基础广告组件有四种样式，四种样式通过tpl参数进行区分，分别是：banner（onlyImg），无图（noneImg），单图（oneImg），多图（moreImg），下面是组件的使用代码示例：

```
- banner
<mip-ad 
    tpl="onlyImg" 
    src="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    data-img="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>

- 无图
<mip-ad 
    tpl="noneImg" 
    src="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    data-img="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>

- 单图
<mip-ad 
    tpl="oneImg" 
    src="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    data-img="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>

-多图
<mip-ad 
    tpl="moreImg" 
    src="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    data-img="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>
```

## 2. 属性

基础广告组件所涉及的属性有：类型（tpl），跳转地址（src），图片大小（data-size）以及图片地址（data-img）

- **广告类型（tpl）**
    
    - 是否必填：是

    - 说明：广告类型（banner，无图，单图，多图）

- **跳转地址（src）**

    - 是否必填：是

    - 说明：跳转地址

- **图片大小（data-size）**

    - 是否必填：否（广告类型为banner时，必填）

    - 说明：图片大小, 用来设定图片的宽高比，只在banner类型下适用，其他类型所需图片固定比例

- **图片地址（data-img）**

    - 是否必填：是

    - 说明：图片地址，在多图类型下，多张图片的地址用半角分号分隔开

## 3. 样式

不支持样式重写

## 4. 验证

赞不支持

## 5. 是否基础组件

否

