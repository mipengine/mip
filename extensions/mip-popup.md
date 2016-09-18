# mip-popup

mip-popup 用来支持网页中弹出浮层的显示。

描述|提供了一个弹出复层组件,迁移自pmd
----|----
可用性|完成
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-popup.js
示例|官网上线后增加示例


## 1. 使用

一共支持2种样式

- 默认样式

```
<mip-popup title="自定义标题">
    <h4>点击触发</h4>
    <h4>浮层</h4>
</mip-popup>
```
- 剧集浮层

```
<mip-popup
    title="老九门剧情"
    type="episode"
    total="101"
    current="101"
    link-tpl="http://www.baidu.com/{{x}}">
    目录
</mip-popup>
```

## 2. 属性

- **type**

    - 是否必填：否
    
    - 说明：一共有两种特型, episode(剧情选项卡), 不填则为默认特型
- **title**

    - 是否必填：否
    
    - 说明：复层标题
- **current**

    - 是否必填：否
    
    - 说明：当前剧集,从1开始计数(current="4"表示第4集),默认为1, 前置依赖于type="episode".
- **total**

    - 是否必填：否
    
    - 说明：剧集总数. 前置依赖于type="episode",并且当type="episode"为必填
- **page-size**

    - 是否必填：否
    
    - 说明：每页显示剧集数. 前置依赖于type="episode",默认为50
- **text-tpl**

    - 是否必填：否
    
    - 说明：显示在标签页上的剧集文案, "第{{x}}集"里的"{{x}}"将被替换成表示集数的数字. 前置依赖于type="episode".
- **link-tpl**

    - 是否必填：否
    
    - 说明：标签页和下拉菜单里的剧集跳转链接, 链接里的"{{x}}"将被替换成表示集数的数字. 前置依赖于type="episode",当type="episode"为必填.
- **head-title**

    - 是否必填：否
    
    - 说明：标签页和下拉菜单里的剧集跳转新页面的头部标题. 前置依赖于type="episode",当type="episode"为必填.
    
    

