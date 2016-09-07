/**
 * @file fit-text
 * @author fengchuantao
 * 
 * @time 2016.8.25
 */

define(function() {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    
    /**
     * 注册屏幕缩放状态
     * 由于现有底层没有此接口，暂时手写，如果后期增加可替换为底层接口
     */
    var BindEvent = false;
    var viewprotDom = []; //缓存已近出现的dom
    function Bindresize(callback) {
        if(BindEvent) return;

        BindEvent = true;
        window.addEventListener('resize',callback,false);
    } 

    function build() {
       var _element = this.element;
        if (_element.isRender) {
            return;
        }
        _element.isRender = true;
        fitText.call(_element);
    }

    /**
     * dom构建
     */
    function fitText() {
        _this = this;

        //获取属性值
        var minfont = _this.getAttribute('min-font-size') || 6;
        var maxfont = _this.getAttribute('min-font-size') || 72;

        var children = $(_this).children().not('mip-i-space');

        //构建真正的dom
        var contentWrapper = "<div class='mip-fill-content mip-fit-text-content' style='z-index: 2,height:1.15em'><div>"+children.html()+"</div></div>";
        $(_this).append(contentWrapper);
        children.remove();
        
        //构建替代dom
        var measurer = "<div style='position:absolute;top: 0;left: 0;right: 0;z-index: 1;visibility: hidden;line-height: 1.15em'>"+children.html()+"</div>";
        $(_this).append(measurer);

        var _contentWrapper =  $(_this).children().eq(-2).children().get(0);
        var _measurer= $(_this).children().get(-1);

        initsize.call(_this,_measurer,_contentWrapper,minfont,maxfont);

        viewprotDom.push(_this);

        //绑定resize事件
        Bindresize(function() {
            viewprotDom.map(function(ele,i) {
                  var newminfont = ele.getAttribute('min-font-size') || 6;
                  var newmaxfont = ele.getAttribute('min-font-size') || 72;
                  var new_contentWrapper =  $(ele).children().eq(-2).children().get(0);
                  var new_measurer= $(ele).children().get(-1);
                  initsize.call(ele,new_measurer,new_contentWrapper,newminfont,newmaxfont);
            });
        });
    }

    /**
     * 更新大小
     */
    function initsize(_measurer,_contentWrapper,minfont,maxfont) {
        var  maxHeight = this.offsetHeight;
        var minFontSize = calculateFontSize.call(_measurer, maxHeight, minfont, maxfont);
        $(_contentWrapper).css("fontSize",minFontSize+"px");
        updatesize(_contentWrapper, _measurer, maxHeight, minFontSize);
    }

    /**
     * 计算大小
     */
    
    function calculateFontSize(expectedHeight, minFontSize, maxFontSize) {
        maxFontSize++;
        var _ele = this;
        while (maxFontSize - minFontSize > 1) {
            var mid = Math.floor((minFontSize + maxFontSize) / 2);
            $(_ele).css("fontSize",mid+"px");
            var  height = _ele.offsetHeight;
            if (height > expectedHeight) {
              maxFontSize = mid;
            } else {
              minFontSize = mid;
            }
        }
        return minFontSize;
    }

    /**
     * 设置插入节点大小
     */
    function updatesize(content, measurer, maxHeight, fontSize) {
          measurer.style.fontSize = fontSize+"px";
          var  overflown = measurer.offsetHeight > maxHeight;
          var  lineHeight = fontSize * 1.5;
          var  numberOfLines = Math.floor(maxHeight / lineHeight);
          $(content).addClass('mip-fit-text-content-overflown');
          $(content).css({
            lineClamp: overflown ? numberOfLines : '',
            maxHeight: overflown ? lineHeight * numberOfLines+"px" : ''
        });
    }
    
    customElement.prototype.build = build;

    return customElement;

});


require(['mip-fit-text'], function (fittext) {
    
    // 引入组件需要的css文件，选填
    MIP.css.fittext = __inline('./mip-fit-text.less');

    //注册组件
    MIP.registerMipElement('mip-fit-text', fittext, MIP.css.fittext);
});

