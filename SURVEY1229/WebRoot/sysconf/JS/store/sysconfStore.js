/*
 * sysconfStore.js文件用于存储从数据库中取出的数据
 */
var peopleStore;// 用于存储被测评人员的基本信息
var peopleTypeStore;// 用于存储人员类型
var surveyStandardStore;// 存储测评标准
var unitStore;// 存储单位基本信息
var unitStoreForPeopleGrid;
var officeInfoStore;
Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
	Ext.QuickTips.init();

 officeInfoStore = new Ext.data.JsonStore({
				url : 'search_officeInfo.action',
				root : 'unitItems',
				totalProperty : 'totalUnitItem',
				fields : [{
							name : 'id',
							mapping : 'id'
						}, {
							name : 'name',
							mapping : 'name'
						}],
				autoLoad : false
			});

	peopleStore = new Ext.data.JsonStore({
				url : 'search_people.action',
				root : 'peopleItems',
				totalProperty : 'totalPeopleItem',
				fields : [{
							name : 'id',
							mapping : 'id'
						}, {
							name : 'unit',
							mapping : 'unit.id'
						}, {
							name : 'name',
							mapping : 'name'
						}, {
							name : 'level',
							mapping : 'level'
						}, {
							name : 'position',
							mapping : 'position'
						}, {
							name : 'delFlag',
							mapping : 'delFlag'
						}, {
							name : 'fields1',
							mapping : 'fields1'
						}, {
							name : 'fields2',
							mapping : 'fields2'
						}, {
							name : 'surveyRecords',
							mapping : 'surveyRecords'
						}],
				autoLoad : false
			});

	peopleTypeStore = new Ext.data.JsonStore({
				url : 'search_peopleType.action',
				root : 'peopleTypeItems',
				totalProperty : 'totalPeopleTypeItem',
				fields : [{
							name : 'id',
							mapping : 'id'
						}, {
							name : 'name',
							mapping : 'name'
						}, {
							name : 'ratio',
							mapping : 'ratio'
						}, {
							name : 'delFlag',
							mapping : 'delFlag'
						}, {
							name : 'lockFlag',
							mapping : 'lockFlag'
						}, {
							name : 'fields2',
							mapping : 'fields2'
						}],
				autoLoad : false
			});

	surveyStandardStore = new Ext.data.JsonStore({
				url : 'search_surveyStandard.action',
				root : 'surveyStandardItems',
				totalProperty : 'totalSurveyStandardItem',
				fields : [{
							name : 'id',
							mapping : 'id'
						}, {
							name : 'name',
							mapping : 'name'
						}, {
							name : 'ratio',
							mapping : 'ratio'
						}, {
							name : 'delFlag',
							mapping : 'delFlag'
						}, {
							name : 'fields1',
							mapping : 'fields1'
						}, {
							name : 'fields2',
							mapping : 'fields2'
						}, {
							name : 'surveyDetails',
							mapping : 'surveyDetails'
						}],
				autoLoad : false
			});

	unitStore = new Ext.data.JsonStore({
				url : 'search_unit.action',
				root : 'unitItems',
				// totalProperty : 'totalUnitItem',
				fields : [{
							name : 'id',
							mapping : 'id'
						}, {
							name : 'name',
							mapping : 'name'
						}, {
							name : 'address',
							mapping : 'address'
						}, {
							name : 'legalPerson',
							mapping : 'legalPerson'
						}, {
							name : 'peopleCount',
							mapping : 'peopleCount'
						}, {
							name : 'delFlag',
							mapping : 'delFlag'
						}, {
							name : 'lockFlag',
							mapping : 'lockFlag'
						}, {
							name : 'office',
							mapping : 'office'
						}],
				autoLoad : false
			});
	unitStoreForStatistic = new Ext.data.JsonStore({
				url : 'search_unit.action',
				root : 'unitItems',
				// totalProperty : 'totalUnitItem',
				fields : [{
							name : 'id',
							mapping : 'id'
						}, {
							name : 'name',
							mapping : 'name'
						}, {
							name : 'address',
							mapping : 'address'
						}, {
							name : 'legalPerson',
							mapping : 'legalPerson'
						}, {
							name : 'peopleCount',
							mapping : 'peopleCount'
						}, {
							name : 'delFlag',
							mapping : 'delFlag'
						}, {
							name : 'fields1',
							mapping : 'fields1'
						}, {
							name : 'fields2',
							mapping : 'fields2'
						}],
				autoLoad : false
			});

	peopleStoreForStatistic = new Ext.data.JsonStore({
				url : 'search_people.action',
				root : 'peopleItems',
				totalProperty : 'totalPeopleItem',
				fields : [{
							name : 'id',
							mapping : 'id'
						}, {
							name : 'unit',
							mapping : 'unit.id'
						}, {
							name : 'name',
							mapping : 'name'
						}, {
							name : 'level',
							mapping : 'level'
						}, {
							name : 'position',
							mapping : 'position'
						}, {
							name : 'delFlag',
							mapping : 'delFlag'
						}, {
							name : 'fields1',
							mapping : 'fields1'
						}, {
							name : 'fields2',
							mapping : 'fields2'
						}, {
							name : 'surveyRecords',
							mapping : 'surveyRecords'
						}],
				autoLoad : false
			});
	unitStoreForPeopleGrid = new Ext.data.JsonStore({
				url : 'search_unit.action',
				root : 'unitItems',
				// totalProperty : 'totalUnitItem',
				fields : [{
							name : 'id',
							mapping : 'id'
						}, {
							name : 'name',
							mapping : 'name'
						}, {
							name : 'address',
							mapping : 'address'
						}, {
							name : 'legalPerson',
							mapping : 'legalPerson'
						}, {
							name : 'peopleCount',
							mapping : 'peopleCount'
						}, {
							name : 'delFlag',
							mapping : 'delFlag'
						}, {
							name : 'fields1',
							mapping : 'fields1'
						}, {
							name : 'fields2',
							mapping : 'fields2'
						}],
				autoLoad : false
			});
		// alert('store加载完毕');
	});