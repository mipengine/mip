fis.config.set("project.watch.usePolling", true);

fis.match('*', {
    release: false
});
/*
 * 线上需要把代码压缩打开
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

fis.match('Miphtml_main.js', {
    useHash: true,
    optimizer: fis.plugin('uglify-js', {
        output : {
            max_line_len : 500
        }
    }),
    release: 'Miphtml.js'
});

fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

/*
fis.match('*.{less,css}', {
    useHash: true, // default is true
    optimizer: fis.plugin('clean-css',{
        keepBreaks : true
    })
});
*/

fis.match('Mip-common.less', {
    useHash: true, // default is true
    optimizer: fis.plugin('clean-css',{
        keepBreaks : true
    }),
    release: 'Miphtml.css'
});

fis.match('/src/(**).js', {
    moduleId: '$1'
});

fis.hook('amd', {
});

/*
fis.media('dev').match('*.{js,css,less}', {
    useHash: false,
    optimizer: null
});
*/
