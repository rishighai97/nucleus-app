//package com.example.config;
//
//import javax.sql.DataSource;
//
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import com.example.web.Response;
//
//@Configuration
//public class DataSourceConfiguration {
//
//	
//	@Bean
//	public DataSource getDataSource() {
//		DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
//		dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
//		dataSourceBuilder.url("jdbc:mysql://localhost:3306/eat_it");
//		dataSourceBuilder.username("root");
//		dataSourceBuilder.password("rishi");
//		return dataSourceBuilder.build();
//	}
//	
//}
