package com.conectainclusao.backend.repository; 

import com.conectainclusao.backend.model.Opportunity;
import com.conectainclusao.backend.model.TipoOportunidade; 
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class OpportunitySpecification {

    // Método principal que combina os filtros
    public static Specification<Opportunity> getByFilters(String tipo, String localizacao) {
        
        // (root, query, criteriaBuilder)
        return (root, query, cb) -> {
            
            // Cria uma lista de "predicados" (filtros)
            List<Predicate> predicates = new ArrayList<>();

            // Filtro por TIPO (se o 'tipo' não for nulo/vazio)
            if (tipo != null && !tipo.isEmpty()) {
                try {
                    // Converte a String "EMPREGO" para o Enum TipoOportunidade.EMPREGO
                    TipoOportunidade tipoEnum = TipoOportunidade.valueOf(tipo.toUpperCase());
                    
                    // Adiciona: WHERE tipoOportunidade = tipoEnum
                    predicates.add(cb.equal(root.get("tipoOportunidade"), tipoEnum));
                    
                } catch (IllegalArgumentException e) {
                    // Se o frontend enviar um tipo inválido (ex: "TESTE"), ignora o filtro
                    System.err.println("Tipo de oportunidade inválido recebido: " + tipo);
                }
            }

            // Filtro por LOCALIZAÇÃO (se a 'localizacao' não for nula/vazia)
            if (localizacao != null && !localizacao.isEmpty()) {
                // Adiciona: WHERE LOWER(localizacao) LIKE LOWER('%sao paulo%')
                predicates.add(cb.like(cb.lower(root.get("localizacao")), "%" + localizacao.toLowerCase() + "%"));
            }
            
            // Combina todos os filtros com "AND"
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}