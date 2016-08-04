# mip-stats-bidu

mip-stats-bidu 用来支持站长添加百度统计。

描述|百度统计组件，用于统计页面数据
----|----
可用性|稳定
示例|官网上线后增加示例
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-stats-bidu.js

## 1. 使用

MIP提供百度统计的插件，便于分析页面数据，需要提前到百度统计这边创建站点，会自动生成js代码使用提取工具提取token，并使用MIP提供的插件，代码示例：

```
    <mip-stats-bidu token="02890d4a309827eb62bc3335b2b28f7f"></mip-stats-bidu>
```

## 2. 属性

统计组件所涉及的属性有：token

- **token**

	- 是否必填：是

    - 说明：通过提取工具提取的token值

