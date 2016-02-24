/**
 * 自定义组件基类
 * @exports modulename
 * @author shenzhou@baidu.com
 * @version 1.0
 * @copyright 2015 Baidu.com, Inc. All Rights Reserved
 */
define(function(){
   
    function customElement(){
        if(this.init){
        this.init();
        }    
    }
//    var customElement =  Object.create(HTMLElement.prototype); 
       
    customElement.prototype.mibCreatedCallback = function(){
         
    };
    
    customElement.prototype.mibAttachedCallback = function(){
    };
    
    customElement.prototype.mibDetachedCallback = function(){
    
    };

    customElement.prototype.mibAttributeChangedCallback = function(){
    };
    
    //自定义元素进入可视区域的默认处理函数，此处可以覆写，如果有特殊逻辑

    customElement.prototype.inviewCallback = function(){
        if(this.isInviewer()){
            this.build();
        }
    };
   //模板的元素build功能，即元素的默认初始化功能 
    customElement.prototype.build = function(){
    
    };
    
    return customElement;

});
