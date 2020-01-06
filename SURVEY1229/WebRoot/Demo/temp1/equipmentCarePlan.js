var equipment_start = 0;
//var 

Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
	Ext.QuickTips.init();
	haveRight('goods/equipment/equipmentCarePlan.jsp');

	equipmentTypeStore = new Ext.data.JsonStore({
				url : 'goods/find_EquipmentType.action',
				root : 'list',
				totalProperty : 'totalProperty',
				baseParams : {
					start : 0,
					limit : 10
				},
				fields : [{
							name : 'equipmentTypeId',
							mapping : 'id'
						}, {
							name : 'equipmentTypeName',
							mapping : 'name'
						}],
				autoLoad : false
			});
	equipmentTypeStore.load();

	equipmentManufacturerStore = new Ext.data.JsonStore({
				url : 'goods/find_EquipmentManufacturer.action',
				root : 'list',
				totalProperty : 'totalProperty',
				baseParams : {
					start : 0,
					limit : 10
				},
				fields : [{
							name : 'equipmentManufacturerId',
							mapping : 'id'
						}, {
							name : 'equipmentManufacturerName',
							mapping : 'name'
						}],
				autoLoad : false
			});
	equipmentManufacturerStore.load();

	equipmentInfoStore = new Ext.data.JsonStore({
				url : 'goods/limitFind_EquipmentInfo.action',
				root : 'limitEquipmentInfoList',
				totalProperty : 'totalProperty',
				baseParams : {
					start : 0,
					limit : 10
				},
				fields : [{
							name : 'equipmententry',
							mapping : 'equipmententry.entrysn'
						}, {
							name : 'equipmentid',
							mapping : 'equipmentid'
						}, {
							name : 'equipmentmainuse.name',
							mapping : 'equipmentmainuse.name'
						}, {
							name : 'equipmentmanufacturer.name',
							mapping : 'equipmentmanufacturer.name'
						}, {
							name : 'equipmentmodel.name',
							mapping : 'equipmentmodel.name'
						}, {
							name : 'equipmentnewflag',
							mapping : 'equipmentnewflag'
						}, {
							name : 'equipmenttype.name',
							mapping : 'equipmenttype.name'
						}, {
							name : 'equipmentunit.name',
							mapping : 'equipmentunit.name'
						}, {
							name : 'examineperiod',
							mapping : 'examineperiod'
						}, {
							name : 'inputcode',
							mapping : 'inputcode'
						}, {
							name : 'lastexaminedate',
							mapping : 'lastexaminedate'
						}, {
							name : 'measurerange',
							mapping : 'measurerange'
						}, {
							name : 'name',
							mapping : 'name'
						}, {
							name : 'precision',
							mapping : 'precision'
						}, {
							name : 'remark',
							mapping : 'remark'
						}, {
							name : 'resolution',
							mapping : 'resolution'
						}, {
							name : 'status',
							mapping : 'status'
						}],
				autoLoad : false
			});

	equipmentCarePlanStore = new Ext.data.JsonStore({
				url : 'goods/limitFind_EquipmentCarePlan.action',
				root : 'equipmentCarePlanList',
				totalProperty : 'totalProperty',
				baseParams : {
					start : 0,
					limit : 10
				},
				fields : [{
							name : 'careid',
							mapping : 'careid'
						}, {
							name : 'carecontent',
							mapping : 'carecontent'
						}, {
							name : 'caredatetime',
							mapping : 'caredatetime'
						}, {
							name : 'equipmentinfo.name',
							mapping : 'equipmentinfo.name'
						}, {
							name : 'remark',
							mapping : 'remark'
						}],
				autoLoad : false
			});
	equipmentCarePlanStore.load();

	equipmentCarePlanGrid = new Ext.grid.GridPanel({
		title : '保养计划',
		bodyStyle : 'width:100%',
		store : equipmentCarePlanStore,
		columns : [new Ext.grid.RowNumberer({ // 行号
					header : "序号",
					width : 50,
					renderer : function(value, metadata, record, rowIndex) {
						return equipment_start + 1 + rowIndex;
					}
				}), {
					header : '保养流水号',
					dataIndex : 'careid',
					hidden : true,
					width : 100
				}, {
					header : '设备名称',
					dataIndex : 'equipmentinfo.name',
					width : 100,
					renderer : function(value) {
						return "<a href=javascript:updateEquipmentCarePlan()  >"
								+ value + "</a>"
					}
				}, {
					header : '保养内容',
					dataIndex : 'carecontent',
					width : 100
				}, {
					header : '保养时间',
					dataIndex : 'caredatetime',
					width : 100,
					renderer : function(obj) {
						return timeConvert(obj);
					}
				}, {
					header : '备注',
					dataIndex : 'remark',
					width : 100
				}],
		tbar : [{
					text : '添加保养计划',
					iconCls : 'icon-add',
					handler : function() {
						addEquipmentCarePlan();
					}
				}],
		bbar : [{
					xtype : 'paging',
					pageSize : 10,
					id : 'pageBar',
					store : equipmentCarePlanStore,
					plugins : [new Ext.ux.plugins.PageComboResizer()],
					displayInfo : true,
					displayMsg : "当前显示记录从 {0}-{1} 总 {2}条记录",
					emptyMsg : "没有相关记录!",
					doLoad : function(start) {
						equipment_start = start;
						var o = {}, pn = this.getParams();
						o[pn.start] = start;
						o[pn.limit] = this.pageSize;
						this.store.load({
									params : o
								});
					}
				}]
	});

	var pageLimit = Ext.getCmp('pageBar').pageSize;

	equipmentCarePlanStore.load({
				params : {
					start : 0,
					limit : pageLimit
				}
			});

	Date.dayNames = ["日", "一", "二", "三", "四", "五", "六"];
	Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月",
			"10月", "11月", "12月"];
	if (Ext.DatePicker) {
		Ext.apply(Ext.DatePicker.prototype, {
					todayText : "今天",
					minText : "日期在最小日期之前",
					maxText : "日期在最大日期之后",
					disabledDaysText : "",
					disabledDatesText : "",
					monthNames : Date.monthNames,
					dayNames : Date.dayNames,
					nextText : '下月 (Control+Right)',
					prevText : '上月 (Control+Left)',
					monthYearText : '选择一个月 (Control+Up/Down 来改变年)',
					todayTip : "{0} (Spacebar)",
					okText : "确定",
					cancelText : "取消"
				});
	}

	Ext.apply(Ext.form.VTypes, {
		daterange : function(val, field) {
			var date = field.parseDate(val);

			if (!date) {
				return;
			}
			if (field.startDateField
					&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
							.getTime()))) {
				var start = Ext.getCmp(field.startDateField);
				start.setMaxValue(date);
				start.validate();
				this.dateRangeMax = date;
			} else if (field.endDateField
					&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
							.getTime()))) {
				var end = Ext.getCmp(field.endDateField);
				end.setMinValue(date);
				end.validate();
				this.dateRangeMin = date;
			}
			return true;
		}
	});

	queryEquipmentCarePlanForm = new Ext.form.FormPanel({
		title : '保养信息查询',
		labelAlign : 'right',
		buttonAlign : 'center',
		layout : 'form',
		frame : true,
		defaultType : 'textfield',
		labelWidth : 80,
		padding : 7,
		items : [{
					xtype : 'textfield',
					id : 'queryEquipmentNameId',
					hidden : true
				}, {
					fieldLabel : '设备名称',
					xtype : 'textfield',
					id : 'queryEquipmentName',
					width : 90,
					itemCls : 'right-part',
					clearCls : 'allow-float',
					emptyText : '--请选择--'
				}, {
					xtype : 'button',
					iconCls : 'icon-select',
					cls : 'only-float',
					clearCls : 'allow-float',
					align : 'right',
					width : 20,
					handler : function() {
						queryEquipmentInfo();
					}
				}, {
					fieldLabel : '保养时间，从',
					xtype : 'datefield',
					id : 'btimex',
					vtype : 'daterange',
					editable : false,
					format : 'Y-m-d',
					width : 110,
					emptyText : '--请选择--',
					itemCls : 'right-part',
					clearCls : 'allow-float',
					endDateField : 'etimex'
				}, {
					fieldLabel : '到',
					xtype : 'datefield',
					value : new Date(),
					id : 'etimex',
					vtype : 'daterange',
					format : 'Y-m-d',
					editable : false,
					itemCls : 'right-part',
					clearCls : 'allow-float',
					width : 110,
					emptyText : '--请选择--',
					startDateField : 'btimex'
				}],
		buttons : [{
			text : '查询',
			iconCls : 'icon-select',
			handler : function() {
				var qurl = '';
				if (Ext.getCmp('queryEquipmentNameId').getValue() == ''
						& Ext.getCmp('btimex').getValue() == ''
						& Ext.getCmp('etimex').getValue() == '') {
					qurl = 'goods/limitFind_EquipmentCarePlan.action';
				} else {
					qurl = 'goods/limitFind_EquipmentCarePlan.action?'
					if (Ext.getCmp('queryEquipmentNameId').getValue() != '') {
						/*
						next1 = '&equipmentCarePlan.equipmentinfo.equipmentid='
								+ Ext.getCmp('queryEquipmentNameId').getValue();
						*/
						next1 = '&equipmentCarePlan.equipmentinfo.name='
								+ Ext.getCmp('queryEquipmentName').getValue();
						qurl = qurl + next1;
					}
					if (Ext.getCmp('btimex').getValue() != '') {
						next2 = '&equipmentCarePlan.caredatetime='
								+ Ext.getCmp('btimex').getValue().format('Ymd');
						qurl = qurl + next2;
					}
					if (Ext.getCmp('etimex').getValue() != '') {
						next3 = '&equipmentCarePlan.remark='
								+ Ext.getCmp('etimex').getValue().format('Ymd');
						qurl = qurl + next3;
					}
				}
				equipmentCarePlanStore.proxy = new Ext.data.HttpProxy({
							url : qurl
						});
				equipmentCarePlanStore.load();
			}
		}, {
			text : '重置',
			iconCls : 'icon-reset',
			handler : function() {
				queryEquipmentCarePlanForm.form.reset();
			}
		}]
	});

	panel = new Ext.Panel({
				width : '100%',
				id : 'fitpanel',
				renderTo : 'form',
				items : [queryEquipmentCarePlanForm, equipmentCarePlanGrid]
			})

	var divHeight = document.getElementById('form').offsetHeight;
	var divWidth = document.getElementById('form').offsetWidth;

	panel.setHeight(divHeight);
	panel.setWidth(divWidth);

	equipmentCarePlanGrid.setWidth(panel.getWidth());
	equipmentCarePlanGrid.setHeight(panel.getHeight()
			- queryEquipmentCarePlanForm.getHeight());

	addEquipmentCarePlanForm = new Ext.form.FormPanel({
				frame : true,
				labelAlign : 'left',
				baseCls : 'x-plain',// //底色与父窗体相同
				autoHeight : true,// 自适应高度
				buttonAlign : 'center',
				labelWidth : 60,
				padding : 10,
				items : [{
							xtype : 'textfield',
							id : 'addEquipmentNameId',
							name : 'equipmentCarePlan.equipmentinfo.equipmentid',
							hideLabel : true,
							hidden : true
						}, {
							fieldLabel : '设备名称',
							xtype : 'textfield',
							id : 'addEquipmentName',
							name : 'equipmentCarePlan.equipmentinfo.name',
							readOnly : true,
							allowBlank : false,
							width : 110,
							emptyText : '--请选择--',
							clearCls : 'allow-float',
							itemCls : 'only-float'
						}, {
							xtype : 'button',
							iconCls : 'icon-select',
							cls : 'only-float',
							align : 'right',
							width : 20,
							handler : function() {
								addEquipmentInfo();
							}
						}, {
							fieldLabel : '保养内容',
							xtype : 'textarea',
							width : 300,
							name : 'equipmentCarePlan.carecontent',
							itemCls : 'stop-float'
						}, {
							fieldLabel : '备注',
							xtype : 'textarea',
							width : 300,
							name : 'equipmentCarePlan.remark'
						}],
				buttons : [{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
						Ext.MessageBox.confirm("操作提示", "新增保养计划?", function(
										button) {
									if (button == "yes") {
										if (add()) {
											return true;
										}
									}
								});
					}
				}, {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						addEquipmentCarePlanWin.hide();
						addEquipmentCarePlanForm.form.reset();
					}
				}]
			});

	addEquipmentCarePlanWin = new Ext.Window({
				title : '添加保养计划',
				layout : 'form',
				width : 500,
				autoHeight : true,
				plain : true,
				closable : false,
				bodyStyle : "padding:10px",
				items : addEquipmentCarePlanForm
			});

	addEquipmentCarePlan = function() {
		addEquipmentCarePlanWin.show();
	};

	addEquipmentInfoForm = new Ext.form.FormPanel({
		title : '请输入查询条件',
		labelAlign : 'right',
		buttonAlign : 'center',
		frame : true,
		baseCls : 'x-plain',
		defaultType : 'textfield',
		labelWidth : 70,
		padding : 10,
		items : [{
					fieldLabel : '生产厂商',
					xtype : 'combo',
					id : 'addequipmentManufacturer',
					store : equipmentManufacturerStore,
					valueField : 'equipmentManufacturerId',
					displayField : 'equipmentManufacturerName',
					mode : 'local',
					pageSize : 10,
					width : 110,
					editable : false,
					triggerAction : 'all',
					itemCls : 'right-part',
					emptyText : '--请选择--',
					itemCls : 'right-part',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '输入代码',
					xtype : 'textfield',
					id : 'addinputCode',
					itemCls : 'right-part',
					editable : false,
					width : 110,
					emptyText : '--请选择--',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '入库流水号',
					xtype : 'textfield',
					id : 'addequipmentId',
					itemCls : 'right-part',
					editable : false,
					width : 110,
					emptyText : '--请选择--',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '类型',
					xtype : 'combo',
					id : 'addequipmentType',
					store : equipmentTypeStore,
					valueField : 'equipmentTypeId',
					displayField : 'equipmentTypeName',
					mode : 'local',
					pageSize : 10,
					width : 110,
					// allowBlank : false,
					editable : false,
					triggerAction : 'all',
					itemCls : 'right-part',
					emptyText : '--请选择--',
					itemCls : 'right-part',
					clearCls : 'allow-float'
				}],
		buttons : [{
			text : '查询',
			iconCls : 'icon-select',
			handler : function() {
				var qurl = null;
				var next1;
				var next2;
				var next3;
				var next4;
				var next5;
				var next6;
				if (Ext.getCmp('addequipmentManufacturer').getValue() == ''
						& Ext.getCmp('addinputCode').getValue() == ''
						& Ext.getCmp('addequipmentId').getValue() == ''
						& Ext.getCmp('addequipmentType').getValue() == '') {
					qurl = 'goods/find_EquipmentInfo.action';
				} else {
					qurl = 'goods/limitFind_EquipmentInfo.action?'
					if (Ext.getCmp('addequipmentManufacturer').getValue() != '') {
						next1 = '&equipmentInfo.equipmentmanufacturer.id='
								+ Ext.getCmp('addequipmentManufacturer')
										.getValue();
						qurl = qurl + next1;
					}
					if (Ext.getCmp('addinputCode').getValue() != '') {
						next2 = '&equipmentInfo.inputcode='
								+ Ext.getCmp('addinputCode').getValue();
						qurl = qurl + next2;
					}
					if (Ext.getCmp('addequipmentId').getValue() != '') {
						next3 = '&equipmentInfo.equipmententry.entrysn='
								+ Ext.getCmp('addequipmentId').getValue();
						qurl = qurl + next3;
					}

					if (Ext.getCmp('addequipmentType').getValue() != '') {
						next4 = '&equipmentInfo.equipmenttype.id='
								+ Ext.getCmp('addequipmentType').getValue();
						qurl = qurl + next4;
					}

					if (qurl.substring(37, 38) == '&') {
						qurl = qurl.substring(0, 37) + qurl.substring(38);
					}
				}

				equipmentInfoStore.proxy = new Ext.data.HttpProxy({
					url : qurl
						// qurl 为上边的拼接的url 37
					});
				qurl = null;
				equipmentInfoStore.load();
			}
		}, {
			text : '重置',
			iconCls : 'icon-reset',
			handler : function() {
				findEquipmentInfoNameForm.form.reset();
			}
		}]
	});

	addEquipmentInfoGrid = new Ext.grid.GridPanel({
				title : '设备信息',
				height : '310',
				store : equipmentInfoStore,
				baseCls : 'x-plain',
				bodyStyle : 'width:100%',
				columns : [new Ext.grid.RowNumberer({ // 行号
							header : "序号",
							width : 50,
							renderer : function(value, metadata, record,
									rowIndex) {
								return equipment_start + 1 + rowIndex;
							}
						}), {
							header : '设备ID',
							dataIndex : 'equipmentid',
							width : 100,
							hidden : true
						}, {
							header : '入库流水号',
							dataIndex : 'equipmententry',
							width : 80
						}, {
							header : '名称',
							dataIndex : 'name',
							width : 80
						}, {
							header : '主要用途',
							dataIndex : 'equipmentmainuse.name',
							width : 80
						}, {
							header : '生产商',
							dataIndex : 'equipmentmanufacturer.name',
							width : 80
						}, {
							header : '设备型号',
							dataIndex : 'equipmentmodel.name',
							width : 80
						}, {
							header : '是否完好',
							dataIndex : 'equipmentnewflag',
							width : 80
						}, {
							header : '状态',
							dataIndex : 'status',
							width : 80
						}, {
							header : '设备类型',
							dataIndex : 'equipmenttype.name',
							width : 80
						}, {
							header : '设备单位',
							dataIndex : 'equipmentunit.name',
							width : 80
						}, {
							header : '检定周期',
							dataIndex : 'examineperiod',
							width : 80
						}, {
							header : '输入代码',
							dataIndex : 'inputcode',
							width : 80
						}, {
							header : '最近检定时间',
							dataIndex : 'lastexaminedate',
							width : 80,
							renderer : function(obj) {
								return timeConvert(obj);
							}
						}, {
							header : '量程',
							dataIndex : 'measurerange',
							width : 80
						}, {
							header : '精确度',
							dataIndex : 'precision',
							width : 80
						}, {
							header : '备注',
							dataIndex : 'remark',
							width : 80
						}, {
							header : '分辨率',
							dataIndex : 'resolution',
							width : 80
						}],
				bbar : [{
							xtype : 'paging',
							pageSize : 10,
							store : equipmentInfoStore,
							displayInfo : true,
							displayMsg : "当前显示记录从 {0}-{1} 总 {2}条记录",
							emptyMsg : "没有相关记录!"
						}]
			});

	addEquipmentInfoGrid.on('rowdblclick', function(grid, rowIndex, event) {
				var queryEquipmentName = addEquipmentInfoGrid
						.getSelectionModel().getSelections()[0].get('name');
				Ext.getCmp('addEquipmentName').setValue(queryEquipmentName);
				var queryEquipmentid = addEquipmentInfoGrid.getSelectionModel()
						.getSelections()[0].get('equipmentid');
				Ext.getCmp('addEquipmentNameId').setValue(queryEquipmentid);
				addEquipmentInfoWin.hide();
				addEquipmentInfoForm.form.reset();
			});

	addEquipmentInfoWin = new Ext.Window({
				title : '设备信息过滤',
				layout : 'form',
				width : 800,
				y : 0,
				autoHeight : true,
				plain : true,
				closable : false,
				bodyStyle : "padding:10px",
				items : [addEquipmentInfoForm, addEquipmentInfoGrid],
				buttons : [{
					text : '确定',
					iconCls : 'icon-accept',
					handler : function() {
						var queryEquipmentName = addEquipmentInfoGrid
								.getSelectionModel().getSelections()[0]
								.get('name');
						Ext.getCmp('addEquipmentName')
								.setValue(queryEquipmentName);
						var queryEquipmentid = addEquipmentInfoGrid
								.getSelectionModel().getSelections()[0]
								.get('equipmentid');
						Ext.getCmp('addEquipmentNameId')
								.setValue(queryEquipmentid);
						addEquipmentInfoWin.hide();
						addEquipmentInfoForm.form.reset();
					}
				}, '-', {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						addEquipmentInfoWin.hide();
						addEquipmentInfoForm.form.reset();
					}
				}]
			});

	addEquipmentInfo = function() {
		equipmentInfoStore.proxy = new Ext.data.HttpProxy({
					url : 'goods/limitFind_EquipmentInfo.action'
				});
		equipmentInfoStore.load();
		addEquipmentInfoWin.show();
	}

	updateEquipmentCarePlanReader = new Ext.data.JsonReader({
				root : 'testEquipmentCarePlanList',
				successProperty : 'success'
			}, [{
						name : 'equipmentCarePlan.careid',
						mapping : 'careid'
					}, {
						name : 'equipmentCarePlan.carecontent',
						mapping : 'carecontent'
					}, {
						name : 'equipmentCarePlan.caredatetime',
						mapping : 'caredatetime'
					}, {
						name : 'equipmentCarePlan.equipmentinfo.name',
						mapping : 'equipmentinfo.name'
					}, {
						name : 'equipmentCarePlan.equipmentinfo.equipmentid',
						mapping : 'equipmentinfo.equipmentid'
					}, {
						name : 'equipmentCarePlan.remark',
						mapping : 'remark'
					}]);

	updateEquipmentCarePlanForm = new Ext.form.FormPanel({
				frame : true,
				defaultType : 'textfield',
				reader : updateEquipmentCarePlanReader,
				labelAlign : 'left',
				baseCls : 'x-plain',// //底色与父窗体相同
				autoHeight : true,// 自适应高度
				buttonAlign : 'center',
				labelWidth : 60,
				padding : 10,
				waitMsgTarget : true,
				items : [{
							fieldLabel : '设备名称',
							xtype : 'textfield',
							id : 'updateEquipmentName',
							name : 'equipmentCarePlan.equipmentinfo.name',
							readOnly : true,
							allowBlank : false,
							width : 110,
							emptyText : '--请选择--',
							clearCls : 'allow-float',
							itemCls : 'only-float'
						}, {
							xtype : 'button',
							iconCls : 'icon-select',
							itemCls : 'right-part',
							align : 'right',
							width : 20,
							handler : function() {
								updateEquipmentInfo();
							}
						}, {
							fieldLabel : '保养内容',
							xtype : 'textarea',
							width : 300,
							name : 'equipmentCarePlan.carecontent',
							itemCls : 'stop-float'
						}, {
							fieldLabel : '备注',
							xtype : 'textarea',
							width : 300,
							name : 'equipmentCarePlan.remark'
						}, {
							xtype : 'textfield',
							id : 'updateEquipmentNameId',
							name : 'equipmentCarePlan.equipmentinfo.equipmentid',
							hideLabel : true,
							hidden : true
						}, {
							xtype : 'textfield',
							name : 'equipmentCarePlan.careid',
							hideLabel : true,
							hidden : true
						}],
				buttons : [{
					text : '修改',
					iconCls : 'icon-edit',
					disabled : false,
					handler : function() {
						Ext.MessageBox.confirm("操作提示", "您确定要修改保养计划吗?",
								function(button) {
									if (button == "yes") {
										if (update()) {
											return true;
										}
									}
								});
					}
				}, {
					text : '删除',
					iconCls : 'icon-del',
					handler : function() {
						del();
					}
				}, {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						updateEquipmentCarePlanWin.hide();
						updateEquipmentCarePlanForm.form.reset();
					}
				}]
			});

	updateEquipmentCarePlanWin = new Ext.Window({
				layout : 'form',
				width : 500,
				title : '修改设备使用信息',
				plain : true,
				closable : false,
				items : updateEquipmentCarePlanForm
			});

	updateEquipmentCarePlan = function() {
		_record = equipmentCarePlanGrid.getSelectionModel().getSelections();
		if (_record.length == 1) {
			updateEquipmentCarePlanWin.show();
			updateEquipmentCarePlanForm.getForm().load({
				url : 'goods/limitFind_EquipmentCarePlan.action?equipmentCarePlan.careid='
						+ _record[0].get('careid'),
				waitMsg : '正在载入数据...',
				failure : function() {
					Ext.Msg.alert('操作提示', '读取设备信息失败');
				},
				success : function() {

				}
			});
		} else
			Ext.Msg.alert('错误', '');
	}

	queryEquipmentInfoForm = new Ext.form.FormPanel({
		title : '请输入查询条件',
		labelAlign : 'right',
		buttonAlign : 'center',
		frame : true,
		baseCls : 'x-plain',
		defaultType : 'textfield',
		labelWidth : 70,
		padding : 10,
		items : [{
					fieldLabel : '生产厂商',
					xtype : 'combo',
					id : 'queryequipmentManufacturer',
					store : equipmentManufacturerStore,
					valueField : 'equipmentManufacturerId',
					displayField : 'equipmentManufacturerName',
					mode : 'local',
					pageSize : 10,
					width : 110,
					editable : false,
					triggerAction : 'all',
					itemCls : 'right-part',
					emptyText : '--请选择--',
					itemCls : 'right-part',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '输入代码',
					xtype : 'textfield',
					id : 'queryinputCode',
					itemCls : 'right-part',
					editable : false,
					width : 110,
					emptyText : '--请选择--',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '入库流水号',
					xtype : 'textfield',
					id : 'queryequipmentId',
					itemCls : 'right-part',
					editable : false,
					width : 110,
					emptyText : '--请选择--',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '类型',
					xtype : 'combo',
					id : 'queryequipmentType',
					store : equipmentTypeStore,
					valueField : 'equipmentTypeId',
					displayField : 'equipmentTypeName',
					mode : 'local',
					pageSize : 10,
					width : 110,
					// allowBlank : false,
					editable : false,
					triggerAction : 'all',
					itemCls : 'right-part',
					emptyText : '--请选择--',
					itemCls : 'right-part',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '是否完好',
					xtype : 'combo',
					store : new Ext.data.SimpleStore({
								fields : ['id', 'name'],
								data : [[210010, '完好'], [210011, '损坏'],
										[3, '全部']]
							}),
					value : 3,// 默认 未审核,在后边设置默认值了，可以搜 aduitfalgr.
					valueField : "id",
					displayField : "name",
					mode : 'local',
					id : 'queryequipmentFlag',
					editable : false,
					width : 110,
					triggerAction : 'all',
					itemCls : 'right-part',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '状态',
					xtype : 'combo',
					id : 'equipmentStatus',
					store : new Ext.data.SimpleStore({
								fields : ['value', 'name'],
								data : [[210001, '可用'], [210002, '占用'],
										[210003, '送修'], [210004, '报停'],
										[210005, '报废'], [4, '全部']]
							}),
					value : 4,
					valueField : 'value',
					displayField : 'name',
					mode : 'local',
					editable : false,
					triggerAction : 'all',
					itemCls : 'right-part',
					editable : false,
					width : 110,
					emptyText : '--请选择--',
					clearCls : 'allow-float'
				}],
		buttons : [{
			text : '查询',
			iconCls : 'icon-select',
			handler : function() {
				var qurl = null;
				var next1;
				var next2;
				var next3;
				var next4;
				var next5;
				var next6;
				if (Ext.getCmp('queryequipmentManufacturer').getValue() == ''
						& Ext.getCmp('queryinputCode').getValue() == ''
						& Ext.getCmp('queryequipmentId').getValue() == ''
						& Ext.getCmp('queryequipmentType').getValue() == ''
						& Ext.getCmp('queryequipmentFlag').getValue() == '3'
						& Ext.getCmp('equipmentStatus').getValue() == '4') {
					qurl = 'goods/find_EquipmentInfo.action';
				} else {
					qurl = 'goods/limitFind_EquipmentInfo.action?'
					if (Ext.getCmp('queryequipmentManufacturer').getValue() != '') {
						next1 = '&equipmentInfo.equipmentmanufacturer.id='
								+ Ext.getCmp('queryequipmentManufacturer')
										.getValue();
						qurl = qurl + next1;
					}
					if (Ext.getCmp('queryinputCode').getValue() != '') {
						next2 = '&equipmentInfo.inputcode='
								+ Ext.getCmp('queryinputCode').getValue();
						qurl = qurl + next2;
					}
					if (Ext.getCmp('queryequipmentId').getValue() != '') {
						next3 = '&equipmentInfo.equipmententry.entrysn='
								+ Ext.getCmp('queryequipmentId').getValue();
						qurl = qurl + next3;
					}

					if (Ext.getCmp('queryequipmentType').getValue() != '') {
						next4 = '&equipmentInfo.equipmenttype.id='
								+ Ext.getCmp('queryequipmentType').getValue();
						qurl = qurl + next4;
					}
					if (Ext.getCmp('queryequipmentFlag').getValue() != '3') {
						next5 = '&equipmentInfo.equipmentnewflag='
								+ Ext.getCmp('queryequipmentFlag').getValue();
						qurl = qurl + next5;
					}
					if (Ext.getCmp('equipmentStatus').getValue() != '4') {
						next6 = '&equipmentInfo.status='
								+ Ext.getCmp('equipmentStatus').getValue();
						qurl = qurl + next6;
					}

					if (qurl.substring(37, 38) == '&') {
						qurl = qurl.substring(0, 37) + qurl.substring(38);
					}
				}

				equipmentInfoStore.proxy = new Ext.data.HttpProxy({
					url : qurl
						// qurl 为上边的拼接的url 37
					});
				equipmentInfoStore.load();
			}
		}, {
			text : '重置',
			iconCls : 'icon-reset',
			handler : function() {
				queryEquipmentInfoForm.form.reset();
			}
		}]
	});

	queryEquipmentInfoGrid = new Ext.grid.GridPanel({
				title : '设备信息',
				height : '310',
				store : equipmentInfoStore,
				baseCls : 'x-plain',
				bodyStyle : 'width:100%',
				columns : [new Ext.grid.RowNumberer({ // 行号
							header : "序号",
							width : 50,
							renderer : function(value, metadata, record,
									rowIndex) {
								return equipment_start + 1 + rowIndex;
							}
						}), {
							header : '设备ID',
							dataIndex : 'equipmentid',
							width : 100,
							hidden : true
						}, {
							header : '入库流水号',
							dataIndex : 'equipmententry',
							width : 80
						}, {
							header : '名称',
							dataIndex : 'name',
							width : 80
						}, {
							header : '主要用途',
							dataIndex : 'equipmentmainuse.name',
							width : 80
						}, {
							header : '生产商',
							dataIndex : 'equipmentmanufacturer.name',
							width : 80
						}, {
							header : '设备型号',
							dataIndex : 'equipmentmodel.name',
							width : 80
						}, {
							header : '是否完好',
							dataIndex : 'equipmentnewflag',
							width : 80
						}, {
							header : '状态',
							dataIndex : 'status',
							width : 80
						}, {
							header : '设备类型',
							dataIndex : 'equipmenttype.name',
							width : 80
						}, {
							header : '设备单位',
							dataIndex : 'equipmentunit.name',
							width : 80
						}, {
							header : '检定周期',
							dataIndex : 'examineperiod',
							width : 80
						}, {
							header : '输入代码',
							dataIndex : 'inputcode',
							width : 80
						}, {
							header : '最近检定时间',
							dataIndex : 'lastexaminedate',
							width : 80,
							renderer : function(obj) {
								return timeConvert(obj);
							}
						}, {
							header : '量程',
							dataIndex : 'measurerange',
							width : 80
						}, {
							header : '精确度',
							dataIndex : 'precision',
							width : 80
						}, {
							header : '备注',
							dataIndex : 'remark',
							width : 80
						}, {
							header : '分辨率',
							dataIndex : 'resolution',
							width : 80
						}],
				bbar : [{
							xtype : 'paging',
							pageSize : 10,
							store : equipmentInfoStore,
							displayInfo : true,
							displayMsg : "当前显示记录从 {0}-{1} 总 {2}条记录",
							emptyMsg : "没有相关记录!"
						}]
			});

	queryEquipmentInfoGrid.on('rowdblclick', function(grid, rowIndex, event) {
				var queryEquipmentName = queryEquipmentInfoGrid
						.getSelectionModel().getSelections()[0].get('name');
				Ext.getCmp('queryEquipmentName').setValue(queryEquipmentName);
				var queryEquipmentid = queryEquipmentInfoGrid
						.getSelectionModel().getSelections()[0]
						.get('equipmentid');
				Ext.getCmp('queryEquipmentNameId').setValue(queryEquipmentid);
				queryEquipmentInfoWin.hide();
				queryEquipmentInfoForm.form.reset();
			});

	queryEquipmentInfoWin = new Ext.Window({
		title : '设备信息过滤',
		layout : 'form',
		width : 800,
		y : 0,
		autoHeight : true,
		plain : true,
		closable : false,
		bodyStyle : "padding:10px",
		items : [queryEquipmentInfoForm, queryEquipmentInfoGrid],
		buttons : [{
			text : '确定',
			iconCls : 'icon-accept',
			handler : function() {
				if (queryEquipmentInfoGrid.getSelectionModel().getSelections()[0] != null) {
					var queryEquipmentName = queryEquipmentInfoGrid
							.getSelectionModel().getSelections()[0].get('name');
					Ext.getCmp('queryEquipmentName')
							.setValue(queryEquipmentName);
					var queryEquipmentid = queryEquipmentInfoGrid
							.getSelectionModel().getSelections()[0]
							.get('equipmentid');
					Ext.getCmp('queryEquipmentNameId')
							.setValue(queryEquipmentid);
					queryEquipmentInfoWin.hide();
					queryEquipmentInfoForm.form.reset();
				} else {
					Ext.Msg.alert('操作提示', '您未选择数据');
				}
			}
		}, '-', {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				queryEquipmentInfoWin.hide();
				queryEquipmentInfoForm.form.reset();
			}
		}]
	});

	queryEquipmentInfo = function() {
		equipmentInfoStore.proxy = new Ext.data.HttpProxy({
					url : 'goods/limitFind_EquipmentInfo.action'
				});
		equipmentInfoStore.load();
		queryEquipmentInfoWin.show();
	}

	updateEquipmentInfoForm = new Ext.form.FormPanel({
		title : '请输入查询条件',
		labelAlign : 'right',
		buttonAlign : 'center',
		frame : true,
		baseCls : 'x-plain',
		defaultType : 'textfield',
		labelWidth : 70,
		padding : 10,
		items : [{
					fieldLabel : '生产厂商',
					xtype : 'combo',
					id : 'equipmentManufacturer',
					store : equipmentManufacturerStore,
					valueField : 'equipmentManufacturerId',
					displayField : 'equipmentManufacturerName',
					mode : 'local',
					pageSize : 10,
					width : 110,
					editable : false,
					triggerAction : 'all',
					itemCls : 'right-part',
					emptyText : '--请选择--',
					itemCls : 'right-part',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '输入代码',
					xtype : 'textfield',
					id : 'inputCode',
					itemCls : 'right-part',
					editable : false,
					width : 110,
					emptyText : '--请选择--',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '入库流水号',
					xtype : 'textfield',
					id : 'equipmentId',
					itemCls : 'right-part',
					editable : false,
					width : 110,
					emptyText : '--请选择--',
					clearCls : 'allow-float'
				}, {
					fieldLabel : '类型',
					xtype : 'combo',
					id : 'equipmentType',
					store : equipmentTypeStore,
					valueField : 'equipmentTypeId',
					displayField : 'equipmentTypeName',
					mode : 'local',
					pageSize : 10,
					width : 110,
					// allowBlank : false,
					editable : false,
					triggerAction : 'all',
					itemCls : 'right-part',
					emptyText : '--请选择--',
					itemCls : 'right-part',
					clearCls : 'allow-float'
				}],
		buttons : [{
			text : '查询',
			iconCls : 'icon-select',
			handler : function() {
				var qurl = null;
				var next1;
				var next2;
				var next3;
				var next4;
				var next5;
				var next6;
				if (Ext.getCmp('equipmentManufacturer').getValue() == ''
						& Ext.getCmp('inputCode').getValue() == ''
						& Ext.getCmp('equipmentId').getValue() == ''
						& Ext.getCmp('equipmentType').getValue() == '') {
					qurl = 'goods/limitFind_EquipmentInfo.action?equipmentInfo.status=210001';
				} else {
					qurl = 'goods/limitFind_EquipmentInfo.action?equipmentInfo.status=210001'
					if (Ext.getCmp('equipmentManufacturer').getValue() != '') {
						next1 = '&equipmentInfo.equipmentmanufacturer.id='
								+ Ext.getCmp('equipmentManufacturer')
										.getValue();
						qurl = qurl + next1;
					}
					if (Ext.getCmp('inputCode').getValue() != '') {
						next2 = '&equipmentInfo.inputcode='
								+ Ext.getCmp('inputCode').getValue();
						qurl = qurl + next2;
					}
					if (Ext.getCmp('equipmentId').getValue() != '') {
						next3 = '&equipmentInfo.equipmententry.entrysn='
								+ Ext.getCmp('equipmentId').getValue();
						qurl = qurl + next3;
					}

					if (Ext.getCmp('equipmentType').getValue() != '') {
						next4 = '&equipmentInfo.equipmenttype.id='
								+ Ext.getCmp('equipmentType').getValue();
						qurl = qurl + next4;
					}

					if (qurl.substring(37, 38) == '&') {
						qurl = qurl.substring(0, 37) + qurl.substring(38);
					}
				}

				equipmentInfoStore.proxy = new Ext.data.HttpProxy({
					url : qurl
						// qurl 为上边的拼接的url 37
					});
				qurl = null;
				equipmentInfoStore.load();
			}
		}, {
			text : '重置',
			iconCls : 'icon-reset',
			handler : function() {
				updateEquipmentInfoForm.form.reset();
			}
		}]
	});

	updateEquipmentInfoGrid = new Ext.grid.GridPanel({
				title : '设备信息',
				height : '310',
				store : equipmentInfoStore,
				baseCls : 'x-plain',
				bodyStyle : 'width:100%',
				columns : [new Ext.grid.RowNumberer({ // 行号
							header : "序号",
							width : 50,
							renderer : function(value, metadata, record,
									rowIndex) {
								return equipment_start + 1 + rowIndex;
							}
						}), {
							header : '设备ID',
							dataIndex : 'equipmentid',
							width : 100,
							hidden : true
						}, {
							header : '入库流水号',
							dataIndex : 'equipmententry',
							width : 80
						}, {
							header : '名称',
							dataIndex : 'name',
							width : 80
						}, {
							header : '主要用途',
							dataIndex : 'equipmentmainuse.name',
							width : 80
						}, {
							header : '生产商',
							dataIndex : 'equipmentmanufacturer.name',
							width : 80
						}, {
							header : '设备型号',
							dataIndex : 'equipmentmodel.name',
							width : 80
						}, {
							header : '是否完好',
							dataIndex : 'equipmentnewflag',
							width : 80
						}, {
							header : '状态',
							dataIndex : 'status',
							width : 80
						}, {
							header : '设备类型',
							dataIndex : 'equipmenttype.name',
							width : 80
						}, {
							header : '设备单位',
							dataIndex : 'equipmentunit.name',
							width : 80
						}, {
							header : '检定周期',
							dataIndex : 'examineperiod',
							width : 80
						}, {
							header : '输入代码',
							dataIndex : 'inputcode',
							width : 80
						}, {
							header : '最近检定时间',
							dataIndex : 'lastexaminedate',
							width : 80,
							renderer : function(obj) {
								return timeConvert(obj);
							}
						}, {
							header : '量程',
							dataIndex : 'measurerange',
							width : 80
						}, {
							header : '精确度',
							dataIndex : 'precision',
							width : 80
						}, {
							header : '备注',
							dataIndex : 'remark',
							width : 80
						}, {
							header : '分辨率',
							dataIndex : 'resolution',
							width : 80
						}],
				bbar : [{
							xtype : 'paging',
							pageSize : 10,
							store : equipmentInfoStore,
							displayInfo : true,
							displayMsg : "当前显示记录从 {0}-{1} 总 {2}条记录",
							emptyMsg : "没有相关记录!"
						}]
			});

	updateEquipmentInfoGrid.on('rowdblclick', function(grid, rowIndex, event) {
				var queryEquipmentName = updateEquipmentInfoGrid
						.getSelectionModel().getSelections()[0].get('name');
				Ext.getCmp('updateEquipmentName').setValue(queryEquipmentName);
				var queryEquipmentid = updateEquipmentInfoGrid
						.getSelectionModel().getSelections()[0]
						.get('equipmentid');
				Ext.getCmp('updateEquipmentNameId').setValue(queryEquipmentid);
				updateEquipmentInfoWin.hide();
				updateEquipmentInfoForm.form.reset();
			});

	updateEquipmentInfoWin = new Ext.Window({
				title : '设备信息过滤',
				layout : 'form',
				width : 650,
				y : 0,
				autoHeight : true,
				plain : true,
				closable : false,
				bodyStyle : "padding:10px",
				items : [updateEquipmentInfoForm, updateEquipmentInfoGrid],
				buttons : [{
					text : '确定',
					iconCls : 'icon-accept',
					handler : function() {
						var queryEquipmentName = updateEquipmentInfoGrid
								.getSelectionModel().getSelections()[0]
								.get('name');
						Ext.getCmp('updateEquipmentName')
								.setValue(queryEquipmentName);
						var queryEquipmentid = updateEquipmentInfoGrid
								.getSelectionModel().getSelections()[0]
								.get('equipmentid');
						Ext.getCmp('updateEquipmentNameId')
								.setValue(queryEquipmentid);
						updateEquipmentInfoWin.hide();
						updateEquipmentInfoForm.form.reset();
					}
				}, '-', {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						updateEquipmentInfoWin.hide();
						updateEquipmentInfoForm.form.reset();
					}
				}]
			});

	updateEquipmentInfo = function() {
		equipmentInfoStore.proxy = new Ext.data.HttpProxy({
					url : 'goods/limitFind_EquipmentInfo.action'
				});
		equipmentInfoStore.load();
		updateEquipmentInfoWin.show();
	}

});

add = function() {
	if (addEquipmentCarePlanForm.form.isValid()) {
		addEquipmentCarePlanForm.getForm().submit({
					url : 'goods/add_EquipmentCarePlan.action',
					method : 'post',
					success : function(form, action) {
						if (equipmentCarePlanStore != null) {
							equipmentCarePlanStore.load();
						}
						addEquipmentCarePlanWin.hide();
						addEquipmentCarePlanForm.form.reset();
						Ext.Msg.alert("操作提示", "增加保养信息成功");
					},
					failure : function(form, action) {
						Ext.Msg.alert("操作提示", "增加保养信息失败");
					},
					waitMsg : "正在提交，请稍后"
				});
	} else {
		Ext.Msg.alert("操作提示", "请填写必填选项");
	}
}

update = function() {
	if (updateEquipmentCarePlanForm.form.isValid()) {
		updateEquipmentCarePlanForm.getForm().submit({
					url : 'goods/update_EquipmentCarePlan.action',
					method : 'post',
					success : function(form, action) {
						if (equipmentCarePlanStore != null) {
							equipmentCarePlanStore.load();
						}
						updateEquipmentCarePlanWin.hide();
						updateEquipmentCarePlanForm.form.reset();
						Ext.Msg.alert("操作提示", "修改使用设备信息成功");
					},
					failure : function(form, action) {
						Ext.Msg.alert("操作提示", "修改使用设备信息失败");
					},
					waitMsg : "正在提交，请稍后"
				});
	} else {
		Ext.Msg.alert("操作提示", "请填写必填选项");
	}
};

del = function() {
	var jsonData = '';
	_record = equipmentCarePlanGrid.getSelectionModel().getSelections();
	flag = equipmentCarePlanGrid.getSelectionModel().getSelected();
	if (flag) {
		Ext.MessageBox.confirm("操作提示", "您确定要取消申请使用该设备吗？", function(btn) {
					var temp;
					if (btn == "yes") {
						for (var i = 0; i < _record.length; i++) {
							temp = _record[i].get("careid");
							if (i == 0) {
								jsonData = jsonData + temp;
							} else {
								jsonData = jsonData + "," + temp;
							}
						}
						Ext.Ajax.request({
									url : "goods/del_EquipmentCarePlan.action",
									params : {
										delData : jsonData
									},
									success : function(result, request) {
										equipmentCarePlanStore.load();
										updateEquipmentCarePlanWin.hide();
										updateEquipmentCarePlanForm.form
												.reset();
										Ext.Msg.alert("操作提示", "删除成功");
									},
									failure : function(result, request) {
										Ext.Msg.alert("操作提示", "删除失败");
									}
								});
						jsonData = '';
					}
				});
	} else {
		Ext.Msg.alert("操作提示", "您没有选择任何数据，不能执行删除操作");
	}
};

var timeConvert = function(time) {
	var str;
	if (time == null) {
		str == '';
	} else {
		str = time.substring(0, 4) + '-' + time.substring(4, 6) + '-'
				+ time.substring(6, 8);
	}
	return str;
};