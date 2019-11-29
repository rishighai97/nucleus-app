package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Connection;

public interface ConnectionService {

	List<Connection> getAllConnection(int user_id);
	
	
}
