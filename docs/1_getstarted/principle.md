# MIP 原理

> 天下武功 唯快不攻

MIP（Mobile Instant Page）是通过 MIP HTML，MIP JS 和 MIP Cache 三个组成部分实现的前端页面加速器。

用户访问MIP HTML页面的时候，首先，会从MIP Cache 中取缓存，如果用户所请求的页面在MIP Cache中存在，则直接展现，如果不存在，则会请求服务器来渲染页面，同时将页面缓存到MIP Cache。 MIP HTML 页面中所用到的MIP 组件都是通过MIP JS实现的，MIP JS 库通过控制 MIP HTML 页面中元素的展现，可以提升页面的性能。MIP JS 可以控制 MIP HTML 页面中的图片在最初加载时只展现首屏图片，当用户滑动页面，需要加载新的图片时才会进行加载，这样能够在很大程度上节省页面的渲染时间，提升用户体验。

