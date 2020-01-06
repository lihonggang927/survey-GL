Ext.onReady(function() {
			Ext.QuickTips.init();
			var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
						header : '编号',
						dataIndex : 'ID',
						sortable : true,
						hidden : false
					}, {
						header : '信息点名称',
						dataIndex : 'SectionInfoPointName',
						sortable : true
					}, {
						header : '数据类型',
						dataIndex : 'SectionInfoPointType',
						sortable : true
					}, {
						header : '分类',
						dataIndex : 'Sort',
						sortable : true
					}, {
						header : '单位',
						dataIndex : 'Unit',
						sortable : true
					}, {
						header : '公式',
						dataIndex : 'Expressions',
						sortable : true
					}, {
						header : '备注',
						dataIndex : 'Memo',
						sortable : true
					}, {
						header : '排序编号',
						dataIndex : 'OrderIndex',
						sortable : true
					}, {
						header : '',
						width : 60,
						align : 'left',
						dataIndex : 'ID',
						renderer : function(rowIndex) {
							return "<a href=\"javascript:ShowWin('UpdateInfoPoint.aspx?id=" + rowIndex + "&scode=" + sc
									+ "','修改环节信息点');\" title=\"修改环节信息点\"><img src=\"../images/edit.png\"></a>&nbsp;&nbsp;" + "<a href=\"javascript:DeleteSectionInfoPoint('"
									+ rowIndex + "','" + sc + "');\" title=\"删除环节信息点\"><img src=\"../images/del.png\"></a>";
						}
					}]);

			var store = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : 'SectionInfoPointHandler.ashx?scode=' + sc
								}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'totalProperty',
									root : 'root'
								}, [{
											name : 'ID'
										}, {
											name : 'SectionInfoPointName'
										}, {
											name : 'SectionInfoPointType'
										}, {
											name : 'Sort'
										}, {
											name : 'Unit'
										}, {
											name : 'Expressions'
										}, {
											name : 'Memo'
										}, {
											name : 'OrderIndex'
										}]),
						baseParams : {
							start : 0,
							limit : 1000,
							query : ''
						}
					});

			var grid = new Ext.grid.GridPanel({
				autoWidth : true,
				autoHeight : true,
				store : store,
				cm : cm,
				enableDragDrop : true,
				dropConfig : {
					appendOnly : false
				},
				ddGroup : "GridDD",
				loadMask : {
					msg : '  数 据 加 载 中 ......'
				},
				autoExpandColumn : this.autoExpandColumn,
				viewConfig : {
					forceFit : true
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 1000,
							store : store,
							displayInfo : true
						})
					// ,
					// tbar: [{xtype: 'button',text: '搜 索',pressed:
					// true,handler: function(){ShowSearchWin();}}]
					/*
					 * tbar: [ '搜索:', '', new Ext.ux.form.SearchField({ store:
					 * store, width: 320, paramName: 'query' }) ]
					 */
				});

			grid.render('divGrid');
			store.load({
						params : {
							start : 0,
							limit : 1000
						}
					});

			// DD
			var ddrow = new Ext.dd.DropTarget(grid.getView().mainBody, {
						ddGroup : 'GridDD',
						copy : false,
						notifyDrop : function(dd, e, data) {
							var sm = grid.getSelectionModel();
							var rows = sm.getSelections();

							var cindex = dd.getDragData(e).rowIndex;
							if (cindex == undefined || cindex < 0) {
								e.cancel = true;
								return;
							}
							for (i = 0; i < rows.length; i++) {
								rowData = store.getById(rows[i].id);
								if (!this.copy) {
									store.remove(store.getById(rows[i].id)); // remove
																				// in
																				// datasource
									store.insert(cindex, rowData); // insert
																	// record

									if (parseInt(cindex + 1) < parseInt(store.getTotalCount())) {
										document.getElementById('hidDargID').value = store.getById(rows[i].id).get('OrderIndex');
										document.getElementById('hidNewID').value = store.getAt(cindex + 1).get('OrderIndex');
										document.getElementById('Button2').click();
									}
								}
							}
						}
					});
		});