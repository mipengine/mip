# 什么是MIP

MIP （Mobile Instant Page - 移动网页加速器）,  是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。


MIP主要由三部分组织成：

- MIP HTML
- MIP JS
- MIP Cache

MIP HTML 基于HTML中的基础标签制定了全新的规范，通过对一部分基础标签的使用限制或功能扩展，使HTML能够展现更加丰富的内容；MIP JS 可以保证 MIP HTML 页面的快速渲染；MIP Cache 用于实现MIP页面的高速缓存，从而进一步提高页面性能。

## 1. MIP HTML

**MIP HTML** 基于HTML基础规范进行了扩展，下面是一段简单的MIP HTML代码示例：

```
<!DOCTYPE html>
<html mip>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/mipmain-v1.0.0.css">
    </head>
    <body>Hello World!</body>
    <script src="https://mipcache.bdstatic.com/static/mipmain-v1.0.0.js"></script>   
</html>
```

MIP HTML 规范中有两类标签，一类是HTML常规标签，另一类是MIP标签。MIP标签也被称作 MIP HTML 组件，使用它们来替代HTML常规标签可以大幅提升页面性能。

例如，`mip-img`标签，它使得图片只在需要时才进行加载，减少了页面渲染时间，节省了用户的流量。

阅读 [**MIP HTML 规范**](http://mip.baidu.com/#./docs/3-tech/1-mip-html.md) 了解更多信息。

## 2. MIP JS

**MIP JS** 用于管理资源的加载，并支持上述MIP标签的使用，从而确保页面的快速渲染，提高页面各方面的性能。

**MIP JS** 最显著的优势是能够异步加载所有外部资源，整个页面渲染过程不会被页面中的某些元素阻塞，从而实现页面渲染速度的提升。

此外，**MIP JS** 还涵盖了所有iframe的沙盒、于资源加载前提前计算页面元素布局、禁用缓慢css选择器等技术性能。

## 3. MIP Cache

**MIP Cache** 是通过 CDN(Content Delivery Network) 服务器缓存mip页面的。用户在访问 MIP 页面的时候，请求首先会发到 CDN 服务器，如果页面存在，则从 CDN 返回，如果 CDN 上不存在，则会请求第三方服务器。同时 MIP Cache 服务器会主区页面缓存到 CDN 上。在使用 MIP Cache 时，MIP 页面所需要的所有静态文件和外部资源都会被缓存到 CDN 上，并且页面中的资源链接会被转换成相对地址，很大程度上提升了页面渲染速度。每一个 MIP 页面都会绑定一个验证系统，在页面进行渲染时，这种验证器可以直接在浏览器控制台中输出页面的错误；并且随着代码逻辑的变化，能够展示其对页面性能以及用户体验的影响。

<!-- **MIP Cache** 通过缓存MIP页面的内容实现页面加速。当页面被访问时，已被 MIP Cache 缓存内容将并直接展现，剩余内容再向服务器发送请求。

在使用MIP Cache 时，所有的静态文件和外部资源都将被缓存并转换为相对地址，每一个MIP页面都会绑定一个验证器，在页面进行渲染时，这种验证器可以直接在浏览器控制台中输出页面错误；随着代码逻辑的变化，其对页面性能以及用户体验的影响也将被同步展示。 -->

阅读 [**MIP Cache 规范**](http://mip.baidu.com/#./docs/3-tech/2-mip-cache.md) 了解更多信息。
