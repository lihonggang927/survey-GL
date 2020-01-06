function getCell(key, value) {
	store.each(function(record) {
				record.get(key)
			});
};

// 增加一条记录
addRecord = function(grid) {
	var Record = grid.getStore().recordType;
	var index = grid.getStore().getCount();
	var record = new Record();
	grid.stopEditing();
	grid.getStore().insert(index, record);
	grid.startEditing(index, 2);
};
// 删除记录
delRecord = function(store, records, url) {
	Ext.MessageBox.confirm('操作确认', '您确定要删除该信息吗？', function(btn) {
				if (btn == "yes") {
					var jsonData = '';
					for (var i = 0; i < records.length; i++) {
						columnValue = records[i].get("id");
						index = findIndex(store, 'id', columnValue);
						store.removeAt(index);
						if (i == 0) {
							jsonData = jsonData + columnValue;
						} else {
							jsonData = jsonData + "," + columnValue;
						}

					}
					Ext.Ajax.request({
								url : url,
								params : {
									delData : jsonData
								},
								success : function(response, options) {
									store.reload()
								},
								failure : function(response, options) {
									Ext.Ghost.msg('修改失败', '因网络或服务器出错，您的操作没有成功，请刷新页面重新刚才的操作');
								}
							});

				}
			});
};

// gird表格中按键监听
keyListener = function(sm, e) {
	var k = e.getKey(), newCell, g = this.grid, ed = g.activeEditor;
	if (ed == null) {
		ed = g.lastEdit
	}
	if (k == e.ENTER) {
		e.stopEvent();
		if (e.shiftKey) {
			newCell = g.walkCells(ed.row, ed.col - 1, -1, this.acceptsNav, this);
		} else {
			newCell = g.walkCells(ed.row, ed.col + 1, 1, this.acceptsNav, this);
		}
	} else if (k == e.TAB) {
		e.stopEvent();
		if (e.shiftKey) {
			newCell = g.walkCells(ed.row - 1, ed.col, -1, this.acceptsNav, this);
		} else {
			newCell = g.walkCells(ed.row + 1, ed.col, 1, this.acceptsNav, this);
		}
		if (ed.col == 1) {
			if (e.shiftKey) {
				newCell = g.walkCells(ed.row, ed.col + 1, -1, this.acceptsNav, this);
			} else {
				newCell = g.walkCells(ed.row, ed.col + 1, 1, this.acceptsNav, this);
			}
		}
	} else if (k == e.ESC) {
	}
	if (newCell) {
		g.startEditing(newCell[0], newCell[1]);
	}
};

// 若编辑到最后一行,新增一行
editToEndRow = function(grid, ed) {
	var storeCount = grid.getStore().getCount();
	if (ed.row == Number(storeCount - 1)) {
		addRecord(grid);
	} else {
		event.keyCode = 9;
	}
};

// 每编辑完一个单元格，会发送一个Ajax请求，保存或更新数据
saveOrUpdate = function(grid, ed, url) {
	var attribute = grid.getColumnModel().getDataIndex(ed.col);
	var value = grid.getStore().getAt(ed.row).get(attribute);
	var flag = grid.getStore().getAt(ed.row).get('id');

	Ext.Ajax.request({
				url : url,
				method : 'post',
				params : {
					attribute : attribute,
					value : value,
					flag : flag
				},
				success : function(response, options) {
					var result = Ext.util.JSON.decode(response.responseText);
					if (result.success == true) {
						var responseFlag = result.flag;
						if (responseFlag != 'update') {
							grid.getStore().getAt(ed.row).set('id', responseFlag);
						}
						grid.getStore().commitChanges();
					} else {
						Ext.Msg.alert('错误提示', '保存没有成功，请重新编辑');
					}
				},
				failure : function() {
					Ext.Ghost.msg('操作提示：', '网络出现故障,建议您重新点击保存按钮进行保存');
				}
			});
};

// 通过key 和 value 查找store中的记录，并返回该记录在store中的索引
findIndex = function(store, key, value) {
	var i = 0;
	store.each(function(rec) {
				if (rec.get(key) == value) {
					return false;
				}
				i++;
			});
	return i
};

// Excel导入功能
function importFromExcel(store1, store2) {
	var panelForExcel = new Ext.form.FormPanel({
				frame : true,
				region : 'center',
				labelWidth : 60,
				buttonAlign : 'center',
				items : [{
							xtype : 'textfield',
							width : '90%',
							id : 'filePath',
							fieldLabel : '本地上传',
							inputType : 'file',
							buttonText : '浏览...'
						}],
				buttons : [{
							text : '导入',
							iconCls : 'icon-upload',
							handler : function() {
								var path = Ext.getCmp('filePath').getValue();
								alert(path);
								if (null == path || ' ' == path || '' == path) {
									Ext.Msg.alert('操作提示', '请选择您要上传的Excel文件');
									return;
								} else {
									Ext.Msg.wait('正在导入，请稍后', '');
									Ext.Ajax.request({
										url : 'importFromExcel_people.action',
										method : 'post',
										params : {
											path : path
										},
										success : function(response, options) {
											var result = Ext.util.JSON.decode(response.responseText);
											var success = result.success;
											alert('success:' + success);
											if(success) {
												Ext.Msg.hide();
												panelForExcel.destroy();
												winForExcel.destroy();
												winForExcel = null;
												Ext.Msg.alert('温馨提示', '您已成功导入，请点击<font color="red">确定</font>按钮进行刷新', function() {
													window.location .href =window.location .href;
												});
											}else {
												Ext.Msg.hide()
												panelForExcel.destroy();
												winForExcel.destroy();
												winForExcel = null;
												Ext.Msg.alert('错误提示', '导入失败，请重新导入');
											}
										},
										failure : function(response, options) {}
									});
								}
							}
						}, {
							text : '关闭',
							iconCls : 'icon-close',
							handler : function() {
								panelForExcel.destroy();
								winForExcel.destroy();
								winForExcel = null;
							}
						}]
			});
	if (winForExcel == null) {
		winForExcel = new Ext.Window({
					title : 'Excel文件导入',
					iconCls : 'icon-upload-local',
					width : 400,
					height : 120,
					closable : false,
					layout : 'border',
					closeAction : 'destroy',
					items : panelForExcel
				});
		winForExcel.show();
	} else {
		winForExcel.show();
	}
};

function getPath(obj) {
	alert('获取真实路径');
	if (obj) {
		if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
			obj.select();
			return document.selection.createRange().text;
		} else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
			if (obj.files) {
				return obj.files.item(0).getAsDataURL();
			}
			return obj.value;
		}
		return obj.value;
	}
};