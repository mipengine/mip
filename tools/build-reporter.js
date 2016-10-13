/**
 * @file 命令行的构建reporter
 * @author errorrik(errorrik@gmail.com)
 */


var chalk = require('chalk');

var lineBreakFlag = true;

var methods = [
    {
        name: 'success',
        color: chalk.green
    },
    {
        name: 'info',
        color: chalk.green
    },
    {
        name: 'warn',
        color: chalk.yellow
    },
    {
        name: 'error',
        color: chalk.red
    }
];

methods.forEach(function (method) {
    exports[method.name] = function (msg) {
        if (lineBreakFlag) {
            process.stdout.write('\n');
        }

        msg = msg ? method.color(msg) : '';
        process.stdout.write(msg);

        lineBreakFlag = true;
    };
});


exports.clearLine = function () {
    if (typeof process.stdout.clearLine === 'function') {
        process.stdout.clearLine();
    }

    if (typeof process.stdout.cursorTo === 'function') {
        process.stdout.cursorTo(0);
    }

    lineBreakFlag = false;
};
