# mip-lightbox

mip-lightbox 是由用户控制展现或关闭的一个全屏浮层组件，组件全屏覆盖，组件里的元素超出屏幕会被隐藏，不能滑动。

标题|内容
----|----
类型|通用
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1.2/mip-lightbox.js

## 示例

mip-lightbox 默认是隐藏的，所以需要在页面中设置一个dom节点为 组件开关，设置此节点的on属性的属性值为"tap:组件ID.open"即可。

mip-lightbox 节点需要一个div子节点，这个div的calss必须有lightbox，并且必须有on属性，属性值为"tap:组件ID.close"

```
<button on="tap:my-lightbox.open" id="btn-open" role="button" tabindex="0">
    Open lightbox
</button>

<mip-lightbox
    id="my-lightbox"
    layout="nodisplay">
    <div class="lightbox" on="tap:my-lightbox.close">
        <h1>Hello, World!</h1>
        <p> this is the lightbox compnents</p>
    </div>
</mip-lightbox>
```

## 属性

### id

说明：组件ID  
必选项：是  
类型：字符串

### layout

说明：布局 
必选项：是  
类型：字符串  
取值：nodisplay


