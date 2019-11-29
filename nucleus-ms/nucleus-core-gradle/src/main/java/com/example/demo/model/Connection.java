package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "connection")
@NoArgsConstructor @ToString @EqualsAndHashCode
public class Connection {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	@Column(name = "data_source_name")
	String data_source_name;
	@Column(name = "database_name")
	String database_name;
	String url;
	String username;
	String password;
	String type;
	public String getType() {
		return type;
	}
	public String getData_source_name() {
		// TODO Auto-generated method stub
		return data_source_name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDatabase_name() {
		return database_name;
	}
	public void setDatabase_name(String database_name) {
		this.database_name = database_name;
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
	public void setData_source_name(String data_source_name) {
		this.data_source_name = data_source_name;
	}
	public void setType(String type) {
		this.type = type;
	}
}
