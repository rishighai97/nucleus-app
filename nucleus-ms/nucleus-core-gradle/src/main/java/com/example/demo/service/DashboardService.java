package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Dashboard;
import com.example.demo.model.DashboardRequest;
import com.example.demo.model.User;


public interface DashboardService {
	public List<Dashboard> getAllDashboards(int user_id);
	public Dashboard saveDashboardDetails(DashboardRequest request);

}
