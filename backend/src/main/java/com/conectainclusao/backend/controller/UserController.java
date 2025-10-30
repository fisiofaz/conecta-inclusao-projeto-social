package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.UserUpdateRequestDTO;
import com.conectainclusao.backend.dto.UserResponseDTO;
import com.conectainclusao.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid; 
import java.util.List;

@RestController
@RequestMapping("/api/users") 
public class UserController {
	
	private final UserService userService; // <<< Injetar UserService
	
	@Autowired // Injeção via construtor
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        UserResponseDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable Long id,       
            @Valid @RequestBody UserUpdateRequestDTO userUpdateRequestDTO
        ) { 
        UserResponseDTO updatedUser = userService.updateUser(id, userUpdateRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
