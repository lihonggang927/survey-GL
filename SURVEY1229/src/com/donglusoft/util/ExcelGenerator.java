package com.donglusoft.util;

import java.util.List;

public interface ExcelGenerator {
	public String generateExcel(List<?> entities, Column[] columns, String fileName);
}
