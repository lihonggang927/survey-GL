var userInfoGrid;

Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
	Ext.QuickTips.init();
	
	unitStore.load();
	peopleTypeStore.load();
	userInfoStore.load({
		callback : function(r, options, success) {
			//alert('success:' + success);
		}
	});
	
	userInfoGrid = createUserAndKey(userInfoGrid);
	viewport = new Ext.Viewport({
		layout : 'border',
		items : userInfoGrid
	});
	
});