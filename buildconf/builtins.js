fis.set('project.files', [
   'newbuiltins/mip_builtins.js'     
]);

fis.hook('amd', {
});

fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});
fis.match('*', {
    release: false
});
fis.match('newbuiltins/mip_builtins.js', {
    useHash: false,
    optimizer: fis.plugin('uglify-js', {
        output: {
            comments: /^!/,
            max_line_len : 500
        },
        mangle: {
            except: 'exports, module, require, define'
        }
    }),
    release: 'mip_builtins.js'
});



