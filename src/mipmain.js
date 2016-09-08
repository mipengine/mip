/* 
   mipmain do not using jquery | zepto
   see @https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README.zh-CN.md
   补充 css、dom、dom-event 文档
*/

/* polyfills */
// https://github.com/lahmatiy/es6-promise-polyfill
__inline('./polyfills/promise.js');
// https://github.com/camsong/fetch-ie8
__inline('./polyfills/fetch.js');
// https://github.com/WebReflection/document-register-element
__inline('./polyfills/document-register-element.max.js');

/* libs */
__inline('./deps/esl.js');
__inline('./deps/esl_config.js');
__inline('./deps/zepto.js');
__inline('./deps/naboo.js');
__inline('./deps/spark.js');
// https://github.com/camsong/fetch-json
__inline('./deps/fetch-jsonp.js');

/* components */
__inline('./components/fn.js');
__inline('./components/css-loader.js');
__inline('./components/layout.js');
__inline('./components/gesture-recognizer.js');
__inline('./components/gesture.js');
__inline('./components/platform.js');
__inline('./components/rect.js');
__inline('./components/event.js');
__inline('./components/css.js');
__inline('./components/dom.js');
__inline('./components/dom-event.js');
__inline('./components/animation.js');
__inline('./components/gesture.js');
__inline('./components/event-action.js');

/* mip frame */
__inline('./viewport.js');
__inline('./customElement.js');
__inline('./element.js');
__inline('./util.js');
__inline('./resources.js');
__inline('./viewer.js');

/* builtins */
__inline('./builtins/mip-img.js');
__inline('./builtins/mip-pix.js');
__inline('./builtins/mip-carousel.js');
__inline('./builtins/mip-iframe.js');
__inline('./builtins/mip-video.js');
__inline('./builtins/mip_builtins.js');

/* initialize */
__inline('./mip.js');

