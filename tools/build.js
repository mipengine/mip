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
        'src/**/*.js',
        'deps/naboo.js',
        'deps/zepto.js',
        'deps/spark.js',
        'deps/fetch-jsonp.js'
    ]
});

var testAmdCompiler = new AMDCompiler({
    config: {
        baseUrl: path.resolve(__dirname, '..', 'src'),
        paths: {
            'test': '../test',
            'zepto' : '../deps/zepto',
            'naboo' : '../deps/naboo',
            'spark' : '../deps/spark',
            'fetch-jsonp' : '../deps/fetch-jsonp'
        }
    },
    files: [
        'src/**/*.js',
        'deps/naboo.js',
        'deps/zepto.js',
        'deps/spark.js',
        'deps/fetch-jsonp.js',
        'test/**/*.js'
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

var bootstrapper = {
    name: 'AddBootStrap',
    process: function (builder) {
        var file = builder.getFile('src/mip.js');
        var configFileContent = require('fs').readFileSync(
            path.resolve(__dirname, 'mip-bootstrap.js'), 'UTF-8'
        );

        file.setData(file.getData() + '\n\n' + configFileContent);
        return Promise.resolve();
    }
};

var outputFilter = {
    name: 'OutputFilter',
    files: ['**/*'],
    processFile: function (file) {
        if (file.outputPath !== 'src/mip.js'
            && file.outputPath !== 'deps/jquery.js'
            && file.outputPath !== 'src/less/mip.css'
        ) {
            file.outputPath = null;
        }
    }
};


var pathMapper = {
    name: 'PathMapper',
    files: ['**/*'],
    processFile: function (file) {
        if (file.outputPath) {
            file.outputPath = file.outputPath.slice(file.outputPath.lastIndexOf('/') + 1);
        }
    }
};

// Processors
var processors = {
    'build': [
        amdCompiler,
        amdPacker,
        lessProcessor,
        mainCombiner,
        bootstrapper,
        jsCompressor,
        outputFilter,
        pathMapper
    ],
    'debug': [
        amdCompiler,
        amdPacker,
        lessProcessor,
        mainCombiner,
        bootstrapper,
        // jsCompressor,
        outputFilter,
        pathMapper
    ],
    'test': [
        testAmdCompiler,
        amdPacker,
        // lessProcessor,
        mainCombiner,
        bootstrapper,
        // jsCompressor,
        // outputFilter,
        // pathMapper
    ]
};

// build, debug, test
var runType = 'build';

if (!(runType in processors)) {
    throw 'Command error: '+ runType;
}

var builder = new Builder({
    dir: path.resolve(__dirname, '..'),
    processors: processors[runType],

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
        runType !== 'test' ? '!test/**/*' : '',
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
