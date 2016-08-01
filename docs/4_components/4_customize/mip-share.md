# mip-share

mip-share 用来支持在 mip 中添加对第三方网站的分享。

分享组件提供一个静态的页面嵌入模块，其中分享的平台，站长通过选择type从而指定网页可分享的第三方网站。

描述|提供了一个分享容器来支持分享，目前支持分享到qq空间，微博和复制连接
----|----
可用性|开发中
支持布局| 响应式
示例|官网上线后增加示例
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-share.js

## 1. 使用

在MIP HTMl中，用来替代img标签，示例如下：

```
<div class="mip-share-container">
    <mip-share 
        title="分享出去的标题" 
        url="分享的连接" 
        content="分享的内容" 
        iconUrl="分享所带的图片地址">
    </mip-share>
</div>
```
## 2. 属性

组件所涉及的属性有：标题（title）, 分享连接（url）, 分享摘要（content）以及分享图片（iconUrl）。

- **标题（title）**

    - 是否必填：否

    - 说明：分享出去的标题，默认取页面title。

- **分享连接（url）**

    - 是否必填：否

    - 说明：分享连接，默认取当前页面连接。

- **分享摘要（content）**

    - 是否必填：否

    - 说明：分享的文章摘要，默认取页面title。

- **分享图片（iconUrl）**

    - 是否必填：否

    - 说明：默认百度logo。
