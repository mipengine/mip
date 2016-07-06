# mip-video 视频组件 （ToDo）

描述|替换html5的video标签; 只用于能直接用HTML5播放的视频文件.
----|----
可用性|开发中
所需脚本|
支持布局| 
示例|暂无

## 1. 使用

mip-video 根据标签的src在组件的runtime中进行懒加载，能够像html5的video标签一样控制

```
<mip-video 
    width=400 
    height=300 
    src="https://yourhost.com/yourvideo.mp4"
    poster="yourvideo.jpg">
    <div fallback>
        <p>你的浏览器不支持html5 video</p>
    </div>
  <source type="video/mp4" src="foo.mp4">
  <source type="video/webm" src="foo.webm">
</mip-video>
```

## 2. 属性

视频组件所涉及的属性有：视频地址（src），封面图地址（poster），自动播放开关（autoplay），菜单开关（controls），循环播放开关（loop）以及（muted）

- **视频地址（src）**

    - 是否必填：是

    - 说明：视频源地址，必须是https资源

- **封面图地址（poster）**

    - 是否必填：是

    - 说明：视频播放前默认展示图片

- **自动播放开关（autoplay）**

    - 是否必填：否

    - 说明：默认？ //待完善 需要说明几种选择的值是什么

- **菜单开关（controls）**

    - 是否必填：否

    - 说明：默认？ //待完善 需要说明几种选择的值是什么


- **循环播放开关（loop）**

    - 是否必填：否

    - 说明：默认？ //待完善 需要说明几种选择的值是什么

- **muted**

    - 是否必填：否

    - 说明：默认？ //待完善 需要说明几种选择的值是什么

## 3. 样式

暂时不支持重写样式

## 4. 验证

暂不支持

## 5. 是否基础组件

是

