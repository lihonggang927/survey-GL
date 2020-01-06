package com.donglusoft.util;

import java.io.File;
import java.lang.reflect.Method;
import java.util.List;

import com.sun.accessibility.internal.resources.accessibility;
import com.sun.org.apache.bcel.internal.classfile.Field;
import com.sun.org.apache.bcel.internal.generic.NEW;

import jxl.Workbook;
import jxl.format.Colour;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class ExcelGeneratorImpl implements ExcelGenerator {
	/**
	 * @param entities
	 *            要导出的数据
	 * @param columns
	 *            列信息
	 * @param fileName
	 *            服务器端文件名
	 * @return downloadPathString 客户端下载所需 地址
	 * 
	 */
	private String fieldNameCurrent;
	private String fieldNameLeft;

	public String generateExcel(List<?> entities, Column[] columns, String fileName) {
		// //// System.out.println("excel gene impl:"+entities.getClass());
		String path0 = "";
		String path = "";
		String downloadPathString = "";
		try {
			path0 = ExcelGeneratorImpl.class.getResource("/").getPath();
			 System.out.println("path0: " + path0);
			path = path0.replace("WEB-INF/classes/", "") + "excel/" + fileName + ".xls";
			String filePath = path0.replaceAll("WEB-INF/classes/", "") + "excel";
			// System.out.println("path: " + path);
			// CreatePath(path);
			// //// System.out.println("path:"+path);
			path = path.replaceAll("\\%20", "\040");
			filePath = filePath.replaceAll("\\%20", "\040");
			// //// System.out.println("服务器端url："+path);
			// //// System.out.println("filePath:"+filePath);
			CreatePath(filePath);
			downloadPathString = path;
			int index = downloadPathString.lastIndexOf("/survey/");
			// //// System.out.println("index:"+index);
			downloadPathString = downloadPathString.substring(index);
			//// System.out.println("downloadPathString1:"+downloadPathString);
			downloadPathString = downloadPathString.substring(7);
			//// System.out.println("downloadPathString2:"+downloadPathString);
			File file = new File(path);
			if (file.exists()) {
				file.delete();
			}

			WritableWorkbook workbook = Workbook.createWorkbook(new File(path));
			WritableSheet sheet = workbook.createSheet("First sheet", 0);

			// header
			for (int col = 0; col < columns.length; col++) {
				Label labelHeader = new Label(col, 0, columns[col].getHeader());
				sheet.addCell(labelHeader);
			}

			// body
			for (int row = 1; row <= entities.size(); row++) {
				for (int col = 0; col < columns.length; col++) {

					String columnName = columns[col].getName();
					// //// System.out.println("......................ss"+entities.getClass());
					// //// System.out.println("......................ss"+entities.get(row
					// - 1).getClass());
					// if()
					Object columnValue = getFieldValue(entities.get(row - 1), columnName);
					if (null == columnValue) {
						columnValue = new String(" ");
					}
					WritableCell cell = null;
					if (columns[col].getType().equals("string")) {
						// 判断columnValue 是否为空
						if (null == columnValue || columnValue.toString().isEmpty()) {
							columnValue = new String(" ");
						}
						cell = new Label(col, row, columnValue.toString());
					} else {
						// 若columnValue 为空，则其值设为0
						if (null == columnValue || columnValue.toString().trim().isEmpty()) {
							cell = new jxl.write.Number(col, row, new Double(0));
						} else {
							cell = new jxl.write.Number(col, row, Double.valueOf(columnValue.toString()));
						}
					}

					sheet.addCell(cell);
				}
			}

			// sum此方法未使用
			for (int col = 0; col < columns.length; col++) {

				Column column = columns[col];
				if (column.isNeedSum() && column.getType().equals("number")) {

					Double columnSum = 0.0;
					for (int row = 1; row <= entities.size(); row++) {
						Object fieldValue = getFieldValue(entities.get(row - 1), column.getName());
						columnSum += Double.valueOf(fieldValue.toString());
					}

					WritableFont font = new WritableFont(WritableFont.ARIAL);
					font.setColour(Colour.RED);
					font.setBoldStyle(WritableFont.BOLD);

					jxl.write.Number number = new jxl.write.Number(col, entities.size() + 1, columnSum, new WritableCellFormat(font));
					sheet.addCell(number);
				}
			}

			workbook.write();
			workbook.close();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		// //// System.out.println("客户端下载地址："+downloadPathString);
		System.out.println("downloadPathString:" + downloadPathString);
		return downloadPathString;
	}

	/**
	 * 传入的字段名含有“.”时，解析出字段值
	 * 
	 * @param obj
	 *            传入的对象
	 * @param fieldName
	 *            属性名 通过属性名找到get方法 格式：people.name
	 * @return 该对象该属性的值
	 * @throws Exception
	 *             无法得到 该对象该属性的值
	 */
	public Object getFieldValue(Object obj, String fieldName) throws Exception {
		// //// System.out.println("fieldName:->"+fieldName);
		// //// System.out.println("fieldName:2->"+fieldName);
		// 若对象为空 则返回空
		if (null == obj) {
			// //// System.out.println("null");
			return null;
		}
		// //// System.out.println();
		fieldName = fieldName.replaceAll("\\.", "#");
		if (fieldName.contains("#")) {
			int index = fieldName.indexOf("#");
			if (index > 0) {
				fieldNameCurrent = new String(fieldName.substring(0, index));
				fieldNameLeft = new String(fieldName.substring(index + 1));
				// //// System.out.println("fieldNameCurrent:" + fieldNameCurrent);
				// //// System.out.println("fieldNameLeft:" + fieldNameLeft);
				String getMethodName = "get" + fieldNameCurrent.substring(0, 1).toUpperCase() + fieldNameCurrent.substring(1);
				Method getMethod = obj.getClass().getMethod(getMethodName);
				obj = getMethod.invoke(obj);
				// //// System.out.println("、、、、、、、、、、："+getMethod);
				// //// System.out.println("........"+obj.getClass());
				obj = getFieldValue(obj, fieldNameLeft);
			} else {
				obj = getFieldValue2(obj, fieldNameLeft);
			}
			return obj;
		} else {
			return getFieldValue2(obj, fieldName);
		}
	}

	/**
	 * 传入的字段名没有“.”时，解析出字段值
	 * 
	 * @param obj
	 *            传入的对象
	 * @param fieldName
	 *            属性名 通过属性名找到get方法 格式：name
	 * @return 该对象该属性的值
	 * @throws Exception
	 *             无法得到 该对象该属性的值
	 */
	private Object getFieldValue2(Object obj, String fieldName) throws Exception {
		// //// System.out.println(obj + "*********" + fieldName);
		String getMethodName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
		// //// System.out.println("getMethodname:::"+getMethodName);
		// //// System.out.println("getClass:::"+obj.getClass());
		Method getMethod = obj.getClass().getMethod(getMethodName);

		return getMethod.invoke(obj);
	}

	private static boolean CreatePath(String path) throws Exception {
		File dirFile = null;
		try {
			dirFile = new File(path);
			if (!(dirFile.exists()) && !(dirFile.isDirectory())) {
				boolean creadok = dirFile.mkdirs();
				if (creadok) {
					//// System.out.println(" ok:创建文件夹成功！ ");
				} else {
					//// System.out.println(" err:创建文件夹失败！ " + path);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			//// System.out.println(e);
			return false;
		}
		return true;
	}
}