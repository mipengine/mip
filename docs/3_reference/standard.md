# MIP HTML规范

### 头部使用规范

- 起始标签使用 &lt;!doctype html&gt;

- html标签必须加上mip标记，即:  &lt;html mip&gt;

- 必须包含 &lt;head&gt;和  &lt;body&gt;标签

- 必须在head标签中包含字符集声明:  &lt;meta charset="utf-8"&gt;，字符集统一为`utf-8`

- 必须在head标签中包含viewport设置标签:  &lt;meta name="viewport" content="width=device-width,minimum-scale=1"&gt;，推荐包含`initial-scale=1`

- 必须在head标签中包含 &lt; link rel="stylesheet" type="text/css" href="//m.baidu.com/static/ala/sf/static/css/miphtml_xxxxxx.css" &gt;

- 必须在head标签中包含 &lt;script async src="https://m.baidu.com/miphtml/v0.js"&gt; &lt;/script&gt;

- 必须在head标签中包含` &lt;style&gt;body {opacity: 0} &lt;/style&gt; &lt;noscript&gt;<style&gt;body {opacity: 1} &lt;/style&gt; &lt;/noscript&gt;

- 必须在body标签中包含 &lt;script src="//m.baidu.com/static/ala/sf/static/js/miphtml_main_xxxxxx.js"&gt;&lt;/script&gt;

##页面元素使用规范

MIP HTML 禁止使用对页面性能以及安全有较大影响的标签，请将其替换为MIP的特有标签（例如:将`img`标签替换为`mip-img`）:

|标签|使用范围|备注|
|--|--|--|
|img	|替换为mip-img||
|video	|替换为mip-video|暂未开放|
|audio	|替换为mip-audio|暂未开放|
|iframe	|替换为mip-iframe|暂未开放|
|style	|替换为&lt;style mip-custom&gt;|只能在head标签中使用一次|
|svg	|允许使用||
|button	|允许使用||
|link	|允许使用|不允许使用link标签进行样式表的加载|
|a	    |允许使用|不可以href="javascript:"，target必须设置为_blank|
|frame	|禁止使用||
|frameset|	禁止使用||
|object	|禁止使用||
|param	|禁止使用||
|applet	|禁止使用||
|embed	|禁止使用||
|form	|禁止使用||
|input elements	|禁止使用|包括: input, textareaa, select, option|
