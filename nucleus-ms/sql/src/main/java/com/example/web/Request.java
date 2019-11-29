package com.example.web;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor @ToString
public class Request{
	private String data_source_name;
	private String database_name;
	private String type;
	private String url;
	private String username;
	private String password;
	private String query;
	private String driver_class_name;	
	
	public String getData_source_name() {
		return data_source_name;
	}
	public void setData_source_name(String data_source_name) {
		this.data_source_name = data_source_name;
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
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDriver_class_name() {
		return driver_class_name;
	}
	public void setDriver_class_name(String driver_class_name) {
		this.driver_class_name = driver_class_name;
	}
	public String getDatabase_name() {
		return database_name;
	}
	public void setDatabase_name(String database_name) {
		this.database_name = database_name;
	}

	
}
