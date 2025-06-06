package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.AuthenticationRequestDTO;
import com.conectainclusao.backend.dto.AuthenticationResponseDTO;
import com.conectainclusao.backend.dto.UserRequestDTO;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.repository.UserRepository;
import com.conectainclusao.backend.security.TokenService;
import jakarta.validation.Valid;
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
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

 
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody @Valid AuthenticationRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

       
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new AuthenticationResponseDTO(token));
    }

    
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid UserRequestDTO data) {
        if (this.userRepository.findByEmail(data.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build(); // Email já cadastrado
        }

      
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.getSenha());

        User newUser = new User();
        BeanUtils.copyProperties(data, newUser);
        newUser.setSenha(encryptedPassword); 

        this.userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}