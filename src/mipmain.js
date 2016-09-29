/* deps */
// https://github.com/lahmatiy/es6-promise-polyfill
__inline('../deps/promise.js');
// https://github.com/camsong/fetch-ie8
__inline('../deps/fetch.js');
// https://github.com/WebReflection/document-register-element
__inline('../deps/document-register-element.max.js');
__inline('../deps/esl.js');
__inline('../deps/zepto.js');
__inline('../deps/naboo.js');
__inline('../deps/spark.js');
// https://github.com/camsong/fetch-json
__inline('../deps/fetch-jsonp.js');
__inline('./esl_config.js');

/* util */
__inline('./util/fn.js');
__inline('./util/gesture/gesture-recognizer.js');
__inline('./util/gesture/data-processor.js');
__inline('./util/gesture.js');
__inline('./util/platform.js');
__inline('./util/event-emitter.js');
__inline('./util/animation.js');
__inline('./util/event-action.js');

/* dom */
__inline('./dom/css-loader.js');
__inline('./dom/rect.js');
__inline('./dom/event.js');
__inline('./dom/css.js');
__inline('./dom/dom.js');


/* mip frame */
__inline('./layout.js');
__inline('./fixed-element.js');
__inline('./viewport.js');
__inline('./customElement.js');
__inline('./element.js');
__inline('./util.js');
__inline('./resources.js');
__inline('./viewer.js');

/* builtin components */
__inline('./components/mip-img.js');
__inline('./components/mip-pix.js');
__inline('./components/mip-carousel.js');
__inline('./components/mip-iframe.js');
__inline('./components/mip-video.js');
__inline('./components/index.js');

/* initialize */
__inline('./mip.js');
