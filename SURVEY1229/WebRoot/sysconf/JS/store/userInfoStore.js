var userInfoStore;// 存储用户基本信息

Ext.onReady(function() {
	
			Ext.BLANK_IMAGE_URL = 'ExtJs/resources/images/default/s.gif';
			Ext.QuickTips.init();
			//alert('初始化userInfoStore');
			userInfoStore = new Ext.data.JsonStore({
						url : 'search_userInfo.action',
						root : 'userInfoItems',
						totalProperty : 'totalUserInfoItem',
						fields : [{
									name : 'id',
									mapping : 'id'
								},{
									name : 'username',
									mapping : 'username'
								}, {
									name : 'unit',
									mapping : 'unit.name'
								}, {
									name : 'peopleType',
									mapping : 'peopleType.name'
								}, {
									name : 'password',
									mapping : 'password'
								}, {
									name : 'year',
									mapping : 'year'
								}, {
									name : 'loginCount',
									mapping : 'loginCount'
								}, {
									name : 'fields1',
									mapping : 'fields1'
								}, {
									name : 'stateFlag',
									mapping : 'stateFlag'
								}],
						autoLoad : false
					});
					//alert('userInfoStore:' + userInfoStore);
		});