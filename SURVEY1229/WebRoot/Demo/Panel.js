Ext.onReady(function(){ 
Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif'; 
Ext.QuickTips.init(); 

Ext.myFormPanel = Ext.extend(Ext.form.FormPanel, { 
                // private 
               initEvents : function(){ 
                Ext.FormPanel.superclass.initEvents.call(this); 
                this.items.on('remove', this.onRemove, this); 
                this.items.on('add', this.onAdd, this); 
                if(this.monitorValid){ // initialize after render 
                 this.startMonitoring(); 
                } 
               }, 
               
               // private 
               onAdd : function(ct, c) { 
                if (c.isFormField) { 
                 this.form.add(c); 
                } 
               }, 
               add : function(comp){ 
                if(!this.items){ 
                 this.initItems(); 
                } 
                var a = arguments, len = a.length;               
                if(len > 1){ 
                 for(var i = 0; i < len; i++) { 
                  this.add(a); 
                 } 
                 return; 
                } 
                var c = this.lookupComponent(this.applyDefaults(comp)); 
                var pos = this.items.length; 
                if(this.fireEvent('beforeadd', this, c, pos) !== false && this.onBeforeAdd(c) !== false){ 
                 this.items.add(c); 
                 c.ownerCt = this; 
                 this.fireEvent('add', this, c, pos); 
                } 
                return c; 
               },               
               doLayout : function(shallow){ 
                if(this.rendered && this.layout){ 
                 this.layout.layout(); 
                } 
                if(shallow !== false && this.items){ 
                 var cs = this.items.items; 
                 for(var i = 0, len = cs.length; i < len; i++) { 
                  var c = cs; 
                  if(c.doLayout){ 
                   c.doLayout(); 
                  } 
                 } 
                } 
               } 
}) 
var formPanel = new Ext.form.FormPanel({ 
     id:'radiopanel', 
           labelWidth : 60, 
           labelAlign : 'right',   
     region:'center', 
           frame : true, 
           maskDisabled : false, 
           waitMsgTarget : true, 
           autoScroll : true, 
           bodyStyle : 'padding:5px 5px 5px', 
           buttonAlign : 'center', 
           width: 400, 
     columns:'3', 
     layout : 'formtable', 
     buttons : [{ text : 'save', 
                        scope : this, 
       handler:function(){ 
            var rr = new Ext.form.Radio({ 
                    fieldLabel : 'Radio', 
                    name   : 'sex', 
                    boxLabel : 'boy', 
                    id    : 'sex-boy', 
                    allowBlank : false, 
                    row: 0, 
                    col: 2, 
                    value   : 'boy' 
                   }); 
             
             formPanel.add(rr);             
             formPanel.doLayout(); 
             
            } 
       }],    
    items : [{ 
       id:'1001', 
       fieldLabel : '单选框', 
                      xtype : 'radio', 
                      hideLabel : true, 
                      name : '1', 
                      boxLabel : '-优惠卡支付', 
                      inputValue : '2', 
                      checked : false, 
       col: 0, 
       row: 0 
      }, 
      {   
        id:'1002', 
        xtype : 'radio', 
        hideLabel : true, 
        name : '1', 
        boxLabel : '-支付宝支付', 
        inputValue : '2', 
        checked : false, 
        col: 1, 
        row: 0 
      } 
      ] 

}) 


var viewport = new Ext.Viewport( { 
                  title : '界面标题', 
                  layout : 'border', 
                  height:'auto', 
                  width:'auto', 
                  items : [formPanel] 
                 }); 
}); 

