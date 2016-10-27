# mip-39ad 

mip-39ad 用来支持39.net相关页面的客户广告显示

| 描述 | 提供了一个mip中广告脚本的下载容器|
|---|---|
|可用性	|完成 |
|所需脚本| mip-39ad.js |

## 1.使用方法

在MIP HTML中,直接使用标签, 用于正常显示直投的广告。示例如下:
```
<div id="AdWapAskOnlineFloat">
<mip-39ad asid="3002" hide-layer-id="AdWapAskOnlineFloat" ></mip-39ad>
</div>
```
## 2.属性
组件所涉及的属性有：广告位ID（asid）、要增加关闭按钮的层的ID(hide-layer-id)
- 广告位ID（asid）
	- 是否必填：是
- 要增加关闭按钮的层的ID(hide-layer-id)
    - 是否必填：否

