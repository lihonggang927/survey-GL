var surveyStore;
var surveyStatisticStore;
var pivotStore;
var record;

Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
	Ext.QuickTips.init();

	surveyStatisticStore = new Ext.data.JsonStore({
				url : 'statistic_surveyDetail.action',
				root : 'statisticItems',
				totalProperty : 'totalSurveyDetailItem',
				fields : [{
							name : 'people',
							mapping : 'people.id'
						}, {
							name : 'peopleName',
							mapping : 'people.name'
						}, {
							name : 'peopleUnit',
							mapping : 'people.unit.name'
						}, {
							name : 'peoplePosition',
							mapping : 'people.position'
						}, {
							name : 'leader_score',
							mapping : 'score.leader_score'
						}, {
							name : 'cadre_score',
							mapping : 'score.cadre_score'
						}, {
							name : 'mass_score',
							mapping : 'score.mass_score'
						}, {
							name : 'multipleScore',
							mapping : 'multipleScore'
						}, {
							name : 'level',
							mapping : 'level'
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

		// surveyStore = new Ext.data.JsonStore({
		// url : 'search_people.action',
		// root : 'peopleItems',
		// totalProperty : 'totalPeopleItem',
		// fields : [{
		// name : 'id',
		// mapping : 'id'
		// }, {
		// name : 'unit',
		// mapping : 'unit.id'
		// }, {
		// name : 'name',
		// mapping : 'name'
		// }, {
		// name : 'level',
		// mapping : 'level'
		// }, {
		// name : 'position',
		// mapping : 'position'
		// }, {
		// name : 'delFlag',
		// mapping : 'delFlag'
		// }, {
		// name : 'fields1',
		// mapping : 'fields1'
		// }, {
		// name : 'fields2',
		// mapping : 'fields2'
		// }, {
		// name : 'surveyRecords',
		// mapping : 'surveyRecords'
		// }],
		// autoLoad : false
		// });
	});