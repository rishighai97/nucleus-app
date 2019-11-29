package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Dashboard;


public interface DashboardRepository extends JpaRepository<Dashboard, Integer> {

	@Query("from Dashboard d where d.dashboard_name=?1")
	Dashboard findByName(String name);
	
	
}
