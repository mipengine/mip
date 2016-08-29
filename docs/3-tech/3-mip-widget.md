#  扩展组件开发规范

本教程将帮助您开发出理想的自定义组件

## 开发文档

外部站长开发扩展组件请参照下面链接

[扩展组件开发文档](https://github.com/mipengine/mip-plugins/tree/master/extensions)

## 组件类型划分及代码所处目录

1、内置组件(root/buildins/): 
    
* 定义：MIP为了解决性能、安全性问题必须要使用的组件，包括`<mip-img>`、`<mip-video>`、`<mip-pixl>`等。

2、扩展组件(root/extensions): 
    
* 定义：丰富MIP功能，官方提供的通用类组件，例如：<mip-iframe> 以及其他等。

3、个性化组件(root/extensions/personalDirectoryName): 

* 定义：站点的特别需求组件，例如 图表等组件。

4、广告组件(root/extensions/ads): 

* 定义：涉及到广告相关的MIP组件。

## 代码目录结构
```
. #根目录
├── src                 #mip核心代码
│   ├── buildins        #内置组件
│   └── deps            #依赖代码库
├── extensions          #扩展、个性化及广告组件
│   └── olympic         #mip奥运项目
├── dist                #编译后文件
├── examples            #mip组件示例demo
├── less                #css代码
│   ├── grid            #栅格
│   └── mip-common.less #mip base css
├── docs                #说明文档
└── assets              #docs依赖文件
```

## 版本控制

初始1（重大升级扩展）.0(功能扩展).0（bug fix），分别对应的情况进行相应升级
