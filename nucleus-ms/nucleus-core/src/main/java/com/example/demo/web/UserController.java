package com.example.demo.web;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<User> registration(@RequestBody User userForm) {
		System.out.println(userForm);
		userService.save(userForm);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}
	

	
}
