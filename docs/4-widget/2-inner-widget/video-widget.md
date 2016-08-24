# mip-video

mip-video 用来支持在 mip 中增加视频内容。

该视频组件支持在文本中插入一个视频，插入的视频不先定大小与尺寸，自动生成按照屏幕尺寸缩放的缩略图，点击多略图可以播放视频。

描述|替换html5的video标签; 只用于能直接用HTML5播放的视频文件.
----|----
可用性|稳定版本
支持布局| 响应式

## 1. 使用

mip-video能够像html5的video标签一样播发视频

1. 图文形式的视频组件

```
<mip-video class="mip-video" 
    poster="xx.jpg"
    src="xx.mp4"
    adInfo="[[{type: 'video/mp4',src: 'xx.mp4'}],[{type: 'video/mp4',src: 'xx.mp4'}]]"
    type="video/mp4" 
    ios-mode="hide"
    android-mode = "fullscreen"
    >
        <source type="video/mp4" src="xx.mp4"></source>
        <mip-img  class="mip-video-container" src="xx.jpg">
            <div class="mip-video-icon"></div>
        </mip-img>
    </mip-video>

```

2. 纯文字结构

```
    <mip-video class="mip-video" 
    poster="xx.jpg"
    src="xx.mp4"
    android-mode="fullscreen" 
    ios-mode="hide"
    >
        立即播放
    </mip-video>
```

## 2. 属性

视频组件所涉及的属性有：视频地址（src），封面图地址（poster），广告 (ad), 安卓全屏(android-mode) ios下显示模式(ios-mode)

- **视频地址（src）**

    - 是否必填：是

    - 说明：视频源地址，必须是https资源

- **封面图地址（poster）**

    - 是否必填：是

    - 说明：视频播放前默认展示图片


- **广告（ad）**

    - 是否必填：否

    - 说明：该属性为配置广告。可不填,必须卫https资源


- **安卓全屏（android-mode）**

    - 是否必填：否

    - 说明：在安卓下没有该属性则会按照外框大小显示video。如果存在，则填写唯一属性值fullscreen，模拟全屏显示。

- **ios下显示模式(ios-mode)**

    - 是否必填：否

    - 说明：在ios下是否隐藏原video.全屏打开，如果不填写则为正常打开。但是由于ios的特殊属性还是会全屏打开。(建议开启该模式,用户体验更佳)


## 3. 验证

暂不支持


