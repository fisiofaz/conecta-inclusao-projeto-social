package com.conectainclusao.backend.repository;

import com.conectainclusao.backend.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}