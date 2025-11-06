package com.conectainclusao.backend.model;

public enum StatusCandidatura {
    APLICADA,     // O usuário acabou de se candidatar
    VISUALIZADA,  // A empresa viu a candidatura
    EM_PROCESSO,  // A empresa moveu o candidato para a próxima etapa
    APROVADA,     // Aprovado!
    REJEITADA     // Rejeitado
}