package com.example.demo.model;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class SharedResource {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int resource_id;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id")
	private User user;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="report_id")
	private Report report;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="dashboard_id")
	private Dashboard dashboard;
	
	String privileges;

	public int getResource_id() {
		return resource_id;
	}

	public void setResource_id(int resource_id) {
		this.resource_id = resource_id;
	}



	@Override
	public String toString() {
		return "SharedResource [resource_id=" + resource_id + ", user=" + user + ", report=" + report + ", dashboard="
				+ dashboard + ", privileges=" + privileges + "]";
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Report getReport() {
		return report;
	}

	public void setReport(Report report) {
		this.report = report;
	}

	public Dashboard getDashboard() {
		return dashboard;
	}

	public void setDashboard(Dashboard dashboard) {
		this.dashboard = dashboard;
	}

	public String getPrivileges() {
		return privileges;
	}

	public void setPrivileges(String privileges) {
		this.privileges = privileges;
	}


	public SharedResource() {
		super();
	}
	
//	@OneToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name="conn_id")
//	private Connection conn_id;
	
}
