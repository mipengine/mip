# mip-video 视频组件

<table>
   <tr>
    <td ><strong>描述</strong></td>
    <td>替换html5的<code>video</code> 标签; 只用于能直接用HTML5播放的视频文件.</td>
  </tr>
   <tr>
    <td><strong>可用性</strong></td>
    <td>开发中</td>
  </tr>
   <tr>
    <td><strong>示例</strong></td>
    <td>暂无</td>
  </tr>
  <tr>
    <td><strong>支持布局</strong></td>
    <td></td>
  </tr>
</table>

## 行为描述

mip-video 根据标签的src在组件的runtime中进行懒加载，能够想html5的video标签一样控制


## 使用示例:
```html
<mip-video width=400 height=300 src="https://yourhost.com/yourvideo.mp4"
    poster="yourvideo.jpg">
  <div fallback>
    <p>你的浏览器不支持html5 video</p>
  </div>
  <source type="video/mp4" src="foo.mp4">
  <source type="video/webm" src="foo.webm">
</mip-video>
```

## 参数

**src**

需要是https，若http则播放可能会被退化成另外一种方式

**poster**

视频播放前默认展示图片

**autoplay**


**controls**


**loop**


**muted**


## 验证


