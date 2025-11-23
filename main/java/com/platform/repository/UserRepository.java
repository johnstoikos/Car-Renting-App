package com.platform.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platform.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRole(User.Role role);
    Optional<User> findByEmail(String email); 
     boolean existsByEmail(String email);
}
