package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.UserRequestDTO;
import com.conectainclusao.backend.dto.UserResponseDTO;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid; 
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users") 
public class UserController {

    @Autowired 
    private UserRepository userRepository;
  
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
              
        User user = new User();
        user.setNome(userRequestDTO.getNome());
        user.setEmail(userRequestDTO.getEmail());
        user.setSenha(userRequestDTO.getSenha()); 
        user.setTipoPerfil(userRequestDTO.getTipoPerfil());
        user.setDataNascimento(userRequestDTO.getDataNascimento());
        user.setDeficiencia(userRequestDTO.getDeficiencia());
        user.setCidade(userRequestDTO.getCidade());
        user.setEstado(userRequestDTO.getEstado());
        user.setBio(userRequestDTO.getBio());

        
        User savedUser = userRepository.save(user);

        UserResponseDTO responseDTO = new UserResponseDTO();
        responseDTO.setId(savedUser.getId());
        responseDTO.setNome(savedUser.getNome());
        responseDTO.setEmail(savedUser.getEmail());
        responseDTO.setTipoPerfil(savedUser.getTipoPerfil());
        responseDTO.setDataNascimento(savedUser.getDataNascimento());
        responseDTO.setDeficiencia(savedUser.getDeficiencia());
        responseDTO.setCidade(savedUser.getCidade());
        responseDTO.setEstado(savedUser.getEstado());
        responseDTO.setBio(savedUser.getBio());
        
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserResponseDTO> responseDTOs = users.stream()
            .map(user -> {
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
                return dto;
            })
            .collect(Collectors.toList());

        return new ResponseEntity<>(responseDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UserResponseDTO responseDTO = new UserResponseDTO();
            responseDTO.setId(user.getId());
            responseDTO.setNome(user.getNome());
            responseDTO.setEmail(user.getEmail());
            responseDTO.setTipoPerfil(user.getTipoPerfil());
            responseDTO.setDataNascimento(user.getDataNascimento());
            responseDTO.setDeficiencia(user.getDeficiencia());
            responseDTO.setCidade(user.getCidade());
            responseDTO.setEstado(user.getEstado());
            responseDTO.setBio(user.getBio());
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserRequestDTO userRequestDTO) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            userToUpdate.setNome(userRequestDTO.getNome());
            userToUpdate.setEmail(userRequestDTO.getEmail());           
            // userToUpdate.setSenha(userRequestDTO.getSenha());
            userToUpdate.setTipoPerfil(userRequestDTO.getTipoPerfil());
            userToUpdate.setDataNascimento(userRequestDTO.getDataNascimento());
            userToUpdate.setDeficiencia(userRequestDTO.getDeficiencia());
            userToUpdate.setCidade(userRequestDTO.getCidade());
            userToUpdate.setEstado(userRequestDTO.getEstado());
            userToUpdate.setBio(userRequestDTO.getBio());

            User updatedUser = userRepository.save(userToUpdate);

            UserResponseDTO responseDTO = new UserResponseDTO();
            responseDTO.setId(updatedUser.getId());
            responseDTO.setNome(updatedUser.getNome());
            responseDTO.setEmail(updatedUser.getEmail());
            responseDTO.setTipoPerfil(updatedUser.getTipoPerfil());
            responseDTO.setDataNascimento(updatedUser.getDataNascimento());
            responseDTO.setDeficiencia(updatedUser.getDeficiencia());
            responseDTO.setCidade(updatedUser.getCidade());
            responseDTO.setEstado(updatedUser.getEstado());
            responseDTO.setBio(updatedUser.getBio());
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
