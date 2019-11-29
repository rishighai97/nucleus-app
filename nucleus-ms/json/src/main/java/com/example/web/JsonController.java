package com.example.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.model.Data;
import com.example.service.JsonService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping(value="/rest/v1")
public class JsonController {

	RestTemplate rest=new RestTemplate();
	
	@Autowired
	private JsonService service;
	
	@PostMapping(value="/execute_query")
	public List<Map<String,Object>> getFromUrl(@RequestBody Request request) throws IOException{
		ObjectMapper mapper=new ObjectMapper();
		ResponseEntity<String> response=rest.getForEntity(request.getUrl(), String.class);
		List<Map<String,Object>>list=mapper.readValue(response.getBody(),new TypeReference<List<Map<String,Object>>>() {
		});
		return list;
	}
	
	@PostMapping(value="/dashboard/execute_query")
	public List<Data> getDashboardData(@RequestBody Request request) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper=new ObjectMapper();
		ResponseEntity<String> response=rest.getForEntity(request.getUrl(), String.class);
			List<Map<String,Object>>list=mapper.readValue(response.getBody(),new TypeReference<List<Map<String,Object>>>() {
		});
		return service.getDashboardData(list);
	}
	
}
//https://jsonplaceholder.typicode.com/posts