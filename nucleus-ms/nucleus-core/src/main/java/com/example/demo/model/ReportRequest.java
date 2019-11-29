package com.example.demo.model;

public class ReportRequest {
	private int user_id;
	private String report_name;
	private String query;
	private Connection connection; // connection id

	public ReportRequest() {
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
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

	@Override
	public String toString() {
		return "ReportRequest [user id=" + user_id + " report_name=" + report_name + ", query=" + query
				+ ", connection=" + connection + "]";
	}

	public Connection getConnection() {
		return connection;
	}

	public void setConnection(Connection connection) {
		this.connection = connection;
	}

}
