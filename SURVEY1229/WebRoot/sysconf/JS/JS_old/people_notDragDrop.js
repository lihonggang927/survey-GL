var viewport;
var peopleGrid;// 用于展现被测评人员的详细信息
var peopleGridColumnModel;
var peopleGridSelectionModel;
var people_start = 0;

Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			peopleStore.load({
						params : {
							start : 0,
							limit : 10
						},
						callback : function(r, options, success) {
							// alert(success);
						}
					});
			unitStore.load(
					// {
					// params : {},
					// callback : function(r, options, success) {
					// var c = unitStore.getCount();
					// alert(success + ' ' + c);
					// }
					// }
					);

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
						region : 'center',
						stripeRows : true,
						frame : false,
						clicksToEdit : 1,
						store : peopleStore,
						loadMask : {
							msg : '正在加载数据，请稍等... ...'
						},
						tbar : ['-', {
									xtype : 'button',
									iconCls : 'icon-table-row-insert',
									toolTip : '添加新信息',
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
										// peopleGrid.stopEditing();
										// peopleGrid.getStore().getModifiedRecords()
										// var paramsStr = '';
										// if (peopleGrid.getStore().getCount()
										// > 0) {
										// paramsStr += '[';
										// var i = 0;
										// peopleGrid.getStore().each(function(rec)
										// {
										// paramsStr += '{';
										//
										// paramsStr += '\"id\":\"' +
										// rec.get('id') + '\"';
										// paramsStr += ',';
										//
										// paramsStr += '\"unit\":{\"id\":' +
										// rec.get('unit') + '}';
										// paramsStr += ',';
										//
										// paramsStr += '\"name\":' +
										// rec.get('name') + '';
										// paramsStr += ',';
										//
										// paramsStr += '\"level\":' +
										// rec.get('level') + '';
										// paramsStr += ',';
										//
										// paramsStr += '\"position\":' +
										// rec.get('position') + '';
										// paramsStr += ',';
										//
										// if (i !=
										// peopleGrid.getStore().getCount() - 1)
										// {
										// paramsStr += ',';
										// }
										// i++;
										// });
										//
										// paramsStr += ']';
										//
										// Ext.Ajax.request({
										// url : 'saveOrUpdate_people',
										// method : 'post',
										// params : {
										// jsonString : paramsStr
										// },
										// success : function(response, options)
										// {
										// var result =
										// Ext.util.JSON.decode(response.responseText);
										// if (result.success == true) {
										// // Ext.Ghost.msg('提示',
										// // 'ss');
										// var responseFlag = result.flag;
										// if (responseFlag != 'update') {
										// grid.getStore().getAt(ed.row).set('id',responseFlag);
										// alert(grid.getStore().getAt(ed.row).get('id'));
										// }
										// } else {
										// // Ext.Ghost.msg('操作提示',
										// // 'ss');
										// }
										// },
										// failure : function() {
										// Ext.Ghost.msg('操作提示：',
										// '网络出现故障,建议您重新点击保存按钮进行保存');
										// }
										// });
										//
										// }
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

			peopleGridSelectionModel.onEditorKey = keyListener;
			viewport = new Ext.Viewport({
						layout : 'border',
						items : [peopleGrid]
					});
		});