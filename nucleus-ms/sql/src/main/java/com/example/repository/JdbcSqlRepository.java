package com.example.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.example.config.SqlConnectionFactory;
import com.example.web.Request;

@Repository

@Qualifier("jdbc")
public class JdbcSqlRepository implements SqlRepository {
	
	public boolean setDriver(Request request) {
		String driver="";
		if(request.getDatabase_name().equals("mysql")) driver="org.gjt.mm.mysql.Driver";
		if(request.getDatabase_name().equals("oracle")) driver="oracle.jdbc.driver.OracleDriver";
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<Map<String, Object>> getData(String query, Request request) {
		setDriver(request);
		List<Map<String, Object>> data = new ArrayList<>();
		Map<String, Object> temp;
		SqlConnectionFactory connectionFactory = new SqlConnectionFactory();
		connectionFactory.setConnection(request);
		Connection conn = connectionFactory.getConnection();
		String sql = query;
		PreparedStatement ps;
		try {
			ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			ResultSetMetaData metaData = rs.getMetaData();
			while (rs.next()) {
				temp = new HashMap<>();
				// map.put("id",)
				for (int i = 1; i <= metaData.getColumnCount(); i++) {
					temp.put(metaData.getColumnName(i), rs.getObject(i));
				}
				data.add(temp);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return data;
	}

	@Override
	public boolean checkConnection(Request request) {
		setDriver(request);
		SqlConnectionFactory connectionFactory = new SqlConnectionFactory();
		connectionFactory.setConnection(request);
		Connection conn = connectionFactory.getConnection();
		boolean result;
		if (conn == null)
			return false;
		try {
			conn.close();
		} catch (SQLException e) {
			//e.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings("finally")
	@Override
	public Map<String, List<String>> getTables(Request request) {
		
		// Key: table name value: list of columns
		setDriver(request);
		Map<String, List<String>> tables = new HashMap<String, List<String>>();

		// Get db_name from url
		String[] db = request.getUrl().split("/");
		String db_name = db[db.length - 1];
		String table_query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='"
				+ db_name + "'";

		// Query to get column names and store columns as value in map
		String column_query;
		System.out.println(request);
		SqlConnectionFactory connectionFactory = new SqlConnectionFactory();
		
		connectionFactory.setConnection(request);
		Connection conn = connectionFactory.getConnection();
		PreparedStatement ps;
		ResultSet rs_table;
		ResultSet rs_col;
		List<String> column_list = null;
		try {
			ps = conn.prepareStatement(table_query);
			rs_table = ps.executeQuery();
			while (rs_table.next()) {
				column_query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '"
						+ rs_table.getString("TABLE_NAME") + "'";
				ps = conn.prepareStatement(column_query);
				rs_col = ps.executeQuery();
				column_list = new ArrayList<>();
				while (rs_col.next()) {
					column_list.add(rs_col.getString("COLUMN_NAME"));
				}
				// System.out.println(column_list);
				tables.put(rs_table.getString("TABLE_NAME"), column_list);
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			System.out.println(tables);
			return tables;
		}
	}
}
