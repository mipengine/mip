# 其它

mip提供一些功能，以解决在组件中遇到的各种问题和提升开发效率。

## prerenderElement

提前渲染 mip 元素。

如果元素不在 viewport 内，强制触发元素的 viewportCallback firstInviewCallback 方法。

```
var element = document.getElementById('mip-test');
MIP.prerenderElement(element);
```

## event-action

由于mip不允许使用附加的JS代码。所以提供了一套事件action机制，可以通过dom属性来触发某个mip元素的自定义事件。

html:  
```
<mip-test id="test"></mip-test>

<div on="tap:test.custom_event">不带参数</div>

<div on="tap:test.custom_event(test_button)">带参数</div>

<div on="tap:test.custom_event(test_button) tap:test.custom_event(test_button1)">多个事件</div>

```

JS:  
```
// mip-test.js
define(function () {
    var customEle = require('customElement').create();
    customEle.prototype.build = function () {
        // 绑定事件，其它元素可通过 on="xxx" 触发
        this.addEventAction("custom_event", function (event/* 对应的事件对象 */, str /* 事件参数 */) {
            console.log(str); // undefined or 'test_button' or 'test_button1'
        });
    };
});
```
