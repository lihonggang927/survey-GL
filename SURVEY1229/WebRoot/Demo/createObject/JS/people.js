//alert('加载people.js');
function createPeople() {
	alert('有人要new对象了');
//	peopleStore.load({
//				params : {
//					start : 0,
//					limit : 10
//				},
//				callback : function(r, options, success) {
//					// alert(success);
//				}
//			});
//	unitStore.load(
//			// {
//			// params : {},
//			// callback : function(r, options, success) {
//			// var c = unitStore.getCount();
//			// alert(success + ' ' + c);
//			// }
//			// }
//			);

	peopleGridSelectionModel = new Ext.grid.CheckboxSelectionModel();
	peopleGridColumnModel = new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [peopleGridSelectionModel, new Ext.grid.RowNumberer({
									header : '序号',
									width : 40,
									renderer : function(value, metadata, record, rowIndex) {
										return people_start + 1 + rowIndex;
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
							width : 200,
							sortable : true,
							dataIndex : 'unit',
							editor : new Ext.ux.PinyinCombo({
										id : 'unitCombo',
										selectOnFocus : true,
										triggerAction : 'all',
										mode : 'local',
										displayField : 'name',
										valueField : 'id',
										store : unitStore
									}),
							renderer : function(value, cellmeta, record) {
								// alert('renderer:' + value);
								var displayText = value;
								if (unitStore.getCount() > 0) {
									// alert('>0');
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
							dataIndex : 'position',
							editor : new Ext.form.TextField({
										allowBlank : false,
										listeners : {
											'specialKey' : {
												fn : function(f, e) {
													if (e.getKey() == e.ENTER) {
														var ed = peopleGrid.activeEditor;
														editToEndRow(peopleGrid, ed);
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
				// region : 'center',
				height : 600,
				stripeRows : true,
				frame : false,
				clicksToEdit : 1,
				store : peopleStore,
				enableDragDrop : true,
				dropConfig : {
					appendOnly : false
				},
				ddGroup : "GridDD",
				// autoExpandColumn : this.autoExpandColumn,
				loadMask : {
					msg : '正在加载数据，请稍等... ...'
				},
				tbar : ['-', {
							xtype : 'button',
							iconCls : 'icon-table-row-insert',
							tabTip : '添加新信息',
							handler : function() {
								addRecord(peopleGrid);
							}
						}, '-', {
							xtype : 'button',
							iconCls : 'icon-table-row-delete',
							toolTip : '删除信息',
							handler : function() {
								var records = peopleGrid.getSelectionModel().getSelections();
								var flag = peopleGrid.getSelectionModel().getSelected();
								var url = 'del_people.action';
								if (flag) {
									delRecord(peopleStore, records, url);
								} else {
									Ext.Ghost.msg('操作提示', '请选择要删除的信息！');
								}

							}
						}, '-', {
							xtype : 'button',
							iconCls : 'icon-table-save',
							handler : function() {

							}
						}, '-'],
				bbar : [{
							xtype : 'paging',
							pageSize : 10,
							store : peopleStore,
							plugins : [new Ext.ux.plugins.PageComboResizer()],
							displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
							emptyMsg : '没有记录'
						}],
				listeners : {
					'afteredit' : {
						fn : function() {
							var ed = peopleGrid.lastEdit;
							var url = 'saveOrUpdate_people.action';
							saveOrUpdate(peopleGrid, ed, url);
						}
					}
				}
			});
	// peopleGrid.render('divGrid')

	peopleGridSelectionModel.onEditorKey = keyListener;
	return peopleGrid;
}