var surveyTopGrid;
var surveyBottomGrid
var submitPanel;
var viewport;
var cm;
var topGridCM;
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
			surveyStandardAvialStore.proxy = new Ext.data.HttpProxy({
						url : 'searchAvailable_surveyStandard.action'
					});
			surveyStandardAvialStore.load({
						callback : function(r, options, success) {
							var c = searchAvailable_surveyStandard.getCount();
							var flag = 0;
							topGridCM = [{
										header : '',
										width : 400
									}];

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
										width : 60,
										dataIndex : 'name'
									}, {
										header : '所属单位',
										width : 150,
										hidden : false,
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
										header : '分数',
										width : 100,
										dataIndex : 'position'
									}];

							fd = ["surveyDetailId", "id", "unit.id", "name", "level", "position"];
							var cssFlag = 0;
							surveyStandardAvialStore.each(function(rec) {
										var topGridCMArray = [{
													header : '<center>' + rec.get('name') + '</center>',
													width : (totalWid - 300) / c - 1
												}];
										topGridCM.push(topGridCMArray[0]);

										flag = rec.get('id');
										for (var i = 0; i < 4; i++) {
											var cmArray = [{
														header : "<center>好</center>",
														dataIndex : flag + "Y",
														width : (totalWid - 300) / (4 * c),
														renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
															// alert('rowIndex:'
															// + rowIndex + ','
															// + 'columnIndex:'
															// + columnIndex);
															cssFlag = parseInt((columnIndex - 2) / 4);
															if (1 == cssFlag % 2) {
																cellmeta.css = 'column-one';
															} else {
																cellmeta.css = 'column-two';
															}
															return '<center>' + value + '</center>';
														}
													}, {
														header : "<center>较好</center>",
														dataIndex : flag + "L",
														width : (totalWid - 300) / (4 * c),
														renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
															// alert('rowIndex:'
															// + rowIndex + ','
															// + 'columnIndex:'
															// + columnIndex);
															cssFlag = parseInt((columnIndex - 2) / 4);
															if (1 == cssFlag % 2) {
																cellmeta.css = 'column-one';
															} else {
																cellmeta.css = 'column-two';
															}
															return '<center>' + value + '</center>';
														}
													}, {
														header : "<center>一般</center>",
														dataIndex : flag + "Z",
														width : (totalWid - 300) / (4 * c),
														renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
															// alert('rowIndex:'
															// + rowIndex + ','
															// + 'columnIndex:'
															// + columnIndex);
															cssFlag = parseInt((columnIndex - 2) / 4);
															if (1 == cssFlag % 2) {
																cellmeta.css = 'column-one';
															} else {
																cellmeta.css = 'column-two';
															}
															return '<center>' + value + '</center>';
														}
													}, {
														header : "<center>较差</center>",
														dataIndex : flag + "C",
														width : (totalWid - 300) / (4 * c) - 1,
														renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
															// alert('rowIndex:'
															// + rowIndex + ','
															// + 'columnIndex:'
															// + columnIndex);
															cssFlag = parseInt((columnIndex - 2) / 4);
															if (1 == cssFlag % 2) {
																cellmeta.css = 'column-one';
															} else {
																cellmeta.css = 'column-two';
															}
															return '<center>' + value + '</center>';
														}
													}];
											var fdArray = [flag + "Y", flag + "L", flag + "Z", flag + "C"];
											fd.push(fdArray[i]);
											cm.push(cmArray[i]);
										}
									});
							surveyTopGrid.reconfigure(new Ext.data.JsonStore({
												url : 'searchByCondition_people.action',
												root : 'peopleItems',
												totalProperty : 'totalPeopleItem',
												id : "id",
												fields : fd
											}), new Ext.grid.ColumnModel(topGridCM));
							surveyBottomGrid.reconfigure(new Ext.data.JsonStore({
												url : 'searchByCondition_people.action',
												root : 'peopleItems',
												totalProperty : 'totalPeopleItem',
												id : "id",
												fields : fd
											}), new Ext.grid.ColumnModel(cm));

							var store = surveyBottomGrid.getStore();
							store.load({
										params : {
											'people.fields1' : currentUserType,// fields1是备用字段，用来暂时存储当前账户的类型（校领导，处级干部，教职工）
											'people.unit.id' : currentUserUnit,
											'people.unit.office' : currentUserOffice
										},
										callback : function() {
											totalRecords = store.getCount();
										}
									});
						}
					});

			var sm = new Ext.grid.CellSelectionModel();
			columnModel = new Ext.grid.ColumnModel({
						defaults : {
							sortable : false
						},
						columns : cm
					});
			var surveyTopGridsm = new Ext.grid.CellSelectionModel();
			surveyTopGridColumnModel = new Ext.grid.ColumnModel({
						defaults : {
							sortable : false
						},
						columns : topGridCM
					});
			surveyTopGrid = new Ext.grid.GridPanel({
						title : '<center><font color="#ffffff" size="5"></font></center>',
						sm : surveyTopGridsm,
						cm : surveyTopGridColumnModel,
						height : 78,
						columnLines : true,
						enableColumnMove : false,
						enableColumnResize : false,
						stripeRows : true,
						frame : false,
						enableColumnHide : false,
						enableHdMenu : false,
						enableDragDrop : false,
						region : 'north',
						store : surveyStandardStore,
						viewConfig : {
							forceFit : false
						}
					});

			surveyBottomGrid = new Ext.grid.GridPanel({
						sm : sm,
						cm : columnModel,
						region : 'center',
						trackMouseOver : false,
						columnLines : true,
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
							// 设置某一行的颜色
							getRowClass : function(record, rowIndex, p, ds) {
								if (1 == rowIndex % 2) {
									return 'row-one';
								}
							}
						},
						loadMask : {
							msg : '正在加载测评数据，请稍等... ...'
						}
					});
			submitPanel = new Ext.Panel({
						height : 55,
						region : 'south',
						frame : true,
						layout : 'column',
						buttonAlign : 'center'
						
					});
			// 给surveyBottomGrid注册cellselect监听，通过该监听的处理函数来完成在表格中单选和测评数据采集的功能
			surveyBottomGrid.getSelectionModel().on('cellselect', function(sm, rowIndex, colIndex) {
						var flag = checkInput(rowIndex, colIndex, fd, 'prev');// 验证上一行是否测评完毕
						if (flag == 'true') {
							var cm = surveyBottomGrid.getColumnModel();
							var sm = surveyBottomGrid.getSelectionModel();
							var store = surveyBottomGrid.getStore();
							var surveyStandardAndScore = cm.getDataIndex(colIndex);
							var peopleId = store.getAt(rowIndex).get('id');
							var index = cm.getDataIndex(colIndex);// 当前列
							var surveyStandard = index.substring(0, index.length - 1);
							var score = index.substring(index.length - 1);
							var record = sm.selection.record;
							var count = 0;// 计数器

							// 该for循环实现单选
							for (var i = 6; i < fd.length; i++) {// 冲掉历史成绩
								var temp = fd[i].substring(0, fd[i].length - 1);
								if (temp == surveyStandard) {// 同一测评标准
									surveyDataMap.remove(peopleId + ':' + surveyStandard + 'Y');
									surveyDataMap.remove(peopleId + ':' + surveyStandard + 'L');
									surveyDataMap.remove(peopleId + ':' + surveyStandard + 'Z');
									surveyDataMap.remove(peopleId + ':' + surveyStandard + 'C');
									record.set(surveyStandard + 'Y', '');
									record.set(surveyStandard + 'L', '');
									record.set(surveyStandard + 'Z', '');
									record.set(surveyStandard + 'C', '');
									count++;
									if (4 == count) {
										break;
									}
								}
							}

							if (score == 'Y') {
								record.set(index, '好');
								// record.commit();
								surveyDataMap.put(peopleId + ':' + surveyStandardAndScore, 1);
							}
							if (score == 'L') {
								record.set(index, '较好');
								// record.commit();
								surveyDataMap.put(peopleId + ':' + surveyStandardAndScore, 1);
							}
							if (score == 'Z') {
								record.set(index, '一般');
								// record.commit();
								surveyDataMap.put(peopleId + ':' + surveyStandardAndScore, 1);
							}
							if (score == 'C') {
								record.set(index, '较差');
								// record.commit();
								surveyDataMap.put(peopleId + ':' + surveyStandardAndScore, 1);
							}

						} else {
							var tooltip = flag.split(',');
							tooltip[2] = findDisplayName(tooltip[2], unitStore);
							tooltip[4] = findDisplayName(tooltip[4], surveyStandardStore);
							var tooltipInfo = '您好，' + tooltip[2] + '  ' + tooltip[1] + '(' + tooltip[3] + ')' + '的 "' + tooltip[4] + ' "还没有测评,请您测评 ';
							alert(tooltipInfo);
						}
					});
			viewport = new Ext.Viewport({
						layout : 'border',
						items : [surveyTopGrid, surveyBottomGrid, submitPanel]
					});
		});
