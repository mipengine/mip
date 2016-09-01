# mip-carousel

mip-carousel 用来支持 mip 中图片的一种展示方式，支出多图轮播。

描述|用自定义的mip-carousel标签实现了子节点的轮播效果
----|----
可用性|稳定
支持布局| fixed-height,responsive

## 1. 使用

在MIP HTMl中，示例如下：

```
    <mip-carousel  autoplay defer="1000" layout="responsive"  width=600 height="400">
            <mip-img 
                class="mip-img"  
                alt="胖子突围记！讲讲你的突围历程？" 
                src="http://a2.att.hudong.com/71/04/300224654811132504044925945_950.jpg" layout="responsive"  width=600 height="300">
            </mip-img>
        <a target="_blank" href="http://wenda.tianya.cn/m/question/1almfj0foas94gc7vtoq6ejbfbmdk3e78ehaa" style="width:100%">
            <mip-img 
                class="mip-img"  
                alt="招募行家！欢迎加入！" 
                src="http://www.bz55.com/uploads/allimg/150305/139-1503051FS0.jpg" layout="responsive"  width=600 height="300">
            </mip-img>
            <p class="mip-img-subtitle">招募行家！欢迎加入！</p>
        </a>
        <a target="_blank" href="http://wenda.tianya.cn/m/question/1almfj0foas94gc7vtoq6ejbfbmdk3e78ehaa" style="width:100%">
            <mip-img 
                class="mip-img"  
                alt="招募行家！欢迎加入！" 
                src="http://img3.3lian.com/2013/v9/58/d/25.jpg" layout="responsive"  width=600 height="300">
            </mip-img>
            <p class="mip-img-subtitle">招募行家！欢迎加入！</p>
        </a>    
    </mip-carousel>

```
## 2. 属性

轮播组件所涉及的属性有：自动轮播（autoplay），间隔时间（defer），宽度(width)和高度（height）

- **自动轮播(autoplay)**

    - 是否必填：否

    - 说明：如果需要自动轮播功能，可以加上`autoplay`属性，不需要带任何值，或者`autoplay="autoplay"`，其他写法均无效

- **间隔时间(defer)**

    - 是否必填：否

    - 说明：每次轮播的时间间隔，单位ms，如果设置了`autoplay`，可以添加`defer`来指定轮播的时间间隔，默认值2000

- **宽度(width)**

    - 是否必填：是

    - 说明：与高度属性配合来设置图片比例

- **高度（height）**

    - 是否必填：是

    - 说明：与宽度属性配合来设置图片比例

