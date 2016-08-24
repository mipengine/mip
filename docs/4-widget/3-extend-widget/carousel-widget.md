# mip-carousel

mip-carousel 用来支持 mip 中图片的一种展示方式，支出多图轮播。

描述|用自定义的mip-carousel标签实现了子节点的轮播效果
----|----
可用性|稳定
支持布局| fixed-height

## 1. 使用

在MIP HTMl中，示例如下：

```
<mip-carousel autoplay defer="1000" width="400" height="300">
    <mip-img 
        class="mip-img" 
        popup 
        alt="baidu mip img" 
        src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
        <p class="mip-img-subtitle">带图片标题的类型</p>
    </mip-img>
    <mip-img 
        class="mip-img" 
        popup 
        alt="baidu mip img2" 
        src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
        <p class="mip-img-subtitle">带图片标题的类型2</p>
    </mip-img>
</mip-carousel>
```
## 2. 属性

轮播组件所涉及的属性有：自动轮播（autoplay），间隔时间（defer），宽度(width)和高度（height）

- **自动轮播(autoplay)**

    - 是否必填：否

    - 说明：如果需要自动轮播功能，可以加上`autoplay`属性，不需要带任何值，或者`autoplay="autoplay"`，其他写法均无效

- **间隔时间(defer)**

    - 是否必填：否

    - 说明：每次轮播的时间间隔，单位ms，如果设置了`autoplay`，可以添加`defer`来指定轮播的时间间隔，默认值2000

- **宽度(width)**

    - 是否必填：是

    - 说明：与高度属性配合来设置图片比例

- **高度（height）**

    - 是否必填：是

    - 说明：与宽度属性配合来设置图片比例

