# mip-link

mip-link 用来支持在 mip 页面跳转。

描述| mip-link代替a标签.实现mip页之间的跳转.支持 superframe
----|----
可用性| 完成
支持布局| 响应式
示例|官网上线后增加示例
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-link.js

## 1. 使用

在MIP HTMl中，用来替代a标签，示例如下：

```
	<mip-link title="目标页面标题" url="http://m.baidu.com"></mip-link>
```
## 2. 属性

组件所涉及的属性有：标题（title）, 分享连接（url）, 分享摘要（content）以及分享图片（iconUrl）。


- **url**

	- 是否必填：是

    - 说明：跳转目标网址。

- **title**

	- 是否必填：是

    - 说明：跳转目标页面标题
   
