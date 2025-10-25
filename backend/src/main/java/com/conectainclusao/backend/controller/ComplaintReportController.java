package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.ComplaintReportRequestDTO;
import com.conectainclusao.backend.dto.ComplaintReportResponseDTO;
import com.conectainclusao.backend.model.User; 
import com.conectainclusao.backend.service.ComplaintReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintReportController {

    private final ComplaintReportService complaintReportService; // <<< Injetar o Serviço

    @Autowired // Injeção via construtor
    public ComplaintReportController(ComplaintReportService complaintReportService) {
        this.complaintReportService = complaintReportService;
    }

    // --- CRIAR ---
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ComplaintReportResponseDTO> createComplaintReport(@RequestBody @Valid ComplaintReportRequestDTO complaintReportRequestDTO) {
        // Obter o objeto User autenticado do contexto de segurança
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = null; // Inicializa como null

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            authenticatedUser = (User) authentication.getPrincipal();
        } else {
             // Se não conseguir obter o usuário (embora @PreAuthorize deva garantir que existe), retorna erro
            System.err.println("ERRO: Não foi possível obter o usuário autenticado no ComplaintReportController.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); 
        }

        // 👇 Passa o DTO e o ID (Long) do usuário para o serviço 👇
        ComplaintReportResponseDTO createdReportDTO = complaintReportService.createComplaintReport(complaintReportRequestDTO, authenticatedUser.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReportDTO);
    }

    // --- LISTAR TODOS ---
    @GetMapping
    public ResponseEntity<List<ComplaintReportResponseDTO>> getAllComplaintReports() {
        // Chama o serviço para listar
        List<ComplaintReportResponseDTO> reportsDTO = complaintReportService.getAllComplaintReports();
        return ResponseEntity.ok(reportsDTO);
    }

    // --- BUSCAR POR ID ---
    @GetMapping("/{id}")
    public ResponseEntity<ComplaintReportResponseDTO> getComplaintReportById(@PathVariable Long id) {
        // Chama o serviço para buscar por ID (o serviço já trata o Not Found)
        ComplaintReportResponseDTO reportDTO = complaintReportService.getComplaintReportById(id);
        return ResponseEntity.ok(reportDTO);
    }

    // --- ATUALIZAR ---
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ComplaintReportResponseDTO> updateComplaintReport(@PathVariable Long id, @RequestBody @Valid ComplaintReportRequestDTO complaintReportRequestDTO) {
        // Chama o serviço para atualizar (o serviço já trata o Not Found)
        ComplaintReportResponseDTO updatedReportDTO = complaintReportService.updateComplaintReport(id, complaintReportRequestDTO);
        return ResponseEntity.ok(updatedReportDTO);
    }

    // --- DELETAR ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteComplaintReport(@PathVariable Long id) {
        // Chama o serviço para deletar (o serviço já trata o Not Found)
        complaintReportService.deleteComplaintReport(id);
        return ResponseEntity.noContent().build();
    }
}