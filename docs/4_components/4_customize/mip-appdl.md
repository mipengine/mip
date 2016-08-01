# mip-appdl

mip-appdl 用来支持在 mip 中app的下载


描述|提供了一个mip中app的下载容器.
----|----
可用性|完成
支持布局| 响应式
示例|官网上线后增加示例

## 1. 使用

在MIP HTMl中，示例如下：

```
<mip-appdl tpl="imageText" src="http://ms0.meituan.net/touch/css/i/logo.png" texttip= "['积分能当钱花了','下载百度浏览器']" downbtntext="立即使用" Android-downsrc="http://sqdd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk" Ios-downsrc="itms-apps://itunes.apple.com/app/id452186370" postiontye="fixed"></mip-appdl>
```

## 2. 属性

组件所涉及的属性有：类型（tpl）, 图片（src）, 文案(texttip) , 下载文案(downbtntext) , 安卓下载路径(Android-downsrc） ios下载路径(Ios-downsrc)  位置（postiontye）。

- ** 类型（tpl）**

    - 是否必填：是

    - 说明：有两种下载条 noneImg(没有图片只有文字) imageText(图文结合)。

- ** 图片（src）**

    - 是否必填：是

    - 说明：如果是imageText则为必填。

- ** 文案(texttip) **

    - 是否必填：是


- ** 安卓下载路径(Android-downsrc） **

    - 是否必填：否

    - 说明：直接下载需要传递apk直接下载路径否则可传下载页路径.如果对应系统没有下载链接则自动不显示。

- ** ios下载路径(Ios-downsrc) **

    - 是否必填：否
    
    - 说明: 必须填写appstore下载路径(itms-apps://itunes.apple.com/app/id452186370)或者下载页路径，如果对应系统没有下载链接则自动不显示。

- ** 位置（postiontye） **

    - 是否必填：是
    
    - 说明: 有两种位置static(在文档中的正常位置) fixed(固定在底部)
   
