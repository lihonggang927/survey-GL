function createSurveyStandard(object) {
	surveyStandardGridSelectionModel = new Ext.grid.CheckboxSelectionModel();
	surveyStandardGridColumnModel = new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [surveyStandardGridSelectionModel, new Ext.grid.RowNumberer({
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
							header : '标准名称',
							sortable : true,
							dataIndex : 'name',
							editor : new Ext.form.TextField({
										allowBlank : false
									})
						}, {
							header : '测评比重',//TODO 加验证
							sortable : true,
							dataIndex : 'ratio',
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
									}),
							renderer : function(value, cellmeta, record) {
								//alert('value:' + value);
								return value ? value + '%' : '0%';
							}
						}]
			});

	surveyStandardGrid = new Ext.grid.EditorGridPanel({
				sm : surveyStandardGridSelectionModel,
				cm : surveyStandardGridColumnModel,
				region : 'center',
				height : totalHeight/3 - 50,
				stripeRows : true,
				frame : false,
				columnLines : true,
				clicksToEdit : 1,
				store : surveyStandardStore,
				viewConfig : {
					forceFit : true
				},
				loadMask : {
					msg : '正在加载数据，请稍等... ...'
				},
				tbar : ['-', {
							xtype : 'button',
							iconCls : 'icon-table-row-insert',
							tooltip : '新增测评标准',
							handler : function() {
								addRecord(object);
							}
						}, '-', {
							xtype : 'button',
							iconCls : 'icon-table-row-delete',
							tooltip : '删除测评标准',
							handler : function() {
								var records = object.getSelectionModel().getSelections();
								var flag = object.getSelectionModel().getSelected();
								var url = 'del_surveyStandard.action';
								if (flag) {
									delRecord(surveyStandardStore, records, url);
								} else {
									Ext.Ghost.msg('操作提示', '请选择要删除的信息！');
								}
							}
						}
				// , '-', {
				// xtype : 'button',
				// iconCls : 'icon-table-save'
				// }, '-'
				],
				bbar : [{
							xtype : 'paging',
							pageSize : 1000,
							store : surveyStandardStore,
							// plugins : [new
							// Ext.ux.plugins.PageComboResizer()],
							displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
							emptyMsg : '没有记录'
						}],
				listeners : {
					'afteredit' : {
						fn : function() {
							// alert('被编辑');
							var ed = object.lastEdit;
							var url = 'saveOrUpdate_surveyStandard.action';
							saveOrUpdate(object, ed, url);
						}
					}
				}
			});

	surveyStandardGridSelectionModel.onEditorKey = keyListener;
	object = surveyStandardGrid;
	return object;
};