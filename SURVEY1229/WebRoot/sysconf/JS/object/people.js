function createPeople(object, flag) {

	peopleGridSelectionModel = new Ext.grid.CheckboxSelectionModel();
	peopleGridColumnModel = new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [peopleGridSelectionModel, new Ext.grid.RowNumberer({
									header : '序号',
									width : 40,
									renderer : function(value, metadata, record, rowIndex) {
										return 1 + rowIndex;
									}
								}), {
							dataIndex : 'id',
							sortable : true,
							hidden : true
						}, {
							header : '姓名',
							sortable : true,
							dataIndex : 'name',
							editor : new Ext.form.TextField({
										allowBlank : false
									})
						}, {
							header : '所属单位',
							width : 100,
							sortable : true,
							dataIndex : 'unit',
							editor : new Ext.ux.PinyinCombo({
										id : 'unitCombo',
										selectOnFocus : true,
										triggerAction : 'all',
										mode : 'local',
										displayField : 'name',
										valueField : 'id',
										store : unitStoreForPeopleGrid
									}),
							renderer : function(value, cellmeta, record) {
								var displayText = value;
								if (unitStore.getCount() > 0) {
									var index = findIndex(unitStore, 'id', value);
									var rec = unitStore.getAt(index);
									return rec ? rec.get('name') : '';
								} else {
									return value;
								}
							}
						}, {
							header : '职务',
							sortable : true,
							width : 200,
							dataIndex : 'position',
							editor : new Ext.form.TextField({
										allowBlank : false,
										listeners : {
											'specialKey' : {
												fn : function(f, e) {
													if (e.getKey() == e.ENTER) {
														var ed = object.activeEditor;
														editToEndRow(object, ed);
//														var ed = peopleGrid.activeEditor;
//														editToEndRow(peopleGrid, ed);
													}
												}
											}
										}
									})
						}]
			});

	peopleGrid = new Ext.grid.EditorGridPanel({
				sm : peopleGridSelectionModel,
				cm : peopleGridColumnModel,
				id : flag,
				region : 'center',
				height : totalHeight - 60,
				stripeRows : true,
				frame : false,
				columnLines : true,
				clicksToEdit : 1,
				store : peopleStore,
				enableDragDrop : true,
				viewConfig : {
					forceFit : true
				},
				ddGroup : "GridDD" + flag,
				loadMask : {
					msg : '正在加载数据，请稍等... ...'
				},
				tbar : ['-', {
							xtype : 'button',
							iconCls : 'icon-table-row-insert',
							tooltip : '新增干部记录',
							handler : function() {
								addRecord(object);
							}
						}, '-', {
							xtype : 'button',
							iconCls : 'icon-table-row-delete',
							tooltip : '删除干部记录',
							handler : function() {
								var records = object.getSelectionModel().getSelections();
								var flag = object.getSelectionModel().getSelected();
								var url = 'del_people.action';
								if (flag) {
									delRecord(peopleStore, records, url);
								} else {
									Ext.Ghost.msg('操作提示', '请选择要删除的记录！');
								}

							}
						}, '-', {
							xtype : 'button',
							iconCls : 'icon-excel',
							tooltip : '从Excel文件中导入',
							handler : function() {
								importFromExcel(peopleStore, unitStoreForPeopleGrid);
							}
						}
//						'-', {
//							xtype : 'label',
//							text : '支持拖动排序',
//							style : 'color:red'
//						}
						],
				bbar : [{
							xtype : 'paging',
							pageSize : 1000,
							store : peopleStore,
							//plugins : [new Ext.ux.plugins.PageComboResizer()],
							displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
							emptyMsg : '没有记录'
						}],
				listeners : {
					'afteredit' : {
						fn : function() {
							var ed = object.lastEdit;
							var url = 'saveOrUpdate_people.action';
							saveOrUpdate(object, ed, url);
						}
					}
				}
			});

	peopleGridSelectionModel.onEditorKey = keyListener;
	object = peopleGrid;
	return object;
}