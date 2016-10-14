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
        '**/*.js',
        '!deps/**/*'
    ]
});

var amdPacker = new AMDPacker({
    config: requireConfig,
    modules: ['mip']
});

var lessProcessor = new LessProcessor({
    files: ['src/less/mip.less']
});

var jsCompressor = new JSCompressor();

var requireConfigAdder = {
    process: function (builder) {
        var file = builder.getFile('src/mip.js');
        var configFileContent = require('fs').readFileSync(
            path.resolve(__dirname, 'require-config.js'), 'UTF-8'
        );

        file.setData(configFileContent + '\n' + file.getData());
        return Promise.resolve();
    }
};

var Combiner = require('./file-combiner');
var mainCombiner = new Combiner({
    sep: '\n\n',
    files: {
        'src/mip.js': [
            'deps/promise.js',
            'deps/fetch.js',
            'deps/document-register-element.max.js',
            'deps/esl.js',
            'src/mip.js'
        ]
    }
});


var builder = new Builder({
    dir: path.resolve(__dirname, '..'),
    processors: [
        amdCompiler,
        amdPacker,
        lessProcessor,
        requireConfigAdder,
        mainCombiner,
        jsCompressor,
        {
            name: 'OutputFilter',
            processFile: function (file) {
                if (file.outputPath !== 'src/mip.js'
                    && file.outputPath !== 'deps/jquery.js'
                    && file.outputPath !== 'src/less/mip.css'
                ) {
                    file.outputPath = null;
                }
            }
        },
        {
            name: 'PathMapper',
            processFile: function (file) {
                if (file.outputPath) {
                    file.outputPath = file.outputPath.slice(file.outputPath.lastIndexOf('/') + 1);
                }
            }
        }
    ],

    files: [
        '!**/.*',
        '!package.json',
        '!node_modules/**/*',
        '!.git/**/*',
        '!Makefile',
        '!karma.conf.js',
        '!.editorconfig',
        '!.gitignore',
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
builder.build()
    .catch(function (e) {
        console.log(e);
    });
