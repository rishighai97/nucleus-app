package com.example.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.example.model.Data;
import com.example.repository.JdbcSqlRepository;
import com.example.web.Request;

@Service
public class SqlServiceImpl implements SqlService{

	
	@Autowired
	@Qualifier("jdbc")
	JdbcSqlRepository repository;
	

	@Override
	public boolean testConnection(Request request) {
		return repository.checkConnection(request);
	}


	@Override
	public List<Map<String,Object>>  getQueryResults(String query, Request request) {
		return repository.getData(request.getQuery(),request);
	}

	@Override
	public List<Data> getDashboardData(List<Map<String, Object>> data) {
		System.out.println(data);
		Set<String> set = data.get(0).keySet();
		Map<String,List<Object>> map = new HashMap<>();
		
		set.forEach(str->{
			map.put(str, new ArrayList<>());
		});
		data.forEach(item->{
			set.forEach(label->{
				 map.get(label).add(item.get(label));
			});
		});
		
		List<Data>finals=new ArrayList<>();
		for(String l:set) {
			Data d=new Data();
			d.setData(map.get(l));
			d.setLabel(l);
			finals.add(d);
		}	
		
		return finals;
	}

}
