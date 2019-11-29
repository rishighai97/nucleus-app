package com.example.config;

import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.example.web.Request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class SqlConnectionFactory {
	private String driverClassName;
	private String url;
	private String username;
	private String password; 
	public void setConnection(Request request) {
//		try {
//			Class.forName(request.getDriver_class_name());
//		} catch (ClassNotFoundException e) {
//			e.printStackTrace();
//		}
		this.url = request.getUrl();
		this.username = request.getUsername();
		this.password = request.getPassword();
	}
	
	public Connection getConnection() {
		try {
			return DriverManager.getConnection(url, username, password);
		} catch (SQLException e) {
			return null;
		}
	}
	
	
	public String getDriverClassName() {
		return driverClassName;
	}

	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
