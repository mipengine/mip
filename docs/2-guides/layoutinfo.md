# 布局

MIP 组件支持的各种布局，可以让图片屏幕自适应、定高等。让我们看看下面的详细说明。

## 支持的布局种类

<table style="text-align: center; width: 800px; font-size: 14px; color: #2f5f7c">
    <tr style="font-size: 18px;  line-height: 40px; background-color: #e1eec3; color: #273738;">
        <td>类别</td>
        <td>是否需要属性width/height</td>
        <td colspan="3">详细说明</td>
    </tr>
    <tr style="line-height: 30px;">
        <td>responsive</td>
        <td>需要</td>
        <td  colspan="3" style="text-align: left;">能够根据width、height的值，算出元素对应的比例，在不同屏幕宽度上做自适应，非常适合图片、视频等需要大小自适应的组件</td>
    </tr>
    <tr style="line-height: 30px;">
        <td>fixed-height</td>
        <td>仅需要高度</td>
        <td  colspan="3" style="text-align: left;"> 元素的高度固定,width缺省或者取值为auto，比较适合 [mip-carousel](https://www.mipengine.org/doc/4-widget/3-extend-widget/carousel-widget.html)</td>
    </tr>
    <tr style="line-height: 30px;">
        <td>fill</td>
        <td>不需要</td>
        <td  colspan="3" style="text-align: left;"> 元素的大小根据父节点的大小自动撑开 </td>
    </tr>
    <tr style="line-height: 30px;">
        <td>container</td>
        <td>不需要</td>
        <td  colspan="3" style="text-align: left;"> 元素的大小由他们的子节点大小决定,类似 html 的 div </td>
    </tr>
    <tr style="line-height: 30px;">
        <td>nodisplay</td>
        <td>不需要</td>
        <td  colspan="3" style="text-align: left;"> 元素不展现，即 display 为 none；这种元素可应用于：他自身展现依赖用户的点击等行为的触发 </td>
    </tr>
    <tr style="line-height: 30px;">
        <td>fixed</td>
        <td>需要</td>
        <td  colspan="3" style="text-align: left;"> 元素根据 width 和 height 固定高宽，不随 media 变化 </td>
    </tr>
</table>

## 怎么使用

MIP 元素添加属性 layout，取值参照上面的种类

```
<mip-img layout="responsive" width="350" height="263" popup="" alt="baidu mip img" src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg"></mip-img>
```

## 如果 layout 缺省怎么识别

规则如下：

只有 width 和 height：默认fixed

有 width 和 height，同时存在 sizes 参数：默认 responsive

height 存在，width 缺失或者取值为 auto：默认 fixed-height

height、width 都不存在：默认 container


