# MIP 校验list

## MIP HTML 标签和属性错误

### 1. 缺少强制性标签

|提示|MANDATORY_TAG_MISSING|
|---|---|
|错误说明|"The mandatory tag '%1' is missing or incorrect."|
|修复方法|添加（或者更正）强制性html标签|

在MIP HTML中，强制性标签包括：

- `<!doctype html>`
- `<html mip>`
- `<head>`
- `<meta charset="utf-8">`
- `<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">`
- `<script async src="https://m.baidu.com/miphtml/v0.js"></script>`
- `<body>`

### 2. 缺少引用文件

|提示|TAG_REQUIRED_BY_MISSING|
|---|---|
|错误说明|"The '%1' tag is missing or incorrect, but required by '%2'."|
|修复方法|添加（或者更正）正确的引用文件|

当MIP dom中用了一个mip扩展组件，却没有引用这个组件所需要的js文件，校验器就会报`TAG_REQUIRED_BY_MISSING`的异常。

在MIP dom中，扩展组件被看做页面的自定义元素而引入，当碰到上述问题的时候，可以提供一个连接，跳转到组件的使用说明页面， 将所需要的js文件拷过来即可。

### 3. 禁用标签

|提示|DISALLOWED_TAG|
|---|---|
|错误说明|"The tag '%1' is disallowed."|
|修复方法|删除禁用标签|

够建一个白名单，所有不在白名单中的标签一律不允许使用

### 4. 无效属性值

|提示|INVALID_ATTR_VALUE|
|---|---|
|错误说明|"The attribute '%1' in tag '%2' is set to the invalid value '%3'."|
|修复方法|修改为有效属性值|

当html标签有属性值不正确的时候，会报这个错误。例如，当url地址不符合规范的时候，就会报这个错。url规范可以参考<a href="http://www.w3schools.com/tags/att_a_href.asp" target="_blank">w3cschool规范参考</a> 

**注意：** MIP HTML中的url强制是https的

### 5. 禁用属性

|提示|DISALLOWED_ATTR|
|---|---|
|错误说明|"The attribute '%1' may not appear in tag '%2'."|
|修复方法|删除禁用属性|

### 6. 缺失强制性文本/强制性文本错误

|提示|MANDATORY_CDATA_MISSING_OR_INCORRECT|
|---|---|
|错误说明|"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."|
|修复方法|添加（更正）强制性文本|

### 7. 标签中存在非法文本

|提示|CDATA_VIOLATES_BLACKLIST|
|---|---|
|错误说明|"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."|
|修复方法|删除非法文本|

### 8. 标签中存在非法属性

|提示|DISALLOWED_PROPERTY_IN_ATTR_VALUE|
|---|---|
|错误说明|"The property '%1' in attribute '%2' in tag '%3' is disallowed."|
|修复方法|删除非法属性|

### 9. 无效属性值

|提示|INVALID_PROPERTY_VALUE_IN_ATTR_VALUE|
|---|---|
|错误说明|"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."|
|修复方法|更正无效属性值|

### 10. URL缺失

|提示|MISSING_URL|
|---|---|
|错误说明|"Missing URL for attribute '%1' in tag '%2'."|
|修复方法|添加有效的url|

在该有url的地方为空的时候会报此错误，例如空的href或者空的src。

### 11. 无效URL

|提示|INVALID_URL_PROTOCOL|
|---|---|
|错误说明|"Malformed URL '%3' for attribute '%1' in tag '%2'"|
|修复方法|修复错误的url|

在含有url的属性中，url无效的时候报错。

### 12. 无效的URL协议

|提示|INVALID_URL_PROTOCOL|
|---|---|
|错误说明|Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.|
|修复方法|添加有效协议。如将http改为https|

当标签中含有href或者src的时候，其中的url必须设置正确的url协议。如：所有的必须是https协议。

### 13. 属性缺失强制性属性值

|提示|MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE|
|---|---|
|错误说明|"The property '%1' is missing from attribute '%2' in tag '%3'."|
|修复方法|添加正确的属性值|

当缺少如下属性值的时候，需要报错：

- `content="...ie=..."`
- `content="...width=..."`
- `content="...minimum-scale=..."`

正确标签示例：

- `<meta http-equiv=X-UA-Compatible" content="ie=edge">`
- `<meta name=viewport content="width=device-width;minimum-scale=1">`

### 14. 存在互斥属性

|提示|MUTUALLY_EXCLUSIVE_ATTRS|
|---|---|
|错误说明|"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."|
|修复方法|删除其中的一个属性|

当标签中含有互斥属性的时候需要报错，例如以下示例中的属性，同时只能出现一个：

- **mip-twitter**: data-tweetid or src
- **mip-instagram**: data-shortcode or src
- **mip-iframe**: src or srcdoc
- **mip-youtube**: src or data-videoid

### 15. 缺少强制性属性

|提示|MANDATORY_ONEOF_ATTR_MISSING|
|---|---|
|错误说明|"The tag '%1' is missing a mandatory attribute - pick one of %2."|
|修复方法|添加正确是属性|

当标签中缺少必须的属性时需要报错，例如：

- **mip-twitter**: data-tweetid or src
- **mip-instagram**: data-shortcode or src
- **mip-iframe**: src or srcdoc
- **mip-youtube**: src or data-videoid

### 16. 直接父标签错误

|提示|WRONG_PARENT_TAG|
|---|---|
|错误说明|"The parent tag of tag '%1' is '%2', but it can only be '%3'."|
|修复方法|添加所需的父标签|

有一些标签有制定的直接父标签，如下示例给出了每个标签必须的直接父标签：

- **!doctype** 的直接父标签是 **root**
- **head** 的直接父标签是 **html**
- **body** 的直接父标签是 **html**
- **link** 的直接父标签是 **head**
- **meta** 的直接父标签是 **head**
- **style mip-custom** 的直接父标签是 **head**
- **style** 的直接父标签是 **boilerplate**
- **script** 的直接父标签是 **head**
- 资源的直接父标签是媒体标签（mip-audio,mip-video,等）

### 17. 非法父级标签

|提示|DISALLOWED_TAG_ANCESTOR|
|---|---|
|错误说明|"The tag '%1' may not appear as a descendant of tag '%2'."|
|修复方法|删除非法嵌套标签|

### 18. 强制父级标签

|提示|MANDATORY_TAG_ANCESTOR|
|---|---|
|错误说明|MANDATORY_TAG_ANCESTOR|
|修复方法|删除标签或者给标签添加正确的父级标签|

### 19. 

### 20. 唯一标签重复

|提示|DUPLICATE_UNIQUE_TAG|
|---|---|
|错误说明|"The tag '%1' appears more than once in the document."|
|修复方法|删除多余的标签|

一份html中，有的标签具有唯一性，也就是说只能出现一次，当html中有重复的唯一标签的时候，应该报错。

以下是唯一标签列表：

- `<doctype html>`
- `<html mip>`
- `<head>`
- `<link rel=canonical href=...>`
- `<link rel=amphtml href=...>`
- `<meta charset="utf-8">`
- `<meta viewport>`
- `<style mip-custom>`
- `<script async src="https://m.baidu.com/miphtml/v0.js"></script>`
- `<body>`

## 样式和布局错误

### 1. 样式表超长

|提示|STYLESHEET_TOO_LONG|
|---|---|
|错误说明|"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."|
|修复方法|控制样式表大小|

### 2. CSS语法错误

|提示|CSS_SYNTAX_INVALID_AT_RULE|
|---|---|
|错误说明|"CSS syntax error in tag '%1' - saw invalid at rule '%2'."|
|修复方法|修复错误的css语法|

### 3. 隐藏布局不支持mip

|提示|IMPLIED_LAYOUT_INVALID|
|---|---|
|错误说明|"The implied layout '%1' is not supported by tag '%2'."|
|修复方法|提供有效布局|

### 4. 隐藏布局中含有非法属性

|提示|ATTR_DISALLOWED_BY_IMPLIED_LAYOUT|
|---|---|
|错误说明|"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."|
|修复方法|删除非法属性，或者添加包含此属性的布局|

### 5. 指定布局无效

|提示|SPECIFIED_LAYOUT_INVALID|
|---|---|
|错误说明|"The specified layout '%1' is not supported by tag '%2'."|
|修复方法|添加可以被支持的指定布局|

### 6. 指定布局含有非法属性

|提示|ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT|
|---|---|
|错误说明|"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."|
|修复方法|删除非法属性|

### 7. 不居中含有无效属性值

|提示|ATTR_VALUE_REQUIRED_BY_LAYOUT|
|---|---|
|错误说明|"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."|
|修复方法|设置正确的属性值|

### 8. 长宽不一致单位

|提示|INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT|
|---|---|
|错误说明|"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."|
|修复方法|长和宽统一单位|

## 模板错误

### 1. 属性包含模板语法

|提示|TEMPLATE_IN_ATTR_NAME|
|---|---|
|错误说明|"Mustache template syntax in attribute name '%1' in tag '%2'."|
|修复方法|删除属性中的模板语法|

当属性中含有模板语法的时候需要报错。

### 2. 属性包含转义模板语法

|提示|UNESCAPED_TEMPLATE_IN_ATTR_VALUE|
|---|---|
|错误说明|"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."|
|修复方法|反转义|

### 3. 属性包含局部模板

|提示|TEMPLATE_PARTIAL_IN_ATTR_VALUE|
|---|---|
|错误说明|"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."|
|修复方法|删除局部|

## 弃用错误

### 1. 弃用标签

|提示|DEPRECATED_TAG|
|---|---|
|错误说明|No error message defined as yet (no deprecated tags).|
|修复方法|删除弃用标签|

随着版本迭代，会有一些标签被弃用，如果在html中发现了已经被最新版本所弃用的标签，应该给予**警告**，页面**警告**不影响页面的正常使用。目前不存在弃用标签。

### 2. 弃用属性

|提示|DEPRECATED_ATTR|
|---|---|
|错误说明|"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."|
|修复方法|删除弃用属性|

同弃用标签，如果在html中发现了已经被最新版本所弃用的属性，应该给予**警告**，页面**警告**不影响页面的正常使用。


