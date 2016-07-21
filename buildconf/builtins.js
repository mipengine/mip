fis.set('project.files', [
   'builtins/mip_builtins.js'     
]);

fis.hook('amd', {
});


fis.match('*', {
    release: false
});

fis.match('builtins/mip_builtins.js', {
    useHash: false,
    optimizer: fis.plugin('uglify-js'),
    release: 'mip_builtins.js'
});
fis.media('debug').match('*.{js,css,less}', {
    useHash: false,
    optimizer: null
});


