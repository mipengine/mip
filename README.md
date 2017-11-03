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


## What is MIP

MIP (Mobile Instant Pages) can make web pages open fast by optimizing javascript and resources.

<a href="./README-zh_CN.md">中文版 README</a>

A carousel effect can be as easy as below:

```html
<script async src="https://c.mipcdn.com/static/v1/mip.js"></script>
<mip-carousel>
    <mip-img src="01.jpg"></mip-img>
    <mip-img src="02.jpg"></mip-img>
    <mip-img src="03.jpg"></mip-img>
</mip-carousel>
```

**Fast.** Most pages build by MIP will load in 1 second.  
**Easy to use.** Use components to assemble a page, no need to write javascript.  
**Load on demand.** Both images and scripts are load on demand, minify network resources.  

## Build a MIP Page

Currently, all of the tutorials are written in Chinese. If you need an english version, please [submit an issue](https://github.com/mipengine/mip/issues) to let us know.

- MIP 101 tutorial: [mipengine.org](https://www.mipengine.org/doc/00-mip-101.html)。
- MIP video tutorials: [MIP Introduction](http://bit.baidu.com/course/detail/id/187/column/120.html)


## How to contribute?
If you have suggestions to a function or extensions, feel free to [report an issue](https://github.com/mipengine/mip/issues) or make a pull request.

If code are modified, run `npm install`, `npm run build` to build a mip.js for preview.

Before adding a pull request, make sure:
1. Use Vanilla JS.
2. Write corresponding unit test, and nail it.
3. Use simple and clear comments in english.
4. Pass [Fecs](http://fecs.baidu.com/demo) code style check.


## License
[MIT](./LICENSE)

Copyright (c) 2015-present, Baidu Inc.
