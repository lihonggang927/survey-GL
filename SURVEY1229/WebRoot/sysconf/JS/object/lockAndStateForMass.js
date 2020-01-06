var stateText = '';
var totalWidth = document.body.clientWidth;

Ext.onReady(function() {
			unitStore.load();
			var form = new Ext.form.FormPanel({
						title : '基本信息',
						buttonAlign : 'center',
						height : 100,
						labelWidth : 60,
						labelSeparator : ':',
						labelAlign : 'right',
						region : 'north',
						frame : true,
						layout : 'column',
						items : [{
									columnWidth : .4,
									layout : 'form',
									items : [{
												xtype : 'hidden',
												id : 'hiddenPeopleType',
												name : 'userInfo.peopleType.id'
											}, {
												xtype : 'pinyincombo',
												fieldLabel : '单位',
												id : 'unitForFindUK',
												editable : true,
												allowBlank : true,
												name : 'surveyDetail',
												hiddenName : 'userInfo.unit.id',
												displayField : 'name',
												valueField : 'id',
												mode : 'local',
												store : unitStore,
												anchor : '90%',
												itemCls : 'required',
												listeners : {
													'select' : {
														fn : function(combo, record) {
														}
													}
												}
											}]
								}, {
									columnWidth : .3,
									layout : 'form',
									items : [{

												xtype : 'pinyincombo',
												fieldLabel : '用户状态',
												id : 'stateForFindUK',
												editable : false,
												allowBlank : true,
												name : 'surveyDetail',
												hiddenName : 'userInfo.stateFlag',
												displayField : 'name',
												valueField : 'id',
												mode : 'local',
												store : new Ext.data.ArrayStore({
															fields : ['id', 'name'],
															data : [['0', '已生成'], ['1', '已打印'], ['2', '已登录'], ['3', '已测评']]
														}),
												anchor : '90%'
											}]
								}, {
									columnWidth : .3,
									layout : 'form',
									items : [{
												xtype : 'numberfield',
												id : 'yearForFindUK',
												name : 'userInfo.year',
												value : new Date().format('Y'),
												fieldLabel : '年度',
												anchor : '90%'
											}]
								}],
						buttons : [{
									text : '查询',
									id : 'createUserAndKeyButton',
									cls : 'padding-left:10px',
									handler : function() {
										userInfoStore.load({
													url : 'search_userInfo.action',
													params : {
														'userInfo.peopleType.id' : Ext.getCmp('hiddenPeopleType').getValue(),
														'userInfo.unit.id' : Ext.getCmp('unitForFindUK').getValue(),
														'userInfo.year' : Ext.getCmp('yearForFindUK').getValue(),
														'userInfo.stateFlag' : Ext.getCmp('stateForFindUK').getValue()
													}
												});
									}
								}
						]
					});

			unitGridSelectionModel = new Ext.grid.RowSelectionModel();
			unitGridColumnModel = new Ext.grid.ColumnModel({
						defaults : {
							sortable : true
						},
						columns : [{
									header : 'id',
									dataIndex : 'id',
									sortable : true,
									hidden : true
								}, {
									header : '单位名称',
									width : 150,
									dataIndex : 'name',
									sortable : true
								}, {
									header : '开关状态',
									width : 100,
									dataIndex : 'lockFlag',
									sortable : true,
									renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
										if (0 == value) {
											value = '已关闭';
										} else if (1 == value) {
											value = '已开通';
										} else {
											value = ''
										}
										return value;
									}
								}, {
									header : '',
									width : 50,
									renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
										value = '<a style="color : green" href="javascript:beginToSurvey();">开通</a>';
										return value;
									}
								}, {
									header : '',
									width : 50,
									renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
										value = '<a style="color : red" href="javascript:stopToSurvey();">关闭</a>';
										return value;
									}
								}]
					});
			selectionModel = new Ext.grid.CheckboxSelectionModel();
			columnModel = new Ext.grid.ColumnModel({
						defaults : {
							sortable : true
						},
						columns : [selectionModel, new Ext.grid.RowNumberer({
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
									header : '用户名',
									width : 200,
									sortable : true,
									dataIndex : 'username'
								}, {
									header : '密码',
									width : 200,
									sortable : true,
									dataIndex : 'password'
								}, {
									header : '学院或单位',
									width : 200,
									sortable : true,
									dataIndex : 'unit'
								}, {
									header : '用户类型',
									width : 200,
									sortable : true,
									dataIndex : 'peopleType'
								}, {
									header : '年度',
									width : 100,
									sortable : true,
									dataIndex : 'year'
								}, {
									header : '用户状态',
									width : 100,
									sortable : true,
									dataIndex : 'stateFlag',
									renderer : function(value, cellmeta, record) {
										if (0 == value) {
											value = '已生成';
										} else if (1 == value) {
											value = '已打印';
										} else if (2 == value) {
											value = '已登录';
										} else if (3 == value) {
											value = '已测评';
										}
										return value;
									}
								}]
					});
			Ext.Ajax.request({
						url : 'search_peopleType.action',
						method : 'post',
						params : {
							'peopleType.id' : peopleTypeId
						},
						success : function(response, options) {
							var result = Ext.util.JSON.decode(response.responseText);
							if (result.success) {
								stateText = result.peopleTypeItems[0].lockFlag;
							} else {
								stateText = '开关状态查找失败';
							}
							if (0 == stateText) {
								stateText = '已关闭';
							} else if (1 == stateText) {
								stateText = '已开通';
							}

							unitGrid = new Ext.grid.GridPanel({
										sm : unitGridSelectionModel,
										cm : unitGridColumnModel,
										region : 'east',
										width : totalWidth * .33,
										stripeRows : true,
										frame : false,
										columnLines : true,
										store : unitStore,
										viewConfig : {
											forceFit : true
										},
										loadMask : {
											msg : '正在加载数据，请稍等... ...'
										},
										bbar : ['->', {
													xtype : 'paging',
													pageSize : 1000,
													store : unitStore,
													displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
													emptyMsg : '没有记录'
												}]
									});

							userGrid = new Ext.grid.EditorGridPanel({
										sm : selectionModel,
										cm : columnModel,
										region : 'center',
										stripeRows : true,
										frame : false,
										store : userInfoStore,
										viewConfig : {
											forceFit : true
										},
										loadMask : {
											msg : '正在加载用户名和密码，请稍等... ...'
										},
										bbar : [{
													xtype : 'paging',
													pageSize : 10,
													store : userInfoStore,
													displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
													emptyMsg : '没有记录'
												}]
									});

							var viewport = new Ext.Viewport({
										layout : 'border',
										items : [form, userGrid, unitGrid]
									});
						},
						failure : function(response, options) {
							stateText = '因网络连接出现问题，开关状态查找失败';
						}
					});

			beginToSurvey = function() {
				var record = unitGrid.getSelectionModel().getSelected();
				var attribute = 'lockFlag';
				var value = 1;
				var flag = record.get('id');
				Ext.Ajax.request({
							url : 'saveOrUpdate_unit.action',
							method : 'post',
							params : {
								attribute : attribute,
								value : value,
								flag : flag
							},
							success : function(response, options) {
								var result = Ext.util.JSON.decode(response.responseText);
								if (result.success == true) {
									record.set('lockFlag', '1');
									record.commit(false);
								} else {
									Ext.Msg.alert('错误提示', '保存没有成功，请重新编辑');
								}
							},
							failure : function() {
								Ext.Ghost.msg('操作提示：', '网络出现故障,建议您重新点击保存按钮进行保存');
							}
						});
			};
			stopToSurvey = function() {
				var record = unitGrid.getSelectionModel().getSelected();
				var attribute = 'lockFlag';
				var value = 0;
				var flag = record.get('id');
				Ext.Ajax.request({
							url : 'saveOrUpdate_unit.action',
							method : 'post',
							params : {
								attribute : attribute,
								value : value,
								flag : flag
							},
							success : function(response, options) {
								var result = Ext.util.JSON.decode(response.responseText);
								if (result.success == true) {
									record.set('lockFlag', '0');
									record.commit(false);
									//grid.getStore().commitChanges();
								} else {
									Ext.Msg.alert('错误提示', '保存没有成功，请重新编辑');
								}
							},
							failure : function() {
								Ext.Ghost.msg('操作提示：', '网络出现故障,建议您重新点击保存按钮进行保存');
							}
						});
			};
		});