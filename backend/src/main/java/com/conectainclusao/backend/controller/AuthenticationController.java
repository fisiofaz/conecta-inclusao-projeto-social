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
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

 
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody @Valid AuthenticationRequestDTO data) {
        // 1. Cria um token de autenticação Spring Security com as credenciais
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getSenha());

        // 2. Tenta autenticar o usuário
        var auth = this.authenticationManager.authenticate(usernamePassword);

        // 3. Obtém o objeto User (sua entidade) do principal autenticado
        // O principal retornado pelo authenticate() é UserDetails, que no seu caso é sua entidade User
        User user = (User) auth.getPrincipal();

        // 4. Gera o token JWT usando seu TokenService
        String token = tokenService.generateToken(user); // << AQUI A VARIÁVEL 'token' É DECLARADA

        // 5. Retorna o token e o tipoPerfil do usuário na resposta (AuthenticationResponseDTO)
        return ResponseEntity.ok(new AuthenticationResponseDTO(token, user.getTipoPerfil())); // << AGORA 'token' EXISTE
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