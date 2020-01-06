var viewport;
var peopleTypeGrid;// 用于展现人员类型的详细信息
var peopleTypeGridColumnModel;
var peopleTypeGridSelectionModel;
var peopleType_start = 0;

Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			peopleTypeStore.load({
						params : {
							start : 0,
							limit : 10
						},
						callback : function(r, options, success) {
							// var c = peopleTypeStore.getCount();
							// alert(success + ' ' +
							// peopleTypeStore.getAt(0).get('id'));
						}
					});

			peopleTypeGridSelectionModel = new Ext.grid.CheckboxSelectionModel();
			peopleTypeGridColumnModel = new Ext.grid.ColumnModel({
						defaults : {
							sortable : true
						},
						columns : [peopleTypeGridSelectionModel, new Ext.grid.RowNumberer({
											header : '序号',
											width : 40,
											renderer : function(value, metadata, record, rowIndex) {
												return peopleType_start + 1 + rowIndex;
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
																var ed = peopleTypeGrid.activeEditor;
																editToEndRow(peopleTypeGrid, ed);
															}
														}
													}
												}
											})
								}]
					});

			peopleTypeGrid = new Ext.grid.EditorGridPanel({
						sm : peopleTypeGridSelectionModel,
						cm : peopleTypeGridColumnModel,
						region : 'center',
						stripeRows : true,
						frame : false,
						clicksToEdit : 1,
						store : peopleTypeStore,
						loadMask : {
							msg : '正在加载数据，请稍等... ...'
						},
						tbar : ['-', {
									xtype : 'button',
									iconCls : 'icon-table-row-insert',
									handler : function() {
										addRecord(peopleTypeGrid);
									}
								}, '-', {
									xtype : 'button',
									iconCls : 'icon-table-row-delete',
									handler : function() {
										var records = peopleTypeGrid.getSelectionModel().getSelections();
										var flag = peopleTypeGrid.getSelectionModel().getSelected();
										var url = 'del_peopleType.action';
										if (flag) {
											delRecord(peopleTypeStore, records, url);
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
									store : peopleTypeStore,
									plugins : [new Ext.ux.plugins.PageComboResizer()],
									displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
									emptyMsg : '没有记录'
								}],
						listeners : {
							'afteredit' : {
								fn : function() {
									var ed = peopleTypeGrid.lastEdit;
									var url = 'saveOrUpdate_peopleType.action';
									saveOrUpdate(peopleTypeGrid, ed, url);
								}
							}
						}
					});

			peopleTypeGridSelectionModel.onEditorKey = keyListener;
			viewport = new Ext.Viewport({
						layout : 'border',
						items : [peopleTypeGrid]
					});
		});