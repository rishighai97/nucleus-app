package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.repository.JdbcSqlRepository;

@SpringBootApplication
public class NucleusApplication {

	public static void main(String[] args) {
		SpringApplication.run(NucleusApplication.class, args);
	}

}
