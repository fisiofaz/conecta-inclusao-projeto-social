package com.conectainclusao.backend.controller;

import com.conectainclusao.backend.model.User;
import com.conectainclusao.backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
@PreAuthorize("isAuthenticated()") // SÓ usuários logados podem usar este controller
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // --- ENDPOINTS DE OPORTUNIDADE ---

    @PostMapping("/opportunity/{opportunityId}")
    public ResponseEntity<Void> addOpportunityFavorite(
            @PathVariable Long opportunityId,
            @AuthenticationPrincipal User user) {
        
        favoriteService.addOpportunityToFavorites(user.getId(), opportunityId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/opportunity/{opportunityId}")
    public ResponseEntity<Void> removeOpportunityFavorite(
            @PathVariable Long opportunityId,
            @AuthenticationPrincipal User user) {
        
        favoriteService.removeOpportunityFromFavorites(user.getId(), opportunityId);
        return ResponseEntity.ok().build();
    }

    // --- ENDPOINTS DE RECURSO DE SAÚDE ---

    @PostMapping("/health/{healthResourceId}")
    public ResponseEntity<Void> addHealthResourceFavorite(
            @PathVariable Long healthResourceId,
            @AuthenticationPrincipal User user) {
        
        favoriteService.addHealthResourceToFavorites(user.getId(), healthResourceId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/health/{healthResourceId}")
    public ResponseEntity<Void> removeHealthResourceFavorite(
            @PathVariable Long healthResourceId,
            @AuthenticationPrincipal User user) {
        
        favoriteService.removeHealthResourceFromFavorites(user.getId(), healthResourceId);
        return ResponseEntity.ok().build();
    }

    // --- ENDPOINT PARA LISTAR "MEUS FAVORITOS" ---

    @GetMapping("/my-favorites")
    public ResponseEntity<List<Map<String, Object>>> getMyFavorites(@AuthenticationPrincipal User user) {
        List<Map<String, Object>> favorites = favoriteService.getAllFavoritesByUserId(user.getId());
        return ResponseEntity.ok(favorites);
    }
    
    // --- NOVO ENDPOINT (PARA O ADMIN) ---
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getFavoritesForUser(@PathVariable Long userId) {
        // O FavoriteService já aceitava um ID, então podemos reutilizá-lo
        List<Map<String, Object>> favorites = favoriteService.getAllFavoritesByUserId(userId);
        return ResponseEntity.ok(favorites);
    }
}