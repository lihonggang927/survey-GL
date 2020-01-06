package com.donglusoft.util;
/**
 * 
 * @author long
 *	
 */
public class Column {

	private String name;//通过name找到数据，对应pojo对象中的字段名
	private String header;//excel的列名
	private String type; // string, number
	private boolean needSum = false; // must be number

	public Column() {
	}

	public Column(String name, String header, String type) {
		super();
		this.name = name;
		this.header = header;
		this.type = type;
	}
	
	public Column(String name, String header, String type, boolean needSum) {
		super();
		this.name = name;
		this.header = header;
		this.type = type;
		this.needSum = needSum;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isNeedSum() {
		return needSum;
	}

	public void setNeedSum(boolean needSum) {
		this.needSum = needSum;
	}

}
