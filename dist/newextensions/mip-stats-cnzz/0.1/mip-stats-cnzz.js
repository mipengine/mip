/**
* CNZZ统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define('newextensions/mip-stats-cnzz/0.1/mip-stats-cnzz', ['require', 'customElement'], function(require){

    var customElem = require('customElement');

    customElem.prototype.init = function() {

        this.mibCreatedCallback = render;

    };

    function render() {
        if (this.isRender) {
            return; 
        }

        this.isRender = true;
        
        var token = this.getAttribute('token');

        var $this = $(this);
        var html = [
            '<script type="text/javascript">',
                'var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id=\'cnzz_stat_icon_'+token+'\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D'+token+'\' type=\'text/javascript\'%3E%3C/script%3E"));',
            '</script>'
        ];

        $this.append(html.join(''));
    }

    return customElem;
});