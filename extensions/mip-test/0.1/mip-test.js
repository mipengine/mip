/**
 *  for test
 *
 **/
define(function () {
    'use strict';
    var customEle = require('customElement').create();
    var util = require('util');
    var create = util.dom.create;
    var Event = require('components/event');
    var viewport = require('viewport');
    var fetchJsonp = require('fetch-jsonp');
    var Naboo = require('naboo');
    var Gesture = require('components/gesture');
    var css = util.css;

    var createElements = function (fragment, name, obj) {
        var elementName = name.charAt(0).toLowerCase() + name.slice(1) + 'Element';
        fragment.appendChild(create('<h4>' + name + '</h4>'));
        fragment.appendChild(obj[elementName] = create('<div></div>'));
    };
    var list = [
        'Viewport',
        'ViewportChanged',
        'Gesture',
        'Css',
        'Dom',
        'Event',
        'EventAction',
        'EventDom',
        'InviewCallback',
        'ViewportCallback',
        'Fetch',
        'FetchJsonp',
        'Animate',
        'Rect'
    ];
    var viewportHtml = function () {
        return [
            'width:' + viewport.getWidth(),
            'height:' + viewport.getHeight(),
            'scrollTop:' + viewport.getScrollTop(),
            'scrollHeight:' + viewport.getScrollHeight(),
            'rect:' + JSON.stringify(viewport.getRect())
        ].join('<br>');
    };

    var createButton = function (text) {
        return create('<div class="mip-test-button">' + text + '</div>');
    };

    var count = 0;

    customEle.prototype.build = function () {
        try {
        var element = this.element;
        element.id = 'mip-test' + ++count;
        var fragment = document.createDocumentFragment();
        var self = this;
        // 创建测试dom
        list.forEach(function (value) {
           createElements(fragment, value, self);
        });

        // Viewport
        this.viewportElement.innerHTML = viewportHtml();
        viewport.on('scroll', function () {
            self.viewportElement.innerHTML = viewportHtml();
        });
        viewport.on('changed', function () {
            self.viewportChangedElement.innerHTML = viewport.getScrollTop() + ' ' + Date.now();
        });

        // Gesture
        var gestureResult = create('<div style="height:30px;position:relative;font-weight:bold;font-size:18px;"></div>');
        var firstGestureResult = create('<div style="background:#e6e6e6;color:#333;height:30px;position:absolute;left:0;top:0;"></div>');
        var secondGestureResult = create('<div style="background:#e6e6e6;color:#987;height:30px;position:absolute;top:0;left:0;"></div>');
        var resultsElements = [firstGestureResult, secondGestureResult];
        gestureResult.appendChild(firstGestureResult);
        gestureResult.appendChild(secondGestureResult);
        this.gestureElement.appendChild(gestureResult);
        var gestureCount = 0;
        var changeGestureText = function (text) {
            css(resultsElements, {transition: '', opacity: 1, zIndex: 0});
            css(firstGestureResult, 'zIndex', 1);
            secondGestureResult.innerHTML = text;
            Naboo.css(firstGestureResult, {opacity: 0}).start();
            var tmp = firstGestureResult;
            firstGestureResult = secondGestureResult;
            secondGestureResult = tmp;
        };

        var gestureButton = createButton('Gesture Tap');
        this.gestureElement.appendChild(gestureButton);
        var tapGesture = new Gesture(gestureButton);
        tapGesture.on('tap', function (event, data) {
            changeGestureText(data.type);
        });

        var gestureButton = createButton('Gesture Tap and Double Tap');
        this.gestureElement.appendChild(gestureButton);
        var tapanddobuleGesture = new Gesture(gestureButton);
        tapanddobuleGesture.on('tap doubletap', function (event, data) {
            changeGestureText(data.type);
        });

        var gestureButton = createButton('Gesture Swipe');
        this.gestureElement.appendChild(gestureButton);
        css(gestureButton, 'height', 100);
        var swipeGesture = new Gesture(gestureButton, {
            preventDefault: true
        });
        swipeGesture.on('swipe', function (event, data) {
            changeGestureText(data.type + ' ' + data.swipeDirection);
        });

        // css
        var cssEle = create('<div>Css Element</div>');
        this.cssElement.appendChild(cssEle);
        css(cssEle, {
            width: 200,
            height: 50,
            'font-family': 'courier new',
            'font-size': 18,
            background: '#567',
            color: '#fff'
        });
        css(cssEle, 'margin-left', 20);

        // dom
        var domEle = this.domElement;
        domEle.innerHTML = '<div class="test">\
            <div class="closestTo test">\
                <div class="closest">\
                    <div class="matches"></div>\
                </div>\
            </div>\
        </div>';
        var matchesEle = domEle.querySelector('.matches');
        var closestEle = util.dom.closest(matchesEle, '.closest');
        var closestEleNull = util.dom.closest(matchesEle, '.closestnull');
        var closestToEle = util.dom.closestTo(matchesEle, '.test', domEle.querySelector('.closestTo'));

        matchesEle.innerHTML = [
            'matches: ' +  util.dom.matches(matchesEle, '.matches'),
            'closest: ' + (closestEle.nodeType === 1),
            'closest_null: ' + (closestEleNull === null),
            'closestTo: ' + closestToEle.classList.contains('closestTo'),
            'contains: ' + util.dom.contains(closestToEle, matchesEle),
            'contains_false: ' + (util.dom.contains(matchesEle, cssEle) === false)
        ].join('<br>');

        // Event
        var eventElement = this.eventElement;
        var obj = {
            test: 1,
            test1: 2,
            test2: 3
        };
        var eventTester = new Event({
            context: obj
        });
        eventTester.on('test test1', function (data) {
            if (data.type) {
                eventElement.innerHTML += data.type + ': ' + this[data.type] + '<br>';
            }
        });
        eventTester.trigger('test', {
            type: 'test'
        });
        eventTester.trigger('test1', {
            type: 'test1'
        });
        eventTester.trigger('test test1', {
            type: 'test2'
        });

        // Event Action
        this.eventActionElement.innerHTML = '<div on="tap:' + element.id + '.eventaction(event-action:true)">\
            <div class="result-for-event"></div>\
            <div  class="mip-test-button">Click For Event Action</div>\
        </div>'
        var resultForEventAction = this.eventActionElement.querySelector('.result-for-event');
        this.addEventAction('eventaction', function (event, str) {
            resultForEventAction.innerHTML = str;
        });

        // Event Dom
        var eventDom = createButton('Click For Event Dom');
        var eventDomRet = create('<div></div>');
        this.eventDomElement.appendChild(eventDomRet);
        this.eventDomElement.appendChild(eventDom);
        this.eventDomElement.classList.add('event-dom-test');
        util.event.delegate(this.element, '.event-dom-test', 'click', function (e) {
            eventDomRet.innerHTML = 'click: true';
        });
        eventDomRet.dispatchEvent(util.event.create('click', true, true));

        // fetch
        var fetchElement = this.fetchElement;
        var pro = fetch(location.href);
        pro.then(function (res) {
            return res.text();
        }).then(function (text) {
            fetchElement.innerHTML = 'fetch: ' + (text.search('mip-test') !== -1);
        });

        // fetch jsonp
        var fetchJsonpElement = this.fetchJsonpElement;
        fetchJsonp('http://opendata.baidu.com/api.php?query=nba&co=&resource_id=15108&ie=utf8&oe=gbk&format=json&tn=baidu', {
            jsonpCallback: 'cb'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            fetchJsonpElement.innerHTML = 'fetchJsonp: ' + ('status' in data);
        });

        // animate
        var aniButton = createButton('Click For Animate');
        var aniElement = create('<div></div>');
        this.animateElement.appendChild(aniElement);
        this.animateElement.appendChild(aniButton);
        var aniFlag = false;
        var aniToggle = function () {
            if (aniFlag) {
                Naboo.css(aniElement, {
                    background: '#000',
                    width: 200,
                    height: 200,
                    'margin-left': 0,
                    color: '#fff'
                }).start(function () {
                    aniElement.innerHTML = 'large';
                });
                aniFlag = false;
            } else {
                Naboo.css(aniElement, {
                    background: 'green',
                    color: 'lightblue',
                    width: 50,
                    height: 50,
                    'margin-left': 30
                }).start(function () {
                    aniElement.innerHTML = 'small';
                });
                aniFlag = true;
            }
        };
        aniButton.addEventListener('click', aniToggle, false);


        var rectElement = create('<div></div>');
        css(rectElement, {
            width: 200,
            height: 100,
            'margin-left': 30
        });
        this.rectElement.appendChild(rectElement);
        setTimeout(function () {
            rectElement.innerHTML = JSON.stringify(util.rect.getDomRect(rectElement));
        }, 0);

        element.appendChild(fragment);
    }catch(e) {alert(e.stack)}
    };

    // inviewTest
    customEle.prototype.firstInviewCallback = function () {
        if (!this.inviewCallbackCount) {
            this.inviewCallbackCount = 0;
        }
        this.inviewCallbackCount ++;
        this.inviewCallbackElement.innerHTML = 'inviewCallback: ' + (this.inviewCallbackCount === 1);
    };

    customEle.prototype.viewportCallback = function (state) {
        this.viewportCallbackElement.innerHTML = 'viewportCallback: ' + state;
    };
    return customEle;
});

require(['mip-test'], function (mipTest) {
    MIP.css.mipTest = __inline('./mip-test.less');
    MIP.registerMipElement('mip-test', mipTest, MIP.css.mipTest);
})
