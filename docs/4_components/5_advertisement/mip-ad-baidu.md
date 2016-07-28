# mip-ad-baidu

mip-ad-baidu 用来支持在 mip 中添加网盟广告。

描述|提供了一个广告容器用来显示网盟广告
----|----
可用性|稳定
支持布局| 响应式
示例|官网上线后增加示例
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-ad.js#

## 1. 使用

在MIP HTMl中，示例如下：

```
<div class="mip-adbd">
    <mip-ad 
        type="ad-baidu" 
        cproid="u2697398">
    </mip-ad>
</div>
```
## 2. 属性

组件所涉及的属性有：广告类型（type）和 网盟广告id（cproid)

- **广告类型（type）**
    
    - 是否必填：是

    - 说明：广告类型（ad-comm/通用广告，ad-baidu/网盟广告）

- ** 网盟广告id（cproid)**

    - 是否必填：是

    - 说明：网盟广告id。


