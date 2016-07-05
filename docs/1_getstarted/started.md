# 什么是MIP

> 天下武功 唯快不攻

## 什么是MIP

MIP（Mobile Instant Page）: 前端网页加速器，是一个构建web页面的方法，它能够快速的渲染出静态内容。

MIP主要由三部分组织成：

- MIP HTML
- MIP JS
- MIP Cache

其中，MIP HTML 对HTML中的基础标签制定了一套规范，用来限制一些基础标签的使用，同时对其进行了功能扩展；使HTML能够展现更佳丰富的内容。MIP JS 库是用来保证 MIP HTML 页面的快速渲染。MIP Cache 用于MIP页面的高速缓存，同样提高了页面性能。

### 1. MIP HTML

通过自定义MIP特性，**MIP HTML**用对HTML进行了扩展，下面是一段最简单的MIP HTML代码示例：

```
<!DOCTYPE html>
<html mip>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="stylesheet" type="text/css" href="//m.baidu.com/static/ala/sf/static/js/miphtml_e49a9cb.css">
    </head>
    <body>Hello World!</body>
    <script src="//www.baidu.com/nocache/zhixin/mip/miphtml_main_56aa51e.js"></script>   
</html>
```

MIP HTML 页面中的标签有两种，一种是常规的HTML标签，另一种是替代常规标签的MIP标签。MIP标签也叫做 MIP HTML 组件，它能在一定成都上提高页面的性能。

例如，`mip-img`标签，它能使图片在需要时才进行加载，减少了页面渲染时间，节省了用户流量。

阅读 **MIP HTML 规范**(http://mip.baidu.com/#./docs/2_guides/check_list_thumbnail.md)来了解更多。

### 2. MIP JS

**MIP JS** 库能够管理资源的加载，并支持上面提到过的自定义MIP标签的使用，用这种方式确保页面的快速渲染，提高页面的各个方面的性能。**MIP JS** 最大的优点是，他能够异步加载所有外部资源，因此页面渲染不会被页面中的元素阻塞，从而提高了页面渲染的速度。同时，**MIP JS** 还包括所有iframe的沙盒、在资源加载之前提前计算出页面元素的布局以及禁用缓慢css选择器等技术性能。

### 3. MIP Cache

**MIP Cache** 用来缓存mip页面。用户在访问 MIP 页面的时候，会先从 MIP Cache 中查询，如果有则直接展现，如果没有再向服务器发请求。在使用MIP Cache 时，所有的静态文件，外部资源都会被缓存，并且转换为相对地址，很大程度上提升了页面渲染速度。每一个MIP页面都会绑定一个验证系统，在页面进行渲染时，这种验证器可以直接在浏览器控制台中输出页面的错误；并且随着代码逻辑的变化，向你展示其对页面性能以及用户体验的影响。


