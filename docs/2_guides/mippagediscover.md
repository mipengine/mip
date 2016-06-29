# 让搜索发现你的页面

在某些情况下，站点对于同一个html页面，可能存在两种，一个是mip html，一个是standard html。如果百度搜索发现了你的standard html，怎么让她发现你的对应的mip html，请往下看

## 在head中添加link标签让百度搜索发现你的页面

### 两种页面同时存在

    在standard html中添加：

    <link rel="miphtml" href="https://www.forexample.com/mip/example.html">

    在mip html中添加：

    <link rel="standardhtml" href="https://www.forexample.com/standard/example.html">

### 如果只有mip html
	
	同样需要添加，指向自己：
    
    <link rel="standardhtml" href="https://www.forexample.com/amp/example.html">
