﻿function createUnit(object) {
	unitGridSelectionModel = new Ext.grid.CheckboxSelectionModel();
	unitGridColumnModel = new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [unitGridSelectionModel, new Ext.grid.RowNumberer({
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
							header : '单位名称',
							width : 150,
							dataIndex : 'name',
							sortable : true,
							editor : new Ext.form.TextField({
										allowBlank : false,
										autoHeight : true
									})
						}, {
							header : '隶属党组织',
							width : 100,
							sortable : true,
							dataIndex : 'office',
							editor : new Ext.ux.PinyinCombo({
										id : 'officeCombo',
										selectOnFocus : true,
										editable : false,
										triggerAction : 'all',
										mode : 'local',
										displayField : 'name',
										valueField : 'id',
										store : officeInfoStore
									}),
							renderer : function(value, cellmeta, record) {
								var displayText = value;
								if (officeInfoStore.getCount() > 0) {
									var index = findIndex(officeInfoStore, 'id', value);
									var rec = officeInfoStore.getAt(index);
									return rec ? rec.get('name') : '请选择';
								} else {
									return value;
								}
							}
						}, {
							header : '群众人数',
							dataIndex : 'peopleCount',
							sortable : true,
							editor : new Ext.form.NumberField({
										allowBlank : false,
										listeners : {
											'specialKey' : {
												fn : function(f, e) {
													if (e.getKey() == e.ENTER) {
														var ed = object.activeEditor;
														editToEndRow(object, ed);
													}
												}
											}
										}
									})
						}]
			});
	unitGrid = new Ext.grid.EditorGridPanel({
				sm : unitGridSelectionModel,
				cm : unitGridColumnModel,
				height : totalHeight/3 - 40,
				stripeRows : true,
				frame : false,
				columnLines : true,
				clicksToEdit : 1,
				store : unitStore,
				viewConfig : {
					forceFit : true
				},
				loadMask : {
					msg : '正在加载数据，请稍等... ...'
				},
				tbar : ['-', {
							xtype : 'button',
							iconCls : 'icon-table-row-insert',
							tooltip : '新增单位记录',
							handler : function() {
								addRecord(object);
							}
						}, '-', {
							xtype : 'button',
							iconCls : 'icon-table-row-delete',
							tooltip : '删除单位记录',
							handler : function() {
								var records = object.getSelectionModel().getSelections();
								var flag = object.getSelectionModel().getSelected();
								var url = 'del_unit.action';
								if (flag) {
									delRecord(unitStore, records, url);
								} else {
									Ext.Ghost.msg('操作提示', '请选择要删除的信息！');
								}
							}
						}
//						, '-', {
//							xtype : 'button',
//							iconCls : 'icon-table-save'
//						}, '-'
						],
				bbar : [{
							xtype : 'paging',
							pageSize : 1000,
							store : unitStore,
							displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
							emptyMsg : '没有记录'
						}],
				listeners : {
					'afteredit' : {
						fn : function() {
							var ed = object.lastEdit;
							var url = 'saveOrUpdate_unit.action';
							saveOrUpdate(object, ed, url);
						}
					}
				}
			});
	unitGridSelectionModel.onEditorKey = keyListener;
	object = unitGrid
	return object;
}