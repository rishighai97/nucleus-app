package com.example.web;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;




public class Request{
	private String data_source_name;
	private String database_name;
	private String type;
	private String url;
	private String username;
	private String password;
	private String query;
	private int id;	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
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

	public String getDatabase_name() {
		return database_name;
	}
	public void setDatabase_name(String database_name) {
		this.database_name = database_name;
	}

	
}
