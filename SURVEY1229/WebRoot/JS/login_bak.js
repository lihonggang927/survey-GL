Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			var loginform = new Ext.FormPanel({
						labelWidth : 50,
						frame : false,
						height : 127,
						width : 225,
						bodyStyle : 'padding:5px 5px 0',
						waitMsgTarget : true,
						renderTo : 'loginDiv',
						baseCls : "panel",
						buttonAlign : 'left',
						defaults : {
						},
						defaultType : 'textfield',
						items : [{
									fieldLabel : '用户名',
									name : 'userInfo.username',
									allowBlank : false,
									id : 'userNameId'
								}, {
									fieldLabel : '密码',
									name : 'userInfo.password',
									inputType : 'password',
									allowBlank : false
								}],
						buttons : [{
									text : '登录',
									disabled : false,
									handler : function() {
										if (loginform.form.isValid()) {
											loginform.form.submit({
														url : 'login.action',
														success : function(form, action) {
//															currentUser = action.result.userInfo;
//															var flag=action.result.userInfo.id;
//															alert('currentUser:' + currentUser.id);
//															var result = Ext.util.JSON.decode(action);
//															var success = result.success;
//															alert('success:' + success);
															loginform.getForm().reset();
															//currentUser
															//var woiwo = window.open(basePath + 'sysconf/config.jsp', '_self', 'fullscreen=yes');
															var woiwo = window.open(basePath + 'survey/survey.jsp', '_self', 'fullscreen=yes');
															if (!woiwo) {
																alert('CMS4J管理窗口被您系统中的拦截器拦截，如果您使用了窗口拦截器，请尝试关闭它，以便打开该窗口。');
															} else {
																woiwo.moveTo(0, 0);
																woiwo.resizeTo(screen.availWidth, screen.availHeight);
																woiwo.outerWidth = screen.availWidth;
																woiwo.outerHeight = screen.availHeight;
															}
														},
														failure : function(form, action) {
															//window.open(basePath + 'sysconf/config.jsp', '_self', 'fullscreen=yes');
															//window.open(basePath + 'survey/survey.jsp', '_self', 'fullscreen=yes');
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