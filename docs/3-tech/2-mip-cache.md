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

## MIP Cache 缓存更新

走站长平台统一提交页面更新，详细说明待扩展

## MIP Cache 页面资源地址替换规则

### 图片资源：

1、http资源：
	
	originalUrl：http://www.sinaimg.cn/dy/slidenews/1_img/2016_25/2841_703424_763161.jpg

	cdnMipUrl：/i/www.sinaimg.cn/dy/slidenews/1_img/2016_25/2841_703424_763161.jpg

2、https资源：
	
	originalUrl：https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1415218912,1828974222&fm=58

	cdnMipUrl：/i/s/ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1415218912,1828974222&fm=58

### 网页地址或css、js

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

## 需要转换的 url

### head 及 body 标签下

- link 标签中的 href
    
    ```
        1. <link rel="stylesheet" href="https://mipcache.bdstatic.com/static/mipmain-v1.0.1.css">
        2. <link rel="miphtml" href="页面h5 url">
    ```
- style 标签中的 background-image, background

	```
		1. background-image: url(../images/mainheader_top_bj.gif); 
		2. background: url(../images/mainheader_top_bj.gif); 
	```
- script 标签中的 src

	```
		1. <script src="https://mipcache.bdstatic.com/static/mipmain-v1.0.3.js"></script>
	```

### 组件

#### 内置组件

- mip-img 的 src 属性

    ```
    <mip-img 
    	layout="responsive" 
    	width="350" 
    	height="263"
		class="mip-img" 
		popup 
		alt="baidu mip img" 
		src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
	</mip-img>
    ```

- mip-video 的 poster, src, adInfo数组中的src, iframeSrc, source中的src, 属性

    ```
    <mip-video 
    	class="mip-video" 
    	poster="http://gss0.bdstatic.com/yqACvGbaBA94lNC68IqT0jB-xx1xbK/ztd/whfpf%3D660%2C371%2C31%3Bq%3D70/sign=432ab2923101213fcf661d9c32da00e7/d4628535e5dde7115ed5c5bdafefce1b9d166172.jpg"
    	src="http://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-ghqrbvv83yt1f0xz/mda-ghqrbvv83yt1f0xz.mp4"
    	controls=""
    	adInfo="[[{type: 'video/mp4',src: 'http://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-ghqwymk83u5vzn8c/mda-ghqwymk83u5vzn8c.mp4'}],[{type: 'video/mp4',src: 'http://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-ghqn0j5zrhttwtjf/mda-ghqn0j5zrhttwtjf.mp4'}]]"
    	iframeSrc="http://3g.163.com/touch/videoplay.html?channel=news&child=all&offset=19&offset=3&vid=VBVBFEIRQ#/recommend"
    	type="video/mp4"
    	ios-mode="hide">
        	<source type="video/mp4" src="http://v1.bdstatic.com/7e313590bc0d1eb605c376b326538356/mp4/7e313590bc0d1eb605c376b326538356.mp4"></source>
        	<mip-img class="mip-video-container" src="http://p1.bdstatic.com/7217528220198269875.jpg">
            	<div class="mip-video-icon"></div>
        	</mip-img>
    </mip-video>
    ```

#### 扩展通用组件

- mip-iframe 的 src 属性

    ```
    <mip-iframe
	    layout="fixed-height" 
	    height="50" 
	    allowfullscreen 
	    srcdoc="<p>123</p>" 
	    src="http://m.baidu.com" 
	    sandbox="" 
	    allowfullscreen 
	    allowtransparency="true">
	</mip-iframe>
    ```

#### 个性化组件

- mip-anim 的 src 属性

    ```
    <mip-anim 
	    layout="fixed" 
	    width=210
	    height=210
	    src="xxx"
	    alt="an animation">
	       <mip-img
	            layout="fixed-height"
	            width=210
	            height=210
	            src="xxxx">
	        </mip-img>
	</mip-anim>
    ```

- mip-appdl 的 src 属性

    ```
    <mip-appdl 
    	tpl="imageText" 
    	src="http://ms0.meituan.net/touch/css/i/logo.png" 
    	texttip= "['积分能当钱花了','下载百度浏览器']" 
    	downbtntext="立即使用" 
    	Android-downsrc="http://sqdd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk" Ios-downsrc="itms-apps://itunes.apple.com/app/id452186370" postiontye="fixed">
    </mip-appdl>
    ```
- mip-audio 的 src 属性

	```
		<mip-audio
			src="http://218.12.228.106/m10.music.126.net/20160812175705/74373a44fb9e99787b99d042b97b1292/ymusic/ed0f/076b/5701/de5464ee8f38ae951a080c9e15616af6.mp3?wshc_tag=0&wsts_tag=57ad9795&wsid_tag=3d87a950&wsiphost=ipdbm">
		</mip-audio>
	```

- mip-share 的 iconUrl 属性

	```
		<mip-share
        	title="分享出去的标题" 
        	url="分享的连接" 
        	content="分享的内容" 
        	iconUrl="分享所带的图片地址">
    	</mip-share>
	```

#### 广告组件

- ad-comm 类型中的 src 属性

	```
		<mip-ad
		    layout="fixed"
		    width="414"
		    height="80" 
		    type="ad-comm"
		    tpl="onlyImg" 
		    href="//m.baidu.com/s?word=百度" 
		    data-size="1242 180" 
		    src="//m.baidu.com/static/search/ala/ad_1.png">
		</mip-ad>

		<mip-ad 
		    type="ad-comm"
		    tpl="moreImg" 
		    href="//m.baidu.com/s?word=百度" 
		    data-size="1242 180" 
		    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4009078664,3186400936&fm=111&gp=0.jpg;https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=521986262,2379149184&fm=21&gp=0.jpg;https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=195400779,4163278668&fm=21&gp=0.jpg" 
		    data-ads="这里是广告摘要;这里是广告摘要" 
		    data-txt="这里是图片标题;这里是图片标题;这里是图片标题啊啊啊"
		    data-title="这里是广告标题这里是广告标题标">
		</mip-ad>
	```


