# mip-img 图片

mip-img 用来支持在 mip 中增加图片内容。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|无

## 示例

### 最基本使用

```html
<mip-img
    layout="responsive" 
    width="350" 
    height="263"
    src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
</mip-img>
```

### 加全屏查看

```html
<mip-img
    layout="responsive" 
    width="350" 
    height="263" 
    popup
    src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
</mip-img>
```

### 其他布局（以fixed为例）

```html
<mip-img 
    layout="fixed-height" 
    height="263"
    alt="baidu mip img" 
    src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
</mip-img>
```

### 带图片标题

图片标题可添加在`<mip-img>`后用于说明，可在`<style mip-custom>`标签下自定义样式

```html
<mip-img 
    layout="responsive" 
    width="350" 
    height="263"
    popup 
    alt="baidu mip img" 
    src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
</mip-img>
<p class="mip-img-subtitle">带图片标题的类型</p>
```

## 属性

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

### src

说明：图片地址   
必选项：是   
格式：字符串  

### popup

说明：设置图片资源是否可以在被点击后弹出全屏浮层查看  
必选项：否   
取值：无  

### alt

说明：与img标签的alt属性相同   
必选项：否   

### class

说明：与img标签的class属性相同，用于标识元素，设置元素样式   
必选项：否   
