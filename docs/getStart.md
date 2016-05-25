# 开始

## 什么是MIB

MIB是一个构建web页面的方法，他能够快速的渲染出静态内容。MIB主要由三部分组织成：

- MIB HTML
- MIB JS
- MIB Cache

**MIB HTML** 是有限制的HTML，以此来提高性能， 并且，对HTML进行了扩展，在基础的HTML上构建更佳丰富的内容。**MIB JS**库用来保证MIB页面的快速渲染。**MIB Cache**用于MIB页面的高速缓存。

### MIB HTML

**MIB HTML**用定制的MIB特性对基础的HTML进行了扩展，下面是一段最简单的MIB HTML：

```
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <title>文章大标题</title>
        <link rel="stylesheet" type="text/css" href="//m.baidu.com/static/ala/sf/static/js/mibhtml_e49a9cb.css">
        <style>
            /* 头部信息 */
            .o-head-info {display: block;padding: 20px 17px 0;color: #6a6a6a;font-size: 13px; overflow: hidden;
            }
            /* 发布来源 */
            .o-head-tag {
                float: left;
            }
            /* 发布时间 */
            .o-head-time {
                float: right;
            }
            /* 文章大标题 */
            .o-head-title h3 {
                margin-top: 0;
                line-height: 34px;
                text-align: justify;
                font-size: 22px;
                color: #333;
            }
            /* 其他自定义样式（自己的样式写在这里，使用 o-page- 开头）*/
            .o-page-test01 {
                background: yellow;
                font-style: italic;
            }
        </style>
    </head>
    <body>Hello World!</body>
    <script src="//www.baidu.com/nocache/zhixin/mib/mibhtml_main_56aa51e.js"></script>   
</html>
```
**MIB HTML**页面中的大多数标签仍然是常规的HTML标签，但是一些HTML标签被MIB-xx特定标签所代替，这些自定义的MIB-xx元素，叫做MIB组件，这些组件提高了页面的性能。

### MIB JS

**MIB JS**库实现了所有MIB的最佳性能实践，他能够管理资源的加载，并提供上述自定义MIB标签，以此来确保页面的快速渲染。

**MIB JS**最大的优点是，他能够异步加载所有外部资源，因此提高了页面渲染的速度。

**MIB JS**的其他技术性能还包括所有iframe的沙盒、在资源加载之前提前计算出页面元素的布局以及禁用缓慢css选择器。

通过阅读**MIB HTML**规范能够了解更多。

### MIB Cache



## 创建你的第一个MIB页面

## MIB是如何提高性能的？

# MIB入门教程

## 创建响应式MIB页面

## Iframes 和 Media介绍

## 第三方组件介绍

## 如何使你的MIB页面被发现

## MIB页面校验

## 配置分析


# MIB API说明 

## mib-ad

## mib-img

## mib-piexl

## mib-recommend

## 组件扩展

## 实验组件

## MIB HTML规范

## MIB验证错误 

# MIB 规范文档&校验list