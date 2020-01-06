var conditionForm;// 条件查询包括干部姓名，测评人员类型，测评标准，测评年度
var surveyStatisticGrid;
var surveyStatisticStore;
var surveyPanel;

Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
	Ext.QuickTips.init();

	peopleStore.load();
	peopleTypeStore.load();
	surveyStandardStore.load();
	pivotStore.load();
	 surveyStatisticStore.load({
	 callback : function(r, options, success) {
	 // alert(success + ',' +
	 // surveyStatisticStore.getCount());
	 }
	 });

	conditionForm = new Ext.form.FormPanel({
				title : '请输入查询条件s',
				id : 'conditionForm',
				region : 'north',
				height : 100,
				collapsible : true,
				labelWidth : 70,
				labelSeparator : ':',
				frame : true,
				layout : 'column',
				labelAlign : 'right',
				frame : true,
				buttonAlign : 'center',
				items : [{
							columnWidth : .25,
							layout : 'form',
							items : [{
										xtype : 'pinyincombo',
										fieldLabel : '干部姓名',
										emptyText : '',
										id : 'people',
										allowBlank : true,
										name : 'surveyDetail',
										hiddenName : 'surveyDetail.people.id',
										displayField : 'name',
										valueField : 'id',
										mode : 'local',
										store : peopleStore,
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
											}
										}
									}]
						}, {

							columnWidth : .25,
							layout : 'form',
							items : [{
										xtype : 'pinyincombo',
										fieldLabel : '测评类型',
										emptyText : '',
										id : 'peopleType',
										allowBlank : true,
										name : 'surveyDetail',
										hiddenName : 'surveyDetail.people.id',
										displayField : 'name',
										valueField : 'id',
										mode : 'local',
										store : peopleTypeStore,
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
											}
										}
									}]
						}, {
							columnWidth : .25,
							layout : 'form',
							items : [{
										xtype : 'pinyincombo',
										fieldLabel : '测评标准',
										emptyText : '',
										id : 'surveyStandard',
										allowBlank : true,
										name : 'surveyDetail',
										hiddenName : 'surveyDetail.people.id',
										displayField : 'name',
										valueField : 'id',
										mode : 'local',
										store : surveyStandardStore,
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
											}
										}
									}]
						}, {

							columnWidth : .25,
							layout : 'form',
							items : [{
										xtype : 'datefield',
										fieldLabel : '测评年度',
										emptyText : '',
										id : 'year',
										allowBlank : true,
										format : 'Y' + '年',
										name : 'surveyDetail',
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
											}
										}
									}]
						}],
				buttons : [{
							text : '查询',
							iconCls : 'icon-find',
							handler : function() {
								var url = [];
								var peopleValue = Ext.getCmp('people').getValue();
								var peopleTypeValue = Ext.getCmp('peopleType').getValue();
								var surveyStandardValue = Ext.getCmp('surveyStandard').getValue();
								var yearValue;
								if (Ext.getCmp('year').getValue() != '') {
									yearValue = Ext.getCmp('year').getValue().format('Y');
								}
								// alert('peopleValue:' + peopleValue + ',' +
								// 'peopleTypeValue:' + peopleTypeValue + ',' +
								// 'surveyStandardValue:' + surveyStandardValue
								// + ','
								// + 'yearValue:' + yearValue);
								if (peopleValue != '') {
									url.push(peopleValue);
									// alert('url:' + url);
								}
								if (peopleTypeValue != '') {
									url.push(peopleTypeValue);
								}
								if (surveyStandardValue != '') {
									url.push(surveyStandardValue);
								}
								if (yearValue != '') {
									url.push(yearValue);
								}
								pivotStore.proxy = new Ext.data.HttpProxy({
											url : 'searchByCondition_surveyDetail.action'
										});
								pivotStore.load({
											params : {
												// conditions : url
												'surveyDetail.people.id' : peopleValue,
												// 'surveyDetail.userInfo.id' :
												// peopleTypeValue,
												'surveyDetail.surveyStandard.id' : surveyStandardValue,
												'surveyDetail.fields1' : yearValue
											}
										});
							}
						}, {
							text : '重置',
							iconCls : 'reset',
							handler : function() {
								conditionForm.getForm().reset();
							}
						}]
			});
	surveyStatisticGrid = new Ext.grid.PivotGrid({
				title : '查询结果',
				// height : 190,
				region : 'center',
				// width : 800,
				// height : 220,
				// renderTo : 'docbody',
				store : pivotStore,
				aggregator : 'sum',
				measure : 'score',
				viewConfig : {
					title : '年度测评成绩'
				},
				leftAxis : [{
							dataIndex : 'people',
							width : 150
						}, {
							dataIndex : 'userInfo',
							width : 150
						}],

				topAxis : [
						// {
						// dataIndex : 'fields1'
						// },
						{
					dataIndex : 'surveyStandard'
				}]
			});
	// bottomForm = new Ext.form.FormPanel({
	// region : 'center',
	// labelAlign : 'center',
	// buttonAlign : 'center',
	// layout : 'form',
	// items : surveyStatisticGrid
	// });
//	surveyPanel = new Ext.Panel({
//				layout : 'border',
//				width : 1000,
//				height : 700,
//				items : [conditionForm, surveyStatisticGrid]
//			});

//		 viewport = new Ext.Viewport({
//		 layout : 'border',
//		 items : [conditionForm, surveyStatisticGrid]
//		 });
	});
