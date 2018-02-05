# mip-pix 统计

将 `<mip-pix>` 组件直接引入，可发送带有自定义参数的请求，用于统计页面访问情况。这些参数主要包括页面打开时间点，页面 `title` 和当面页面地址。  

标题|内容
----|----
类型|通用
所需脚本|无

## 组件使用场景
组件本身在页面不可见，但本元素只有滚动到屏幕可见范围内才触发初始化，发送请求（原理参考 [MIP 生命周期-firstInviewCallback](https://github.com/mipengine/mip-extensions/blob/master/docs/develop.md)），所以`<mip-pix>`有以下活用方法：

1. 在页面首屏或在 `<body>` 开始标签后引入，可以统计页面展现 PV。
2. 在正文末尾引用，可以统计文章的真实阅读量（阅读完毕）。
3. 紧挨一条广告引用，可以统计这条广告的真实展现量。
4. 在其它组件中将 `<mip-pix>` 动态插入，通过修改**自定义统计**参数，可以实时发送统计。


## 示例

接入方提供一个接收请求的服务地址，例如：`https://www.mipengine.org/a.gif`。

[warning] 由于 MIP-Cache 为 HTTPS 环境，`<mip-pix>` 中 `src` 参数指向的服务器地址必须支持 HTTPS

如果服务地址不支持 HTTPS，可以使用百度云加速或类似产品的 HTTPS 代理服务，向服务地址定向发送请求。

### 简单示例
```html
<mip-pix src="https://www.mipengine.org/a.gif?t=${TIME}&title=${TITLE}&host=${HOST}"></mip-pix>
```
`<mip-pix>` 会自动匹配参数，生成请求地址，最终请求为：

> `https://www.mipengine.org/a.gif?t=1487307586286&title=random_title&host=http%3A%2F%2Fwww.mipengine.org%2Findex.html`   

### 参数缺省写法
```html
<mip-pix src="https://www.mipengine.org/a.gif"></mip-pix>
```
`<mip-pix>` 会自动添加 `t`, `title`, `host` 参数，最终请求为：

> `https://www.mipengine.org/a.gif?t=1487307586286&title=random_title&host=http%3A%2F%2Fwww.mipengine.org%2Findex.html`   

### 添加自定义参数
```html
<mip-pix src="https://www.mipengine.org/a.gif?t=${TIME}&title=${TITLE}&host=${HOST}&area=A"></mip-pix>
```
自定义参数可拼接在 `src` 末尾，最终请求为：

> `https://www.mipengine.org/a.gif?t=1487307670913&title=random_title&host=http%3A%2F%2Fwww.mipengine.org%2Fmip-pix-test.html&area=A`   

### 添加 `<mip-experiment>` 实验分组
其中 `mip-x-button-color` 建议使用为 `'mip-x-'+'实验名'`，也可以自定义任意名称，对应的 `${xxx}` 内容会被替换成当前实验分组。  

```html
<mip-pix src="https://www.mipengine.org/a.gif?mip-x-button-color=${MIP-X-BUTTON-COLOR}&mip-x-font-color=${MIP-X-FONT-COLOR}"></mip-pix>
```

最终请求为：

> `https://www.mipengine.org/a.gif?t=1487307586286&title=random_title&host=http%3A%2F%2Fwww.mipengine.org%2Findex.html&mip-x-button-color=grey&mip-x-font-color=white&mip-x-font-color2=default`

- 如果本份流量在实验 A 被分到 01 组，则最终请求为 `mip-x-A=01`。
- 如果本份流量在实验 B 被分到默认组，则最终请求为 `mip-x-B=default`。
- 如果本份流量中未配置实验 C，却在 `<mip-pix>` 中存在 `mip-x-C=${MIP-X-C}` 取值，则最终请求为 `mip-x-C=default`。


### 添加referrer
在 HTML `<head>` 标签中增加 `<meta name="referrer" content="unsafe-url">`，可以在请求头中增加 `referrer` 信息。

## 属性
### src

说明：资源方服务地址  
必选项：是  

## 最终请求-参数说明

参数名|意义|示例|是否默认添加
----|----|----|----
`t`|当前时间|1487307670913|是
`title`|页面 `title`|random_title|是
`host`|当前页面地址|http%3A%2F%2Fwww.mipengine.org%2Fmip-pix-test.html|是
`mip-x-……`|`<mip-expriment>` 分组|(分组名)|否
