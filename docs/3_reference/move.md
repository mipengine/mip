# 组件升级文档

## 背景

customElement 组件升级
jQuery 修改为 zepto


## 升级步骤

1、切换到 custom_element 分支   
2、修改组件代码    
3、由@齐健整体提测    
4、合并到主干上线


## 如何切换分支&ci代码

```
# 切换分支
git checkout custom_update

# 查看分支是否切换到 custom_update
git branch

# 修改代码


# ci 到分支
git add -A
git commit -m 'xxx'
git push

```

## 如何修改

涉及到的改动:   

1、customElement 中的 dom 元素    
升级前 customElement 会与 dom 元素合并，所以在 customElement 中 this === [DOM 元素]。    
升级后 customElement 与 dom 元素拆分。如果需要使用 dom 元素的方法，请使用 this.element.xxx。如：this.element.getAttribute    

2、jQuery 切换为 zepto    
目前 zepto 一共集成了5个模块 zepto event ajax ie form animate。以前的代码可能会不兼容。

 


