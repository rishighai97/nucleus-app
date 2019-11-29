package com.example.demo.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="component")
public class Component {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="component_id")
	private int component_id;
	@OneToOne
	@JoinColumn(name="id")
	private Connection connection;
	private String chart_type;
	private String x_label;
	private String query;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="dashboard_id")
	private Dashboard dashboard;
	public Dashboard getDashboard() {
		return dashboard;
	}
	public void setDashboard(Dashboard dashboard) {
		this.dashboard = dashboard;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public int getComponent_id() {
		return component_id;
	}
	public void setComponent_id(int component_id) {
		this.component_id = component_id;
	}
	public Connection getConnection() {
		return connection;
	}
	public void setConnection(Connection connection) {
		this.connection = connection;
	}
	public String getChart_type() {
		return chart_type;
	}
	public void setChart_type(String chart_type) {
		this.chart_type = chart_type;
	}
	public String getX_label() {
		return x_label;
	}
	public void setX_label(String x_label) {
		this.x_label = x_label;
	}
	public Component() {
		super();
	}
	@Override
	public String toString() {
		return "Component [component_id=" + component_id + ", connection=" + connection + ", chart_type=" + chart_type
				+ ", x_label=" + x_label + "]";
	}
	
	
	
}
