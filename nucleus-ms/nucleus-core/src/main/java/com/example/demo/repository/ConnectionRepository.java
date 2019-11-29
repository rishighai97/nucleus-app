package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.*;
import java.util.*;;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection,Integer> {
	
	List<Connection> findAll();
	

}
