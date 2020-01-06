var stateText = '';

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
												fieldLabel : '状态',
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
								}, {
									text : '开通',
									handler : function() {
										Ext.Ajax.request({
													url : 'saveOrUpdate_peopleType.action',
													method : 'post',
													params : {
														'attribute' : 'lockFlag',
														'value' : '1',
														'flag' : flag
													},
													success : function(response, options) {
														var result = Ext.util.JSON.decode(response.responseText);
														var flag = result.success;
														if (flag == true) {
															Ext.getCmp('state').setText('已开通');
															Ext.Ghost.msg('操作提示', '已开通', 1);
														} else {
															Ext.Msg.alert('错误提示', '开通失败');
														}
													},
													failure : function(response, options) {
														Ext.Msg.alert('失败提示', '因网络原因失败');
													}
												});
									}
								}, {
									text : '关闭',
									handler : function() {
										Ext.Ajax.request({
													url : 'saveOrUpdate_peopleType.action',
													method : 'post',
													params : {
														'attribute' : 'lockFlag',
														'value' : '0',
														'flag' : flag
													},
													success : function(response, options) {
														var result = Ext.util.JSON.decode(response.responseText);
														var flag = result.success;
														if (flag == true) {
															Ext.getCmp('state').setText('已关闭');
															Ext.Ghost.msg('操作提示', '已关闭', 1);
														} else {
															Ext.Msg.alert('错误提示', '关闭失败');
														}
													},
													failure : function(response, options) {
														Ext.Msg.alert('失败提示', '因网络原因失败');
													}
												});
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
								}, {
									header : '状态',
									width : 200,
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
													xtype : 'label',
													text : '测评状态：'
												}, {
													xtype : 'label',
													id : 'state',
													text : stateText
												}, '->', {
													xtype : 'paging',
													pageSize : 10,
													store : userInfoStore,
													displayInfo : '显示第 {0} 条到 {1} 条记录, 共 {2} 条',
													emptyMsg : '没有记录'
												}]
									});

							var viewport = new Ext.Viewport({
										layout : 'border',
										items : [form, userGrid]
									});
						},
						failure : function(response, options) {
							stateText = '因网络连接出现问题，开关状态查找失败';
						}
					});

		});