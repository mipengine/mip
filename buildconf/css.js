fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});
fis.match('*', {
    release: false
});
fis.match('mip-common.less', {
    useHash: false, // default is true
    optimizer: fis.plugin('clean-css',{
        keepBreaks : false
    }),
    release: 'css/mipmain.css'
});

fis.media('debug').match('*.{js,css,less}', {
    useHash: false,
    optimizer: null
});