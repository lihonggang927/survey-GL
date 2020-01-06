var surveyStore;
var surveyStatisticStore;
var pivotStore;
var record;

Ext.onReady(function() {
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();

			record = Ext.data.Record.create([{
						name : 'id',
						type : 'string'
					}, {
						name : 'surveyStandard',
						mapping : 'surveyStandard.name',
						type : 'string'
					}, {
						name : 'people',
						mapping : 'people.name',
						type : 'string'
					}, {
						name : 'userInfo',
						type : 'string'
					}, {
						name : 'score',
						type : 'int'
					}, {
						name : 'delFlag',
						type : 'int'
					}, {
						name : 'fields1',
						type : 'string'
					}, {
						name : 'fields2',
						type : 'string'
					}]);

			pivotStore = new Ext.data.Store({
						url : 'search_surveyDetail.action',
						reader : new Ext.data.JsonReader({
									root : 'surveyDetailItems',
									idProperty : 'id'
								}, record)
					});

			surveyStatisticStore = new Ext.data.JsonStore({
						url : 'searchByCondition_surveyDetail.action',
						root : 'surveyDetailItems',
						totalProperty : 'totalSurveyDetailItem',
						fields : [{
									name : 'id',
									mapping : 'id'
								}, {
									name : 'surveyStandard',
									mapping : 'surveyStandard.id'
								}, {
									name : 'people',
									mapping : 'people.id'
								}, {
									name : 'userInfo',
									mapping : 'userInfo'
								}, {
									name : 'score',
									mapping : 'score'
								}, {
									name : 'delFlag',
									mapping : 'delFlag'
								}, {
									name : 'fields1',
									mapping : 'fields1'
								}, {
									name : 'fields2',
									mapping : 'fields2'
								}]
					});

			surveyStore = new Ext.data.JsonStore({
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
		});