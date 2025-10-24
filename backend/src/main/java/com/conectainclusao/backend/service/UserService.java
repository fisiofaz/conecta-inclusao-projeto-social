package com.conectainclusao.backend.service; 

import com.conectainclusao.backend.dto.UserRequestDTO;
import com.conectainclusao.backend.dto.UserResponseDTO;
import com.conectainclusao.backend.exception.ResourceNotFoundException;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(UserRequestDTO data) {
        if (userRepository.findByEmail(data.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Este e-mail já está cadastrado.");
        }
        String encryptedPassword = passwordEncoder.encode(data.getSenha());
        User newUser = new User();
        BeanUtils.copyProperties(data, newUser);
        newUser.setSenha(encryptedPassword);
        if (newUser.getTipoPerfil() == null) {
            newUser.setTipoPerfil("ROLE_USER"); 
        }
        return userRepository.save(newUser);
    }
    
    // --- MÉTODO PARA LISTAR TODOS OS USUÁRIOS ---
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapEntityToResponseDTO) // Usa o método auxiliar
                .collect(Collectors.toList());
    }
    
    // --- MÉTODO PARA BUSCAR USUÁRIO POR ID ---
    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
        return mapEntityToResponseDTO(user); // Usa o método auxiliar
    }
    
    // --- MÉTODO PARA ATUALIZAR USUÁRIO ---
    @Transactional
    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {
        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));

        // Atualiza os campos (Mapeamento manual - mais seguro que BeanUtils aqui)
        userToUpdate.setNome(dto.getNome());
        userToUpdate.setEmail(dto.getEmail()); // Considere validar se o novo e-mail já existe
        userToUpdate.setTipoPerfil(dto.getTipoPerfil());
        userToUpdate.setDataNascimento(dto.getDataNascimento());
        userToUpdate.setDeficiencia(dto.getDeficiencia());
        userToUpdate.setCidade(dto.getCidade());
        userToUpdate.setEstado(dto.getEstado());
        userToUpdate.setBio(dto.getBio());

        // Atualiza a senha SOMENTE se uma nova senha for fornecida no DTO
        if (StringUtils.hasText(dto.getSenha())) { // Verifica se a string não é nula nem vazia
            userToUpdate.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        User updatedUser = userRepository.save(userToUpdate);
        return mapEntityToResponseDTO(updatedUser); // Usa o método auxiliar
    }
    
    // --- MÉTODO PARA DELETAR USUÁRIO ---
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuário não encontrado com ID: " + id);
        }
        userRepository.deleteById(id);
    }
    
 // --- MÉTODO AUXILIAR PRIVADO PARA MAPEAMENTO User -> UserResponseDTO ---
    private UserResponseDTO mapEntityToResponseDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setNome(user.getNome());
        dto.setEmail(user.getEmail());
        dto.setTipoPerfil(user.getTipoPerfil());
        dto.setDataNascimento(user.getDataNascimento());
        dto.setDeficiencia(user.getDeficiencia());
        dto.setCidade(user.getCidade());
        dto.setEstado(user.getEstado());
        dto.setBio(user.getBio());
        // NÃO inclua a senha no DTO de resposta!
        return dto;
    }
}