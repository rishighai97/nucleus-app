package com.example.demo.service;

import java.util.List;

import javax.transaction.Transactional;

import com.example.demo.model.Report;
import com.example.demo.model.ReportRequest;
import com.example.demo.model.User;

public interface ReportService {
	public Report saveReportDetails(ReportRequest reportRequest);
	public List<Report> getAllReports(int user_id);
}
