package com.example.demo.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.Connection;
import com.example.demo.model.User;
import com.example.demo.repository.ConnectionRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ConnectionService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@CrossOrigin(origins= {"*"})
@RestController
@RequestMapping(value = "/nucleus_core/v1")
public class ConnectionController {

	RestTemplate rest=new RestTemplate();
	
	@Autowired
	private ConnectionService connectionService;
	
	@Autowired
	private ConnectionRepository connectionRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@GetMapping(value="/get_connections/{user_id}")
	public List<Connection> allConnection(@PathVariable int user_id){	
		System.out.println(user_id);
		List<Connection> connections = connectionService.getAllConnection(user_id);
		return connections!=null?connections:null;
	}
	
	@PostMapping(value="/store_connection/{user_id}")
	public @ResponseBody ResponseEntity<String> newConnection(@RequestBody Connection newConnection,@PathVariable int user_id) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper=new ObjectMapper();
		String result = null;
		ResponseEntity<String> response;
		if(newConnection.getType().equals("jdbc")) {
			response = rest.postForEntity("http://localhost:7001/sql/v1/test_connection", newConnection, String.class);
			result=mapper.readValue(response.getBody(),new TypeReference<String>() {
			});
		}else {
			response = rest.getForEntity(newConnection.getUrl(), String.class);
			List<Map<String,Object>> list=mapper.readValue(response.getBody(),new TypeReference<List<Map<String,Object>>>() {
			});
			if(response!=null) result="true";
			else result="false";
		}
		if(result.equals("true")) {
			Connection newConn = connectionRepo.save(newConnection);
			User user = userRepo.findById(user_id).get();
			List<Connection> conn=null;
			conn=user.getConnection()!=null?user.getConnection():new ArrayList<>();
			conn.add(newConn);
			user.setConnection(conn);
			userRepo.save(user);
			response = new ResponseEntity<String>(String.valueOf(newConn.getId()), HttpStatus.OK);
		}
		System.out.println(response.getBody());
		System.out.println(response);
		return response;
	}	
}
