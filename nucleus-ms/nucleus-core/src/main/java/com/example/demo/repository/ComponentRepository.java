package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Component;
import com.example.demo.model.Dashboard;

public interface ComponentRepository extends JpaRepository<Component, Integer>{
	@Transactional
	@Modifying
	@Query("delete from Component c where c.dashboard=?1")
	public void deleteByDashboard(Dashboard dashboard);
}
