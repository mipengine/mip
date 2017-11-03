<p align='center'>
	<a href="https://www.mipengine.org/">
		<img width="150" src="https://www.mipengine.org/static/img/mip_logo_3b722d7.png" title='MIP' alt='MIP'>
	</a>
</p>
<p align='center'>
	<a href='https://travis-ci.org/mipengine/mip'>
		<img src='https://travis-ci.org/mipengine/mip.svg?branch=master' title='Build Status' alt='Build Status'>
	</a>
	<a href='https://saucelabs.com/beta/builds/be1067b00f7c414297d77692ac82cf67'>
		<img src='https://saucelabs.com/buildstatus/mipengine' title='Build Status' alt='Build Status'>
	</a>
	<a href='https://coveralls.io/github/mipengine/mip?branch=master'>
		<img src='https://coveralls.io/repos/github/mipengine/mip/badge.svg?branch=master' title='Coverage Status' alt='Coverage Status' />
	</a>
	<a href="https://gitter.im/mipengine/mip?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge" title="gitter chat" alt='gitter chat'>
		<img src="https://badges.gitter.im/mipengine/mip.svg"/>
	</a>
</p>
</p>
<p align='center'>
	<a href="https://david-dm.org/mipengine/mip" title="dependencies status" alt='dependencies Status'>
		<img src="https://david-dm.org/mipengine/mip/status.svg"/>
	</a>	
	<a href='http://issuestats.com/github/mipengine/mip'>
		<img src='http://issuestats.com/github/mipengine/mip/badge/pr?style=flat' title='Pull Request closed' alt='Pull Request closed'>
	</a>
	<a href='https://opensource.org/licenses/MIT'>
		<img src='https://img.shields.io/github/license/mipengine/mip.svg'  title='license' alt='license'>
	</a>
</p>
<p align='center'>
	<a href="https://saucelabs.com/beta/builds/be1067b00f7c414297d77692ac82cf67">
		<img src='https://saucelabs.com/browser-matrix/mipengine.svg' title='Sauce Test Status' alt='Sauce Test Status'>
	</a>
</p>

## 什么是  MIP
MIP（移动网页加速器)能够优化网页JS和资源加载，达到加速打开网页的效果。

在MIP页中可以这样创建一个轮播图：

```html
<script async src="https://c.mipcdn.com/static/v1/mip.js"></script>
<mip-carousel>
    <mip-img src="01.jpg"></mip-img>
    <mip-img src="02.jpg"></mip-img>
    <mip-img src="03.jpg"></mip-img>
</mip-carousel>
```

**极速打开：** 大部分MIP页面都能在一秒内加载完成首屏。  
**使用简单：** 直接使用MIP组件拼装网页，无需一行JS。  
**资源管理：** 按需加载图片和js，精简网络请求。

## 文档&教程资源

- 快速入门MIP页面开发，请查看 [官网文档](https://www.mipengine.org/doc/00-mip-101.html)。
- 了解其它MIP组件使用，请查看 [MIP官方组件列表](https://www.mipengine.org/doc/3-widget/10-widgets.html).
- 常见问题及解答，请查看博客 [MIP问题解决方案大全](http://www.cnblogs.com/mipengine/p/mip-faqs.html)。
- 视频教程：
	- [初识 MIP](http://bit.baidu.com/course/detail/id/187/column/120.html)
	- [MIP页面开发](http://bit.baidu.com/Course/detail/id/188.html)
	- [MIP页面开发进阶](http://bit.baidu.com/Course/detail/id/189.html)
	- [MIP组件开发](http://bit.baidu.com/Course/detail/id/190.html)
	- [MIP搜索生效](http://bit.baidu.com/Course/detail/id/191.html)

## 参与开发
如果你认为某个函数或组件实现有更好的解决方案，可以提交[issue](https://github.com/mipengine/mip/issues)或代码（pull request）给我们。

如果打算提交代码，在本仓库中运行`npm install`, `npm run build`可以编译出一个修改后的mip.js，用于预览效果。

提交代码需要满足以下条件：

1. 使用原生JS编写
2. 编写对应的单元测试，并通过
3. 使用英文注释，简洁清晰
4. 符合[Fecs](http://fecs.baidu.com/demo)编码规范

## License

[MIT](https://github.com/mipengine/mip/blob/master/LICENSE)

Copyright (c) 2015-present, Baidu Inc.
