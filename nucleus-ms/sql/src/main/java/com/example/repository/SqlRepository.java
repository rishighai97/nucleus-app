package com.example.repository;

import java.util.List;
import java.util.Map;

import com.example.web.Request;

public interface SqlRepository {
	public boolean checkConnection(Request request);
	public List<Map<String,Object>> getData(String query,Request request) ;
	public Map<String,List<String>> getTables(Request request);
}
