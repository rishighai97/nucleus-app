package com.example.demo.repository;

import java.lang.annotation.Native;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Dashboard;
import com.example.demo.model.Report;
import com.example.demo.model.SharedResource;
import com.example.demo.model.User;

public interface SharedResourceRepository  extends JpaRepository<SharedResource,Integer>{
	@Query("select report from SharedResource s where s.user=?1")
	public List<Report> findReportsByUser(User user);
	
	@Query("from SharedResource s where s.dashboard=?1 and user=?2")
	public SharedResource findByDashboardAndUser(Dashboard dashboard,User user);
	
	@Query("select dashboard from SharedResource s where s.user=?1")
	public List<Dashboard> findDashboardByUser(User user);	
	
	
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("Delete from SharedResource s where s.user=?1 and s.report=?2")
	public void deleteByUserAndReport(User user,Report report);
	

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("Delete from SharedResource s where s.user=?1 and s.dashboard=?2")
	public void deleteByUserAndDashboard(User user,Dashboard dashboard);
	
	@Query("from SharedResource s where s.dashboard=?1")
	public List<SharedResource> findByDashboards(Dashboard dashboard);
	
	@Query("from SharedResource s where s.report=?1")
	public List<SharedResource> findByReports(Report report);
}
