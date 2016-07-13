/* * 线上需要把代码压缩打开
 *
 */
/*
fis.match('*.js', {
    useHash: false, // default is true
    optimizer: fis.plugin('uglify-js', {
    output : {
        max_line_len : 500
    }
    })
});
*/
fis.set('project.files', [
   'newbuiltins/mip_builtins.js'     
]);
fis.hook('amd', {
});

fis.match('*', {
    release: false
});

fis.match('newbuiltins/mip_builtins.js', {
    release: true
});

