# mip-anim

mip-anim 用来支持在 mip中gif图的使用

描述|提供了一个mip中gif图的使用.
----|----
可用性|完成
支持布局| responsive, fixed-height, fixed, container
所需脚本|https://mipcache.bdstatic.com/static/v1.2/mip-anim.js

## 1. 使用

在MIP HTMl中，示例如下：

带placeholder的加载方式

```
<mip-anim 
    layout="fixed" 
    width=210
    height=210
    src="xxx"
    alt="an animation">
       <mip-img
            layout="fixed-height"
            width=210
            height=210
            src="xxxx">
        </mip-img>
</mip-anim>
```

只有gif图
```
<mip-anim 
    layout="fixed" 
    width=210
    height=210
    src="xxx"
    alt="an animation">
</mip-anim>
```

## 2. 属性

组件所涉及的属性有：图片（src）

- ** 图片（src）**

    - 是否必填：是

    - 说明：图片路径。

