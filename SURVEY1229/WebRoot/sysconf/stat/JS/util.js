/**
 * @param {}
 *            row
 * @param {}
 *            col
 * @param {}
 *            fd
 * @return {String}
 */
function checkInput(row, col, fd, condition) {
	var surveyStandardIndex;
	var surveyStandardId;
	var peopleId;
	var peopleName;
	var peopleUnit;
	var peoplePosition;
	var score;
	var rowFlag;
	if (condition == 'prev') {
		if (row == 0) {
			return 'true';
		}
		rowFlag = row - 1;
	} else if (condition == 'all') {
		rowFlag = 0;
	}
	for (var i = rowFlag; i < row; i++) {
		peopleId = surveyBottomGrid.getStore().getAt(i).get('id');// 获取干部人员信息的id
		peopleName = surveyBottomGrid.getStore().getAt(i).get('name');// 获取干部人员信息的name
		peopleUnit = surveyBottomGrid.getStore().getAt(i).get('unit.id');// 获取干部人员信息的unit.id
		peoplePosition = surveyBottomGrid.getStore().getAt(i).get('position');// 获取干部人员信息的position
		var flag = 0;
		// j从第六个开始
		for (var j = 6; j < fd.length; j++) {
			surveyStandardIndex = surveyBottomGrid.getColumnModel().getDataIndex(j);// 获取第j列的索引，该索引包括（测评标准信息的id和成绩）
			surveyStandardId = surveyStandardIndex.substring(0, surveyStandardIndex.length - 1);// 截取字符串，获得第j列测评标准信息的id
			score = surveyStandardIndex.substring(surveyStandardIndex.length - 1);
			if (surveyBottomGrid.getStore().getAt(i).get(surveyStandardId + 'Y') == '' && surveyBottomGrid.getStore().getAt(i).get(surveyStandardId + 'L') == ''
					&& surveyBottomGrid.getStore().getAt(i).get(surveyStandardId + 'Z') == '' && surveyBottomGrid.getStore().getAt(i).get(surveyStandardId + 'C') == '') {
				return peopleId + ',' + peopleName + ',' + peopleUnit + ',' + peoplePosition + ',' + surveyStandardId;
			}
		}
	}
	return 'true';
};

function findDisplayName(id, store) {
	var displayName;
	store.each(function(rec) {
				if (rec.get('id') != '' && rec.get('id') == id) {
					displayName = rec.get('name');
				}
			});
	return displayName;
};

function findScore(peopleId, surveyStandardId, store) {
	var score = 'false';
	store.each(function(rec) {
				if (rec.get('people') == peopleId && rec.get('surveyStandard') == surveyStandardId) {
					score = rec.get('score');
				}
			});
	return score;
}