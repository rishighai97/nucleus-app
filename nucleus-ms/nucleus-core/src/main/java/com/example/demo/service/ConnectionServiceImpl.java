package com.example.demo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Connection;
import com.example.demo.repository.UserRepository;


@Service
public class ConnectionServiceImpl implements ConnectionService {
	@Autowired
	private UserRepository userRepo;
	
	@Override
	@Transactional
	public List<Connection> getAllConnection(int user_id) {
		return userRepo.findConnectionByUserId(user_id);
	}

}
