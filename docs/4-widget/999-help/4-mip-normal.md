# mip相关

## prerenderElement

提前渲染 mip 元素。
如果元素不在 viewport 内，强制触发元素的 viewportCallback 方法，并设置为 true。
如果 firstInviewCallback 还没有执行过，则执行 firstInviewCallback

```
var element = document.getElementById('mip-test');
Mip.prerenderElement(element);
```

## event-action

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