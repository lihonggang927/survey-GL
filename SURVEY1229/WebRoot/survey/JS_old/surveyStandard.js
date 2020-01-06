var viewport;
var surveyStandardGrid;// 用于展现测评标准的详细信息
var surveyStandardGridColumnModel;
var surveyStandardGridSelectionModel;
var surveyStandard_start = 0;

Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			surveyStandardStore.load({
						callback : function(r, options, success) {
							// var c = surveyStandardStore.getCount();
							// alert(success + ' ' + c);
						}
					});

			surveyStandardGridSelectionModel = new Ext.grid.CheckboxSelectionModel();
			surveyStandardGridColumnModel = new Ext.grid.ColumnModel({
						defaults : {
							sortable : true
						},
						columns : [surveyStandardGridSelectionModel, new Ext.grid.RowNumberer({
											header : '序号',
											width : 40,
											renderer : function(value, metadata, record, rowIndex) {
												return surveyStandard_start + 1 + rowIndex;
											}
										}), {
									dataIndex : 'id',
									sortable : true,
									hidden : true
								}, {
									header : '标准名称',
									width : 100,
									sortable : true,
									dataIndex : 'name',
									editor : new Ext.form.TextField({
												allowBlank : false
											})
								}, {
									header : '测评比重',
									width : 100,
									sortable : true,
									dataIndex : 'ratio',
									editor : new Ext.form.NumberField({
												allowBlank : false,
												listeners : {
													'specialKey' : {
														fn : function(f, e) {
															if (e.getKey() == e.ENTER) {
																var ed = surveyStandardGrid.activeEditor;
																editToEndRow(surveyStandardGrid, ed);
															}
														}
													}
												}
											})
								}]
					});

			surveyStandardGrid = new Ext.grid.EditorGridPanel({
						sm : surveyStandardGridSelectionModel,
						cm : surveyStandardGridColumnModel,
						region : 'center',
						height : 200,
						stripeRows : true,
						frame : false,
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
									handler : function() {
										addRecord(surveyStandardGrid);
									}
								}, '-', {
									xtype : 'button',
									iconCls : 'icon-table-row-delete',
									handler : function() {
										var records = surveyStandardGrid.getSelectionModel().getSelections();
										var flag = surveyStandardGrid.getSelectionModel().getSelected();
										var url = 'del_surveyStandard.action';
										if (flag) {
											delRecord(surveyStandardStore, records, url);
										} else {
											Ext.Ghost.msg('操作提示', '请选择要删除的信息！');
										}
									}
								}, '-', {
									xtype : 'button',
									iconCls : 'icon-table-save'
								}, '-'],
						bbar : [{
									xtype : 'paging',
									pageSize : 10,
									store : surveyStandardStore,
									plugins : [new Ext.ux.plugins.PageComboResizer()],
									displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
									emptyMsg : '没有记录'
								}],
						listeners : {
							'afteredit' : {
								fn : function() {
									var ed = surveyStandardGrid.lastEdit;
									var url = 'saveOrUpdate_surveyStandard.action';
									saveOrUpdate(surveyStandardGrid, ed, url);
								}
							}
						}
					});

			surveyStandardGridSelectionModel.onEditorKey = keyListener;
//			viewport = new Ext.Viewport({
//						layout : 'border',
//						items : [surveyStandardGrid]
//					});
		});