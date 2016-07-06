# mip-carousel图片组件

描述|用自定义的mip-carousel标签实现了子节点的轮播效果
----|----
可用性|稳定
所需脚本|
支持布局| 
示例|

## 1. 使用

在MIP HTMl中，示例如下：

```
<mip-carousel autoplay defer="1000">
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

轮播组件所涉及的属性有：自动轮播（autoplay），间隔时间（defer）

- **自动轮播(autoplay)**

    - 是否必填：否

    - 说明：如果需要自动轮播功能，可以加上`autoplay`属性，不需要带任何值，或者`autoplay="autoplay"`，其他写法均无效

- **间隔时间(defer)**

    - 是否必填：否

    - 说明：每次轮播的时间间隔，单位ms，如果设置了`autoplay`，可以添加`defer`来指定轮播的时间间隔，默认值2000

## 3. 样式

mip-carousel暂时不支持css重写样式

## 4. 是否基础组件

是
