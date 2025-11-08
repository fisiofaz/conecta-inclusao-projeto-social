package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.CandidaturaDTO;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.service.CandidaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidaturas") // Base da URL para este controller
public class CandidaturaController {

    @Autowired
    private CandidaturaService candidaturaService;

    // --- (Endpoint de Aplicar) ---
    @PostMapping("/apply/{opportunityId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> applyToOpportunity(
            @PathVariable Long opportunityId,
            @AuthenticationPrincipal User user) { // Pega o usuário logado
        
        try {
            CandidaturaDTO newCandidatura = candidaturaService.applyToOpportunity(opportunityId, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newCandidatura);
        } catch (IllegalStateException e) {
            // Captura o erro "Você já se candidatou a esta vaga." do serviço
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // --- (Endpoint do Usuário: "Minhas Candidaturas") ---
    @GetMapping("/my-applications")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<CandidaturaDTO>> getMyApplications(
            @AuthenticationPrincipal User user) { // Pega o usuário logado
        
        List<CandidaturaDTO> myApplications = candidaturaService.getMyApplications(user);
        return ResponseEntity.ok(myApplications);
    }
    
    // --- (Endpoint da Empresa: "Ver Candidatos da Vaga") ---
    @GetMapping("/opportunity/{opportunityId}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPRESA', 'ROLE_ADMIN')")
    public ResponseEntity<List<CandidaturaDTO>> getApplicationsForOpportunity(
            @PathVariable Long opportunityId,
            @AuthenticationPrincipal User user) { // 👈 Pega o usuário logado
        
        // Passa o usuário logado para o serviço (onde a segurança será verificada)
        List<CandidaturaDTO> applicants = candidaturaService.getApplicationsForOpportunity(opportunityId, user);
        return ResponseEntity.ok(applicants);
    }
    
    // --- NOVO ENDPOINT (PARA O ADMIN) ---
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<CandidaturaDTO>> getApplicationsForUser(@PathVariable Long userId) {
        // Chama o novo método de serviço que criamos
        List<CandidaturaDTO> applications = candidaturaService.getApplicationsByUserId(userId);
        return ResponseEntity.ok(applications);
    }
}