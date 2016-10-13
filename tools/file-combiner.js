
var Processor = require('mip-processor');

var Combiner = Processor.derive({
    name: 'FileCombiner',
    files: {},
    sep: '',

    process: function (builder) {
        var promise = Promise.resolve();

        var startTime = new Date();
        builder.notify({
            type: 'PROCESS_PROCESSOR_START',
            body: this.name + ' processing ...'
        });

        Object.keys(this.files).forEach(function (filename) {

            var data = this.files[filename]
                .map(function (itemFile) {
                    var file = builder.getFile(itemFile);
                    if (file) {
                        return file.getData();
                    }

                    return '';
                })
                .join(this.sep);

            builder.getFile(filename).setData(data);

        }, this);

        builder.notify({
            type: 'PROCESS_PROCESSOR_END',
            body: this.name + ' done! (' + (new Date() - startTime) + 'ms)'
        });

        return promise;
    }


});

module.exports = exports = Combiner;
