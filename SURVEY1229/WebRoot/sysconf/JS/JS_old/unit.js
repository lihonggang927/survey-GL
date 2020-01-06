var viewport;
var unitGrid;// 用于展现单位的详细信息
var unitGridColumnModel;
var unitGridSelectionModel;
var unit_start = 0;

Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			unitStore.load({
						params : {
							start : 0,
							limit : 10
						},
						callback : function(r, options, success) {
							// var c = unitStore.getCount();
							// alert(success + ' ' +
							// unitStore.getAt(0).get('id'));
						}
					});
			unitGridSelectionModel = new Ext.grid.CheckboxSelectionModel();
			unitGridColumnModel = new Ext.grid.ColumnModel({
						defaults : {
							sortable : true
						},
						columns : [unitGridSelectionModel, new Ext.grid.RowNumberer({
											header : '序号',
											width : 40,
											renderer : function(value, metadata, record, rowIndex) {
												return unit_start + 1 + rowIndex;
											}
										}), {
									header : 'id',
									dataIndex : 'id',
									sortable : true,
									hidden : true
								}, {
									header : '学院名称',
									width : 200,
									dataIndex : 'name',
									sortable : true,
									editor : new Ext.form.TextField({
												allowBlank : false
											})
								}, {
									header : '学院位置',
									dataIndex : 'address',
									sortable : true,
									hidden : true,
									editor : new Ext.form.TextField({
												allowBlank : false
											})
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
																var ed = unitGrid.activeEditor;
																editToEndRow(unitGrid, ed);
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
						region : 'center',
						stripeRows : true,
						frame : false,
						clicksToEdit : 1,
						store : unitStore,
						loadMask : {
							msg : '正在加载数据，请稍等... ...'
						},
						tbar : ['-', {
									xtype : 'button',
									iconCls : 'icon-table-row-insert',
									handler : function() {
										addRecord(unitGrid);
									}
								}, '-', {
									xtype : 'button',
									iconCls : 'icon-table-row-delete',
									handler : function() {
										var records = unitGrid.getSelectionModel().getSelections();
										var flag = unitGrid.getSelectionModel().getSelected();
										var url = 'del_unit.action';
										if (flag) {
											delRecord(unitStore, records, url);
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
									store : unitStore,
									plugins : [new Ext.ux.plugins.PageComboResizer()],
									displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
									emptyMsg : '没有记录'
								}],
						listeners : {
							'afteredit' : {
								fn : function() {
									var ed = unitGrid.lastEdit;
									var url = 'saveOrUpdate_unit.action';
									saveOrUpdate(unitGrid, ed, url);
								}
							}
						}
					});
			unitGridSelectionModel.onEditorKey = keyListener;
			viewport = new Ext.Viewport({
						layout : 'border',
						items : [unitGrid]
					});

		});