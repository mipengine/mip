# 组件开发规范

说明文字

## 组件类型划分及代码所处目录

1、内置组件(root/buildins/)：
	
	* 定义：MIP为了解决性能、安全性问题必须要使用的组件，包括<mip-img>、<mip-video>、<mip-pixl> 等。

2、扩展组件(root/extensions)：
	
	* 定义：丰富MIP功能，官方提供的通用类组件，例如：<mip-iframe> 以及其他等。

3、个性化组件(root/extensions/personalDirectoryName)：

	* 定义：站点的特别需求组件，例如 图表等组件。

4、广告组件（root/extensions/ads）：

	* 定义：涉及到广告相关的MIP组件。

## 代码目录结构
```
. #根目录
├── src #mip核心代码
│   └── deps #依赖代码库
├── buildins #内置组件
├── extensions #扩展和个性化组件
│   └── olympic #mip奥运项目
├── dist #编译后文件
├── examples #mip组件示例demo
├── less #css代码
│   ├── grid #栅格
│   └── mip-common.less #mip base css
├── docs #说明文档
└── assets #docs依赖文件
```

## 步骤

### 1、 [新建需求ISUUE](http://gitlab.baidu.com/MIP/mipmain/issues)

        注：外部合作伙伴前期有mip开发小组成员代为建立

### 2、 通过MIP开发小组审核，确认组件类型后进入开发阶段

### 3、 若无权限，需申请权限（mailto:lilangbo@baidu.com/shenzhou@baidu.com）

### 4、 clone代码库 git clone ssh://g@gitlab.baidu.com:8022/MIP/mipmain.git 
        
        注：外部合作伙伴前期提供代码包的形式合作，后期有开源计划

### 5、 环境准备

#### 编译环境

依赖node和npm

root目录下直接执行 npm install 完成环境依赖安装


### 6、根据组件类型到相应js目录下开发源码

内置：buildins

扩展：extensions

个性化：extensions/personalDirectoryName/
    
### 7、需要增加文件

js目录下：
    
    个性化： 
        
        增加 

	        1、组件.md  #组件说明文档
	        
	        2、版本目录 两位数字 如0.1

	        3、版本目录下：组件.js 、组件.less  

        

    内置、扩展：

        增加 组件.js  

        src/miphtml_base.js inline组件  

        src/mip.js 注册组件

        less/组件.less  mip-common.less 注册

    注: 注册需要考虑用脚本直接搞定 todo



### 编译

```
# 默认编译：包括压缩、md5等
make

# 开发者模式：包括文件监听
make dev

查看效果：http://127.0.0.1:8056/examples/yourexamplesname.html

# todo 个性化编辑：2016.7.12 ready
```

### 上线

走上线版本，每周三20点前准备版本代码，周四发版

## 版本控制

初始1（重大升级扩展）.0(功能扩展).0（bug fix），分别对应的情况进行相应升级
