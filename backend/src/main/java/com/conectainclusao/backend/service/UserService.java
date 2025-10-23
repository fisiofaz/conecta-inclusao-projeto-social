package com.conectainclusao.backend.service; 

import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.dto.UserRequestDTO;
import com.conectainclusao.backend.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Contém a lógica de negócio para registrar um novo usuário.
     */
    public User registerUser(UserRequestDTO data) {
        if (userRepository.findByEmail(data.getEmail()).isPresent()) {
            // Lança uma exceção que o controller irá capturar
            throw new IllegalArgumentException("Este e-mail já está cadastrado.");
        }

        String encryptedPassword = passwordEncoder.encode(data.getSenha());
        
        User newUser = new User();
        BeanUtils.copyProperties(data, newUser);
        newUser.setSenha(encryptedPassword); 
        return userRepository.save(newUser);
    }
}