package com.example.service;

import java.util.List;
import java.util.Map;

import com.example.model.Data;
import com.example.web.Request;

public interface SqlService {
	public boolean testConnection(Request request);
	public List<Map<String,Object>>  getQueryResults(String query, Request request);
	public List<Data> getDashboardData(List<Map<String, Object>> data);
}
