package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.dto.ComplaintReportRequestDTO;
import com.conectainclusao.backend.dto.ComplaintReportResponseDTO;
import com.conectainclusao.backend.model.ComplaintReport;
import com.conectainclusao.backend.model.User; 
import com.conectainclusao.backend.repository.ComplaintReportRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintReportController {

    @Autowired
    private ComplaintReportRepository complaintReportRepository;

    // ENDPOINT PARA CRIAR NOVA DENÚNCIA/RELATO (POST /api/complaints)
    // Apenas usuários autenticados podem criar denúncias
    @PostMapping
    public ResponseEntity<ComplaintReportResponseDTO> createComplaintReport(@RequestBody @Valid ComplaintReportRequestDTO complaintReportRequestDTO) {
        ComplaintReport complaintReport = new ComplaintReport();
        BeanUtils.copyProperties(complaintReportRequestDTO, complaintReport);

        // Define o status inicial da denúncia
        complaintReport.setStatus("aberto");

        // Obtém o ID do usuário autenticado e associa à denúncia
        // Pormenor: Isso é crucial para quem fez a denúncia.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User authenticatedUser = (User) authentication.getPrincipal();
            complaintReport.setUserId(authenticatedUser.getId().toString()); 
        } else {
           
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        ComplaintReport savedComplaintReport = complaintReportRepository.save(complaintReport);

        ComplaintReportResponseDTO complaintReportResponseDTO = new ComplaintReportResponseDTO();
        BeanUtils.copyProperties(savedComplaintReport, complaintReportResponseDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(complaintReportResponseDTO);
    }

    // ENDPOINT PARA LISTAR TODAS AS DENÚNCIAS/RELATOS (GET /api/complaints)
    // Acesso para todos (inicialmente), mas pode ser restrito a ADMIN/Orgão_Apoio no futuro
    @GetMapping
    public ResponseEntity<List<ComplaintReportResponseDTO>> getAllComplaintReports() {
        List<ComplaintReport> complaintReports = complaintReportRepository.findAll();
        List<ComplaintReportResponseDTO> reportsDTO = complaintReports.stream()
                .map(report -> {
                    ComplaintReportResponseDTO dto = new ComplaintReportResponseDTO();
                    BeanUtils.copyProperties(report, dto);
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(reportsDTO);
    }

    // ENDPOINT PARA BUSCAR DENÚNCIA/RELATO POR ID (GET /api/complaints/{id})
    // Acesso para todos (inicialmente)
    @GetMapping("/{id}")
    public ResponseEntity<ComplaintReportResponseDTO> getComplaintReportById(@PathVariable Long id) {
        Optional<ComplaintReport> complaintReportOptional = complaintReportRepository.findById(id);
        if (complaintReportOptional.isPresent()) {
            ComplaintReportResponseDTO complaintReportResponseDTO = new ComplaintReportResponseDTO();
            BeanUtils.copyProperties(complaintReportOptional.get(), complaintReportResponseDTO);
            return ResponseEntity.ok(complaintReportResponseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ENDPOINT PARA ATUALIZAR DENÚNCIA/RELATO (PUT /api/complaints/{id})
    // Apenas usuários autenticados (ex: ADMIN ou o próprio usuário que criou) podem atualizar
    // Pormenor: O status poderia ser atualizado apenas por um ADMIN/Orgão_Apoio.
    @PutMapping("/{id}")
    public ResponseEntity<ComplaintReportResponseDTO> updateComplaintReport(@PathVariable Long id, @RequestBody @Valid ComplaintReportRequestDTO complaintReportRequestDTO) {
        Optional<ComplaintReport> complaintReportOptional = complaintReportRepository.findById(id);
        if (complaintReportOptional.isPresent()) {
            ComplaintReport existingComplaintReport = complaintReportOptional.get();
            
            BeanUtils.copyProperties(complaintReportRequestDTO, existingComplaintReport, "id");
            
            ComplaintReport updatedComplaintReport = complaintReportRepository.save(existingComplaintReport);

            ComplaintReportResponseDTO complaintReportResponseDTO = new ComplaintReportResponseDTO();
            BeanUtils.copyProperties(updatedComplaintReport, complaintReportResponseDTO);
            return ResponseEntity.ok(complaintReportResponseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ENDPOINT PARA DELETAR DENÚNCIA/RELATO (DELETE /api/complaints/{id})
    // Apenas usuários autenticados (ex: ADMIN ou o próprio usuário que criou) podem deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaintReport(@PathVariable Long id) {
        if (complaintReportRepository.existsById(id)) {
            complaintReportRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}