# mip-accordion

mip-accordion 用来支持在 mip折叠隐藏的节点

描述|提供了一个mip中用来支持在 mip折叠隐藏的节点(可记录用户上次行为)
----|----
可用性|完成
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-accordion.js

## 1. 使用

在MIP HTMl中，示例如下：

标题加内容形式

```
<mip-accordion sessions-key="mip_1">
    <section>
        <h4>第一个</h4>
        <p>第一个第一个第一个</p>
      </section>
      <section>
        <h4>第二个</h4>
         <p>第二个第二个第二个</p>
      </section>
      <section>
        <h4>第三个第三个</h4>
        <mip-img layout = "responsive" width="400" height="200" src="xxx"></mip-img>
      </section>
  </mip-accordion>
```

标题切换形式
```
<mip-accordion sessions-key="mip_2">
    <section>
        <h4>
          <span class="show-more">显示更多</span>
          <span class="show-less">收起</span>
          </h4>
        <p>显示显示收起收起显示显示收起收起显示显示收起收起显示显示收起收起</p>
      </section>
  </mip-accordion>
```


## 2. 属性

组件所涉及的属性有：组件唯一标识符(sessions-key)

- ** 组件唯一标识符(sessions-key) **

    - 是否必填：是

    - 说明：用于区分同个页面中多个mip-accordion以还原用户上次操作

