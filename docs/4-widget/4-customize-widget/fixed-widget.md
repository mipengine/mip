# mip-fixed

mip-fixed 用来支持 mip 中的悬浮元素整体使用方案。

描述|页面悬浮元素统一解决方案。
----|----
可用性|稳定
支持布局|不使用布局
所需脚本|https://mipcache.bdstatic.com/static/v1.2/mip-fixed.js

## 1. 使用

在MIP HTMl中，示例如下：

### 顶部悬浮（宽度默认100%，高度最多85像素）

```html
<mip-fixed type="top">
    自定义内容，可以嵌套其他组件
</mip-fixed>
```

### 底部悬浮（宽度默认100%，高度最多85像素）

```html
<mip-fixed type="bottom">
    自定义内容，可以嵌套其他组件
</mip-fixed>
```

### 左边悬浮（宽度不超过10%，高度不超过25%，属性 bottom 或 top 必须有一个）

```html
<mip-fixed type="left" bottom="50px">
    自定义内容，可以嵌套其他组件
</mip-fixed>
```

### 底部悬浮（宽度不超过10%，高度不超过25%，属性 bottom 或 top 必须有一个）

```html
<mip-fixed type="right" top="50px">
    自定义内容，可以嵌套其他组件
</mip-fixed>
```

## 组件所涉及的属性

- **悬浮类型（type)**

    - 是否必填：是

    - 取值：top/bottom/right/left


- **距离屏幕顶部距离（top)**

    - 是否必填: 否

    - 取值：数值+单位 —— 50（px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt）


- **距离屏幕底部距离（bottom)**

    - 是否必填: 否

    - 取值：数值+单位 —— 50（px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt）

## fixed 的类型说明

- type为top、bottom 类别不需要添加属性：top/bottom；

- type为left、right 类别需要至少添加一个top/bottom属性，优先用 bottom。

## 关闭悬浮元素方案

1、给 mip-fixed 标签添加一个自定义的 id：customid

2、给需要点击关闭悬浮元素的标签添加属性 on="tap:customid.close"

```html

<mip-fixed type="top" id="customid">
  <div>我是顶部的fixed</div>
  <div on="tap:customid.close">我是关闭按钮</div>
</mip-fixed>

```

## fixed 元素个数限制

    top <= 1

    bottom <= 1

    left + right <= 1
