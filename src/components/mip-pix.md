# mip-pix 统计

将 mip-pix 组件直接引入，可用于统计页面PV。这些统计主要包括页面打开时间点，页面title和当面页面地址。  
在其它组件中将 mip-pix 动态插入，通过修改src参数，可以实时发送统计。

标题|内容
----|----
类型|通用
所需脚本|无

## 示例

接入方提供一个接收请求的服务地址，例如：`https://www.mipengine.org/a.gif`，此时要求服务器地址为 HTTPS。如果服务地址不支持 HTTPS，可以使用百度云加速或类似产品的HTTPS代理服务，向服务地址定向发送请求。如：
### 简单示例
```html
    <mip-pix src="https://www.mipengine.org/a.gif?t={TIME}&title={TITLE}&host={HOST}"></mip-pix>
```
最终请求为：
> https://www.mipengine.org/tj.gif?t=1487307586286&title=random_title&host=http%3A%2F%2Fwww.mipengine.org%2Findex.html   
MIP会自动匹配参数，生成请求地址，例如：https://www.mipengine.org/a.gif?t=1459415529464&title=MIP_PIX_DEMO&host=mip.bdstatic.com&from=baidu

### 参数缺省写法
```html
    <mip-pix src="https://www.mipengine.org/a.gif"></mip-pix>
```
最终请求为：
> https://www.mipengine.org/tj.gif?t=1487307586286&title=random_title&host=http%3A%2F%2Fwww.mipengine.org%2Findex.html   
目前支持自动添加 t=当前时间，title=页面title，host=当前页面地址

### 添加自定义参数
```html
    <mip-pix src="https://www.mipengine.org/a.gif?t={TIME}&title={TITLE}&host={HOST}&area=A"></mip-pix>
```
最终请求为：
> https://www.mipengine.org/a.gif?t=1487307670913&title=random_title&host=http%3A%2F%2Fwww.mipengine.org%2Fmip-pix-test.html&area=A   

### 添加referrer
在html `<head>` 标签中增加`<meta name="referrer" content="always">`, 可以在请求头中增加referrer信息

## 属性
### src

说明：资源方服务地址    
必选项：是    

## 参数说明

|参数名|意义|示例|是否默认添加|
|--|--|--|--|
|t|当前时间|1487307670913|是|
|title|页面title|random_title|是|
|host|当前页面地址|http%3A%2F%2Fwww.mipengine.org%2Fmip-pix-test.html|是|

