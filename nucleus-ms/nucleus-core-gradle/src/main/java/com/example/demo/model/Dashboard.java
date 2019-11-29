package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="dashboard")
public class Dashboard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="dashboard_id")
	private int dashboard_id;
	@Column(name="dashboard_name")
	private String dashboard_name;
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "dashboard",orphanRemoval = true)
	private List<Component> components=new ArrayList<>();
	public int getDashboard_id() {
		return dashboard_id;
	}
	public void setDashboard_id(int dashboard_id) {
		this.dashboard_id = dashboard_id;
	}
	public String getDashboard_name() {
		return dashboard_name;
	}
	public void setDashboard_name(String dashboard_name) {
		this.dashboard_name = dashboard_name;
	}
	@Override
	public String toString() {
		return "Dashboard [dashboard_id=" + dashboard_id + ", dashboard_name=" + dashboard_name
				+ ", components=" + components + "]";
	}
	public List<Component> getComponents() {
		return components;
	}
	public void setComponents(List<Component> components) {
		this.components = components;
	}
	public Dashboard() {
		super();
	}
	public void adder(Component component) {
		this.components.add(component);
		component.setDashboard(this);
	}
	
	
	
}
