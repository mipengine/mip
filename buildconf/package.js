fis.set('project.files', [
   'build/mipframe.js',
   'build/mip_builtins.js' 
]);
fis.match('::package', {
    packager: fis.plugin('map', {
      useTrack : false,
      'mipmain.js': [
          'build/mipframe.js',
          'build/mip_builtins.js'
      ]
    })
});
