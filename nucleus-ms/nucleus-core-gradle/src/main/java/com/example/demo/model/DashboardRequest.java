package com.example.demo.model;

public class DashboardRequest {

	private int user_id;
	private String dashboard_name;
	private String query;
	private Connection connection;
	private String x_label;
	private String chart_type;
	public String getX_label() {
		return x_label;
	}
	public void setX_label(String x_label) {
		this.x_label = x_label;
	}
	public String getChart_type() {
		return chart_type;
	}
	public void setChart_type(String chart_type) {
		this.chart_type = chart_type;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getDashboard_name() {
		return dashboard_name;
	}
	public void setDashboard_name(String dashboard_name) {
		this.dashboard_name = dashboard_name;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public Connection getConnection() {
		return connection;
	}
	public void setConnection(Connection connection) {
		this.connection = connection;
	} 
}
