# 类型: ad-baidu

网盟广告。

## 支持布局

- fixed-height
- fixed

## 示例

在MIP HTMl中，示例如下：

```
- 定制广告

<mip-embed 
    layout="fixed"
    width="414"
    height="157" 
    type="ad-baidu" cproid="u1908671" class="mip-element mip-layout-container">
    <script type="application/json">
    {
        "at": "3",
        "hn": "0",
        "wn": "0",
        "imgRadio": "1.7",
        "scale": "20.6",
        "pat": "6",
        "tn": "template_inlay_all_mobile_lu_native",
        "rss1": "#FFFFFF",
        "adp": "1",
        "ptt": "0",
        "titFF": "%E",
        "rss2": "#FFFFFF",
        "titSU": "0",
        "ptbg": "70",
        "ptp": "1"
    }
    </script>
</mip-embed>

- P.S.: 需要注意的是，定制广告的 script 标签中的参数必须带双引号，也就是说 script 标签中的数据必须是 json 格式的

- 非定制

<div class="mip-adbd">
    <mip-ad
    	layout="fixed"
        width="414"
        height="80" 
        type="ad-baidu" 
        cproid="u2697398">
    </mip-ad>
</div>
```
## 属性

组件所涉及的属性有：广告类型（type）和 网盟广告id（cproid)

- **广告类型（type）**
    
    - 是否必填：是

    - 说明：广告类型（ad-comm/通用广告，ad-baidu/网盟广告）

- ** 网盟广告id（cproid)**

    - 是否必填：是

    - 说明：网盟广告id。


