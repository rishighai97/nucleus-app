package com.example.service;

import java.util.List;
import java.util.Map;

import com.example.model.Data;

public interface JsonService {
	public List<Data> getDashboardData(List<Map<String, Object>> data);
}
