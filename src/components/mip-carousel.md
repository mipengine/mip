# mip-carousel 多图轮播

`<mip-carousel>` 用来支持 MIP 中图片的一种展示方式，支持多图轮播。

标题|内容
----|----
类型|通用
支持布局|fixed-height,responsive
所需脚本|无

## 示例

### responsive 布局

```html
<mip-carousel 
    layout="responsive" 
    width="600" 
    height="400">
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_01.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_02.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
```

### 自动轮播

```html
<mip-carousel
    autoplay  
    layout="responsive" 
    width="600" 
    height="400">
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_01.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_02.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
```

### 设置轮播时间间隔

```html
<mip-carousel
    autoplay
    defer="1000"  
    layout="responsive" 
    width="600" 
    height="400">
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_01.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_02.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
```

### 加数字指示器

```html
<mip-carousel
    autoplay
    defer="1000"  
    layout="responsive" 
    width="600" 
    height="400"
    indicator
    >
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_01.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_02.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
```

### 加下方指示器

```html
<mip-carousel
    autoplay
    defer="1000"  
    layout="responsive" 
    width="600" 
    height="400"
    indicator
    indicatorId="mip-carousel-example"
    >
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_01.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_02.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
<div class="mip-carousel-indicator-wrapper">
    <div class="mip-carousel-indicatorDot" id="mip-carousel-example">
        <div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>
        <div class="mip-carousel-indecator-item"></div>
        <div class="mip-carousel-indecator-item"></div>
    </div>
</div>
```

### 加翻页按钮

```html
<mip-carousel
    defer="1000"  
    layout="responsive" 
    width="600" 
    height="400"
    indicator
    buttonController
    >
   <mip-img 
        src="https://www.mipengine.org/static/img/sample_01.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_02.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
```

### 加副标题

```html
<mip-carousel
    autoplay
    defer="1000"  
    layout="responsive" 
    width="600" 
    height="400"
    indicator
    buttonController
    >
    <a target="_blank" href="http://wenda.tianya.cn/m/question/1almfj0foas94gc7vtoq6ejbfbmdk3e78ehaa">
        <mip-img 
            src="https://www.mipengine.org/static/img/sample_01.jpg" layout="responsive" 
        width="600" 
        height="400">
        </mip-img>
        <div class="mip-carousle-subtitle">这里是title2</div>
    </a>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_02.jpg">
    </mip-img>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
```

### 点击图片跳转

非 `<mip-carousel>` 直接子级元素的 `<mip-img>` 节点需要设置 `width` 和 `height` 属性。

```html
<mip-carousel
    autoplay
    defer="1000" 
    layout="responsive" 
    width="600" 
    height="400">
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_01.jpg">
    </mip-img>
    <a target="_blank" href="http://wenda.tianya.cn/m/question/1almfj0foas94gc7vtoq6ejbfbmdk3e78ehaa">
        <mip-img 
            src="https://www.mipengine.org/static/img/sample_02.jpg" width="600" height="400">
        </mip-img>
    </a>
    <mip-img 
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
```

## 属性

### width

说明：宽度，不是实际宽度，与高度属性配合来设置图片比例，详见[组件布局](/doc/3-widget/11-widget-layout.html)   
必选项：是   
类型：数字  
单位：无  
默认值：无

### height

说明：高度，不是实际高度，与宽度属性配合来设置图片比例，详见[组件布局](/doc/3-widget/11-widget-layout.html)  
必选项：是   
类型：数字    
单位：无  
默认值：无

### autoplay

说明：自动轮播开关  
必选项：否  
类型：字符串或空  
取值："", `autoplay`  
单位：无  
默认值：无  

### defer

说明：每次轮播的时间间隔，如果设置了 `autoplay`，可以添加 `defer` 来指定轮播的时间间隔  
必选项：否  
类型：数字  
单位：ms  
默认值：2000

### indicatorId 

说明：下方指示器功能字段，和指示器的父节点的 `id` 取值请保持一致，指示器的个数和轮播的 `item` 个数必须保持一致，指示器这块对 `id` 是强依赖，样式可以自行修改，示例中是官方默认样式，指示器可点击定位。  
必选项：否  
类型：字符串  
单位：无  
默认值：无
