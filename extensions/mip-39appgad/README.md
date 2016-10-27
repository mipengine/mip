# mip-39appgad

mip-39appgad 用来支持39.net相关页面的特殊客户广告显示

| 描述 | 提供了一个mip中广告脚本的下载容器|
|---|---|
|可用性	|完成 |
|所需脚本| mip-39appgad.js |

## 1.使用方法

在MIP HTML中,直接使用标签, 用于正常显示直投的广告。示例如下:
```
<div id="AdWapAskOnlineFloat">
<mip-39appgad adid="10713" hide-layer-id="AdWapAskOnlineFloat" ></mip-39appgad>
</div>
```
## 2.属性
组件所涉及的属性有：广告位ID（adid）、要增加关闭按钮的层的ID(hide-layer-id)
- 广告位ID（adid）
	- 是否必填：是
- 要增加关闭按钮的层的ID(hide-layer-id)
    - 是否必填：否