# 开发文档

## 基本介绍

mip 不推荐使用 jquery 或者 zepto

为什么去掉jQuery：
1、原生JS已经足够好用  
2、jquery、zepto 性能相对于原生JS比较差
3、减少页面负担，不必引入额外的文件

## 如何替代 jquery

### 选择器

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

// matches
// 判断element与selector是否匹配
// mip
util.dom.matches(document.body, 'body'); // true

// 其它常规操作
// native
element.appendChild
element.insertBefore
element.removeChild
element.innerHTML
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


## viewport

viewport 提供了视图相关的功能


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




