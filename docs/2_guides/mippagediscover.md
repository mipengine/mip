# 让搜索发现你的页面

在某些情况下，站点对于同一个html页面，可能存在两种，一个是mip html，一个是standard html。
当百度检索到你页面的standard html时，你可以通过在mip中添加如下的代码，以保证百度更好的检索到你的mip html，同时也可以让你的mip html更好的继承standard html的权重等相关策略信息。

## 在head中添加link标签让百度搜索发现你的页面

### 两种页面同时存在

    在standard html中添加：

    <link rel="miphtml" href="https://www.forexample.com/mip/example.html">

    在mip html中添加：

    <link rel="standardhtml" href="https://www.forexample.com/standard/example.html">

### 如果只有mip html
	
	同样需要添加，指向自己：
    
    <link rel="standardhtml" href="https://www.forexample.com/amp/example.html">
