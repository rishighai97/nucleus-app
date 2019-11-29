package com.example.demo.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Connection;
import com.example.demo.model.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    @Query("select connection from User u where u.user_id=?1")
    List<Connection> findConnectionByUserId(int user_id);
}