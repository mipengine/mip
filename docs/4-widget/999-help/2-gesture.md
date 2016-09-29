# 手势

MIP封装了单击，双击，滑动等手势，可在组件中使用

## 示例

```
var Gesture = require('util/gesture');
// 或者
var util = require('util');
var Gesture = util.Gesture;


var customEle = require('customElemenet').create();


var build = function () {
    var gesture = new Gesture(this.element);

    // on 可接受多个事件名做为参数，以空格分隔。如 gesture.on('tap swipe')
    gesture.on('tap', function (event, data) {
        // 原始事件。如tap事件是通过 touchend 触发，event为tap对应的touchend事件对象
        console.log(event);
        // gesture 计算后的数据。参数介绍见后面
        console.log(data.type); // "tap"
    });
};
```

## 初始化参数介绍

gesture 实例化时第二个参数可以传一个obj做为配置参数

示例：
```
    // 默认阻止纵向滑动事件
    var gesture = new Gesture(element, {
        preventY: true
    });
```

具体参数介绍：

    preventDefault         是否阻止默认事件
    preventX               是否阻止横向滑动时的默认事件
    preventY               是否阻止纵向滑动时的默认事件
    stopPropagation        是否阻止事件冒泡

默认参数：

    {
        preventDefault: false,
        stopPropagation: false,
        // 默认会阻止横滑的事件，因为有些浏览器在横滑时有翻页的功能
        preventX: true,
        preventY: false
    }

## gesture 数据对象介绍

数据对象做为事件处理函数的第二个参数传入。

示例：
```
    gesture.on('tap', function (event, data) {
        console.log(data);
    });
```

通用字段：  

    angle              滑动角度，如横滑为0度
    deltaTime          从开始到结束的时间间隔。单位是ms
    deltaX             横轴位移
    deltaY             纵轴位移
    direction          方向。0: 未变动   1: 上   2:右   3: 下   4: 左
    distance           移动距离
    pointers           触摸点
    timeStamp          事件发生的时间戳
    velocity           速度
    velocityX          横向速度
    velocityY          纵向速度
    x                  触摸中心点坐标x
    y                  触摸中心点坐标y
    type               事件类型

扩展字段：   

各手势可以向数据对象中扩展字段。如 swipe 事件中的 swipeDirection 字段，具体请看手势识别器介绍

## 手势识别器

手势识别器可以接收 gesture 数据对象，并识别出具体手势，触发具体的手势事件。

手势识别器对象在用户绑定事件时自动创建，在用户解绑事件时自动销毁。

目前有三种内置识别器：tap、dobuletap、swipe

### tap


使用方法: 

```
gesture.on('tap', function (event, data) {
    console.log('单击');
});
```


### doubletap

双击，如果同时绑定tap和doubletap，tap事件会延迟300ms触发以判断是否触发双击。  

使用方法：
```
gesture.on('tap', function (event, data) {
    console.log('双击');
});
```

### swipe

滑动

使用方法：
```
// 使用方法1：
gesture.on('swipe', function (event, data) {
    console.log(data.type); // "swipe"
    console.log(data.swipeDirection); // "up" or "right" or "down" or "left"
});

// 使用方法2：
gesture.on('swipeup swipedown', function (event, data) {
    console.log(data.type) // "swipeup" or "swipedown"
    console.log(data.swipeDirection) // "up" or "down"
});
```


