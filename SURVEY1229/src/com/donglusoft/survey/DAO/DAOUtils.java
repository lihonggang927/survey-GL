package com.donglusoft.survey.DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DAOUtils {
	private static final String DRIVERNAME = "com.mysql.jdbc.Driver";
	private static final String URL = "jdbc:mysql://202.194.48.103/survey?user=root&password=root&useUnicode=true&characterEncoding=utf-8";
	private static Connection conn = null;
	static {
		loadDriver();
	}

	private static void loadDriver() {
		try {
			Class.forName(DRIVERNAME);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static Connection getConnection() throws SQLException {
		if(null == conn)
			conn = DriverManager.getConnection(URL);
		return conn;
	}

	public static void close() {
		try {
			if (conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) throws SQLException
	{
		Connection conn = DAOUtils.getConnection();
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery("select * from user");
		if(rs.next())
		System.out.println(rs.getString(1));
	}
	
	public static void clearSurveyData() throws SQLException
	{
		Connection conn = DAOUtils.getConnection();
		Statement stmt = conn.createStatement();
		boolean b = stmt.execute("delete  from user_login");
		b = stmt.execute("delete  from user_info where username !='admin'");
		b = stmt.execute("delete  from survey_detail");
	//	b = stmt.execute("delete  from people");
		b = stmt.execute("delete  from logging_event");
		
		DAOUtils.close();
	}
}
