package com.example.demo.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "User")
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
	private String username;
	private String password;
	@OneToMany
	@JoinColumn(name="user_id")
	private List<Connection> connection;
//	@OneToOne(cascade = CascadeType.ALL)
//	@JoinTable(name="USER_ROLES",joinColumns = {@JoinColumn(name="USER_ID")},inverseJoinColumns = {@JoinColumn(name="ROLE_ID")})
//	Role role;

    public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public List<Connection> getConnection() {
		return connection;
	}
	public void setConnection(List<Connection> connection) {
		this.connection = connection;
	}
	private String role;
	public int getId() {
		return user_id;
	}
	public void setId(int id) {
		this.user_id = id;
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
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
