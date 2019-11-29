package com.example.demo.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Report {

	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int report_id;
	private String report_name;
	private String query;
	@OneToOne
	@JoinColumn(name = "id")
	private Connection connection;
	
	
	@Override
	public String toString() {
		return "Report [report_id=" + report_id + ", report_name=" + report_name + ", query=" + query + ", connection="
				+ connection + "]";
	}

	public Connection getConnection() {
		return connection;
	}

	public void setConnection(Connection connection) {
		this.connection = connection;
	}

	public int getReport_id() {
		return report_id;
	}
	public String getReport_name() {
		return report_name;
	}
	public void setReport_name(String report_name) {
		this.report_name = report_name;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public void setReport_id(int report_id) {
		this.report_id = report_id;
	}
	
	
	public Report() {
		super();
	}
	
	
}
