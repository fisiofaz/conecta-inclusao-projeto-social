package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.AuthenticationRequestDTO;
import com.conectainclusao.backend.dto.AuthenticationResponseDTO;
import com.conectainclusao.backend.dto.UserRequestDTO;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.repository.UserRepository;
import com.conectainclusao.backend.security.TokenService;
import com.conectainclusao.backend.service.UserService;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private final UserService userService;

    @Autowired
    private TokenService tokenService;
    
    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, 
                                    TokenService tokenService, 
                                    UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userService = userService;
    }

 
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody @Valid AuthenticationRequestDTO data) {
       
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getSenha());     
        var auth = this.authenticationManager.authenticate(usernamePassword);
       
        // O principal retornado pelo authenticate() é UserDetails, que no seu caso é sua entidade User
        User user = (User) auth.getPrincipal();

        String token = tokenService.generateToken(user); 

        return ResponseEntity.ok(new AuthenticationResponseDTO(token, user.getTipoPerfil())); 
    }

    
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody @Valid UserRequestDTO data) {
    	try {            
            userService.registerUser(data);      
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {           
        	Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}