# mip-img图片组件

描述|用自定义的mip-img标签封装了html原生img标签
----|----
可用性|稳定
所需脚本|
支持布局| 
示例|

## 1. 使用

在MIP HTMl中，用来替代img标签，示例如下：

```
<mip-img 
    data-carousel="carousel" 
    class="mip-img" 
    src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
    <p class="mip-img-subtitle">带图片标题的类型</p>
</mip-img>
```
## 2. 属性

图片组件所涉及的属性有：图片地址（src），轮播开关（data-carousel），文案（alt）以及类（class）

- **图片地址（src）**

    - 是否必填：是

    - 说明：与img标签的src属性相同。值必须是一个url。同时，我们建议url的图片是可被浏览器缓存的，这样可以提高用户的访问速度。

- **轮播开关（data-carousel）**

    - 是否必填：是

    - 说明：设置图片资源是否可被轮播，可选使用。当添加此属性并设置值为carousel时，图片可在页面中轮播。

- **文案（alt）**

    - 是否必填：否

    - 说明：与img标签的alt属性相同。

- **类（class）**

    - 是否必填：否

    - 说明：与img标签的class属性相同，用于标识元素，设置元素样式。

除了上述属性外，mip-img还自带图片名字的设置，写在mip-img-subtitle中即可。

## 3. 样式

mip-img暂时不支持css重写样式

## 4. 验证

赞不支持

## 5. 是否基础组件

是
