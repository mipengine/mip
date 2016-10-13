var path = require('path');

var Builder = require('mip-builder');
var reporter = require('./build-reporter');

var amdProcessor = require('mip-processor-amd');
var AMDCompiler = amdProcessor.Compiler;
var AMDPacker = amdProcessor.Packer;
var LessProcessor = require('mip-processor-less');
var JSCompressor = require('mip-processor-jscompress');

var requireConfig = {
    baseUrl: path.resolve(__dirname, '..', 'src'),
    paths: {
        'zepto' : '../deps/zepto',
        'naboo' : '../deps/naboo',
        'spark' : '../deps/spark',
        'fetch-jsonp' : '../deps/fetch-jsonp'
    }
    // ,
    // packages: [
    //     {
    //         name: 'mip',
    //         main: 'mip',
    //         location: '../src'
    //     }
    // ]
};

// init processors
var amdCompiler = new AMDCompiler({
    config: requireConfig,
    files: [
        '!deps/**/*',
        'deps/naboo.js',
        'deps/spark.js',
        'deps/zepto.js',
        'deps/fetch-jsonp.js'
    ]
});

var amdPacker = new AMDPacker({
    config: requireConfig,
    modules: [this.mainModule]
});

var lessProcessor = new LessProcessor({
    files: ['src/less/mipmain.less']
});

var jsCompressor = new JSCompressor();

var requireConfigAdder = {
    process: function (builder) {
        var file = builder.getFile('src/mip.js');

        file.setData(
            require('fs').readFileSync(
                path.resolve(__dirname, 'require-config.js'), 'UTF-8'
            )
            + '\n',
            + file.getData()
        );

        return Promise.resolve();
    }
};

var envPrepareProcessor = {
    process: function (builder) {
        var file = builder.getFile('src/mip.js');

        var content = [
            builder.getFile('deps/promise.js').getData(),
            builder.getFile('deps/fetch.js').getData(),
            builder.getFile('deps/document-register-element.max.js').getData(),
            builder.getFile('deps/esl.js').getData(),
            file.getData()
        ];

        file.setData(content.join('\n\n'));

        return Promise.resolve();
    }
};


var builder = new Builder({
    dir: path.resolve(__dirname, '..'),
    processors: [
        amdCompiler,
        amdPacker,
        lessProcessor,
        requireConfigAdder,
        envPrepareProcessor
    ],

    files: [
        '!package.json',
        '!Makefile',
        '!karma.conf.js',
        '!.editorconfig',
        '!.gitconfig',
        '!README.md',
        '!dist/**/*',
        '!examples/**/*',
        '!test/**/*',
        '!extensions/**/*',
        '!tools/**/*'
    ],

    outputDir: path.resolve(__dirname, '..', 'dist'),
});

builder.setReporter(reporter);

// do build
return builder.build();
