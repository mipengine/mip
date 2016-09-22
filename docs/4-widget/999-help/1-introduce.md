# 开发辅助工具和模块

mip内置了一些开发工具和模块，为解决一些mip开发中遇到的问题和支持原生JS。

本文包含三个部分：  
1、替代jquery、zepto    
2、viewport帮助    
3、jquery、zepto引入  


## 1、替代 jquery、zepto

mip 不推荐使用 jquery 和 zepto。

为什么不推荐?  
1、原生JS已经足够好用  
2、jquery、zepto 性能相对于原生JS比较差  
3、减少页面负担，不必引入额外的文件  

没有jquery&zepto的情况下如何开发？  
请参见后面的帮助，大部分都可以用原生JS替代，mip也提供了一些内置组件以解决兼容问题。

### 选择器

推荐：  
[querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)  
[querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

```
// 全局

// jquery
$('selector');
// native
document.querySelectorAll('selector');

// 局部
var element = document.getElementById('xxx');
// jquery
$('selector', element);
// native
element.querySelectorAll('selector');

// 另外原生也支持
element.getElementsByClassName
element.getElementById
element.getElementsByTagName

```

### attr & data

```
// attr

// jquery
$element.attr('test');
$element.attr('test', '123');

// native
element.getAttribute('test');
element.setAttribute('test', '1');
element.hasAttribute('test');

/* ------------------- */

// data

// jquery
$element.data('test');
$element.data('test', '1');

// native
element.dataset['test'];
element.dataset['test'] = '1';
```

### dom

```
var util = require('util');

// previousElement
// jquery
$element.prev();
// native
element.previousElementSibling;

// nextElement
// jquery
$element.next();
// native
element.nextElementSibling;

// closest
// jquery
$element.closest(selector);
// mip
util.dom.closest(element, selector);

// contains
// jquery
jQuery.contains(parent, child);
// mip
util.dom.contains(parent, child);

// matches(判断element与selector是否匹配)
// mip
util.dom.matches(document.body, 'body'); // true

// 其它常规操作
// native
element.appendChild
element.insertBefore
element.removeChild
element.innerHTML
element.textContent
```

### css
```
// jquery
$element.css('display', 'none');

// mip
var util = require('util');

util.css(element, 'display', 'none');
util.css(element, {
    left: 100,
    top: 200
});

var arr = [element, element1, element2];
util.css(arr, 'display', 'none');

```

### class

```
// add
// jquery
$element.addClass('test');

// native
element.classList.add('test');

// remove
// jquery
$element.removeClass('test');

// native
element.classList.remove('test');

// has
// jquery
$element.hasClass('test');
// native
element.classList.contains('test');

// toggle
// jquery
$element.toggleClass('test');
element.classList.toggle('test');
```

### position&width&height

```
// position
// jquery
$element.position();

// native
element.offsetLeft
element.offsetTop

// offset
// jquery
$element.offset();

// mip
var rect = require('components/rect');
rect.getDomOffset(rect);
```

### ajax

异步请求使用 fetch 和 fetch-jsonp

[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  
[fetch-jsonp](https://github.com/camsong/fetch-jsonp)

```
// get
fetch(location.href).then(function (res) {
    return res.text();
}).then(function (text) {
    fetchElement.innerHTML = 'fetch: ' + (text.search('mip-test') !== -1);
});

// jsonp
var fetchJsonp = require('fetch-jsonp');
fetchJsonp('xxx', {
    jsonpCallback: 'cb'
}).then(function (res) {
    return res.json();
}).then(function (data) {
    console.log(data);
});
```

### event

```
// on、bind
// jquery
$element.on('click', fn);
// native
element.addEventListener('click', fn, false);

// off、unbind
// jquery
$element.off('click', fn);
// native
element.removeEventListener('click', fn);

// delegate
// jquery
$element.delegate(selector, 'click', fn);
// mip
var util = require('util');
var undelegate = util.event.delegate(element, selector, 'click', fn);
// mip undelegate
undelegate();

// trigger
// jquery
$element.trigger('click');
// native
var event = document.createEvent('MouseEvents');
event.initEvent('click', true, true);
element.dispatchEvent(event);
// mip
var util = require('util');
element.dispatchEvent(event, util.event.create('click', data));
```

### utils

```
var util = require('util');

// extend
// jquery
$.extend(a, b);
$.extend(true, a, b);
// mip
util.fn.extend(a, b);
util.fn.extend(true, a, b);

// isPlainObject
// jquery
$.isPlainObject(obj);
// mip
util.fn.isPlainObject(obj);

// isArray
// jquery
$.isArray(obj);
// native
Array.isArray(obj);

// trim
// jquery
$.trim(str);
// native
str.trim();

```

### 浏览器判断

```
var platform = require('components/platform');

// IOS
platform.isIos();
// Safari
platform.isSafari();
// Chrome
platform.isChrome();
// Uc
platform.isUc();
// webkit
platform.isWebkit();
```

### animate

jquery: 
```
// jquery
$(element).animate({
    left: 100,
    top: 100
});
```

```
// mip

var Naboo = require('naboo');
var property = {
    opacity: 0
};
var duration = 1000;
var method = 'ease-in';
var delay = 500;
var callback = function () {
    console.log('callback');
};


// 使用 css 动画
Naboo.css(element, property, callback).start();
Naboo.css(element, property, duration, callback).start();
Naboo.css(element, property, duration, delay, callback).start();
Naboo.css(element, property, duration, method, callback).start();
Naboo.css(element, property /* .... 支持参数组合 */).start();

// 动画组合
Naboo.css(element, {opacity: 0})
     .css(element, {opacity: 1})
     .css(element, {marginTop: 200})
     .css(element, {'margin-top': 0})
     .css(element, {'transform': 'scale(0)'})
     .start();

```

## 2、viewport 帮助

viewport 提供了视图相关的功能。  

为什么要使用viewport?

1、提供一些视图相关的扩展功能    
2、当页面被嵌入到iframe中，滚动以及页面相关的计算有一些bug

### 使用方式

```
var viewport = require('viewport');
// 获取 scrollTop
var scrollTop =  viewport.getScrollTop();
// 设置 scrollTop
viewport.setScrollTop(20);
// 获取页面可视宽度
viewport.getWidth();
// 获取页面可视高度
viewport.getHeight();
// 获取页面实际宽度
viewport.getScrollwidth();
// 获取页面实际高度
viewport.getScrollHeight();
// 获取页面 Rect
viewport.getRect();

// 页面 scroll 事件
viewport.on('scroll', function () {
    // code
});

// 页面 changed 事件
// 当页面滚动结束，或者滚动速度比较低时，会触发 changed 事件
viewport.on('changed', function () {
    // code
});
```

## 3、引入jquery or zepto

靠虑到一些现状，jquery 和 zepto 可能仍然有一定需求。
所以mip也为使用它们提供了异步引入的方式。

引入方式：
```
define(function () {
    var $ = require('jquery'); 
    // or
    var $ = require('zepto');
});

```



