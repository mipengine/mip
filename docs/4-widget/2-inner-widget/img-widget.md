# mip-img

mip-img 用来支持在 mip 中增加图片内容。

该图片组件支持在文本中插入一张图片，也支持插入多张图片。插入的图片不限定大小，自动生成按照屏幕尺寸缩放的缩略图，点击缩略图可以查看原图。

描述|用自定义的mip-img标签封装了html原生img标签
----|----
可用性|稳定
支持布局| responsive, fixed-height, fixed, container

## 1. 使用

在MIP HTMl中，用来替代img标签，示例如下：

```
<mip-img 
    class="mip-img" 
    popup 
    alt="baidu mip img" 
    src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
    <p class="mip-img-subtitle">带图片标题的类型</p>
</mip-img>
```
## 2. 属性

图片组件所涉及的属性有：图片地址（src），popup（弹层查看图片），文案（alt）以及类（class）

- **图片地址（src）**

    - 是否必填：是

    - 说明：与img标签的src属性相同。值必须是一个url。同时，我们建议url的图片是可被浏览器缓存的，这样可以提高用户的访问速度。

- **弹层开关（popup）**

    - 是否必填：否

    - 说明：设置图片资源是否可以在被点击后弹出全屏浮层查看，可选使用。当添加此属性时，图片可在被点击后全屏查看。

- **文案（alt）**

    - 是否必填：否

    - 说明：与img标签的alt属性相同。

- **类（class）**

    - 是否必填：否

    - 说明：与img标签的class属性相同，用于标识元素，设置元素样式。
