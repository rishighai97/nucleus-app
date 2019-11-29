package com.example.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.model.Data;

@Service
public class JsonServiceImpl implements JsonService{

	@Override
	public List<Data> getDashboardData(List<Map<String, Object>> data) {
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
