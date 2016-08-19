var option = fis.get('options')['_'][1];

var fileList = {
    css: [
        '/less/mipmain.less'
    ],
    extensions: [
        '/extensions/**'
    ],
    mipmain: [
        '/src/mipmain.js'
    ]
};
if (option && fileList[option]) {
    fis.set('project.files', fileList[option]);
} else {
    var result = [];
    for (var i in fileList) {
        result = result.concat(fileList[i]);
    }
    fis.set('project.files', result);
}




fis.match('*', {
    release: false
});
fis.hook('amd');

/* css 配置 */
fis.match('/less/(**).less', {
    parser: fis.plugin('less'),
    optimizer: fis.plugin('clean-css',{
        keepBreaks : false
    }),
    rExt: '.css',
    release: 'css/$1'
});

/* extension */
fis.match('extensions/*/**.js', {
    optimizer: fis.plugin('uglify-js'),
    release: true
});
fis.match('extensions/*/**.less', {
    parser: fis.plugin('less'),
    optimizer: fis.plugin('clean-css',{
        keepBreaks : false
    }),
    rExt: '.css',
    release: true
});
fis.match('extensions/*/**.{svg,eot,woff,woff2,ttf,otf,jpg,png}', {
    release: true
});


/* mipmain */
fis.match('/src/(**).js', {
    optimizer: fis.plugin('uglify-js'),
    moduleId: '$1'
});
fis.match('/src/deps/zepto.js', {
    moduleId: 'zepto'
});
fis.match('src/mipmain.js', {
    release: 'mipmain.js'
});



fis.media('mipmain');
fis.media('css');
fis.media('extensions');


fis.media('debug').match('*.{js,css,less}', {
    useHash: false,
    optimizer: null
});
