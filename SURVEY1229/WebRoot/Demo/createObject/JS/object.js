//alert('加载object.js');
Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();
			
			people1 = createPeople();
			people2 = createPeople();
			viewport = new Ext.Viewport({
				layout : 'form',
				items : [people1, people2]
			});
		});