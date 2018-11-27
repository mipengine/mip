/**
 * @file 首屏标记识别
 * 
 * @author liwenqian
 */
define(function() {
    var missList = [];
    var incorrectList = [];

    function getPathTo(element) {
        if (element.tagName === 'HTML') {
            return 'html.1';
        }
        if (element === document.body) {
            return 'html.1/body.1';
        }
      
        var ix = 0;
        var siblings = element.parentNode.childNodes;
        for (var i = 0; i < siblings.length; i++) {
            var sibling = siblings[i];
            if (sibling === element) {
                return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '.' + (ix + 1) + '';
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }

    function getFirstScreenLabelInfo() {
        var allLabelImgs = Array.prototype.slice.call(document.querySelectorAll('mip-img[firstscreen="1"]'));
        var allFirstScreenImgs = Array.prototype.slice.call(document.querySelectorAll('mip-img[mip-firstscreen-element]'));
        allLabelImgs.forEach(function (element) {
          if (!element.hasAttribute('mip-firstscreen-element')) {
            incorrectList.push(getPathTo(element));
          }
        });
        allFirstScreenImgs.forEach(function (element) {
          if (!element.hasAttribute('firstscreen')) {
            missList.push(getPathTo(element));
          }
        });

        var info = missList.join(',') + '!!' + incorrectList.join(',');
        return info;
    }

    return {
        getFirstScreenLabelInfo: getFirstScreenLabelInfo
    }
});