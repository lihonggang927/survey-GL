var tabs;

Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = basePath + 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			tabs = new Ext.TabPanel({
						activeTab : 0,
						width : '100%',
						region : 'center',
						tabPosition : 'top',
						items : [{
									title : '干部信息',
									itemId : 'people',
									iconCls : 'tabs',
									html : '<iframe width="100%" height="100%" style="border: 0" src="' + basePath + '/sysconf/people.jsp"></iframe>',
									closable : false
								}, {
									title : '测评人员类型',
									iconCls : 'tabs',
									itemId : 'peopleType',
									html : '<iframe width="100%" height="100%" style="border: 0" src="' + basePath + '/sysconf/peopleType.jsp"></iframe>',
									closable : false
								}, {
									title : '测评标准',
									iconCls : 'tabs',
									itemId : 'surveyStandard',
									html : '<iframe width="100%" height="100%" style="border: 0" src="' + basePath + '/sysconf/surveyStandard.jsp" ></iframe>',
									closable : false
								}, {
									title : '学院',
									iconCls : 'tabs',
									itemId : 'unit',
									html : '<iframe width="100%" height="100%" style="border: 0" src="' + basePath + '/sysconf/unit.jsp"></iframe>',
									closable : false
								}]
					});

			new Ext.Viewport({
						layout : 'border',
						items : [tabs]
					});
		});