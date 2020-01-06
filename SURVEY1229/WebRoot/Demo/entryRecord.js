var goods_start = 0;
var entryRecordName = '';
var isNullFlag = true;
var errorRow;// 判断第几条记录出错
Ext.onReady(function() {
			haveRight('entry/entryRecord.jsp');//控制权限
			Ext.BLANK_IMAGE_URL = basePath + 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();
			Ext.form.Field.prototype.msgTarget = 'side';
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 设置回车导航
			keyConvert = function() {
				if (event.keyCode == 13 && event.srcElement.type != "button") {
					event.keyCode = 9;
				}
			};
			// 商品store
			var goodsStore = new Ext.data.JsonStore({
						url : 'goodsInfo_query.action',
						totalProperty : 'results',
						root : 'items',
						fields : ['id', 'goodsCategory', 'measureUnit.id', 'goodsName', 'manufacturer', 'shelfLife', 'barCode', 'note']

					});
			var unitsStore = new Ext.data.JsonStore({
						url : 'units_findByStorage.action',
						totalProperty : 'totalProperty',
						root : 'unitsItems',
						successProperty : 'success',
						fields : [{
									name : 'id',
									mapping : 'id'
								}, {
									name : 'name',
									mapping : 'name'
								}]
					});

			// 计量单位store
			var measureunitStore = new Ext.data.JsonStore({
						proxy : new Ext.data.HttpProxy({
									url : 'measureUnitInfo_query.action'
								}),
						totalProperty : 'results',
						root : 'items',
						fields : ['id', 'name']
					});

			var supplierStore = new Ext.data.JsonStore({
						url : 'supplierInfo_query.action',
						totalProperty : 'result',
						root : 'items',
						fields : ['id', 'name', 'attribute', 'phone1', 'phone2', 'corporation', 'linkman', 'email', 'idCode', 'delFlag']
					});

			var goodsEntryStore = new Ext.data.ArrayStore({
						url : 'goods_query.action',
						root : 'goodsLists',
						fields : ['id', 'goods.id', 'number', 'price', 'totleAmount', 'units', 'entryRecord', 'measureUnit', 'date', 'money']
					});
			// 加载store
			unitsStore.load({
						params : {
							start : 0,
							limit : 1000
						},
						callback : function() {
							/**
							 * 根据登录用户设置入库单位的默认值
							 */
							if (unit != huoshizhongxinId) {
								Ext.getCmp('entryRecordUnitsId').setValue(unit);
								Ext.getCmp('entryRecordUnitsId').disable();
							} else {
								Ext.getCmp('entryRecordUnitsId').reset();
							}
						}
					});
			measureunitStore.load({
						params : {
							start : 0,
							limit : 1000
						}
					});
			supplierStore.load({
						params : {
							start : 0,
							limit : 1000
						}
					});
			goodsStore.load({
						params : {
							start : 0,
							limit : 1000
						}
					});

			// 增加明細
			var addRecord = function() {
				if (Ext.getCmp('entryRecordUnitsId').getValue() == '') {
					Ext.Ghost.msg('提示', '请选择入库单位');
					return;
				}
				var newRecord = recordGrid.getStore().recordType;
				var addRowNum = goodsEntryStore.getCount();
				var p = new newRecord({
							'goods.id' : '',
							number : 0,
							price : 0,
							totleAmount : '0.00元',
							units : // entryRecordName---触发下拉框的选中事件 2011年8月1日9:16:44 沈圣恩修改
							// 下拉框select事件无效（结合：570行）
							Ext.getCmp("entryRecordUnitsId").getRawValue()
						});
				recordGrid.stopEditing();
				goodsEntryStore.insert(addRowNum, p);
				recordGrid.startEditing(addRowNum, 2);
			}

			/**
			 * 计算总金额并重新生成批号
			 */
			var reSortBatchNumber = function() {
				var i = 1;
				var total_Amount = 0;
				recordGrid.getStore().each(function(rec) {
							var number = Number(rec.get('number'));
							var price = Number(rec.get('price'));
							rec.set('totleAmount', toDecimal2(price * number) + '元');
							i++;
							total_Amount += Number(rec.get('price')) * Number(rec.get('number'));
						});
				Ext.getCmp('check_total_Money').setValue(toDecimal2(total_Amount) + "元")
			}
			var resetAllForm = function() {
				Ext.getCmp('supplier').setValue("");
				Ext.getCmp('check_total_Money').setValue("");
				Ext.getCmp('supplier').focus(true, true);
			}
			/**
			 * 验证grid里的store里是否存在单价或数量为零的值。将store中单价或者数量为零的背景设为黄色
			 * 
			 * 
			 * 
			 * 
			 * 
			 */

			var checkStore = function() {
				errorRow = 0;
				recordGrid.getStore().each(function(rec) {
							if (rec.get('price') == '0' || rec.get('number') == '0') {
								isNullFlag = false;
								recordGrid.getView().getRow(errorRow).style.backgroundColor = "yellow";
								Ext.Msg.alert('温馨提示', '背景色为黄色的记录单价或者是数量为零，产生错误的行数为：' + (errorRow + 1));
								return false;
							} else {
								errorRow++;
							}
						});
			}

			/**
			 * @author jia 2011年7月20日18:07:11 重置所有信息
			 */
			var resetOutBoundDetail = function() {
				Ext.getCmp('supplier').setValue("");
				recordGrid.getStore().removeAll();
				Ext.getCmp('check_billsNum').setValue('');
				Ext.getCmp('check_total_Money').setValue('0.00元');
				Ext.getCmp('gysname').setText('');
				Ext.getCmp('linkmanId').setText('');
				Ext.getCmp('phoneId').setText('');
				Ext.getCmp('attributeId').setText('');
				Ext.getCmp('corporationId').setText('');
				Ext.getCmp('emailId').setText('');
				paramsStr = '';
				Ext.getCmp('supplier').focus(true, true);
			}
			var submitForm = new Ext.form.FormPanel({
						title : '验证信息',
						region : 'south',
						height : 130,
						frame : true,
						labelSeparator : ':',
						buttonAlign : 'center',
						layout : 'form',
						labelWidth : 70,
						items : [{
							xtype : 'fieldset',
							title : '确信信息',
							layout : 'column',
							labelAlign : 'right',
							items : [{
										columnWidth : .3
									}, {
										columnWidth : .2,
										layout : 'form',
										labelWidth : 80,
										items : [{
													xtype : 'textfield',
													disable : true,
													id : 'check_total_Money',
													fieldLabel : '总金额',
													readOnly : true,
													anchor : '100%'
												}]
									}, {
										layout : 'form',
										columnWidth : .05,
										labelWidth : 80,
										items : [{
													xtype : 'button',
													iconCls : 'icon-calendar',
													tooltip : '验算金额',
													handler : function() {
														reSortBatchNumber();
													}
												}]
									}, new Ext.Button({
												text : '提交',
												iconCls : 'icon-save',
												id : 'submitFormBtn',
												handler : function() {
													Ext.getCmp('submitFormBtn').disable();
													Ext.MessageBox.confirm("提示", "您是否要保存？", function(button, text) {
																if (button == 'yes') {
																	// reSortBatchNumber();
																	// alert(isNullFlag)
																	checkStore();
																	// alert(isNullFlag)
																	if (!isNullFlag) {// 当isNullFlag为false时，等待用户修改单价或数量为零的记录完成后再次提交,再调用一次checkStore方法，判断完成之后再次提交

																		// Ext.Msg.alert('温馨提示',
																		// '背景色为黄色的记录单价或者是数量为零，产生错误的行数为：'+(errorRow)
																		// );
																		errorRow = 0;
																		// alert('出现错误的行数为'+(errorRow+1)),
																		isNullFlag = true;
																		checkStore();
																		// errorRow=0;
																		if (formRecord.form.isValid() && isNullFlag) {
																			recordGrid.stopEditing();
																			var paramsStr = '';
																			if (recordGrid.getStore().getCount() > 0) {
																				paramsStr += '[';
																				var i = 0;
																				recordGrid.getStore().each(function(rec) {
																							paramsStr += '{';

																							paramsStr += '\"id\":\"' + rec.get('id') + '\"';
																							paramsStr += ',';

																							paramsStr += '\"goods\":{\"id\":' + rec.get('goods.id') + '}';
																							paramsStr += ',';

																							paramsStr += '\"number\":' + rec.get('number') + '';
																							paramsStr += ',';

																							paramsStr += '\"price\":' + rec.get('price') + '';
																							paramsStr += ',';

																							paramsStr += '\"totleAmount\":' + rec.get('totleAmount') + '';
																							paramsStr += ',';

																							paramsStr += '\"units\":\"' + rec.get('units') + '\"';
																							paramsStr += ',';

																							paramsStr += '\"entryRecord\":\"' + rec.get('entryRecord') + '\"';
																							paramsStr += ',';

																							paramsStr += '\"measureUnit\":\"' + rec.get('measureUnit') + '\"';
																							paramsStr += ',';

																							paramsStr += '\"date\":\"' + rec.get('date') + '\"';
																							paramsStr += '}';

																							if (i != recordGrid.getStore().getCount() - 1) {
																								paramsStr += ',';
																							}
																							i++;
																						})
																				paramsStr += ']';
																				alert("paramsStr:" + paramsStr);
																				formRecord.form.submit({
																							url : 'entryRecord_save.action?entryRecord.totleAmount=' + Ext.getCmp('check_total_Money').getValue().replace('元', '') + '&entryRecord.units.id='
																									+ Ext.getCmp('entryRecordUnitsId').getValue(),
																							params : {
																								jsonString : paramsStr
																							},
																							success : function(form, action) {
																								var billsNum = action.result.billsNum;
																								Ext.Ghost.msg('保存成功', '添加成功！');
																								Ext.MessageBox.confirm("提示", "您是否要打印该记录？", function(button, text) {
																											if (button == 'yes') {
																												window.open('entryPrint_entryReport.action?billsNum=' + billsNum)
																											}
																											resetAllForm();
																										});
																								goodsEntryStore.removeAll();
																								Ext.getCmp('submitFormBtn').enable()
																							},
																							failure : function(form, action) {
																								Ext.Ghost.msg('保存失败', '添加失败！');
																								Ext.getCmp('submitFormBtn').enable()
																							},
																							waitTitle : '请稍候',
																							waitMsg : '正在保存数据，稍后...'
																						});
																			}
																		} else {
																			Ext.Ghost.msg('信息', '请填写完成再提交!');
																			Ext.getCmp('submitFormBtn').enable()
																		}
																	} else {// 当isNullFlag为true时，直接将表单提交
																		if (formRecord.form.isValid()) {
																			recordGrid.stopEditing();
																			var paramsStr = '';
																			if (recordGrid.getStore().getCount() > 0) {
																				paramsStr += '[';
																				var i = 0;
																				recordGrid.getStore().each(function(rec) {
																							paramsStr += '{';

																							paramsStr += '\"id\":\"' + rec.get('id') + '\"';
																							paramsStr += ',';

																							paramsStr += '\"goods\":{\"id\":' + rec.get('goods.id') + '}';
																							paramsStr += ',';

																							paramsStr += '\"number\":' + rec.get('number') + '';
																							paramsStr += ',';

																							paramsStr += '\"price\":' + rec.get('price') + '';
																							paramsStr += ',';

																							paramsStr += '\"totleAmount\":' + rec.get('totleAmount') + '';
																							paramsStr += ',';

																							paramsStr += '\"units\":\"' + rec.get('units') + '\"';
																							paramsStr += ',';

																							paramsStr += '\"entryRecord\":\"' + rec.get('entryRecord') + '\"';
																							paramsStr += ',';

																							paramsStr += '\"measureUnit\":\"' + rec.get('measureUnit') + '\"';
																							paramsStr += ',';

																							paramsStr += '\"date\":\"' + rec.get('date') + '\"';
																							paramsStr += '}';

																							if (i != recordGrid.getStore().getCount() - 1) {
																								paramsStr += ',';
																							}
																							i++;
																						})
																				paramsStr += ']';
																				alert('paramsStr:' + paramsStr);
																				formRecord.form.submit({
																							url : 'entryRecord_save.action?entryRecord.totleAmount=' + Ext.getCmp('check_total_Money').getValue().replace('元', '') + '&entryRecord.units.id='
																									+ Ext.getCmp('entryRecordUnitsId').getValue(),
																							params : {
																								jsonString : paramsStr
																							},
																							success : function(form, action) {
																								var billsNum = action.result.billsNum;
																								Ext.Ghost.msg('保存成功', '添加成功！');
																								Ext.MessageBox.confirm("提示", "您是否要打印该记录？", function(button, text) {
																											if (button == 'yes') {
																												window.open('entryPrint_entryReport.action?billsNum=' + billsNum)

																											}
																											resetAllForm();
																										});
																								goodsEntryStore.removeAll();
																								Ext.getCmp('submitFormBtn').enable()
																							},
																							failure : function(form, action) {
																								Ext.Ghost.msg('保存失败', '添加失败！');
																								Ext.getCmp('submitFormBtn').enable();
																							},
																							waitTitle : '请稍候',
																							waitMsg : '正在保存数据，稍后...'
																						});
																			} else {
																				Ext.Ghost.msg('信息', '请填写完成再提交!');
																				Ext.getCmp('submitFormBtn').enable()
																			}
																		} else {
																			Ext.Ghost.msg('信息', '请填写完成再提交!');
																			Ext.getCmp('submitFormBtn').enable()
																		}
																	}
																} else {
																	Ext.getCmp('submitFormBtn').enable()
																}
															})
												}
											}), new Ext.Button({
												text : '重置',
												iconCls : 'icon-reset',
												handler : function() {
													resetOutBoundDetail();

												}
											})]
						}]
					})
			var formRecord = new Ext.form.FormPanel({
						title : '入库记录',
						labelWidth : 70,
						labelSeparator : ':',
						id : 'formRecord',
						height : 150,
						frame : true,
						labelAlign : 'center',
						region : 'north',
						frame : true,
						buttonAlign : 'center',
						layout : 'form',
						items : [{
									xtype : 'fieldset',
									layout : 'column',
									labelAlign : 'right',
									items : [{
												columnWidth : .6,
												xtype : 'fieldset',
												layout : 'column',
												title : '入库信息',
												height : 75,
												labelAlign : 'right',
												items : [{
															columnWidth : .5,
															layout : 'form',
															items : [{
																		layout : 'column',
																		labelAlign : 'right',
																		items : [{
																					columnWidth : .8,
																					layout : 'form',
																					items : [{
																								xtype : 'pinyincombo',
																								fieldLabel : '供货商',
																								emptyText : '供货商',
																								id : 'supplier',
																								allowBlank : false,
																								name : 'entryRecord.supplier.id',
																								hiddenName : 'entryRecord.supplier.id',
																								displayField : 'name',
																								valueField : 'id',
																								mode : 'local',
																								store : supplierStore,
																								anchor : '100%',
																								listeners : {
																									'specialkey' : {
																										fn : function() {
																											if (event.keyCode == 13) {
																												if (unit == huoshizhongxinId) {
																													Ext.getCmp('entryRecordUnitsId').focus(false, 100);
																												} else {
																													addRecord();
																												}
																											}
																										}
																									},
																									'select' : {
																										fn : function(combo, record) {
																											Ext.getCmp('gysname').setText(record.get('name'));
																											Ext.getCmp('linkmanId').setText(record.get('linkman'));
																											Ext.getCmp('phoneId').setText(record.get('phone1'));
																											Ext.getCmp('attributeId').setText(record.get('attribute'));
																											Ext.getCmp('corporationId').setText(record.get('corporation'));
																											Ext.getCmp('emailId').setText(record.get('email'));
																										}

																									}
																								}
																							}]
																				}, {
																					layout : 'form',
																					columnWidth : .2,
																					items : [{
																								xtype : 'button',
																								tooltip : '增加供货商',
																								iconCls : 'icon-add',
																								handler : function() {
																									addsupplier();
																									Ext.getCmp('supplierName').focus(true, true);
																								}
																							}]
																				}]
																	}]
														}, {
															columnWidth : .5,
															layout : 'form',
															items : [{
																		xtype : 'pinyincombo',
																		store : unitsStore,
																		fieldLabel : '入库单位',
																		allowBlank : false,
																		emptyText : '请选择入库单位',
																		name : 'entryRecord.units.id',
																		hiddenName : 'entryRecord.units.id',
																		id : 'entryRecordUnitsId',
																		mode : 'local',
																		triggerAction : 'all',
																		valueField : 'id',
																		displayField : 'name',
																		forceSelection : true,
																		anchor : '80%',
																		listeners : {
																			'specialkey' : {
																				fn : function() {
																					if (event.keyCode == 13) {
																						addRecord();
																					}
																				}
																			},
																			'select' : {
																				fn : function(combo, record) {
																					entryRecordName = record.get('name');
																				}
																			}
																		}
																	}]
														}]
											}, {
												xtype : 'fieldset',
												layout : 'column',
												columnWidth : .4,
												style : "margin :0 0 0 10px;padding :0px 0px 14px 0px",
												title : '供应商详细信息',
												labelAlign : 'right',
												items : [{
															columnWidth : .5,
															layout : 'form',
															items : [{
																		layout : 'column',
																		labelAlign : 'right',
																		style : "margin :0 0 0 10px;",
																		items : [{
																					columnWidth : .4,
																					layout : 'form',
																					items : [new Ext.form.Label({
																								text : '供应商名称'
																							})]
																				}, {
																					layout : 'form',
																					columnWidth : .6,
																					items : [new Ext.form.Label({
																								text : '',
																								id : 'gysname'
																							})]
																				}]
																	}, {
																		layout : 'column',
																		labelAlign : 'right',
																		style : "margin :0 0 0 10px;",
																		items : [{
																					columnWidth : .4,
																					layout : 'form',
																					items : [new Ext.form.Label({
																								text : '联系人'
																							})]
																				}, {
																					layout : 'form',
																					columnWidth : .6,
																					items : [new Ext.form.Label({
																								id : 'linkmanId',
																								text : ''
																							})]
																				}]
																	}, {
																		layout : 'column',
																		labelAlign : 'right',
																		style : "margin :0 0 0 10px;",
																		items : [{
																					columnWidth : .4,
																					layout : 'form',
																					items : [new Ext.form.Label({
																								text : '电话'
																							})]
																				}, {
																					layout : 'form',
																					columnWidth : .6,
																					items : [new Ext.form.Label({
																								text : '',
																								id : 'phoneId'
																							})]
																				}]
																	}]
														}, {
															columnWidth : .5,
															layout : 'form',
															items : [{
																		layout : 'column',
																		labelAlign : 'right',
																		items : [{
																					columnWidth : .2,
																					layout : 'form',
																					items : [new Ext.form.Label({
																								text : '性质'
																							})]
																				}, {
																					layout : 'form',
																					columnWidth : .8,
																					items : [new Ext.form.Label({
																								id : 'attributeId',
																								text : ''
																							})]
																				}]
																	}, {
																		layout : 'column',
																		labelAlign : 'right',
																		items : [{
																					columnWidth : .2,
																					layout : 'form',
																					items : [new Ext.form.Label({
																								text : '法人'
																							})]
																				}, {
																					layout : 'form',
																					columnWidth : .8,
																					items : [new Ext.form.Label({
																								text : '',
																								id : 'corporationId'
																							})]
																				}]
																	}, {
																		layout : 'column',
																		labelAlign : 'right',
																		items : [{
																					columnWidth : .2,
																					layout : 'form',
																					items : [new Ext.form.Label({
																								text : '邮箱'
																							})]
																				}, {
																					layout : 'form',
																					columnWidth : .8,
																					items : [new Ext.form.Label({
																								text : '',
																								id : 'emailId'
																							})]
																				}]
																	}]
														}]
											}]
								}]
					});

			var cm = new Ext.grid.ColumnModel({
						defaults : {
							sortable : true
						},
						columns : [sm, new Ext.grid.RowNumberer({
											header : "序号",
											width : 40,
											renderer : function(value, metadata, record, rowIndex) {
												return goods_start + 1 + rowIndex;
											}
										}), {
									header : '入库单位',
									dataIndex : 'units',
									sortable : true,
									width : 150,
									editor : new Ext.form.TextField({
												allowBlank : false,
												selectOnFocus : true,
												readOnly : true
											})
								}, {
									header : '商品名称',
									dataIndex : 'goods.id',
									sortable : true,
									width : 150,
									editor : new Ext.ux.SimpleCombo({
										selectOnFocus : true,
										triggerAction : 'all',
										mode : 'local',
										displayField : 'goodsName',
										valueField : 'id',
										store : goodsStore,
										listeners : {
											'select' : {
												fn : function(combo, record) {
													var ed = recordGrid.activeEditor;
													recordGrid.getStore().getAt(ed.row).set('measureUnit', record.get('measureUnit.id'))
												}
											}
										}
											// store : measureUnitStore
										}),
									renderer : function(value, cellmeta, record) {
										var index = storeFind(goodsStore, 'id', value);
										var storeRecord = goodsStore.getAt(index);
										if (storeRecord == null) {
											displayText = "";
										} else {
											var displayText = storeRecord.get('goodsName');
										}
										return displayText;

									}
								}, {
									header : '单价',
									dataIndex : 'price',
									sortable : true,
									width : 100,
									editor : new Ext.form.NumberField({
												allowBlank : false,
												selectOnFocus : true,
												enableKeyEvents : true
											})

								}, {
									header : '单位',
									dataIndex : 'measureUnit',
									sortable : true,
									width : 60,
									editor : new Ext.ux.SimpleCombo({
												// typeAhead : true,
												selectOnFocus : true,
												triggerAction : 'all',
												mode : 'local',
												editable : false,
												displayField : 'name',
												valueField : 'id',
												store : measureunitStore
											}),
									renderer : function(value, cellmeta, record) {
										var index = storeFind(measureunitStore, 'id', value);
										var storeRecord = measureunitStore.getAt(index);
										if (storeRecord == null) {
											displayText = "";
										} else {
											var displayText = storeRecord.get('name');
										}
										return displayText;
									}

								}, {
									header : '数量',
									dataIndex : 'number',
									sortable : true,
									width : 100,
									editor : new Ext.form.NumberField({
												selectOnFocus : true,
												allowBlank : false,
												allowNegative : false,
												listeners : {
													'specialkey' : {
														fn : function() {
															if (event.keyCode == 13 && event.srcElement.type != "button") {
																/**
																 * @author jia 2011年7月20日18:08:38 判断下一跳的表格的位置
																 */
																var storeCount = recordGrid.getStore().getCount();
																var ed = recordGrid.activeEditor;

																// 若编辑到最后一行且商品名称不为空，新增一行
																if (ed.row == Number(storeCount - 1) && recordGrid.getStore().getAt(ed.row).get('goods.id') != '') {
																	addRecord();

																	// 若编辑到最后一行且商品名称为空，直接删除这一行，并跳到提交按钮
																} else if (ed.row == Number(storeCount - 1)) {
																	// recordGrid.stopEditing();
																	recordGrid.getStore().removeAt(storeCount - 1);
																	// Ext.getCmp('total_record').setValue(recordGrid.getStore().getCount());
																	Ext.getCmp('submitFormBtn').focus(true, 100);
																}
																// 若不是最后一行，就执行tab按钮
																else {
																	event.keyCode = 9;
																}
															}
														}
													}
												}
											})
								}, {
									header : '金额',
									dataIndex : 'totleAmount',
									sortable : true,
									width : 100
								}]
					});

			var recordGrid = new Ext.grid.EditorGridPanel({
						// title : '详细信息',
						store : goodsEntryStore,
						region : 'center',
						sm : sm,
						cm : cm,
						frame : true,
						stripeRows : true,// 隔行换色
						clicksToEdit : 1,
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						},
						tbar : [{
									text : '增加记录 ',
									iconCls : 'icon-add',
									handler : function() {
										addRecord(); 
										// Ext.getCmp('entryRecordUnitsId').setValue(unit);
									}
								}, {
									text : '删除记录 ',
									iconCls : 'icon-del',
									handler : function() {
										_record = recordGrid.getSelectionModel().getSelections();
										var flag = recordGrid.getSelectionModel().getSelected();
										if (flag) {
											for (var i = 0; i < _record.length; i++) {
												recordGrid.getStore().remove(_record[i]);
											}
											Ext.Ghost.msg('成功', '删除成功');

										} else {
											Ext.Ghost.msg('删除操作', '请选择要删除的数据项！');
										}
										reSortBatchNumber();
									}
								}, {

									text : '增加货品',
									iconCls : 'icon-add',
									handler : function() {
										addGoods();
										Ext.getCmp('goodsName').focus(true, true);
									}

								}],
						listeners : {
							'afteredit' : {
								fn : function() {
									reSortBatchNumber();
								}
							}
						}
					});
			var addItems = [{
						xtype : 'textfield',
						fieldLabel : '供货商名',
						id : 'supplierName',
						name : 'supplier.name',
						allowBlank : false
					}, new Ext.form.ComboBox({
								id : 'shuxing2',
								anchor : '80%',
								fieldLabel : '属性',
								labelWidth : 50,
								store : new Ext.data.SimpleStore({
											fields : ['attribute', 'name'],
											data : [['个体', '个体'], ['企业', '企业']]
										}),
								valueField : "attribute",
								hiddenName : 'supplier.attribute',
								displayField : "name",
								mode : 'local',
								forceSelection : true,
								// editable : false,
								triggerAction : 'all'
							}), {
						xtype : 'textfield',
						fieldLabel : '电话1',
						name : 'supplier.phone1',
						allowBlank : false
					}, {
						xtype : 'textfield',
						fieldLabel : '电话2',
						name : 'supplier.phone2'
					}, {
						xtype : 'textfield',
						fieldLabel : '法人',
						name : 'supplier.corporation'
					}, {
						xtype : 'textfield',
						fieldLabel : '联系人',
						name : 'supplier.linkman',
						allowBlank : false
					}, {
						xtype : 'textfield',
						fieldLabel : '邮箱',
						name : 'supplier.email'
					}]
			// 新建窗口内容
			var addForm = new Ext.FormPanel({
						id : 'addForm',
						labelWidth : 70,
						frame : true,
						bodyStyle : 'padding:5px 5px 0',
						width : 350,
						waitMsgTarget : true,
						defaults : {
							width : 220
						},
						defaultType : 'textfield',
						items : addItems,
						buttons : [{
									text : '保存',
									disabled : false,
									iconCls : 'icon-save',
									handler : function() {
										if (addForm.form.isValid()) {
											addForm.form.submit({
														url : 'supplierInfo_add.action',
														success : function(from, action) {
															supplierStore.reload();
															Ext.Ghost.msg('保存成功', '添加新的供货商成功！');
															addWin.hide();
														},
														failure : function(form, action) {
															Ext.Ghost.msg('保存失败', '添加新的供货商失败！');
														},
														waitMsg : '正在保存数据，稍后...'
													});
										} else {
											Ext.Ghost.msg('信息', '请填写完成再提交!');
										}
									}
								}, {
									text : '取消',
									iconCls : 'icon-cancel',
									handler : function() {
										addWin.hide();
									}
								}]
					});
			// 新建窗口
			var addWin = new Ext.Window({
						layout : 'form',
						width : 370,
						resizable : false,
						plain : true,
						closable : false,
						modal : true,
						items : [addForm]
					})
			var addsupplier = function() {
				addForm.form.reset();
				winTitle = "添加新的供货商";
				addWin.setTitle(winTitle);
				addWin.show();
			};
			// 新增货品的相关内容
			var searchstore = new Ext.data.JsonStore({
						proxy : new Ext.data.HttpProxy({
									url : 'goodsCategory_get.action'
								}),
						root : 'listxiaolei',
						fields : [{
									name : 'id',
									mapping : 'id'
								}, {
									name : 'name',
									mapping : 'name'
								}, {
									name : 'subname',
									mapping : 'subname'
								}, {
									name : 'level',
									mapping : 'level'
								}]
					});
			searchstore.load();

			var goodsCategoryC1 = new Ext.form.ComboBox({
						id : 'goodsCategory1',
						anchor : '95%',
						allowBlank : false,
						fieldLabel : '货品类别',
						labelWidth : 50,
						store : searchstore,
						hiddenName : 'goods.goodsCategory.id',
						valueField : "id",
						displayField : "name",
						forceSelection : true,
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						listeners : {
							'select' : {
								fn : function(combo, record) {
									Ext.getCmp('goodsCategory1').setRawValue(Ext.util.Format.substr(record.get('name'), 29));
									// 将字符串按照指定的位置截取指定长度的新字符串
									if (record.get('level') == '1') {

										Ext.Ghost.msg('错误', '不可选择物品的大类！');
										Ext.getCmp('goodsCategory1').setValue('');
									}
								}
							},
							'blur' : {
								fn : function(record) {

									var xx = Ext.getCmp("goodsCategory1").getRawValue();
									Ext.getCmp("goodsCategory1").setRawValue(Ext.util.Format.substr(xx, 29));
								}
							}

						}

					});
			var goodsCategoryC2 = new Ext.form.ComboBox({
						id : 'goodsCategory2',
						anchor : '95%',
						fieldLabel : '货品类别',
						labelWidth : 70,
						pageSize : 5,
						store : searchstore,
						hiddenName : 'goods.goodsCategory.id',
						valueField : "id",
						displayField : "subname",
						forceSelection : true,
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						listeners : {
							'select' : {
								fn : function(combo, record) {
									// 将字符串按照指定的位置截取指定长度的新字符串
									if (record.get('level') == '1') {
										Ext.Ghost.msg('错误', '不可选择物品的大类！');
										Ext.getCmp('goodsCategory2').setValue('');
									}
								}
							}
						}

					});

			measurunitStore = new Ext.data.JsonStore({
						proxy : new Ext.data.HttpProxy({
									url : 'measureUnitInfo_query.action'
								}),
						totalProperty : 'results',
						root : 'items',
						autoLoad : true,
						fields : ['id', 'name']
					});

			// 加载store
			measurunitStore.load({
						params : {
							start : 0,
							limit : 10
						}
					});
			var measurunitC1 = new Ext.form.ComboBox({
						id : 'measurunit1',
						anchor : '95%',
						fieldLabel : '默认计量单位',
						labelWidth : 50,
						pageSize : 5,
						allowBlank : false,
						// store :searchstore1,
						store : measurunitStore,
						hiddenName : 'goods.measureUnit.id',
						editable : false,
						valueField : "id",
						displayField : "name",
						forceSelection : true,
						editable : false,
						mode : 'local',
						triggerAction : 'all'
					});

			var measurunitC2 = new Ext.form.ComboBox({
						id : 'measurunit2',
						anchor : '95%',
						fieldLabel : '默认计量单位',
						labelWidth : 50,
						pageSize : 10,
						allowBlank : false,
						// allowBlank:false,
						// store :searchstore,
						hiddenName : 'goods.measureUnit.id',
						store : measurunitStore,
						valueField : "id",
						displayField : "name",
						forceSelection : true,
						editable : false,
						mode : 'local',
						triggerAction : 'all'
					});
			var addItems2 = [{
						xtype : 'textfield',
						fieldLabel : '商品名称',
						name : 'goods.goodsName',
						allowBlank : false
					}, {
						xtype : 'textfield',
						fieldLabel : '生产厂家',
						name : 'goods.manufacturer'
					}, goodsCategoryC1, measurunitC1, {
						xtype : 'textfield',
						fieldLabel : '保质期',
						name : 'goods.shelfLife'
					}, {
						xtype : 'textfield',
						fieldLabel : '备注',
						name : 'goods.note',
						allowBlank : true
					}]
			// 新建窗口内容
			var addForm2 = new Ext.FormPanel({
						labelWidth : 90,
						frame : true,
						bodyStyle : 'padding:5px 5px 0',
						width : 400,
						waitMsgTarget : true,
						defaults : {
							width : 270
						},
						defaultType : 'textfield',
						items : addItems2,
						buttons : [{
									text : '保存',
									disabled : false,
									iconCls : 'icon-save',
									handler : function() {
										if (addForm2.form.isValid()) {
											addForm2.form.submit({
														url : 'goodsInfo_add.action',
														success : function(from, action) {
															goodsStore.reload();
															Ext.Ghost.msg('保存成功', '添加新的商品成功！');
															addWin2.hide();
														},
														failure : function(form, action) {
															Ext.Ghost.msg('保存失败', '添加新的商品失败！可能该商品已存在！');
														},
														waitMsg : '正在保存数据，稍后...'
													});
										} else {
											Ext.Ghost.msg('信息', '请填写完成再提交!');
										}
									}
								}, {
									text : '取消',
									iconCls : 'icon-cancel',
									handler : function() {
										addWin2.hide();
									}
								}]
					});
			// 新建窗口
			var addWin2 = new Ext.Window({
						layout : 'form',
						modal : true,
						width : 410,
						// height : 300,
						resizable : false,
						plain : true,
						closable : false,
						items : addForm2
					})
			var addGoods = function() {
				addForm2.form.reset();
				winTitle = "添加新的货品类型";
				addWin.setTitle(winTitle);
				addWin2.show();
			};
			/**
			 * @author jia 可编辑表格回车响应
			 */
			sm.onEditorKey = function(field, e) {
				var k = e.getKey(), newCell, g = sm.grid, ed = g.activeEditor;
				if (ed == null) {
					ed = g.lastEdit
				}
				if (k == e.ENTER) {
					e.stopEvent();
					// //alert(ed)
					// ed.completeEdit();
					if (e.shiftKey) {
						newCell = g.walkCells(ed.row, ed.col - 1, -1, sm.acceptsNav, sm);
					} else {
						newCell = g.walkCells(ed.row, ed.col + 1, 1, sm.acceptsNav, sm);
					}
				} else if (k == e.TAB) {
					e.stopEvent();
					// ed.completeEdit();
					if (e.shiftKey) {
						newCell = g.walkCells(ed.row - 1, ed.col, -1, sm.acceptsNav, sm);
					} else {
						newCell = g.walkCells(ed.row + 1, ed.col, 1, sm.acceptsNav, sm);
					}
					if (ed.col == 1) {
						if (e.shiftKey) {
							newCell = g.walkCells(ed.row, ed.col + 1, -1, sm.acceptsNav, sm);
						} else {
							newCell = g.walkCells(ed.row, ed.col + 1, 1, sm.acceptsNav, sm);
						}
					}
				} else if (k == e.ESC) {
				}
				if (newCell) {
					g.startEditing(newCell[0], newCell[1]);
				}
			};
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [formRecord, recordGrid, submitForm]
					});

			Ext.getCmp('supplier').focus(true, true);
		});