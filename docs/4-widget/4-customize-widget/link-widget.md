# mip-link

mip-link 用来支持在 mip 页面跳转，解决类似 iframe 嵌套情况下不能跳出父级的问题。

描述| 代替 a 标签
----|----
可用性| 完成
支持布局| 响应式
所需脚本|https://mipcache.bdstatic.com/static/v1.0/mip-link.js

## 1. 使用

在MIP HTMl中，用来替代a标签，示例如下：

```
	<mip-link title="目标页面标题" href="http://m.baidu.com"></mip-link>
```
## 2. 属性

组件所涉及的属性有：mip地址(href)      跳转目标页面标题(title)。


- **href**

	- 是否必填：是

    - 说明：跳转目标网址。

- **title**

	- 是否必填：否

    - 说明：跳转目标页面标题如果不填默认为标签之间的内容
   
