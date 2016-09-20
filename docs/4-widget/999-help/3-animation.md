# 动画

## 简介

目前动画引入了 Naboo 库。并且对 Naboo 作了一次简单封装

## 使用方法

```
var Naboo = require('naboo');

// 使用 css 动画
Naboo.css(element, {
    background: '#000',
    width: 200,
    height: 200
}).start(function () {
    // callback
});
```

## TODO

1、Naboo 使用说明   
2、添加 toggle、fadeOut 等常用方法   
3、添加 JS 动画，以支持更丰富的曲线