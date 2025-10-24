package com.conectainclusao.backend.service; 

import com.conectainclusao.backend.dto.ComplaintReportRequestDTO;
import com.conectainclusao.backend.dto.ComplaintReportResponseDTO;
import com.conectainclusao.backend.exception.ResourceNotFoundException; // Precisaremos criar esta exceção
import com.conectainclusao.backend.model.ComplaintReport;
import com.conectainclusao.backend.repository.ComplaintReportRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; 

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintReportService {

    private final ComplaintReportRepository complaintReportRepository;

    @Autowired
    public ComplaintReportService(ComplaintReportRepository complaintReportRepository) {
        this.complaintReportRepository = complaintReportRepository;
    }

    // --- Lógica para CRIAR ---
    @Transactional // Garante que a operação seja atômica
    public ComplaintReportResponseDTO createComplaintReport(ComplaintReportRequestDTO dto, String userId) {
        ComplaintReport complaintReport = new ComplaintReport();
        BeanUtils.copyProperties(dto, complaintReport);
        complaintReport.setStatus("aberto"); // Define status inicial
        complaintReport.setUserId(userId); // Associa o ID do usuário (como String)

        ComplaintReport savedReport = complaintReportRepository.save(complaintReport);
        
        // Mapeia a entidade salva para o DTO de resposta
        return mapEntityToResponseDTO(savedReport);
    }

    // --- Lógica para LISTAR TODOS ---
    @Transactional(readOnly = true) // Otimização para operações de leitura
    public List<ComplaintReportResponseDTO> getAllComplaintReports() {
        return complaintReportRepository.findAll().stream()
                .map(this::mapEntityToResponseDTO) // Usa o método de mapeamento
                .collect(Collectors.toList());
    }

    // --- Lógica para BUSCAR POR ID ---
    @Transactional(readOnly = true)
    public ComplaintReportResponseDTO getComplaintReportById(Long id) {
        ComplaintReport report = complaintReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Denúncia não encontrada com ID: " + id));
        return mapEntityToResponseDTO(report);
    }

    // --- Lógica para ATUALIZAR ---
    @Transactional
    public ComplaintReportResponseDTO updateComplaintReport(Long id, ComplaintReportRequestDTO dto) {
        ComplaintReport existingReport = complaintReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Denúncia não encontrada com ID: " + id));

        // Copia as propriedades do DTO para a entidade existente, ignorando o ID
        BeanUtils.copyProperties(dto, existingReport, "id");
        
        // Poderíamos adicionar lógica aqui para não permitir mudar o userId, por exemplo.
        // existingReport.setStatus(dto.getStatus()); // Se o status puder ser atualizado via DTO

        ComplaintReport updatedReport = complaintReportRepository.save(existingReport);
        return mapEntityToResponseDTO(updatedReport);
    }

    // --- Lógica para DELETAR ---
    @Transactional
    public void deleteComplaintReport(Long id) {
        if (!complaintReportRepository.existsById(id)) {
            throw new ResourceNotFoundException("Denúncia não encontrada com ID: " + id);
        }
        complaintReportRepository.deleteById(id);
    }

    // --- Método auxiliar para mapear Entidade -> ResponseDTO ---
    private ComplaintReportResponseDTO mapEntityToResponseDTO(ComplaintReport report) {
        ComplaintReportResponseDTO dto = new ComplaintReportResponseDTO();
        BeanUtils.copyProperties(report, dto);
        return dto;
    }
}