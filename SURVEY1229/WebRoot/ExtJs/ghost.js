/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.BLANK_IMAGE_URL = '../../resources/images/default/s.gif';

Ext.Ghost = function(){
    var msgCt;
    var d=Ext.lib.Dom;  
    
    function centerEl(el){        
        var xy=[d.getViewportWidth(),d.getViewportHeight()];  
        var x = Ext.getBody().getScroll().left+(xy[0] - el.getWidth()) / 2;  
        var y = Ext.getBody().getScroll().top+(xy[1] - el.getHeight()) / 2;  
        //var y = 0;
        el.setXY([x,y]);  
    }  
    
    function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        msg : function(title, format, time){
        	var pause = 0.5;
        	if(time) {
        		pause = time;
        	}
    		format = format.toString();
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            centerEl(msgCt);
            
            m.slideIn('t').pause(pause).ghost("b", {remove:true});
        },

        init : function(){
            var lb = Ext.get('lib-bar');
            if(lb){
                lb.show();
            }
        }
    };
}();


Ext.onReady(Ext.Ghost.init, Ext.Ghost);


