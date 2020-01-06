var surveyTopGrid;
var surveyBottomGrid
var viewport;
var cm;
var survey_start = 0;
var peopleEachFlag = 0;
var fd;
var totalRecords;
var surveyDataMap = new HashMap();// 用于存储结果的HashMap
Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			var totalWid = document.body.clientWidth;// 网页可见区域宽
			unitStore.load();// 单位信息载入
			surveyStandardStore.proxy = new Ext.data.HttpProxy({
						url : 'searchByOrder_surveyStandard.action'
					});
			surveyStandardStore.load({
						callback : function(r, options, success) {
							var c = surveyStandardStore.getCount();
							var flag = 0;
							// var fd = ["id", "name", "url", "classID"];
							cm = [	new Ext.grid.RowNumberer({
												header : '序号',
												width : 40,
												renderer : function(value, metadata, record, rowIndex) {
													return survey_start + 1 + rowIndex;
												}
											}), {
										dataIndex : 'surveyDetailId',
										hidden : true
									}, {
										dataIndex : 'id',
										hidden : true
									}, {
										header : '姓名',
										width : 55,
										dataIndex : 'name'
									}, {
										header : '所属单位',
										width : 150,
										dataIndex : 'unit.id',
										renderer : function(value, cellmeta, record) {
											var displayText = value;

											if (unitStore.getCount() > 0) {
												var index = findIndex(unitStore, 'id', value);
												var rec = unitStore.getAt(index);
												return rec ? rec.get('name') : '';
											} else {
												return value;
											}
										}
									}, {
										header : '职务',
										width : 250,
										dataIndex : 'position'
									}];

							fd = ["surveyDetailId", "id", "unit.id", "name", "level", "position"];
							surveyStandardStore.each(function(rec) {

										flag = rec.get('id');
										for (var i = 0; i < 4; i++) {
											var cmArray = [{
														header : "优",
														dataIndex : flag + "Y",
														width : (totalWid - 495) / (4 * c),
														renderer : function(v, m) {
															m.css = 'green-row';
															return v;
														}
													}, {
														header : "良",
														dataIndex : flag + "L",
														width : (totalWid - 495) / (4 * c),
														renderer : function(v, m) {
															return v;
														}
													}, {
														header : "中",
														dataIndex : flag + "Z",
														width : (totalWid - 495) / (4 * c),
														renderer : function(v, m) {
															//m.css = 'green-row';
															return v;
														}
													}, {
														header : "差",
														dataIndex : flag + "C",
														width : (totalWid - 495) / (4 * c),
														renderer : function(v, m) {
															return v;
														}
													}];
											var fdArray = [flag + "Y", flag + "L", flag + "Z", flag + "C"];
											fd.push(fdArray[i]);
											cm.push(cmArray[i]);
											// alert(fdArray[0]);
										}
									});
							surveyBottomGrid.reconfigure(new Ext.data.JsonStore({
												url : 'search_people.action',
												root : 'peopleItems',
												totalProperty : 'totalPeopleItem',
												id : "id",
												fields : fd
											}), new Ext.grid.ColumnModel(cm));
							var store = surveyBottomGrid.getStore();
							// surveyBottomGrid.getBottomToolbar().bind(store);
							store.load({
										callback : function(r, options, success) {
											totalRecords = store.getCount();
											surveyStatisticStore.load({
														callback : function(r, options, success) {
															// alert('d:' +
															// surveyStatisticStore.getCount());
															if (success) {
																store.each(function(rec) {
																			var surveyStandardIndex;
																			var surveyStandardId;
																			var scoreFlag;
																			var peopleId = rec.get('id');// 获取干部人员信息的id
																			for (var i = 0; i < fd.length; i++) {
																				surveyStandardIndex = surveyBottomGrid.getColumnModel().getDataIndex(i);// 获取第i列的索引，该索引包括（测评标准信息的id和成绩）
																				surveyStandardId = surveyStandardIndex.substring(0, surveyStandardIndex.length - 1);// 截取字符串，获得第i列测评标准信息的id
																				scoreFlag = surveyStandardIndex.substring(surveyStandardIndex.length - 1);
																				if (scoreFlag == 'Y' || scoreFlag == 'L' || scoreFlag == 'Z' || scoreFlag == 'C') {
																					// alert('peopleId:'
																					// +
																					// peopleId
																					// +
																					// ','
																					// +
																					// 'surveyStandardId:'
																					// +
																					// surveyStandardId);
																					var surveyStandardScore = findScore(peopleId, surveyStandardId, surveyStatisticStore);
																					// alert('surveyStandardScore:'
																					// +
																					// surveyStandardScore)
																					if (surveyStandardScore == 90) {
																						rec.set(surveyStandardId + 'Y', '<font color="green" size="bold">优</font>');
																						// surveyDataMap.put(peopleId
																						// +
																						// ':'
																						// +
																						// surveyStandardId
																						// +
																						// 'Y',
																						// 1);
																					} else if (surveyStandardScore == 80) {
																						rec.set(surveyStandardId + 'L', '<font color="green" size="bold">良</font>');
																						// surveyDataMap.put(peopleId
																						// +
																						// ':'
																						// +
																						// surveyStandardId
																						// +
																						// 'L',
																						// 1);
																					} else if (surveyStandardScore == 70) {
																						rec.set(surveyStandardId + 'Z', '<font color="green" size="bold">中</font>');
																						// surveyDataMap.put(peopleId
																						// +
																						// ':'
																						// +
																						// surveyStandardId
																						// +
																						// 'Z',
																						// 1);
																					} else if (surveyStandardScore == 60) {
																						rec.set(surveyStandardId + 'C', '<font color="green" size="bold">差</font>');
																						// surveyDataMap.put(peopleId
																						// +
																						// ':'
																						// +
																						// surveyStandardId
																						// +
																						// 'C',
																						// 1);
																					}
																				}
																			}
																		});
																store.commitChanges();
															} else {
																alert('分数加载失败');
															}
														}
													});
										}
									});
						}
					});
			// peopleStore.load();

			var sm = new Ext.grid.CellSelectionModel();

			columnModel = new Ext.grid.ColumnModel({
						defaults : {
							sortable : false
						},
						columns : cm
					});

			surveyTopGrid = new Ext.grid.PivotGrid({
						title : '测评页面',
						height : 50,
						region : 'north',
						store : surveyStandardStore,
						aggregator : 'count',
						measure : 'value',
						viewConfig : {
							title : '干部测评',
							getCellCls : function(value) {
								// return 'expense-low';
							}
						},
						leftAxis : [{
									width : 505,
									dataIndex : 'delFlag'
								}],

						topAxis : [{
									dataIndex : 'name'
								}]
					});

			surveyBottomGrid = new Ext.grid.GridPanel({
						sm : sm,
						cm : columnModel,
						region : 'center',
						enableColumnMove : false,
						enableColumnResize : false,
						stripeRows : true,
						frame : false,
						enableColumnHide : false,
						enableHdMenu : false,
						enableDragDrop : false,
						store : peopleStore,
						viewConfig : {
							forceFit : false,
							autoFill : false,
							// 设置某一列的颜色
							getRowClass : function(record, rowIndex, p, ds) {
								// alert('getRowClass');
								// return 'green-row';
							}
						},
						loadMask : {
							msg : '正在加载数据，请稍等... ...'
						},
						bbar : ['->', {
									text : '上传测评数据',
									iconCls : 'icon-table-save',
									handler : function() {
										// alert(surveyDataMap.keys() + ',' +
										// fd);
										var flag = checkInput(totalRecords, 0, fd);
										var surveyData = surveyDataMap.keys();
										if (surveyData != '') {
											alert('surveyData:' + surveyData);

											if (flag == 'true') {
												Ext.MessageBox.confirm('操作确认', '您确定要上传测评数据吗？上传后您将失去登录系统的权限', function(btn) {
															// alert(surveyDataMap.keys());
															if (btn == 'yes') {

																Ext.Ajax.request({
																			url : 'save_surveyDetail.action',
																			method : 'post',
																			params : {
																				surveyData : surveyData
																			},
																			success : function(response, options) {
																				var result = Ext.util.JSON.decode(response.responseText);
																				if (result.success) {
																					Ext.Ghost.msg('操作提示', '测评数据上传成功，感谢您的测评');
																				}
																			},
																			failure : function(response, options) {
																			}
																		});
															}
														})
											} else {
												Ext.MessageBox.confirm('操作提示', '您还有未测评的项目，可以在下次登录时进行测评，确定要上传测评数据吗？', function(btn) {
															if (btn == 'yes') {
																// var
																// surveyData =
																// surveyDataMap.keys();
																Ext.Ajax.request({
																			url : 'save_surveyDetail.action',
																			method : 'post',
																			params : {
																				surveyData : surveyData
																			},
																			success : function(response, options) {
																				var result = Ext.util.JSON.decode(response.responseText);
																				if (result.success) {
																					Ext.Ghost.msg('操作提示', '测评数据上传成功，请您在测评时间结束前，完成您未测评的项目');
																				}
																			},
																			failure : function(response, options) {
																			}
																		});
															}
														});
											}
										}else {
											Ext.Ghost.msg('操作提示', '您没有修改任何测评数据，无需上传');
										}
									}
								}],
						listeners : {
							'afteredit' : {
								fn : function() {
									var ed = peopleGrid.lastEdit;
									var url = 'saveOrUpdate_people.action';
									saveOrUpdate(peopleGrid, ed, url);
								}
							}
						}
					});
			surveyBottomGrid.getSelectionModel().on('cellselect', function(sm, rowIndex, colIndex) {
						var flag = checkInput(rowIndex, colIndex, fd);// 验证输入
						// alert('c:' + c);
						if (flag == 'true') {
							var surveyStandardId = surveyBottomGrid.getColumnModel().getDataIndex(colIndex)
							var peopleId = surveyBottomGrid.getStore().getAt(rowIndex).get('id');
							var index = surveyBottomGrid.getColumnModel().getDataIndex(colIndex);// 当前列
							surveyStandard = index.substring(0, index.length - 1);
							var score = index.substring(index.length - 1)
							for (var i = 0; i < fd.length; i++) {// 获取历史成绩
								var temp = fd[i].substring(0, fd[i].length - 1);
								if (temp == surveyStandard) {// 同一测评标准
									var Y = surveyBottomGrid.getStore().getAt(rowIndex).get(surveyStandard + 'Y');
									var L = surveyBottomGrid.getStore().getAt(rowIndex).get(surveyStandard + 'L');
									var Z = surveyBottomGrid.getStore().getAt(rowIndex).get(surveyStandard + 'Z');
									var C = surveyBottomGrid.getStore().getAt(rowIndex).get(surveyStandard + 'C');
									if (Y != '') {
										surveyDataMap.remove(peopleId + ':' + surveyStandard + 'Y');
									}
									if (L != '') {
										surveyDataMap.remove(peopleId + ':' + surveyStandard + 'L');
									}
									if (Z != '') {
										surveyDataMap.remove(peopleId + ':' + surveyStandard + 'Z');
									}
									if (C != '') {
										surveyDataMap.remove(peopleId + ':' + surveyStandard + 'C');
									}
								}
							}
							if (score == 'Y') {
								surveyBottomGrid.getStore().getAt(rowIndex).set(index, '<font color="green" size="bold">优</font>');
								surveyDataMap.put(peopleId + ':' + surveyStandardId, 1);
							} else if (score == 'L') {
								surveyBottomGrid.getStore().getAt(rowIndex).set(index, '<font color="green" size="bold">良</font>');
								surveyDataMap.put(peopleId + ':' + surveyStandardId, 1);
							} else if (score == 'Z') {
								surveyBottomGrid.getStore().getAt(rowIndex).set(index, '<font color="green" size="bold">中</font>');
								surveyDataMap.put(peopleId + ':' + surveyStandardId, 1);
							} else if (score == 'C') {
								surveyBottomGrid.getStore().getAt(rowIndex).set(index, '<font color="green" size="bold">差</font>');
								surveyDataMap.put(peopleId + ':' + surveyStandardId, 1);
							}
							for (var i = 0; i < fd.length; i++) {// 实现单选
								var temp = fd[i].substring(0, fd[i].length - 1);
								if (temp == surveyStandard) {// 同一测评标准
									var Y = surveyBottomGrid.getStore().getAt(rowIndex).get(surveyStandard + 'Y');
									var L = surveyBottomGrid.getStore().getAt(rowIndex).get(surveyStandard + 'L');
									var Z = surveyBottomGrid.getStore().getAt(rowIndex).get(surveyStandard + 'Z');
									var C = surveyBottomGrid.getStore().getAt(rowIndex).get(surveyStandard + 'C');
									if (index != fd[i]) {// 不是当前单元格
										surveyBottomGrid.getStore().getAt(rowIndex).set(fd[i], ' ')
										surveyBottomGrid.getStore().commitChanges();
									}
								}
							}
						} else {
							// alert(flag);
							var tooltip = flag.split(',');
							tooltip[2] = findDisplayName(tooltip[2], unitStore);
							tooltip[4] = findDisplayName(tooltip[4], surveyStandardStore);
							// alert(tooltip[2] + ',' + tooltip[4]);
							var tooltipInfo = '您好，' + tooltip[2] + '  ' + tooltip[1] + tooltip[3] + '的' + '<font color="red">' + tooltip[4] + '</font>' + '还没有测评,请您测评 : )';
							Ext.Msg.alert('温馨提示', tooltipInfo)
						}
					});
			viewport = new Ext.Viewport({
						layout : 'border',
						items : [surveyTopGrid, surveyBottomGrid]
					});

		});