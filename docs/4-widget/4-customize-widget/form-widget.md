# mip-form

mip-form 用来支持 mip 中的表单提交。

描述|用来支持 mip 中的表单提交。
----|----
可用性|稳定
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1.1/mip-form.js

## 1. 使用

在MIP HTMl中，示例如下：

```
<mip-form method="post" url="www.baidu.com">
     <input type="input" name="username" validatetarget="username" validatetype="must" placeholder="姓名">
     <div target="username">姓名不能为空</div>
     <input type="input" name="email" validatetarget="email" validatetype="email" placeholder="邮件">
     <div target="email">填写正确的email</div>
     <input type="input" name="phone" validatetarget="phone" validatetype="phone" placeholder="电话">
     <div target="phone">填写正确的电话格式</div>
     <input type="input" name="customnumber" validatetarget="custom" validatetype="custom" validatereg=^[0-9]*$ placeholder="我是自定义验证规则数字">
     <div target="custom">请输入正确的数字</div>
     <input type="submit" value="提交">
 </mip-form>
```

组件所涉及的属性有   表单提交方法（method），表单提交url（url） validatetarget(验证提示对应tag)  validatetype(验证类型)  自定义验证(validatereg)

- **表单提交方法（method)**

    - 是否必填：是


- **表单提交url（url)**

    - 是否必填: 是


- **validatetarget(验证提示对应tag)**

    - 是否必填：否

    - 说明: 用于对应错误时的提示显示元素的查找

- **validatetype(验证类型) **

    - 是否必填：否

    - 说明: 用于支持简单的验证。目前提供email、phone、idcar、custom。当为custom时则需要填写validatereg

- **自定义验证(validatereg)**

    - 是否必填：否

    - 说明: 补充站长个性化的验证规则。如果validatetype为custom时需填写相应验证规则
