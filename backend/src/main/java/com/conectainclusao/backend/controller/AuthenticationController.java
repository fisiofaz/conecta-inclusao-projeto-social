package com.conectainclusao.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conectainclusao.backend.dto.AuthenticationRequestDTO;
import com.conectainclusao.backend.dto.AuthenticationResponseDTO;
import com.conectainclusao.backend.dto.UserCreateRequestDTO;
import com.conectainclusao.backend.dto.UserResponseDTO;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.security.TokenService;
import com.conectainclusao.backend.service.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final UserService userService;

    @Autowired
    private final TokenService tokenService;
    
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
       
        User user = (User) auth.getPrincipal();

        String token = tokenService.generateToken(user); 

        return ResponseEntity.ok(new AuthenticationResponseDTO(token, user.getTipoPerfil().name())); 
    }

    
    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @RequestBody @Valid UserCreateRequestDTO data 
        ) {
        try {           
            userService.registerUser(data);         
            return ResponseEntity.status(HttpStatus.CREATED).build(); 
        } catch (IllegalArgumentException e) {            
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse); 
        }
    }
    
 // Dentro do AuthenticationController ou um novo ProfileController

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()") // Garante que só usuários logados acessem
    public ResponseEntity<UserResponseDTO> getUserProfile() {
        // Pega o usuário autenticado do contexto de segurança
        org.springframework.security.core.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof User)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Segurança extra
        }
        User authenticatedUser = (User) authentication.getPrincipal();

        // Mapeia para o DTO de resposta (usando o método do UserService ou manual)
        // Assumindo que você tem um método mapEntityToResponseDTO no UserService injetado
        UserResponseDTO userDTO = userService.mapEntityToResponseDTO(authenticatedUser); // Você precisará tornar esse método público ou criar um específico


        return ResponseEntity.ok(userDTO);
    }
}