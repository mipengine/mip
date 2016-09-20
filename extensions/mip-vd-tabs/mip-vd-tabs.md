# mip-vd-tabs

mip-vd-tabs 用来支持网页中标签页的显示。标签页内元素较多时不建议使用,会影响页面性能.

描述|提供了一个标签页组件,迁移自pmd
----|----
可用性|完成
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-vd-tabs.js
示例|官网上线后增加示例


## 1. 使用

一共支持5种样式

- 等分固定标签页

```
<mip-vd-tabs>
    <section>
        <li>第一页</li>
        <li>第二页</li>
        <li>第三页</li>
        <li>第四页</li>
    </section>
    <div>内容1</div>
    <div>内容2</div>
    <div>内容3</div>
    <div>内容4</div>
</mip-vd-tabs>
```
- 横滑标签页

```
<mip-vd-tabs allow-scroll>
    <section>
        <li>第一季</li>
        <li>第二季</li>
        <li>第三季</li>
        <li>第四季</li>
        <li>第五季</li>
        <li>第六季更新至09</li>
    </section>
    <div>内容1</div>
    <div>内容2</div>
    <div>内容3</div>
    <div>内容4</div>
    <div>内容5</div>
    <div>内容6</div>
</mip-vd-tabs>
```

- 带下拉按钮的横滑标签页

```
<mip-vd-tabs allow-scroll toggle-more toggle-label="自定义文字">
    <section>
        <li>第一季</li>
        <li>第二季</li>
        <li>第三季</li>
        <li>第四季更新至09</li>
    </section>
    <div>内容1</div>
    <div>内容2</div>
    <div>内容3</div>
    <div>内容4</div>
</mip-vd-tabs>
```

- 底部标签页

```
<mip-vd-tabs allow-scroll type="bottom" current="3">
    <div>内容1</div>
    <div>内容2</div>
    <div>内容3</div>
    <div>内容4</div>
    <section>
        <li>第一季</li>
        <li>第二季</li>
        <li>第三季</li>
        <li>第四季更新至09</li>
    </section>
</mip-vd-tabs>
```

- 剧情展开标签页
```
<mip-vd-tabs
    type="episode"
    toggle-more
    toggle-label="老九门剧情选集"
    allow-scroll
    total="23"
    current="11"
    text-tpl="看第{{x}}集"
    link-tpl="http://www.baidu.com/{{x}}/juji">
</mip-vd-tabs>
```

## 2. 属性

- **type**

    - 是否必填：否
    
    - 说明：一共有三种特型, bottom(底部选项卡), episode(剧情选项卡), 不填则为默认特型
- **allow-scroll**

    - 是否必填：否
    
    - 说明：允许滑动
- **toggle-more**

    - 是否必填：否
    
    - 说明：是否显示下拉按钮. 前置依赖于allow-scroll属性
- **toggle-label**

    - 是否必填：否
    
    - 说明：下拉说明文字. 前置依赖于toggle-more属性
- **current**

    - 是否必填：否
    
    - 说明：当前已选标签页, 从0开始计数(current="3"表示第4个标签页). 当type="episode"时,表示当前剧集,从1开始计数(current="4"表示第4集),默认为1.
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
    
    

