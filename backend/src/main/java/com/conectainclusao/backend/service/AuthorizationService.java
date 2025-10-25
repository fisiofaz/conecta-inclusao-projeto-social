package com.conectainclusao.backend.service;

import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class AuthorizationService implements UserDetailsService {

    
    private UserRepository userRepository;
    
    @Autowired // Opcional em versões recentes
    public AuthorizationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o email: " + email));

        System.out.println("DEBUG: AuthorizationService - Usuário carregado: " + user.getEmail());
        System.out.println("DEBUG: AuthorizationService - Tipo de perfil: " + user.getTipoPerfil());
        System.out.println("DEBUG: AuthorizationService - Autoridades: " + user.getAuthorities()); // Isso chamará o getAuthorities()
        return user; // O return deve estar aqui, não mude
    }
}