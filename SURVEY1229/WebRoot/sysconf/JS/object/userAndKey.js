function checkUserInfo(form) {
	var components = form.items;
	for (var i = 0; i < components.length; i++) {
		var fieldLabel = components.items[i].items.items[0].fieldLabel;
		var value = components.items[i].items.items[0].getValue();
		if ('' == value || '请选择...' == value) {
			return fieldLabel;
		}
	}
	return 'true';
};

function createConditionForm() {
	var form = new Ext.form.FormPanel({
				title : '工具栏',
				buttonAlign : 'center',
				layout : 'column',
				height : 100,
				labelWidth : 60,
				labelSeparator : ':',
				labelAlign : 'right',
				region : 'north',
				frame : true,
				layout : 'column',
				items : [{
							columnWidth : .25,
							layout : 'form',
							items : [{
										xtype : 'pinyincombo',
										fieldLabel : '测评类型',
										id : 'peopleTypeForFindUK',
										allowBlank : true,
										name : 'surveyDetail',
										hiddenName : 'userInfo.peopleType.id',
										displayField : 'name',
										valueField : 'id',
										mode : 'local',
										anchor : '100%',
										itemCls : 'required',
										store : peopleTypeStore,
										listeners : {
											'select' : {
												fn : function(combo, record) {
													if (record.get('id') == '3') {
														Ext.getCmp('unitForFindUK').setValue('请选择...');
														Ext.getCmp('unitForFindUK').enable(true);
														Ext.getCmp('printUserAndPassButton').disable();
													} else {
														Ext.getCmp('printUserAndPassButton').enable();
														Ext.getCmp('unitForFindUK').disable(true);
														Ext.getCmp('unitForFindUK').setValue('干部管理学院');
													}
												}
											}
										}
									}]
						}, {
							columnWidth : .25,
							layout : 'form',
							items : [{
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
										anchor : '100%',
										itemCls : 'required',
										listeners : {
											'select' : {
												fn : function(combo, record) {
													if (record.get('name') != '请选择...') {
														Ext.getCmp('printUserAndPassButton').enable();
													} else {
														Ext.getCmp('printUserAndPassButton').disable();
													}
												}
											}
										}
									}]
						}, {
							columnWidth : .25,
							layout : 'form',
							items : [{
										xtype : 'numberfield',
										name : 'userInfo.fields1',
										fieldLabel : '数量',
										allowBlank : true,
										itemCls : 'required',
										id : 'countForFindUK',
										anchor : '100%'
									}]
						}, {
							columnWidth : .25,
							layout : 'form',
							items : [{
										xtype : 'numberfield',
										id : 'yearForFindUK',
										name : 'userInfo.year',
										fieldLabel : '测评年度',
										itemCls : 'required',
										anchor : '100%'
									}]
						}],
				buttons : [{
					text : '生成',
					id : 'createUserAndKeyButton',
					cls : 'padding-left:10px',
					iconCls : 'icon-addPerson',
					handler : function() {
						var successFlag = checkUserInfo(form);
						if ('true' == successFlag) {
							form.getForm().submit({
								clientValidation : true,
								url : 'create_userInfo.action',
								params : {},
								success : function(form, action) {
									var peopleTypeForFindUK = Ext.getCmp('peopleTypeForFindUK').getValue();
									var unitForFindUK = Ext.getCmp('unitForFindUK').getValue();
									if (unitForFindUK == '干部管理学院') {
										unitForFindUK = '';
									} else if (unitForFindUK == '请选择...') {
										unitForFindUK = '';
									}
									userInfoStore.proxy = new Ext.data.HttpProxy({
												url : 'searchOffice_userInfo.action'
											});
									userInfoStore.load({
												url : 'searchOffice_userInfo.action',
												params : {
													'userInfo.peopleType.id' : peopleTypeForFindUK,
													'userInfo.unit.id' : unitForFindUK,
													'userInfo.year' : Ext.getCmp('yearForFindUK').getValue(),
													'userInfo.stateFlag' : 0
												},
												callback : function(r, options, success) {
													if (success) {
														Ext.Msg.confirm('温馨提示', '随机账号已成功生成,是否打印？', function(btn) {
																	if ('yes' == btn) {
																		var peopleTypeForFindUK = Ext.getCmp('peopleTypeForFindUK').getValue();
																		var displayPeopleTypeForFindUK = Ext.get('peopleTypeForFindUK').dom.value;
																		var unitForFindUK = Ext.getCmp('unitForFindUK').getValue();
																		if (unitForFindUK == '干部管理学院') {
																			unitForFindUK = '';
																		} else if (unitForFindUK == '请选择...') {
																			unitForFindUK = '';
																		}
																		window.open('print_userInfoReport.action?userInfo.peopleType.id=' + peopleTypeForFindUK
																				+ '&userInfo.unit.id=' + unitForFindUK + '&userInfo.stateFlag=0' + '&userInfo.year='
																				+ Ext.getCmp('yearForFindUK').getValue());
																	}
																});
													} else {

													}
												}
											});

								},
								failure : function(form, action) {
									switch (action.failureType) {
										case Ext.form.Action.CLIENT_INVALID :
											Ext.Msg.alert("验证失败", "您有未填写的项");
											break;
										case Ext.form.Action.CONNECT_FAILURE :
											Ext.Msg.alert("向服务器发送请求失败", "请检查您的网络是否畅通");
											break;
										case Ext.form.Action.SERVER_INVALID :
											Ext.Msg.alert('错误提示', '服务器出错,出错信息：' + action.result.msg);
									}
								}
							});
						} else {
							Ext.Msg.alert('温馨提示', '"<font color="red">' + successFlag + '</font>" 没有填写');
						}
					}
				}, {
					text : '查询',
					iconCls : 'icon-findPerson',
					handler : function() {
						var peopleTypeForFindUK = Ext.getCmp('peopleTypeForFindUK').getValue();
						var unitForFindUK = Ext.getCmp('unitForFindUK').getValue();
						if (unitForFindUK == '干部管理学院') {
							unitForFindUK = '';
						} else if (unitForFindUK == '请选择...') {
							unitForFindUK = '';
						}
						// var stateForFindUK =
						// Ext.getCmp('stateForFindUK').getValue();
						userInfoStore.proxy = new Ext.data.HttpProxy({
									url : 'searchOffice_userInfo.action'
								});
						userInfoStore.load({
									url : 'searchOffice_userInfo.action',
									params : {
										'userInfo.peopleType.id' : peopleTypeForFindUK,
										'userInfo.unit.id' : unitForFindUK,
										'userInfo.year' : Ext.getCmp('yearForFindUK').getValue(),
										'userInfo.stateFlag' : 0
									}
								});
					}
				}, {
					text : '导出为Excel',
					handler : function() {
						Ext.Ajax.request({
									url : 'importToExcel_userInfo.action',
									success : function(res) {
										var obj = Ext.decode(res.responseText);
										window.location.href = obj.downloadPath;
									}
								});
					}
				}]
			});
	return form;
};

function createUserAndKey(object) {

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
							header : '账号',
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
							width : 200,
							sortable : true,
							dataIndex : 'year'
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
							text : '删除用户',
							id : 'deleteUserAndKeyButton',
							cls : 'padding-left:10px',
							iconCls : 'icon-delPerson',
							handler : function() {
								var records = userInfoGrid.getSelectionModel().getSelections();
								var flag = userInfoGrid.getSelectionModel().getSelected();
								var url = 'del_userInfo.action';
								if (flag) {
									delRecord(userInfoStore, records, url);
								} else {
									Ext.Ghost.msg('操作提示', '请选择要删除的信息！');
								}
							}
						}, '-', {
							text : '<font color="green">打印全部</font>',
							iconCls : 'icon-print',
							id : 'printUserAndPassButton',
							handler : function() {
								var peopleTypeForFindUK = Ext.getCmp('peopleTypeForFindUK').getValue();
								var displayPeopleTypeForFindUK = Ext.get('peopleTypeForFindUK').dom.value;
								var unitForFindUK = Ext.getCmp('unitForFindUK').getValue();
								if (unitForFindUK == '干部管理学院') {
									unitForFindUK = '';
								} else if (unitForFindUK == '请选择...') {
									unitForFindUK = '';
								}
								// var stateForFindUK =
								// Ext.getCmp('stateForFindUK').getValue();
								if (peopleTypeForFindUK == '3' && unitForFindUK == '') {
									Ext.Msg.alert('您的操作有误', '检测到测评类型为:' + displayPeopleTypeForFindUK + '，可是您没有选择单位，这样可能会造成测评的混乱，请您选择单位');
								} else if (displayPeopleTypeForFindUK == '请选择...' || peopleTypeForFindUK == '') {
									Ext.Msg.alert('您的操作有误', '检测到测评类型为空，这样将打印所有类型 的用户名密码，可能会造成测评的混乱，请您确定测评类型');
								} else {
									window.open('print_userInfoReport.action?userInfo.peopleType.id=' + peopleTypeForFindUK + '&userInfo.unit.id=' + unitForFindUK
											+ '&userInfo.stateFlag=0' + '&userInfo.year=' + Ext.getCmp('yearForFindUK').getValue());
								}
							}
						}, '->', {
							xtype : 'paging',
							pageSize : 10,
							store : userInfoStore,
							displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
							emptyMsg : '没有记录'
						},{
							text : '删除',
							id : 'deleteUserAndKeyButton',
							cls : 'padding-left:10px',
							iconCls : 'icon-delPerson',
							handler : function() {
								var records = userInfoGrid.getSelectionModel().getSelections();
								var flag = userInfoGrid.getSelectionModel().getSelected();
								var url = 'del_userInfo.action';
								if (flag) {
									delRecord(userInfoStore, records, url);
								} else {
									Ext.Ghost.msg('操作提示', '请选择要删除的信息！');
								}
							}
						}]
			});
	object = userGrid;
	return object;
};