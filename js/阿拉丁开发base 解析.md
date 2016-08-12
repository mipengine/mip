# base模板使用解析

> lilangbo@baidu.com; wangpei07@baidu.com

> 2015-11-12

###可供具体模板操作的block块介绍
    data_modifier 数据处理块

    title 标题块（正常不需要重写）

    content 中间内容块

    foot 底部showurl块（正常不需要重写）

###模板可控制的变量
**title：**
* 文案$tplData.title 
* 链接$tplData.url
***************************************************************************
**foot：**
* $tplData.showLeftText：foot左侧文案 
* $tplData.showUrlType：控制foot左侧图标类型，默认aladdin，若为轻应用，请设置true
* $tplData.showRightText：右侧文案 
* $tplData.showRightUrl：右侧链接
* $tplData._urlUndecode：若链接中含中文，在ios9 https跳转异常 请将这个字段置为1
***************************************************************************
**唯一答案：**
* $tplData.isIphoneOnly：取值"wa-模板名-自定义"，这个值是唯一答案父容器的自定义样式名，可以方便自行设置样式
***************************************************************************
**修改控制fm值：**
* $tplData._alaFm：默认alop，若为wz则改为'alwz'。
***************************************************************************

### 函数

#### 飘红

**fe_fn_c_text_inline**
    
    参数：
        
        text 飘红的原文本（编码为utf-8）
    
    示例：
    
        {%fe_fn_c_text_inline text=$tplData.title%}

#### 拼链接

**fe_fn_c_box_adaptive_prefix:**
    
    直接返回a标签，支持参数
    
        url 链接

        query 导流query
    
        ltj 统计标记 l(子链 默认值)/p(图片链接)/b(按钮链接)/title(标题)
    
        class 返回的html标签的class自定义
        
        undecode 若链接中含中文，在ios9 https跳转异常 请将这个字段置为1

    注意：query 和 url 传一个就好，如果使用时同时传递了query和url，会优先使用query
        
        

**fe_fn_c_box_adaptive_suffix：**
    与fe_fn_c_box_adaptive_prefix配合使用，标签闭合
    
    支持参数：
    
        url 链接
        
        query 导流query
    
    示例：
    
        普通链接：

        {%fe_fn_c_box_adaptive_prefix url=$tplData.url ltj="title" class="c-blocka"%}
    
        {%fe_fn_c_box_adaptive_suffix url=$tplData.url%}

        导流链接：

        {%fe_fn_c_box_adaptive_prefix query=$tplData.query ltj="title" class="c-blocka"%}
    
        {%fe_fn_c_box_adaptive_suffix query=$tplData.query%}

**makeUrlFromBaseUrl: **

    把baseUrl和参数数组拼接成一个的完整的url

    支持参数：
    
        baseUrl 基准url

        params 参数数组

    示例：
        
        跳转到视频中间页的链接：

        {%$baseUrl = 'http://video.pae.baidu.com/show/videoindex'%}
        
        {%$params = []%}

        {%$params['src'] = 'http://m.tv.sohu.com/v2272330.shtml?src=10660001'%}

        {%$params['title'] = '视频测试'%}

        {%$params['duration'] = 60%}

        {%$params['sourceName'] = '搜狐'%}

        {%$params['sourceLink'] = 'http://v.souhu.com'%}

        {%$params['lid'] = $reqData.lid%}

        {%$params['srcid'] = $alaData.aladdinResourceId%}

        {%$params['query'] = $reqData.word%}

        {%$url = {%makeUrlFromBaseUrl baseUrl=$baseUrl params=$params%}%}

#### 图片或img便签自动生成器(栅格强制)

    1、smarty中：
    
    fe_fn_c_img_delay  说明：图片统一delay加载，可用于9:16/16:9/1:1栅格比例的图片

    参数：
        
        imgsrc：图片地址
        
        size：压缩比例，取值40——100，默认60（60%）
        
        type：可选值（l/w），默认方图(s)，l为竖图，w为横图。
        
        notimg: 可选值，取值为1时 图片不过timg服务，mini和kv强制要求不过timg
        
        cuttype: 可选值，取值如f140_140，将图片裁剪成140*140的方图
        
    示例：{%fe_fn_c_img_delay imgsrc="http://t11.baidu.com/it/u=929207479,1260167122&fm=58" type="l" size=100 notimg=1%}

    2、JS中：

    this.makeTimg   说明：fe_fn_c_img_delay JS版

    参数：

        src: 图片地址

        di: 图片地址对应di

        sec: 图片地址对应sec

        size: 压缩比例，取值40——100，默认60（60%）

        type：可选值（l/w），默认方图(s)，l为竖图，w为横图。

        notimg: 可选值，取值为1时 图片不过timg服务，mini和kv强制要求不过timg

    示例：var imgUrl = this.makeTimg({src: 'xxx.jpg', di: "xxx", sec: "xxx"});


    
        
#### 生成导流链接
    
    fe_fn_c_build_url   导流链接：搜索结果页换个query发起重新搜索，即大搜跳转至大搜
    
    支持参数 
            
        wd：需要切换的query  
        
        st和sa：（均有常见默认值，特殊取值请传入）见规范文档：http://sfe.baidu.com/#/日志/非结果搜索点击参数密码手册
    
    示例{%fe_fn_c_build_url wd="1234"%} 
    
###完整模板整体示例：

    {%extends "search/searchaladdin/c_base/iphone.tpl"%}
    {%block name='data_modifier'%}
        {%$tplData._alaFm = 'alwz'%}
        {%$tplData.showLeftText = '开发平台'%}
        {%$tplData.showRightUrl = 'http://www.baidu.com/'%}
        {%$tplData.showRightText = '查看更多相关结果'%}
        {%$tplData.url = 'http://m.baidu.com'%}
        {%$tplData.title = '我是标题文案'%}
    {%/block%}
    {%block name='content'%}
    <style data-merge>
        css书写位置 如果css中未使用smarty语法 需加上属性data-merge 反之则不加
    </style>
    <div class="c-border">
        {%fe_fn_c_build_url wd="1234"%}
        {%fe_fn_c_box_adaptive_prefix url={%fe_fn_c_build_url wd="1234"%} ltj="l" class="c-blocka"%}
        {%fe_fn_c_title%}
        {%fe_fn_c_box_adaptive_suffix url=$tplData.url%}
    
        {%fe_fn_c_box_adaptive_prefix url=$tplData.url ltj="l" class="c-blocka"%}
        {%fe_fn_c_title%}
        {%fe_fn_c_box_adaptive_suffix url=$tplData.url%}
        {%fe_fn_c_img_delay imgsrc="http://pimg.damai.cn/perform/project/844/84434_n.jpg"%}
    </div>
    <script>
        A.setup({url:"{%$tplData.url%}",selector:'wa-alaname'},false);  //false代表不立即释放数据，解决一个阿拉丁中有多个A.init时数据无法传递问题,此区块可用于将数据传给js，根据个人需求加
    </script>
    
    <script data-merge>
        A.init(function(){alert(this.data)},true);//如果A.setup中第二个参数设置为false，阿拉丁的 A.init中必须设置为true，手动释放一下。script标签需加data-merge,并且里面不能有smarty语句
    </script>
    {%/block%}
    
### 唯一答案完整模板整体示例：

    {%extends "search/searchaladdin/c_base/iphone.tpl"%}
        
    {%block name='data_modifier'%}
        
        {%*展现唯一答案，必有;wa-xxx是唯一答案最外层类名*%}
        {%$tplData.isIphoneOnly="wa-xxx"%}
        
        {%*其他同普通模板类似*%}
        ...
        
    {%/block%}
    
    {%*重写title和foot*%}
    {%block name="title"%}
    {%/block%}

    {%block name="foot"%}
    {%/block%}

    {%block name='content'%}    
    <style data-merge>
    /*css书写位置 如果css中未使用smarty语法 需加上属性data-merge 反之则不加*/
        
    .wa-xxx {
        background-color: #000 /*卡片背景色视情况赋值*/
        
        /*必须带上*/
        visibility: visible!important;
    }
    </style>
    
    <div class="xxxx">
        ...
    </div>
    
    <script>
        A.setup({
            tplData: {%json_encode($tplData)%}
        },false);  
    </script>
    <script data-merge>
        A.init(function(){
            var _this = this;
            var $container = $(_this.container);
            console.log(_this.data.tplData);
        },true);
    </script>
    {%/block%}
