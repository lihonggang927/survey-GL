Ext.onReady(function() {
	var tabPanel = new Ext.TabPanel({
		region : 'center',
		activeTab : 0,
		items : [{
			title : '校领导测评',
			html : '<iframe width="100%" height="100%" style="border: 0" src="' + basePath + 'sysconf/leader.jsp"></iframe>'
		}, {
			title : '处级干部测评',
			html : '<iframe width="100%" height="100%" style="border : 0" src="' + basePath + 'sysconf/cadre.jsp"></iframe>'
		}, {
			title : '教职工测评',
			html : '<iframe width="100%" height="100%" style="border : 0" src="' + basePath + 'sysconf/mass.jsp"></iframe>'
		}]
	});
	var viewport = new Ext.Viewport({
		layout : 'border',
		items : [tabPanel]
	});
});