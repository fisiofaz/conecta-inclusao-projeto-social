package com.conectainclusao.backend.service; 

import com.conectainclusao.backend.dto.ComplaintReportRequestDTO;
import com.conectainclusao.backend.dto.ComplaintReportResponseDTO;
import com.conectainclusao.backend.exception.ResourceNotFoundException; 
import com.conectainclusao.backend.model.ComplaintReport;
import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.model.StatusDenuncia;
import com.conectainclusao.backend.repository.ComplaintReportRepository;
import com.conectainclusao.backend.repository.UserRepository;
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
    public ComplaintReportService(ComplaintReportRepository complaintReportRepository, UserRepository userRepository) {
        this.complaintReportRepository = complaintReportRepository;
    }

    // --- Lógica para CRIAR ---
    @Transactional
    public ComplaintReportResponseDTO createComplaintReport(ComplaintReportRequestDTO dto, User user) {
    	ComplaintReport complaintReport = new ComplaintReport();
 
    	 BeanUtils.copyProperties(dto, complaintReport);


    	 //  Associa o usuário logado (muito mais seguro)
    	 complaintReport.setUser(user);

    	ComplaintReport savedReport = complaintReportRepository.save(complaintReport);
  
    	 return mapEntityToResponseDTO(savedReport);
    }
        
    // --- Lógica para LISTAR TODOS ---
    @Transactional(readOnly = true) // Otimização para operações de leitura
    public List<ComplaintReportResponseDTO> getAllComplaintReports() {
        return complaintReportRepository.findAll().stream()
                .map(this::mapEntityToResponseDTO) // Usa o método de mapeamento
                .collect(Collectors.toList());
    }
    
    // LISTAR "MINHAS DENÚNCIAS"
    @Transactional(readOnly = true)
    	public List<ComplaintReportResponseDTO> getComplaintsByUserId(Long userId) {
    		return complaintReportRepository.findByUserId(userId).stream() // Usa o novo método do repositório
    				.map(this::mapEntityToResponseDTO)
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
        
        // BeanUtils deve copiar os Enums TipoProblema e StatusDenuncia corretamente
        BeanUtils.copyProperties(report, dto, "user"); // Ignora o campo 'user' da entidade

        // 👇 Obtém o nome diretamente do objeto User relacionado 👇
        String userName = "Usuário Desconhecido"; // Padrão
        if (report.getUser() != null) {
            userName = report.getUser().getNome(); // Acessa o nome através do relacionamento
        }
        dto.setUserName(userName); // Define o nome do usuário no DTO

        return dto;
    }
}