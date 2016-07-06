# mip-pix通用统计组件

描述|用通用https代理组件
----|----
可用性|稳定
所需脚本|
示例|

## 1. 使用

接入方提供一个接收请求的服务地址，例如：//yourselfdomain/mip/tj.gif，如果服务地址不支持HTTPS，可以使用百度提供的HTTPS代理服务使用MIP提供的插件，向服务地址定向发送请求。如：

```
    <mip-pix src="//yourselfdomain/mipurl/tj.gif?t={TIME}&title={TITLE}&host={HOST}&from=baidu"></mip-pix>
```

MIP会自动匹配参数，生成请求地址，例如：//yourselfdomain/mipurl/tj.gif?t=1459415529464&title=MIP_PIX_DEMO&host=mip.bdstatic.com&from=baidu

- 目前支持的参数: {TIME}，{TITLE}，{HOST}

## 2. 属性

通用统计组件所涉及的属性有：服务地址（src）

- **服务地址（src）**

	- 是否必填：是

    - 说明：资源方服务地址

## 3. 是否基础组件

否