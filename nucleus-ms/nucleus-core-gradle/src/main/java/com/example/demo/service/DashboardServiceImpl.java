package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Component;
import com.example.demo.model.Dashboard;
import com.example.demo.model.DashboardRequest;
import com.example.demo.model.SharedResource;
import com.example.demo.model.User;
import com.example.demo.repository.ComponentRepository;
import com.example.demo.repository.DashboardRepository;
import com.example.demo.repository.SharedResourceRepository;
import com.example.demo.repository.UserRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

	
	@Autowired
	DashboardRepository dash_repository;
	@Autowired
	ComponentRepository component_repository;
	@Autowired
	SharedResourceRepository shared_repository;
	@Autowired
	UserRepository user_repository;
	@Override
	public List<Dashboard> getAllDashboards(int user_id) {
		// TODO Auto-generated method stub
		User user = user_repository.findById(user_id).get();
		return shared_repository.findDashboardByUser(user);
	}

	@Override
	public Dashboard saveDashboardDetails(DashboardRequest request) {
		// TODO Auto-generated method stub
		Component component=new Component();
		component.setChart_type(request.getChart_type());
		component.setConnection(request.getConnection());
		component.setX_label(request.getX_label());
		component.setQuery(request.getQuery());
		Component savedComponent=component_repository.save(component);
		if(dash_repository.findByName(request.getDashboard_name())!=null)
		{
			System.out.println("old one");
			Dashboard alreadyPresentDashboard=dash_repository.findByName(request.getDashboard_name());
			System.out.println(alreadyPresentDashboard);
			System.out.println(request.getUser_id());
			SharedResource sharedResource=shared_repository.findByDashboardAndUser(alreadyPresentDashboard,user_repository.findById(request.getUser_id()).get());
			alreadyPresentDashboard.adder(savedComponent);
			Dashboard dashboard=dash_repository.save(alreadyPresentDashboard);
			System.out.println(sharedResource);
			sharedResource.setDashboard(dashboard);
			shared_repository.save(sharedResource);
			return alreadyPresentDashboard;
		}
		else {
			System.out.println("new one");
			Dashboard newDashboard=new Dashboard();
			newDashboard.setDashboard_name(request.getDashboard_name());
			newDashboard.adder(savedComponent);
			dash_repository.save(newDashboard);
			SharedResource sharedResource=new SharedResource();
			System.out.println(request.getUser_id());
			System.out.println("new "+newDashboard);
			sharedResource.setDashboard(newDashboard);
			sharedResource.setPrivileges("edit");
			sharedResource.setUser(user_repository.findById(request.getUser_id()).get());
			shared_repository.save(sharedResource);
			return newDashboard;
		}
		
		
	}


	
	
}
