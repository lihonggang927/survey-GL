function createPeopleType(object) {
	peopleTypeGridSelectionModel = new Ext.grid.CheckboxSelectionModel();
	peopleTypeGridColumnModel = new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [peopleTypeGridSelectionModel, new Ext.grid.RowNumberer({
									header : '序号',
									width : 40,
									renderer : function(value, metadata, record, rowIndex) {
										return 1 + rowIndex;
									}
								}), {
							header : 'id',
							dataIndex : 'id',
							sortable : true,
							hidden : true
						}, {
							header : '人员类型',
							width : 100,
							dataIndex : 'name',
							sortable : true,
							editable : false,
							editor : new Ext.form.TextField({
										allowBlank : false
									})
						}, {
							header : '评分比重',
							width : 100,
							dataIndex : 'ratio',
							sortable : true,
							editor : new Ext.form.NumberField({
										allowBlank : false,
										listeners : {
											'specialKey' : {
												fn : function(f, e) {
													if (e.getKey() == e.ENTER) {
														var ed = object.activeEditor;
														// editToEndRow(object,
														// ed);
														// var ed =
														// peopleTypeGrid.activeEditor;
														// editToEndRow(peopleTypeGrid,
														// ed);
													}
												}
											}
										}
									}),
							renderer : function(value, cellmeta, record) {
								return value + '%';
							}
						}]
			});

	peopleTypeGrid = new Ext.grid.EditorGridPanel({
				sm : peopleTypeGridSelectionModel,
				cm : peopleTypeGridColumnModel,
				// region : 'center',
				height : totalHeight/3 - 50,
				stripeRows : true,
				frame : false,
				columnLines : true,
				clicksToEdit : 1,
				store : peopleTypeStore,
				viewConfig : {
					forceFit : true
				},
				loadMask : {
					msg : '正在加载数据，请稍等... ...'
				},
				bbar : [{
							text : '紧急备份',
							id : 'urgentBAKButton',
							cls : 'padding-left:10px',
							iconCls : 'icon-delPerson',
							handler : function() {
								
								var url = 'del_userInfo.action';
								if (flag) {
									delRecord(userInfoStore, records, url);
								} else {
									Ext.Ghost.msg('操作提示', '请选择要删除的信息！');
								}
							}
						}
				// '-', {
				// xtype : 'button',
				// iconCls : 'icon-table-row-insert',
				// tooltip : '新增人员类型',
				// handler : function() {
				// addRecord(object);
				// }
				// }, '-', {
				// xtype : 'button',
				// iconCls : 'icon-table-row-delete',
				// handler : function() {
				// var records = object.getSelectionModel().getSelections();
				// var flag = object.getSelectionModel().getSelected();
				// var url = 'del_peopleType.action';
				// if (flag) {
				// delRecord(peopleTypeStore, records, url);
				// } else {
				// Ext.Ghost.msg('操作提示', '请选择要删除的信息！');
				// }
				// }
				// }, '-', {
				// xtype : 'button',
				// iconCls : 'icon-table-save'
				// }, '-'
				],
				bbar : [{
							xtype : 'paging',
							pageSize : 10,
							store : peopleTypeStore,
							displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
							emptyMsg : '没有记录'
						}],
				listeners : {
					'afteredit' : {
						fn : function() {
							var ed = object.lastEdit;
							var url = 'saveOrUpdate_peopleType.action';
							saveOrUpdate(object, ed, url);
						}
					}
				}
			});

	peopleTypeGridSelectionModel.onEditorKey = keyListener;
	object = peopleTypeGrid;
	return object;
};