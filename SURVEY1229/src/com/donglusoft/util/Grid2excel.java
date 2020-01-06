package com.donglusoft.util;

import java.io.IOException;
import java.util.List;

import org.apache.struts2.ServletActionContext;

/**
 * @author long E-mail: liguilonglove@126.com
 * @version 创建时间：2010-8-16 上午10:34:08 类说明 导出excel的类
 */
public class Grid2excel {
	/**
	 * 
	 * @param columnString
	 *            二维数组 传入的列信息 需要的格式如下 String [][] columnString = { //
	 *            {"classRoom.people.name","姓名","string"}, //
	 *            {"classRoom.people.ageInteger","年龄","number"}, //
	 *            {"name","学校","string"} // };
	 * @param entities
	 *            导出数据的List 把要导出的数据放入List赋给该参数 结果：把服务器端生成的excel的路径 放到 response里
	 *            key为“downloadPath”
	 */
	public void excelGenerate(String[][] columnString, List entities) {
		int columnsNum = columnString.length;
		Column[] columns = new Column[columnsNum];
		for (int i = 0; i < columnsNum; i++) {
			columns[i] = new Column();
			for (int j = 0; j < 3; j++) {
				columns[i].setName(columnString[i][0]);
				columns[i].setHeader(columnString[i][1]);
				columns[i].setType(columnString[i][2]);
			}
		}
		FileNameGenerate fileNameGenerate = new FileNameGenerate();
		String fileName = fileNameGenerate.generate();
		ExcelGeneratorImpl excelGeneratorImpl = new ExcelGeneratorImpl();
		String downloadPath = excelGeneratorImpl.generateExcel(entities, columns, fileName);
		downloadPath = "{success:true,downloadPath:'" + downloadPath + "'}";
		try {
			ServletActionContext.getResponse().setCharacterEncoding("utf-8");
			ServletActionContext.getResponse().getWriter().print(downloadPath);
			ServletActionContext.getResponse().getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
