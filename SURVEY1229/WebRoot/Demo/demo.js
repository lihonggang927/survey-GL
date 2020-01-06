Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			var t1 = createTable1();
			var t2 = createTable2(); 
			var i = .2;
			alert(t1);
			
			var columnPanel = new Ext.Panel({
				layout : 'column',
				//title : 'columnPanel',
				height : 100,
				width : 1300
			});
			columnPanel.add(t1);
			columnPanel.add(t2);
			columnPanel.doLayout(true);

			var panel = new Ext.Panel({
						region : 'center',              
						autoHeight : true,
						autoScroll : true,
						bodyStyle : 'padding:10px 0px 10px 5px',
						layout : 'form',
						items : [columnPanel]
					});

			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [panel]
					});
		});