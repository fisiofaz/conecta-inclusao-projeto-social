package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.ComplaintReportRequestDTO;
import com.conectainclusao.backend.dto.ComplaintReportResponseDTO;
import com.conectainclusao.backend.model.User; 
import com.conectainclusao.backend.service.ComplaintReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<ComplaintReportResponseDTO> createComplaintReport(
            @RequestBody @Valid ComplaintReportRequestDTO dto,
            @AuthenticationPrincipal User authenticatedUser) {
        
        //  Passa o DTO e a ENTIDADE User completa para o serviço
        ComplaintReportResponseDTO createdReportDTO = complaintReportService.createComplaintReport(dto, authenticatedUser);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReportDTO);
    }
    
    // --- NOVO ENDPOINT: LISTAR "MINHAS DENÚNCIAS" ---
    @GetMapping("/my-complaints")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ComplaintReportResponseDTO>> getMyComplaints(@AuthenticationPrincipal User authenticatedUser) {
        // Chama o novo serviço que busca por ID de usuário
        List<ComplaintReportResponseDTO> reportsDTO = complaintReportService.getComplaintsByUserId(authenticatedUser.getId());
        return ResponseEntity.ok(reportsDTO);
    }

    // --- LISTAR TODOS ---
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<ComplaintReportResponseDTO>> getAllComplaintReports() {
        // Chama o serviço para listar
        List<ComplaintReportResponseDTO> reportsDTO = complaintReportService.getAllComplaintReports();
        return ResponseEntity.ok(reportsDTO);
    }

    // --- BUSCAR POR ID ---
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ComplaintReportResponseDTO> getComplaintReportById(@PathVariable Long id) {
        // Chama o serviço para buscar por ID (o serviço já trata o Not Found)
        ComplaintReportResponseDTO reportDTO = complaintReportService.getComplaintReportById(id);
        return ResponseEntity.ok(reportDTO);
    }
    
    // --- ATUALIZAR (Para Admins) ---
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ComplaintReportResponseDTO> updateComplaintReport(@PathVariable Long id, @RequestBody @Valid ComplaintReportRequestDTO dto) {
        ComplaintReportResponseDTO updatedReportDTO = complaintReportService.updateComplaintReport(id, dto);
        return ResponseEntity.ok(updatedReportDTO);
    }

    // --- DELETAR (Para Admins) ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteComplaintReport(@PathVariable Long id) {
        complaintReportService.deleteComplaintReport(id);
        return ResponseEntity.noContent().build();
    }
}