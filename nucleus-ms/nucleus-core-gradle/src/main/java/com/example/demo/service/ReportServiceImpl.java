package com.example.demo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Report;
import com.example.demo.model.ReportRequest;
import com.example.demo.model.SharedResource;
import com.example.demo.model.User;
import com.example.demo.repository.ConnectionRepository;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.SharedResourceRepository;
import com.example.demo.repository.UserRepository;

@Service
public class ReportServiceImpl implements ReportService{

	@Autowired
	private ReportRepository reportRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ConnectionRepository connectionRepository;
	
	@Autowired
	private SharedResourceRepository sharedResourceRepository;
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	@Transactional
	public Report saveReportDetails(ReportRequest request) {
		Report report = new  Report();
		report.setReport_name(request.getReport_name());
		report.setQuery(request.getQuery());
		System.out.println(request.getConnection());
		report.setConnection(connectionRepository.findById(request.getConnection().getId()).get());
		
		Report savedReport=reportRepository.save(report);
		System.out.println(savedReport);
		SharedResource sharedResource = new SharedResource();
		sharedResource.setPrivileges("edit");
		sharedResource.setReport(report);
		sharedResource.setUser(userRepository.findById(request.getUser_id()).get());
		SharedResource savedSharedResource = sharedResourceRepository.save(sharedResource);
		System.out.println(savedSharedResource);
		return report;
	}

	@Override
	@Transactional
	public List<Report> getAllReports(int user_id) {
		User user = userRepo.findById(user_id).get();
		return sharedResourceRepository.findReportsByUser(user);
	}

}
