/**
 * @file: mip-ck-basecss.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-08 18:02:31
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-26 19:03:09
 */
/* global Vue, _, yog, MIP */

define(['require', 'customElement'], function (require) {
    var customElem = require('customElement').create();

    return customElem;
});
require(['mip-ck-basecss'], function (basecss) {
    var css = __inline('./mip-ck-basecss.less');

    MIP.css.mipckbasecss = css;
    MIP.registerMipElement('mip-ck-basecss', basecss, MIP.css.mipckbasecss);
});
