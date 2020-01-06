function createTable() {
	var table = new Ext.Panel({
				title : '测评',
				layout : 'table',
				width : 770,
				autoHeight : true,
				autoScroll : true,
				renderTo : Ext.getBody(),
				defaults : {
					// applied to each contained panel
					bodyStyle : 'padding:10px',
					textAlign : 'center',
					border : true
				},
				layoutConfig : {
					// The total column count must be specified here
					htmlAlign : 'center',
					columns : 8

				},
				bodyStyle : 'padding:10px 0px 10px 5px',
				items : [{
							html : '课程名称',
							height : 30,
							width : 90
						},

						{
							html : '<h2 align="center" >语文</h2>',
							height : 30,
							width : 330
						},

						{
							html : '教师名称',
							height : 30,
							width : 90,
							colspan : 1
						},

						{
							html : '<h2 align="center" >aaa</h2>',
							height : 30,
							width : 250,
							colspan : 5
						},
						// **************************************** one
						// *****************************************
						{
							html : '<h2 align="center" style="font-size:20;">评测内容</h2>',
							height : 60,
							width : 420,
							colspan : 2,
							rowspan : 2
						},

						{
							html : '权值',
							height : 60,
							width : 90,
							rowspan : 2
						},

						{
							html : '<h2 align="center" >请选择相应的分值</h2>',
							height : 30,
							width : 250,
							colspan : 6
						},

						{
							html : '很好',
							height : 30,
							width : 50
						},

						{
							html : '好',
							height : 30,
							width : 50
						},

						{
							html : '一般',
							height : 30,
							width : 50
						},

						{
							html : '差',
							height : 30,
							width : 50
						},

						{
							html : '很差',
							height : 30,
							width : 50
						},

						// *************************************** two
						// *****************************************
						{
							html : '教学态度',
							height : 50,
							width : 90
						},

						{
							html : '教态大方，精神饱满，讲课认真',
							height : 50,
							width : 330
						},

						{
							html : '2',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						},

						// *************************************** three
						// *****************************************

						{
							html : '<span align="center"> <br/><br/><br/><br/><br/>教学内容</span>',
							height : 200,
							width : 90,
							rowspan : 4
						},

						{
							html : '教学目的明确，实际教学内容与之相符',
							height : 50,
							width : 330
						},

						{
							html : '1',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}, {
							html : '教学内容充实，组织得当，教学进度适宜',
							height : 50,
							width : 330
						},

						{
							html : '2',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}, {
							html : '重点突出，难点处理恰当',
							height : 50,
							width : 330
						},

						{
							html : '2',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}, {
							html : '能够介绍科学领域的新进展和发展趋势，扩大学生的知识面',
							height : 50,
							width : 330
						},

						{
							html : '1',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						},
						// *****************************************************
						// four*************************
						{
							html : '<span align="center"> <br/><br/><br/><br/><br/>教学方法</span>',
							height : 200,
							width : 90,
							rowspan : 4
						},

						{
							html : '善于引导启发，鼓励学生发表不同的观点和提出疑问',
							height : 50,
							width : 330
						},

						{
							html : '2',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}, {
							html : '能联系实际，使用恰当的例证进行讲解；根据课程需要进行示范',
							height : 50,
							width : 330
						},

						{
							html : '2',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}, {
							html : '表达（口头、板书或课件）清楚、准确、教学手段运用恰当',
							height : 50,
							width : 330
						},

						{
							html : '1',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}, {
							html : '注重学生创新意识的培养',
							height : 50,
							width : 330
						},

						{
							html : '1',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						},

						// *********************************************** five
						// ********************************

						{
							html : '<span align="center"> <br/><br/><br/><br/>教学效果</span>',
							height : 150,
							width : 90,
							rowspan : 3
						},

						{
							html : '老师的教学，提高了我的学习兴趣',
							height : 50,
							width : 330
						},

						{
							html : '2',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}, {
							html : '通过老师的教学，我能够领会掌握所学知识',
							height : 50,
							width : 330
						},

						{
							html : '2',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}, {
							html : '通过老师的教学，我的分析问题、解决问题的能力得到了提高',
							height : 50,
							width : 330
						},

						{
							html : '2',
							height : 50,
							width : 90
						},

						{
							html : 'A',
							height : 50,
							width : 50
						},

						{
							html : 'B',
							height : 50,
							width : 50
						},

						{
							html : 'C',
							height : 50,
							width : 50
						},

						{
							html : 'D',
							height : 50,
							width : 50
						},

						{
							html : 'E',
							height : 50,
							width : 50
						}

				]
			});
	return table;
};

function createTable1() {
	var table = new Ext.Panel({
				layout : 'table',
				autoWidth : true,
				region : 'center',
				autoHeight : true,
				autoScroll : true,
				defaults : {
					//bodyStyle : 'padding:10px',
					textAlign : 'center',
					border : true
				},
				layoutConfig : {
					htmlAlign : 'center',
					columns : 3
				},
				//bodyStyle : 'padding:10px 0px 10px 5px',
				items : [{
							html : '姓名',
							height : 50,
							width : 90,
							colspan : 1,
							rowspan : 2
						}, {
							html : '职务',
							height : 50,
							width : 90,
							colspan : 1,
							rowspan : 2
						}, {
							html : '单位',
							height : 50,
							width : 90,
							colspan : 1,
							rowspan : 2
						}]
			});
	return table;
};

function createTable2() {
	var table = new Ext.Panel({
				layout : 'table',
				width : 770,
				region : 'center',
				autoHeight : true,
				autoScroll : true,
				defaults : {
					//bodyStyle : 'padding:10px',
					textAlign : 'center',
					border : true
				},
				layoutConfig : {
					htmlAlign : 'center',
					columns : 4

				},
				//bodyStyle : 'padding:10px 0px 10px 5px',
				items : [{
							html : '执行能力',
							height : 25,
							colspan : 4,
							rowspan : 1
						}, {
							html : '优',
							height : 25,
							width : 90,
							colspan : 1,
							rowspan : 1
						}, {
							html : '良',
							height : 25,
							width : 90,
							colspan : 1,
							rowspan : 1
						}, {
							html : '中',
							height : 25,
							width : 90,
							colspan : 1,
							rowspan : 1
						}, {
							html : '差',
							height : 25,
							width : 90,
							colspan : 1,
							rowspan : 1
						}]
			});
	return table;
}