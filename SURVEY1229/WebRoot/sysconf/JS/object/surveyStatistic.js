var conditionForm;// 条件查询包括干部姓名，测评人员类型，测评标准，测评年度
var surveyStatisticGrid;

Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			peopleStoreForStatistic.load();
			// peopleTypeStore.load();
			// surveyStandardStore.load();
			unitStoreForStatistic.load();

			conditionForm = new Ext.form.FormPanel({
						title : '工具栏',
						id : 'conditionForm',
						region : 'north',
						height : 70,
						collapsible : true,
						labelWidth : 70,
						labelSeparator : ':',
						frame : true,
						layout : 'column',
						labelAlign : 'right',
						frame : true,
						buttonAlign : 'center',
						items : [{
									columnWidth : .2,
									layout : 'form',
									items : [{
												xtype : 'pinyincombo',
												fieldLabel : '干部姓名',
												emptyText : '',
												id : 'peopleForStatistic',
												allowBlank : true,
												name : 'surveyDetail',
												hiddenName : 'surveyDetail.people.id',
												displayField : 'name',
												valueField : 'id',
												mode : 'local',
												store : peopleStoreForStatistic,
												anchor : '80%'
											}]
								}, {
									columnWidth : .3,
									layout : 'form',
									items : [{
												xtype : 'pinyincombo',
												fieldLabel : '单位或学院',
												emptyText : '',
												id : 'unitForStatistic',
												allowBlank : true,
												name : 'surveyDetail',
												hiddenName : 'surveyDetail.people.id',
												displayField : 'name',
												valueField : 'id',
												mode : 'local',
												store : unitStoreForStatistic,
												anchor : '80%'
											}]
								}, {
									columnWidth : .2,
									layout : 'form',
									items : [{
												xtype : 'numberfield',
												fieldLabel : '测评年度',
												value : '2011',
												id : 'yearForStatistic',
												allowBlank : true,
												name : 'surveyDetail.year',
												anchor : '80%'
											}]
								}, {
									columnWidth : .3,
									layout : 'column',
									items : [{
												columnWidth : .3,
												layout : 'form',
												items : [{
															xtype : 'button',
															iconCls : 'icon-multiple-find',
															text : '查询',
															id : 'find',
															anchor : '95%',
															handler : function() {
																Ext.getCmp('find').disable();
																var url = [];
																var peopleValue = Ext.getCmp('peopleForStatistic').getValue();
																var unitValue = Ext.getCmp('unitForStatistic').getValue();
																var yearValue = Ext.getCmp('yearForStatistic').getValue();
																surveyStatisticStore.proxy = new Ext.data.HttpProxy({
																			timeout : 1000 * 60 * 10,
																			url : 'statistic_surveyDetail.action'
																		});
																surveyStatisticStore.load({
																			params : {
																				'surveyDetail.people.id' : peopleValue,
																				'surveyDetail.people.unit.id' : unitValue,
																				'surveyDetail.year' : yearValue
																			},
																			callback : function() {
																				Ext.getCmp('find').enable();
																			}
																		});
															}
														}]
											}, {
												columnWidth : .3,
												layout : 'form',
												items : [{
															xtype : 'button',
															text : '重置',
															iconCls : 'reset',
															id : 'reset',
															anchor : '95%',
															handler : function() {
																conditionForm.getForm().reset();
															}
														}]
											}, {
												columnWidth : .4,
												layout : 'form',
												items : [{
															xtype : 'button',
															text : '导出为Excel文件',
															iconCls : 'icon-excel',
															id : 'toExcel',
															anchor : '95%',
															handler : function() {
																Ext.getCmp('toExcel').disable();
																var peopleValue = Ext.getCmp('peopleForStatistic').getValue();
																var unitValue = Ext.getCmp('unitForStatistic').getValue();
																var yearValue = Ext.getCmp('yearForStatistic').getValue();
																
																Ext.Ajax.request({
																			url : 'importToExcel_surveyDetail.action',
																			params : {
																				'surveyDetail.people.id' : peopleValue,
																				'surveyDetail.people.unit.id' : unitValue,
																				'surveyDetail.year' : yearValue
																			},
																			success : function(res) {
																				Ext.getCmp('toExcel').enable();
																				var obj = Ext.decode(res.responseText);
																				window.location.href = obj.downloadPath;
																			}
																		});
															}
														}]
											}]
								}]
					});

			var sm = new Ext.grid.CheckboxSelectionModel();
			var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
								header : '序号',
								width : 40
							}), {
						header : '干部姓名',
						width : 150,
						sortable : true,
						dataIndex : 'peopleName'
					}, {
						header : '单位',
						width : 200,
						sortable : true,
						dataIndex : 'peopleUnit'
					}, {
						header : '职务',
						width : 200,
						sortable : true,
						dataIndex : 'peoplePosition'
					}, {
						header : '校领导测评得分',
						width : 100,
						sortable : true,
						dataIndex : 'leader_score',
						renderer : function(value, cellmeta, record) {
							if (value == 0) {
								return '未测评';
							} else {
								return value;
							}
						}
					}, {
						header : '处级干部互评得分',
						width : 100,
						sortable : true,
						dataIndex : 'cadre_score',
						renderer : function(value, cellmeta, record) {
							if (value == 0) {
								return '未测评';
							} else {
								return value;
							}
						}
					}, {
						header : '教职工测评得分',
						width : 100,
						sortable : true,
						dataIndex : 'mass_score',
						renderer : function(value, cellmeta, record) {
							if (value == 0) {
								return '未测评';
							} else {
								return value;
							}
						}
					}, {
						header : '综合得分',
						width : 100,
						sortable : true,
						dataIndex : 'multipleScore'
					}, {
						header : '等次',
						width : 100,
						sortable : true,
						dataIndex : 'level'
					}]);

			surveyStatisticGrid = new Ext.grid.GridPanel({
						title : '查询结果',
						sm : sm,
						cm : cm,
						store : surveyStatisticStore,
						region : 'center',
						viewConfig : {
							forceFit : true
						},
						loadMask : {
							msg : '系统正在统计测评数据，需要一些时间，请稍等。。。'
						},
						bbar : [{
									xtype : 'button',
									text : ''
								}]
					});
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [conditionForm, surveyStatisticGrid]
					});
		});
