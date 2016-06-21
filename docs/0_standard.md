# MIP HTML规范

### 头部适用规范

- 起始标签使用`<!doctype html>`
- 标签必须(MUST)加上mip标记，如:`
- 必须(MUST)包含<head>和<body>标签
- 必须(MUST)在head标签中包含字符集申明：`<meta charset="utf-8">`，字符集统一为`utf-8`
- 必须(MUST)在head标签中包含viewport设置标签：`<meta name="viewport" content="width=device-width,minimum-scale=1">`，推荐(RECOMMENDED)包含`initial-scale=1`
- 必须(MUST)在head标签中包含`<script async src="https://m.baidu.com/miphtml/v0.js"></script>`
- 必须(MUST)在head标签中包含`<style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>`

### 页面元素使用规范

在MIP HTML中，我们将禁止使用部分对页面性能以及安全有较大影响的标签，并将部分html标签做替换，使用mip的特有标签（例如标签会被标签代替）:

标签|使用范围
----|----
img|替换为mip-img标签
video|替换为mip-video
audio|替换为mip-audio
iframe|替换为mip-iframe
style|仅允许在head标签中的style标签中使用
svg|允许使用svg标签
button|允许使用
frame|禁止使用
frameset|禁止使用
object|禁止使用
param|禁止使用
applet|禁止使用
embed|禁止使用
form|禁止使用
input elements|禁止使用，包括：input,textareaa,select,option
link|不允许使用link标签进行样式表的加载
a|href属性不允许使用javascript:协议，使用时，跳转便签的target属性需要设置为`_blank`

## MIP验证（暂未支持）

