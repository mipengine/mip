# mip-ad

mip-ad 用来支持站长添加网页内自定义广告，主要包括连接、图文，多图，banner四种形式，这类广告可以制定大小也可以被用户关闭。

描述|提供了一个广告容器用来显示广告，目前只支持https的广告
----|----
可用性|稳定
所需脚本|&lt;script async src="https://mipcache.bdstatic.com/static/v1.0/mip-ad.js" &gt;&lt;/script&gt;
支持布局|responsive 
版本v1.0|支持别名mip-embed

## 1. 使用示例

```
<mip-ad 
    type="ad-comm"
    tpl="onlyImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>

或使用别名
<mip-embed
    type="ad-comm"
    tpl="onlyImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="//m.baidu.com/static/search/ala/ad_1.png">
</mip-embed>

<div class="mip-adbd">
    <mip-ad 
        type="ad-baidu" 
        cproid="u2697398">
    </mip-ad>
</div>

或使用别名
<div class="mip-adbd">
    <mip-embed 
        type="ad-baidu" 
        cproid="u2697398">
    </mip-embed>
</div>
```

## 2. 支持广告

- [通用广告](http://mip.baidu.com/#../docs/4_components/5_advertisement/ads/mip-ad-comm.md)
- [网盟广告](http://mip.baidu.com/#../docs/4_components/5_advertisement/ads/mip-ad-baidu.md)
