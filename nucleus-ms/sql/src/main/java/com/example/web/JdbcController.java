package com.example.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Data;
import com.example.repository.SqlRepository;
import com.example.service.SqlService;

//REQUIRES CONNECTION + QUERY
@CrossOrigin(origins= {"*"})
@RestController
@RequestMapping(value="/sql/v1")
public class JdbcController {
	
	@Autowired
	private SqlService service;
	
	@Autowired
	private SqlRepository repository;

	
	
	
	@PostMapping(value = "/test_connection")
	public String testConnection(@RequestBody Request request) {
		return repository.checkConnection(request)?"true":"false";	
	}

	@PostMapping(value="/execute_query")
	public List<Map<String,Object>>  getData(@RequestBody Request request) {
		List<Map<String,Object>> result = repository.getData(request.getQuery(),request);
		return result;
	}
	@PostMapping(value="/dashboard/execute_query")
	public List<Data> getDashboardData(@RequestBody Request request) {
		List<Map<String,Object>> result = repository.getData(request.getQuery(),request);
		return service.getDashboardData(result);
	}
	
	@PostMapping(value="/get_tables")
	public Map<String,List<String>> getTableNames(@RequestBody Request request){
		return repository.getTables(request);
	}
	
}
