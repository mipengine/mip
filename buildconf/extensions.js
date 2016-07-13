fis.set('project.files', [
   'newextensions/**'     
]);
fis.hook('amd', {
});

fis.match('*', {
    release: false
});

fis.match('newextensions/*/*/*.js', {
    release: true
});