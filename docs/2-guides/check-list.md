# MIP 校验规则

MIP页面会有严格的规范校验，不允许存在任何校验不通过的问题存在，本文档意在帮助开发者找到校验的内容和规则，快速定位校验不通过的原因

## MIP HTML 标签和属性错误

### 1. 缺少强制性标签

|提示|MANDATORY_TAG_MISSING|
|---|---|
|错误说明|"The mandatory tag '%1' is missing or incorrect."|
|错误说明|强制性标签'xxx'缺失或错误|
|修复方法|添加（或者更正）强制性html标签|

在MIP HTML中，强制性标签包括：

|说明|备注|
|---|---|
|&lt;!doctype html&gt; | 大小写均可|
|&lt;html mip&gt; |强制小写|
|&lt;head&gt; |强制小写|
|&lt;meta charset="utf-8"&gt; |utf-8不区分大小写，无单引号或者双引号限制|
|&lt;meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"&gt; |强制小写，无单引号或者双引号限制|
|&lt; link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/mipmain-v0.0.1.css" &gt; |强制小写，无单引号或者双引号限制，v0.0.1会根据版本不同而不同|
|&lt;script src="https://mipcache.bdstatic.com/static/mipmain-v1.0.0.js" &gt;&lt;/script &gt; |强制小写，无单引号或者双引号限制，v0.0.1会根据版本不同而不同|
|&lt;body&gt; |强制小写|
|&lt;link rel="standardhtml" href="xxx"&gt; |强制小写|

### 2. 禁用标签

|提示|DISALLOWED_TAG|	 
|---|---|
|错误说明|"The tag '%1' is disallowed."|
|错误说明|禁止使用'xx'标签|
|修复方法|删除禁用标签|

目前mip中标签使用规则：

禁止使用标签有：

- frame	 
- frameset	 
- object
- param	 
- applet
- embed
- form
- input
- textarea
- select
- option

如果有如下标签需要进行替换

标签|替换后标签
----|----
img|mip-img
video|mip-video（暂未开放）
audio|mip-audio（暂未开放）

其他说明：

- style：仅允许在head标签中的style标签中使用
- script：仅允许外链 MIP 所需要的js脚本，或type是application/ld+json的情况

<font color="red">
-**注意**：

1. 可以把img/video/audio/iframe视为禁用标签

</font>

### 3. 无效属性值

|提示|INVALID_ATTR_VALUE|
|---|---|
|错误说明|"The attribute '%1' in tag '%2' is set to the invalid value '%3'."|
|错误说明|标签'xx'中的属性'xx'的属性值'xx'无效|
|修复方法|修改为有效属性值|

当html标签有属性值不正确的时候，会报这个错误。mip中需要注意的有：

- a：href属性不允许使用javascript:协议，

- a：target属性需要设置为`_blank`

- mip-img
    - src：必须是一个url

- mip-pix
    - src：必须是一个支持https的地址url，
    - 如果不支持https适用百度提供的https代理，url中带t={TIME}&title={TITLE}&host={HOST}&from=baidu"

- 其他html基本页面属性规范不变

<font color="red">

**注意**：

1. MIP HTML中的url强制是https的<br>

2. a:<br>
    - `<a href="javascript:xxx()"></a>` 错<br>
    - `<a href="xxx" target="_blank"></a>` 对

</font>

### 4. 属性值的无效值

|提示|INVALID_PROPERTY_VALUE_IN_ATTR_VALUE|
|---|---|
|错误说明|"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."|
|错误说明|标签'xx'中存在属性'yy','yy'中存在属性'zz'，属性'zz'的属性值'aa'无效|
|修复方法|更正无效属性值|

可能出现属性值的无效值的情况：

- `<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">`
    - width的属性值device-width
    - minimum-scale的属性值1
    - initial-scale的属性值1

- `<script type="application/ld+json"></script>`

- `<script type="application/json"></script>`

    - 除了外链 MIP 所需 js，script标签的type的属性值应该为application/ld+json

<font color="red">

**注意**：

1. 除上述给出的值外均为无效值

</font>

### 5. 缺少强制性属性

|提示|MANDATORY_ONEOF_ATTR_MISSING|
|---|---|
|错误说明|"The tag '%1' is missing a mandatory attribute - pick one of %2."|
|错误说明|标签'xx'的强制性属性'xx'缺失|
|修复方法|添加正确是属性|

mip html中具有强制性属性的标签及其强制性属性有：

- mip-img
    - src
- mip-pix
    - src

### 6. 直接父标签错误

|提示|WRONG_PARENT_TAG|
|---|---|
|错误说明|"The parent tag of tag '%1' is '%2', but it can only be '%3'."|
|错误说明|标签'a'的直接父标签应该是'b'，而不是'c'|
|修复方法|添加所需的父标签|

有一些标签有制定的直接父标签，如下示例给出了每个标签必须的直接父标签：

- **!doctype** 的直接父标签是 **root**
- **head** 的直接父标签是 **html**
- **body** 的直接父标签是 **html**
- **link** 的直接父标签是 **head**
- **meta** 的直接父标签是 **head**
- **style mip-custom** 的直接父标签是 **head**
- **style** 的直接父标签是 **boilerplate**

### 7. 非法父级标签

|提示|DISALLOWED_TAG_ANCESTOR|
|---|---|
|错误说明|"The tag '%1' may not appear as a descendant of tag '%2'."|
|错误说明|标签'a'不应该是标签'b'的子标签|
|修复方法|删除非法嵌套标签|

如：

- `<body>`的子标签写在了`<head>`中

### 8. 强制父级标签

|提示|MANDATORY_TAG_ANCESTOR|
|---|---|
|错误说明|"The tag '%1' may only appear as a descendant of tag '%2'."|
|错误说明|M标签'a'只能是标签'b'的子级标签|
|修复方法|删除标签或者给标签添加正确的父级标签|

- img 必须是noscript的子级标签
- video 必须是noscript的子级标签
- audio 必须是noscript的子级标签
- noscript必须是body的子级标签

### 9. 唯一标签重复
|提示|DUPLICATE_UNIQUE_TAG|
|---|---|
|错误说明|"The tag '%1' appears more than once in the document."|
|错误说明|标签'xx'只能出现一次|
|修复方法|删除多余的标签|

一份html中，有的标签具有唯一性，也就是说只能出现一次，当html中有重复的唯一标签的时候，应该报错。

以下是唯一标签列表：

- `<doctype html>`
- `<html mip>`
- `<head>`
- `<link rel="standardhtml" href=...>`
- `<link rel="miphtml" href=...>`
- `<meta charset="utf-8">`
- `<meta viewport>`
- `<style mip-custom>`
- `<body>`
