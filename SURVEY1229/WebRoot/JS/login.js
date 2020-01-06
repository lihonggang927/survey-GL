Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();
			var loginform = new Ext.FormPanel({
						labelWidth : 40,
						frame : false,
						height : 100,
						width : 225,
						bodyStyle : 'padding:5px 5px',
						waitMsgTarget : true,
						baseCls : 'panel',
						labelAlign : 'right',
						buttonAlign : 'left',
						defaultType : 'textfield',
						renderTo : 'formPanel',
						items : [{
									xtype : 'textfield',
									fieldLabel : '账号',
									width : '90%',
									name : 'userInfo.username',
									allowBlank : false,
									id : 'userNameId'
								}, {
									fieldLabel : '密码',
									width : '90%',
									name : 'userInfo.password',
									inputType : 'password',
									allowBlank : false,
									listeners : {
										'specialkey' : function(field, e) {
											if (e.getKey() == 13) {
												Ext.getCmp('loginBtn').focus(true, true);
											}
										}
									}
								}],
						buttons : [{
									id : 'loginBtn',
									text : '登录',
									disabled : false,
									handler : function() {
										var username = Ext.getCmp('userNameId').getValue();
										if (loginform.form.isValid()) {
											loginform.form.submit({
														url : 'login.action',
														success : function(form, action) {
															loginform.getForm().reset();
															if (username == 'admin') {
																window.open(basePath + 'sysconf/config.jsp', '_self', 'fullscreen=yes');
															} else {
																var result = Ext.util.JSON.decode(action.response.responseText);
																var lockFlag = result.userInfo.peopleType.lockFlag;
																if (lockFlag == 1) {
																	var peopleTypeId = result.userInfo.peopleType.id;
																	if (3 != peopleTypeId) {//不是教职工测评
																		var userState =  result.userInfo.stateFlag;
																		if(userState == 1) {
																			window.open(basePath + 'survey/survey_ext.jsp', '_self', 'fullscreen=yes');
//																			window.open('union_survey.action', '_self', 'fullscreen=yes');
																		} else if(userState == 3) {
																			Ext.Msg.alert('提示', '测评用户您好，该账号已参与测评，不能再次参与测评');
																		} else if(userState == 0) {
																			Ext.Msg.alert('操作提示', '该账号未打印，没有参与测评的资格');
																		}
																	}else {//教职工测评
																		var lockFlagOfUnit = result.userInfo.unit.lockFlag;
																		if(0 == lockFlagOfUnit) {
																			var office = result.userInfo.unit.office;
																			var unit = result.userInfo.unit.name;
																			if(office == 1) {
																				unit = '机关第一党总支';
																			} 
																			if(office == 2) {
																				unit = '机关第二党总支';
																			} 
																			if(office == 3) {
																				unit = '机关第三党总支';
																			} 
																			
																			Ext.Msg.alert('温馨提示',  '您所在单位测评已关闭，您不能参与测评');
																		} else {
																			var userState =  result.userInfo.stateFlag;
																			if(userState == 1) {
																				//window.open(basePath +'survey/survey_ext.jsp', '_self', 'fullscreen=yes');
			window.open('http://202.194.121.15/survey/survey/survey_ext.jsp', '_self', 'fullscreen=yes');
			//http://202.194.121.15
																			}else if(userState == 3) {
																				Ext.Msg.alert('提示', '测评用户您好，该账号已参与测评，不能再次参与测评');
																			} else if(userState == 0) {
																			Ext.Msg.alert('操作提示', '该账号未打印，没有参与测评的资格');
																		}
																		}
																	}
																} else {
																	var type = result.userInfo.peopleType.name;
																	Ext.Msg.alert('温馨提示', type + ' 测评已关闭，您不能参与测评');
																}
															}
														},
														failure : function(form, action) {
															Ext.Msg.alert('登陆失败', '用户名或密码错误！');
														},
														waitMsg : '正在登陆，稍后...'
													});
										} else {
											Ext.Msg.alert('信息', '请填写完成再登录!');
										}
									}
								}, {
									text : '重置',
									handler : function() {
										loginform.getForm().reset();
									}
								}]
					});
			Ext.getCmp("userNameId").focus(true, true);
		});