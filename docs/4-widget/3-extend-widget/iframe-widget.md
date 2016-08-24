# mip-iframe

mip-iframe 是用来支持在 mip 中嵌入第三方内容的一种方式，需要注意的是：所嵌入的内容强制是符合https协议的。

描述|用自定义的mip-iframe标签实现了其他页面的引入
----|----
可用性|稳定
支持布局|responsive, fixed-height, fixed

## 1. 使用

在MIP HTMl中，示例如下：

```
<mip-iframe 
    width="100" 
    height="50" 
    allowfullscreen 
    srcdoc="<p>123</p>" 
    src="http://m.baidu.com" 
    sandbox="" 
    allowfullscreen 
    allowtransparency="true">
</mip-iframe>
```
## 2. 属性

mip-iframe 组件所涉及的属性有：宽度（width），高度（height），允许全屏（allowfullscreen），引用内容（srcdoc），引用地址（src），沙盒权限（sandbox），允许透明（allowtransparency）

- **宽度(width)**

    - 是否必填：是

    - 说明：与高度（height）的比值被mip-iframe用来计算区域的比例和大小

- **高度(height)**

    - 是否必填：是

    - 说明：与宽度（width）的比值被mip-iframe用来计算区域的比例和大小

- **允许全屏(allowfullscreen)**

    - 是否必填：否

    - 说明：与原生iframe的`allowfullscreen`属性作用一致

- **引用的文档内容(srcdoc)**

    - 是否必填：否

    - 说明：与原生iframe的`srcdoc`属性作用一致

- **引用的文档地址(src)**

    - 是否必填：是

    - 说明：与原生iframe的`src`属性作用一致，需要注意这里必须要使用https地址

- **沙盒权限(sandbox)**

    - 是否必填：否

    - 说明：与原生iframe的`sandbox`属性作用一致

- **允许透明(allowtransparency)**

    - 是否必填：否

    - 说明：与原生iframe的`allowtransparency`属性作用一致


