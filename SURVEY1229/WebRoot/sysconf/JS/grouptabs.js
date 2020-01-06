var peopleGrid_one;
var peopleGrid_two;
var peopleType_one;
var peopleType_two;
var surveyStandard_one;
var surveyStandard_two;
var officeInfo;
var unit_one;
var unit_two;
var userInfoGrid;
var userInfoForm;
var winForExcel;
var totalHeight = document.documentElement.clientHeight;// 网页可见区域高

Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
	Ext.QuickTips.init();
	officeStore = new Ext.data.ArrayStore({
				fields : ['id', 'name'],
				data : [['0', '请选择'], ['1', '机关第一党总支'], ['2', '机关第二党总支'], ['3', '机关第三党总支']]
			});
	unitStoreForPeopleGrid.load({
				callback : function(r, options, success) {

				}
			});
	unitStore.load();
	officeInfoStore.load();
	peopleStore.load();
	peopleTypeStore.load();
	surveyStandardStore.load();

	peopleGrid_one = createPeople(peopleGrid_one, '1');
	peopleGrid_two = createPeople(peopleGrid_two, '2');
	peopleType_one = createPeopleType(peopleType_one);
	peopleType_two = createPeopleType(peopleType_two);
	surveyStandard_one = createSurveyStandard(surveyStandard_one);
	surveyStandard_two = createSurveyStandard(surveyStandard_two);
	unit_one = createUnit(unit_one);
	unit_two = createUnit(unit_two);

	officeInfo = createOfficeInfo(officeInfo);

	userInfoGrid = createUserAndKey(userInfoGrid);
	userInfoForm = createConditionForm();

	var tools = [{
				id : 'close',
				handler : function(e, target, panel) {
					panel.ownerCt.remove(panel, true);
				}
			}];
	var userAndKeyPanel = new Ext.Panel({
				layout : 'border',
				items : [userInfoForm, userInfoGrid]
			});
	Ext.apply(Ext.form.VTypes, {
				repetition : function(val, field) { // 返回true，则验证通过，否则验证失败
					if (field.repetition) { // 如果表单有使用repetition配置，repetition配置是一个JSON对象，该对象提供了一个名为targetCmpId的字段，该字段指定了需要进行比较的另一个组件ID。
						var cmp = Ext.getCmp(field.repetition.targetCmpId); // 通过targetCmpId的字段查找组件
						if (Ext.isEmpty(cmp)) { // 如果组件（表单）不存在，提示错误
							Ext.MessageBox.show({
										title : '错误',
										msg : '发生异常错误，指定的组件未找到',
										icon : Ext.Msg.ERROR,
										buttons : Ext.Msg.OK
									});
							return false;
						}
						if (val == cmp.getValue()) { // 取得目标组件（表单）的值，与宿主表单的值进行比较。
							return true;
						} else {
							return false;
						}
					}
				},
				repetitionText : '两次输入的密码不一样，请重新输入'
			})
	var adminKeyPanel = new Ext.form.FormPanel({
				title : '<center>修改密码</center>',
				height : 200,
				width : 400,
				collapsible : false,
				labelWidth : 70,
				labelSeparator : ':',
				frame : false,
				layout : 'form',
				labelAlign : 'right',
				buttonAlign : 'center',
				items : [{
							xtype : 'hidden',
							id : 'userInfoId',
							name : 'userInfo.id'
						}, {
							xtype : 'hidden',
							id : 'userInfoUsername',
							name : 'userInfo.username'
						}, {
							xtype : 'textfield',
							inputType : 'password',
							width : '80%',
							allowBlank : false,
							name : 'userInfo.password',
							fieldLabel : '旧密码'
						}, {
							xtype : 'textfield',
							inputType : 'password',
							id : 'newPassword',
							allowBlank : false,
							name : 'userInfo.password',
							width : '80%',
							fieldLabel : '新密码'
						}, {
							xtype : 'textfield',
							inputType : 'password',
							width : '80%',
							allowBlank : false,
							fieldLabel : '确认密码',
							vtype : 'repetition', // 指定repetition验证类型
							repetition : {
								targetCmpId : 'newPassword'
							} // 配置repetition验证，提供目标组件（表单）ID
						}],
				buttons : [{
							text : '修改',
							id : 'updatePassword',
							handler : function() {
								if (adminKeyPanel.getForm().isValid()) {
									Ext.getCmp('updatePassword').disable();
									adminKeyPanel.getForm().submit({
												url : 'update_userInfo.action',
												success : function(form, action) {
													Ext.getCmp('updatePassword').enable();
//													Ext.Msg.alert("Success", action.result.msg);
													adminKeyPanel.getForm().reset();
													Ext.Msg.alert('操作提示', '密码修改成功');
												},
												failure : function(form, action) {
													Ext.getCmp('updatePassword').enable();
													adminKeyPanel.getForm().reset();
													Ext.Msg.alert('错误提示', '您的旧密码错误！');
//													switch (action.failureType) {
//														case Ext.form.Action.CLIENT_INVALID :
//															Ext.Msg.alert("Failure", "Form fields may not be submitted with invalid values");
//															break;
//														case Ext.form.Action.CONNECT_FAILURE :
//															Ext.Msg.alert("Failure", "Ajax communication failed");
//															break;
//														case Ext.form.Action.SERVER_INVALID :
//															Ext.Msg.alert("Failure", action.result.msg);
//													}
												}

											});
								} else {
									Ext.Msg.alert('操作提示', '您有错误的输入，请重新填写');
								}
							}
						}, {
							text : '清空',
							handler : function() {
								adminKeyPanel.getForm().reset();
							}
						}]
			});
			
			
	var clearKeyPanel = new Ext.form.FormPanel({
				title : '<center>清理数据</center>',
				height : 200,
				width : 400,
				collapsible : false,
				labelWidth : 70,
				labelSeparator : ':',
				frame : false,
				layout : 'form',
				labelAlign : 'right',
				buttonAlign : 'center',
				items : [ {
							xtype : 'label',
         					text : '请确认清理测评数据，数据一旦清理，不可恢复。'
						}],
				buttons : [{
							text : '确认清理',
							id : 'clearbutton',
							handler : function() {
								
									 Ext.Ajax.request({
                        url: "clear_unit.action" , //获取人员编号
                        success: function(request) {
												
													
//													Ext.Msg.alert("Success", action.result.msg);
													
													Ext.Msg.alert('操作提示', '清理成功');
												},
												failure : function(form, action) {
													clearKeyPanel.getForm().reset();
													Ext.Msg.alert('错误提示', '清理错误！');
//													switch (action.failureType) {
//														case Ext.form.Action.CLIENT_INVALID :
//															Ext.Msg.alert("Failure", "Form fields may not be submitted with invalid values");
//															break;
//														case Ext.form.Action.CONNECT_FAILURE :
//															Ext.Msg.alert("Failure", "Ajax communication failed");
//															break;
//														case Ext.form.Action.SERVER_INVALID :
//															Ext.Msg.alert("Failure", action.result.msg);
//													}
												}

											});
								
							}
						}]
			});
	var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [{
							xtype : 'grouptabpanel',
							tabWidth : 130,
							activeGroup : 0,
							items : [{
										mainItem : 1,
										items : [{
													title : '干部信息录入',
													iconCls : 'x-icon-users',
													// tabTip : '点击，录入干部信息',
													layout : 'fit',
													style : 'padding: 0px 0px 0px 10px;',
													items : peopleGrid_two
												}, {
													xtype : 'portal',
													title : '系统预览',
													// tabTip : '点击，进行预览和配置',
													items : [{
																columnWidth : .5,
																style : 'padding:0px 10px 0px 10px',
																items : [{
																			title : '干部信息录入',
																			layout : 'fit',
																			tools : tools,
																			items : peopleGrid_one
																		}]
															}, {
																columnWidth : .5,
																style : 'padding:0px 0px 0px 0px',
																items : [{
																			title : '测评标准录入',
																			layout : 'fit',
																			tools : tools,
																			items : surveyStandard_one
																		}, {
																			title : '学院与单位录入',
																			layout : 'fit',
																			tools : tools,
																			items : unit_one
																		}, {
																			title : '测评人员类型录入',
																			layout : 'fit',
																			tools : tools,
																			items : peopleType_one
																		}]
															}]
												}, {
													title : '测评标准录入',
													iconCls : 'x-icon-subscriptions',
													// tabTip : '点击，录入测评标准',
													style : 'padding: 0px 0px 0px 10px;',
													layout : 'fit',
													items : surveyStandard_two
												},{
													title : '测评支部录入',
													iconCls : 'x-icon-subscriptions',
													// tabTip : '点击，录入测评标准',
													style : 'padding: 0px 0px 0px 10px;',
													layout : 'fit',
													items : officeInfo
												}, {
													title : '学院与单位录入',
													layout : 'fit',
													iconCls : 'x-icon-tickets',
													// tabTip : '点击，录入学院信息',
													style : 'padding: 0px 0px 0px 10px;',
													items : unit_two
												}, {
													title : '测评人员类型',
													layout : 'fit',
													iconCls : 'x-icon-type',
													// tabTip : '点击，录入测评人员类型',
													style : 'padding: 0px 0px 0px 10px;',
													items : peopleType_two
												}, {
													title : '生成用户名和密码',
													layout : 'fit',
													iconCls : 'x-icon-key',
													// tabTip : '点击，生成用户名和密码',
													style : 'padding: 0px 0px 0px 10px;',
													items : userAndKeyPanel
												}]
									}, {
										expanded : true,
										items : [{
													title : '附加功能',
													tabTip : '点击，修改您的密码',
													style : 'padding: 10px;'
												}, {
													title : '修改密码',
													iconCls : 'x-icon-keyboard',
													tabTip : '点击，修改您的密码',
													style : 'padding: 10px;',
													items : adminKeyPanel
												}, {
													title : '成绩统计与查询',
													iconCls : 'x-icon-templates',
													// tabTip : '干部测评成绩统计',
													style : 'padding: 0px 0px 0px 10px;',
													layout : 'fit',
													html : '<iframe width="100%" height="100%" style="border: 0" src="' + basePath + 'sysconf/statistics.jsp"></iframe>'
												}, {
													title : '系统开关',
													iconCls : 'x-icon-lock',
													// tabTip : '点击，编辑系统的开放与关闭',
													layout : 'fit',
													style : 'padding: 0px 0px 0px 10px;',
													html : '<iframe width="100%" height="100%" style="border: 0" src="' + basePath + 'sysconf/switch.jsp"></iframe>'
												}, {
													title : '清理历史测评数据',
													iconCls : 'x-icon-lock',
													// tabTip : '点击，编辑系统的开放与关闭',
													layout : 'fit',
													style : 'padding: 0px 0px 0px 10px;',
													items : clearKeyPanel
												}]
									}]
						}]
			});
		Ext.getCmp('userInfoId').value = currentUser;
		Ext.getCmp('userInfoUsername').value = userInfoUsername;
		// var ddrow_one = new
		// Ext.dd.DropTarget(peopleGrid_one.getView().mainBody, {
		// ddGroup : 'GridDD1',
		// copy : false,
		// notifyDrop : function(dd, e, data) {
		// var sm = peopleGrid_one.getSelectionModel();
		// var rows = sm.getSelections();
		// var store = peopleGrid_one.getStore();
		// var sortInfo = [];
		// var cindex = dd.getDragData(e).rowIndex;
		// var purposeId = store.getAt(cindex).get('id');
		// var purposeLevel = store.getAt(cindex).get('level');
		// if (cindex == undefined || cindex < 0) {
		// sortInfo.push('null')
		// e.cancel = true;
		// return;
		// }
		//
		// sortInfo.push(purposeId);
		// sortInfo.push(purposeLevel);
		//
		// for (i = 0; i < rows.length; i++) {
		// rowData = store.getById(rows[i].id);
		// if (!this.copy) {
		// sortInfo.push(rows[i].data.id);
		// sortInfo.push(rows[i].data.level);
		// store.remove(store.getById(rows[i].id));
		// store.insert(cindex, rowData); // insert
		//
		// // if (parseInt(cindex + 1) <
		// // parseInt(store.getTotalCount())) {
		// // document.getElementById('hidDargID').value
		// // =
		// // store.getById(rows[i].id).get('OrderIndex');
		// // document.getElementById('hidNewID').value
		// // =
		// // store.getAt(cindex +
		// // 1).get('OrderIndex');
		// // document.getElementById('Button2').click();
		// // }
		// }
		// }
		// Ext.Ajax.request({
		// url : 'sort_people.action',
		// params : {
		// sortInfo : sortInfo
		// },
		// method : 'post',
		// success : function(response, options) {
		// var result = Ext.util.JSON.decode(response.responseText);
		// var success = result.success;
		// if (success) {
		// peopleGrid_one.getStore().reload();
		// } else {
		// Ext.Ghost.msg('操作提示', '您刚才的操作没有成功，请刷新页面，重新刚才的操作');
		// }
		// }
		// });
		// }
		// });
	});
