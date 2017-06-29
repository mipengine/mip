# mip-video

mip-video 用来支持在 mip 中增加视频内容，是HTML `<video>`的直接包装。
功能与兼容性与HTML5`<video>`一致。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|无

## 示例

### 基本使用

```html
<mip-video poster="https://placehold.it/640x360" controls
  layout="responsive" width="640" height="360" 
  src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">
</mip-video>
```

### Attributes

所有`<video>`属性都可以在`<mip-video>`上使用，例如下面的视频设置了width, height, controls, loop, muted等属性。

```html
<mip-video controls loop muted
  layout="responsive" width="640" height="360" 
  src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">
</mip-video>
```

### 失效提示

对于不支持HTML5`<video>`的环境，`<mip-video>`同样可以显示提示信息。`<mip-video>`内部的DOM（`<source>`除外）将会在不支持`<video>`标签的浏览器中显示。

```html
<mip-video controls layout="responsive" width="640" height="360" 
  src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">
  您的浏览器不支持视频播放，可以从
  <a href="http://www.baidu.com" target="_blank">这里</a> 下载该视频。
</mip-video>
```

## 属性

下面是几个重要的`<mip-video>`属性。事实上，所有HTML5 `<video>`属性都是可用的，
对此可参考MDN文档：<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mip-video>

### src

说明：视频源地址，必须是https资源  
必选项：否  
类型：字符串  
取值范围：URL
默认值：无

### poster

说明：封面图地址，为了保证视频载入过程中仍然有很好的呈现效果，请设置该字段  
必选项：否  
类型：字符串  
取值范围：URL  
默认值：无

### controls

说明：是否显示视频控制控件，包括开始/暂停按钮、全屏按钮、音量按钮等。对于非自动播放视频，请务必设置该属性。  
必选项：否  
类型：字符串  
取值范围：任何  
默认值：无

### autoplay

说明：是否自动播放。  
必选项：否  
类型：字符串  
取值范围：任何  
默认值：无

## 注意事项

1. 为防止视频加载造成页面抖动，指定视频的高度和宽度是一个好习惯。MIP中，指定宽高是强制的。
2. 如果定义了layout属性，width和height属性将配合layout进行缩放。
3. 暂时不支持 source 。
