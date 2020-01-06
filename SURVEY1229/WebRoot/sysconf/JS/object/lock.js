var totalHeight = document.documentElement.clientHeight;// 网页可见区域高

function changeInfo(info) {
	if(info == 1) {
		info = '已开通';
	}else if(info == 0) {
		info = '已关闭';
	}
	return info;
}

function createLockPanel(title, position, type, info) {
	var information = changeInfo(info);
	lockPanel = new Ext.Panel({
		title : '<center>' + title + '</center>',
		frame : false,
		height: totalHeight/3,
		layout : 'form',
		buttonAlign : 'center',
		renderTo : position,
		items : [{
			xtype : 'label',
			id : type,
			text : information
		}],
		buttons : [{
			xtype : 'button',
			iconCls : 'x-icon-open',
			text : '开通',
			handler : function() {
				Ext.Ajax.request({
					url : 'saveOrUpdate_peopleType.action',
					method : 'post',
					params : {
						'attribute' : 'fields1',
						'value' : '1',
						'flag' : type
					},
					success : function(response, options) {
						var result = Ext.util.JSON.decode(response.responseText);
						var flag = result.success;
						if(flag == true) {
							Ext.getCmp(type).setText('已开通');
							Ext.Ghost.msg('操作提示', title + '已开通', 1);
						}else {
							Ext.Msg.alert('错误提示', '开通失败');
						}
					},
					failure : function(response, options) {
						Ext.Msg.alert('失败提示', '因网络原因失败');
					}
				});
			}
		}, {
			xtype : 'button',
			iconCls : 'x-icon-lock',
			text : '关闭',
			handler : function() {
				Ext.Ajax.request({
					url : 'saveOrUpdate_peopleType.action',
					method : 'post',
					params : {
						'attribute' : 'fields1',
						'value' : '0',
						'flag' : type
					},
					success : function(response, options) {
						var result = Ext.util.JSON.decode(response.responseText);
						var flag = result.success;
						if(flag == true) {
							Ext.getCmp(type).setText('已关闭');
							Ext.Ghost.msg('操作提示', title + '已关闭', 1);
						}else {
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
};
Ext.onReady(function() {
	
	peopleTypeStore.load({
		callback : function(r, options, success) {
			if(success) {
				var i = 1
				peopleTypeStore.each(function(rec) {
					createLockPanel(rec.get('name') + '测评', 'demo' + i, rec.get('id'), rec.get('lockFlag'));
					i ++;
				});
			}else {
				alert('peopleType表中的数据没有取出');
			}
		}
	});
});