# mip-iframe

mip-iframe 是用来支持在 mip 中嵌入第三方内容的一种方式，需要注意的是：所嵌入的内容强制是符合https协议的。

如您的网站还不支持https，可使用百度云加速或其他同类型服务，开通https.  
百度云加速开通步骤：http://su.baidu.com/zhuanti/mip

标题|内容
----|----
类型|通用
支持布局|responsive, fixed-height, fixed
所需脚本|无

## 示例

### 基本使用

```html
<mip-iframe
    allowfullscreen 
    src="https://www.mipengine.org/article/instant-pageview.html" 
    width="400"
    height="300" 
    allowtransparency="true">
</mip-iframe>
```

### 加布局（fixed-height为例）

```html
<mip-iframe
    layout="fixed-height" 
    src="https://www.mipengine.org/article/instant-pageview.html" 
    allowfullscreen
    width="400"
    height="300"
    allowtransparency="true">
</mip-iframe>
```

### 加srcdoc

```html
<mip-iframe
    allowfullscreen 
    srcdoc="
        <div>You say that you love rain,</div>
        <div>but you open your umbrella when it rains.</div>
        <div>You say that you love the sun,</div>
        <div>but you find a shadow spot when the sun shines.</div>
        <div>You say that you love the wind,</div>
        <div>but you close your windows when wind blows.</div>
        <div>This is why I am afraid,</div>
        <div>because you say that you love me too.</div> 
        "
    width="400"
    height="300"
    sandbox="" 
    allowtransparency="true">
</mip-iframe>
```

## 属性

### src  

说明：与原生iframe的`src`属性作用一致  
必选项：是  
类型：URL  
单位：无  
取值：必须要使用https地址  
默认值：无  

### width

说明：宽度，不是实际宽度，与高度属性配合来设置图片比例，详见[组件布局](https://www.mipengine.org/doc/3-widget/11-widget-layout.html)   
必选项：是   
类型：数字  
单位：无  
默认值：无

### height

说明：高度，不是实际高度，与宽度属性配合来设置图片比例，详见[组件布局](https://www.mipengine.org/doc/3-widget/11-widget-layout.html)  
必选项：是   
类型：数字    
单位：无  
默认值：无

### allowfullscreen

说明：与原生iframe的`allowfullscreen`属性作用一致   
必选项：否  
取值：空  
默认值：无  

### srcdoc

说明：与原生iframe的`srcdoc`属性作用一致   
必选项：否  
类型：HTML_code  
单位：无  
取值：要显示在 iframe 中的 HTML 内容。必需是有效的 HTML 语法。  
默认值：无  

### sandbox

说明：与原生iframe的`sandbox`属性作用一致  
必选项：否  
类型：字符串  
单位：无  
取值："", allow-same-origin,allow-top-navigation,allow-forms,allow-script  
默认值：无  

### allowtransparency

说明：与原生iframe的`allowtransparency`属性作用一致  
必选项：否  
类型：字符串  
单位：无  
取值："",true,false  
默认值：无  
