# 组件布局

MIP 组件支持的各种布局，可以让图片屏幕自适应、定高等。让我们看看下面的详细说明。

## 支持的布局种类

类别|强制 width|强制 height|详细说明
---|---|---|---
responsive|是|是|能够根据width、height的值，算出元素对应的比例，在不同屏幕宽度上做自适应，非常适合图片、视频等需要大小自适应的组件
fixed-height|否|是|元素的高度固定,width缺省或者取值为auto，比较适合 [mip-carousel](https://www.mipengine.org/doc/4-widget/3-extend-widget/carousel-widget.html)
fill|否|否|元素的大小根据父节点的大小自动撑开
container|否|否|元素的大小由他们的子节点大小决定,类似 html 的 div
nodisplay|否|否|元素不展现，即 display 为 none；这种元素可应用于：他自身展现依赖用户的点击等行为的触发
fixed|是|是|元素根据 width 和 height 固定高宽，不随 media 变化

## 使用

MIP 元素添加属性 layout，取值参照上面的种类

```
    <mip-img 
        layout="responsive" 
        width="350" 
        height="263" 
        popup="" 
        alt="baidu mip img" 
        src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
    </mip-img>
```

## layout 属性缺省规则

width|height|其他属性|默认布局
---|---|---|---
有|有|无|fixed
有|有|存在sizes 参数|responsive
无或取值为 auto|有|无|fixed-height
无|无|无|container
