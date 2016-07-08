# MIP Cache 规范

百度MIP cache给所有符合规范的MIP页面提供cache服务，能够主动的提高页面加载速度，为使用MIP cache服务的页面上的图片、CSS文件等资源提供缓存服务，这样能做到所有HTTP请求来自于同源，能够加速加载速度。同时，MIP cache会提供完整的更新流程，保障页面在cache中的更新需求。

## 使用MIP Cache能加快页面加载速度

适用于任何人使用，从缓存中取资源来提升整个移动端搜索页面加速的效果，提升极致用户体验，并能支持https。

## 了解MIP缓存URL格式

### 相对路径

适应于您站点的静态资源和站点是同一个domain

假设您的网站域名：http://domain

	您的mip页地址：http://domain/page/mip/1011.html

	您的图片或其他资源地址：http://domain/page/mip/static/img/xx.png

	对应资源地址填写成：<mip-img src="static/img/xx.png"></mip-img>

	您的图片或其他资源地址：http://domain/page/static/img/xx.png

	对应资源地址填写成：<mip-img src="../static/img/xx.png"></mip-img>

	由此类推的相对路径

### 绝对路径

适应于mip支持的mip-html标签中使用的资源地址，如mip-img的src

如果相对路径满足要求，优先考虑相对路径


## 页面编码要求

强制使用UTF-8编码

## MIP cache 缓存更新

走站长平台统一提交页面更新，详细说明待扩展

## 图片资源：

1、http资源：
	
	originalUrl：http://www.sinaimg.cn/dy/slidenews/1_img/2016_25/2841_703424_763161.jpg

	cdnMipUrl：/i/www.sinaimg.cn/dy/slidenews/1_img/2016_25/2841_703424_763161.jpg

2、https资源：
	
	originalUrl：https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1415218912,1828974222&fm=58

	cdnMipUrl：/i/s/ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1415218912,1828974222&fm=58

## 网页地址或css、js

1、http资源：
	
	originalUrl：http://mjs.sinaimg.cn/wap/online/public/addjs/addjs.min.js?v=0.1

	cdnMipUrl：/c/mjs.sinaimg.cn/wap/online/public/addjs/addjs.min.js?v=0.1

2、https资源：
	
	originalUrl：https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/voice/js/voice_8e6294f2.js

	cdnMipUrl：/c/s/ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/voice/js/voice_8e6294f2.js

## 添加预取标签

待扩展

```

<link href="***" rel="dns-prefetch">

```

## 页面强制不使用mip cache

需在head中添加

```

<meta property="mip:use_cache" content="no">

```




