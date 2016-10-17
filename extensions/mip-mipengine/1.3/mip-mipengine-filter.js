/**
 * @file 筛选
 * @author liangjiaying@baidu.com
 * @time 2016.09
 */
define(function (require) {
    var customElement = require('customElement').create();

    /**
     * build
     */
    function build() {
        var filter = new Filter({
            filterWrap: document.querySelector('.filter'),
            itemWrap: document.querySelector('.timeline-content-wrap')
        });

        filter.init();
    }

    var util = {
        // used multiple times
        containReg: function (txt) {
            return new RegExp('(\\s+|^)' + txt + '(\\s+|$)');
        },
        // check if dom has certain class
        hasClass: function (ele, cls) {
            return ele.className.match(this.containReg(cls));
        },
        // add certain class to dom
        addClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                return;
            }
            ele.className = (ele.className + ' ' + cls).trim();
        },
        // remove certain class from dom
        removeClass: function (ele, cls) {
            if (!this.hasClass(ele, cls)) {
                return;
            }
            ele.className = ele.className.replace(this.containReg(cls), ' ').trim();
        },
        // toggle certain class of dom
        toggleClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                this.removeClass(ele, cls);
            } else {
                this.addClass(ele, cls);
            }
        }
    };
    /**
    * define a Filter, 
    * opt = {
        'filterWrap' : document.querySelector('.xx1'),
        'itemWrap' : document.querySelector('.xx2'),
        'mobileWidth' : 767,
        'emptyTip' : '没有符合的内容'
    * }
    * filterWrap: mandatory. dom wrapper of filter
    * itemWrap: mandatory. dom wrapper of item
    * mobileWidth: maximum width to show wise layout
    * emptyTip: shown to user if no item applys to filter
    */
    function Filter(opt) {
        var _this = this;
        if (!opt || !opt.filterWrap || !opt.itemWrap) {
            return;
        }

        opt.mobileWidth = opt.mobileWidth || 767;
        opt.emptyTip = opt.emptyTip || '没有符合的内容';

        /**
        * shoot: at first time,
        * add filter color and text to default-"none"
        */
        this.init = function () {
            var initOpt = opt.filterWrap.querySelector('[data-filtertype="all"]');
            util.addClass(initOpt, 'active');
            var text = initOpt.innerText.split(' ')[0];
            opt.filterWrap.querySelector('.filter-result').innerText = '筛选：无';
        };

        /**
        * shoot: when a filter is clicked.
        * add filter color and text to selected one.
        */
        this.filterSelect = function (e) {
            var oldEle = opt.filterWrap.querySelector('.active');
            var newEle = e.target;
            util.removeClass(oldEle, 'active');
            util.addClass(e.target, 'active');
            var text = newEle.innerText.replace(newEle.querySelector('.filter-num').innerText, '');
            if (text === '查看全部') {
                text = '无';
            }
            opt.filterWrap.querySelector('.filter-result').innerText = '筛选：' + text;
            // in wise, when select, collapse filter
            if (window.innerWidth <= opt.mobileWidth) {
                _this.toggleFilter();
            }
            _this.applyFilter(newEle.dataset.filtertype);
        };

        /**
        * shoot: on mobile when filter btn is clicked.
        * slide up or down the whole filter.
        */
        this.toggleFilter = function () {
            var listWrap = opt.filterWrap.querySelector('.filter-list');

            // hide and show filter list only on wise
            if (window.innerWidth <= opt.mobileWidth) {

                if (util.hasClass(listWrap, 'show')) {
                    // hide filter list
                    listWrap.style.height = '0px';
                } else {
                    // show filter list
                    listWrap.style.transition = 'none';
                    listWrap.style.WebkitTransition = 'none';
                    listWrap.style.height = 'auto';
                    var height = getComputedStyle(listWrap).height;

                    // target height acquired, now start the animation
                    listWrap.style.height = '0px';
                    listWrap.style.transition = 'height 0.3s';
                    setTimeout(function () {
                        // trick: in setTimeout, or there won't be any animation
                        listWrap.style.height = height;
                    }, 10);
                }
                util.toggleClass(listWrap, 'show');
            }
        };

        /**
        * shoot: when filter btn is clicked.
        * hide items that cant pass the filter.
        */
        this.applyFilter = function (filter) {
            var num = 0;
            //hack: arr.forEach() cannot be used in uc&qq browser
            for (var i = 0; i < opt.itemWrap.querySelectorAll('.filter-item').length; i++) {
                var item = opt.itemWrap.querySelectorAll('.filter-item')[i];
                if (item.dataset.filtertype.match(util.containReg(filter)) || filter === 'all') {
                    // show item
                    num ++;
                    item.style.display = 'block';
                } else {
                    // hide item
                    item.style.display = 'none';
                }
            }
            if (!num) {
                // no item can be shown, add "no item" text
                if (!opt.itemWrap.querySelector('.filter-emptytip')) {
                    var emptyTip = document.createElement('div');
                    util.addClass(emptyTip, 'filter-emptytip');
                    emptyTip.innerHTML = opt.emptyTip;
                    opt.itemWrap.appendChild(emptyTip);
                } else {}
            } else {
                var emptyTip = opt.itemWrap.querySelector('.filter-emptytip');
                if (emptyTip) {
                    opt.itemWrap.removeChild(emptyTip);
                }
            }
            window.scrollTo(0,0);
        };

        /**
        * add click event to all filters
        * when clicked, select the filter,
        * if wise, collapse filter list.
        */
        for (var i = 0; i < opt.filterWrap.querySelectorAll('.filter-link').length; i++) {
            var ele = opt.filterWrap.querySelectorAll('.filter-link')[i];
            ele.addEventListener('click', _this.filterSelect);
        }

        /**
        * add click event to filter result, which show only on wise.
        * when clicked, uncollapse and collapse filter list.
        */
        opt.filterWrap.querySelector('.filter-result').addEventListener('click', _this.toggleFilter);
    }

    // 初始化
    customElement.prototype.init = function () {
        this.build = build;
    };
    return customElement;
});

require(['mip-mipengine-filter'], function (filter) {
    // 引入组件需要的css文件，选填
    MIP.css.mipMipengineFilter += __inline('./mip-mipengine-filter.less');
    //注册组件
    MIP.registerMipElement('mip-mipengine-filter', filter, MIP.css.mipMipengineFilter);
});