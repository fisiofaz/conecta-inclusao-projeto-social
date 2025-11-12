package com.conectainclusao.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;
import java.util.HashSet;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "diversity_tags", uniqueConstraints = {
    // Garante que "PCD" ou "MULHER" só existam uma vez
    @UniqueConstraint(columnNames = "tagKey")
})
public class DiversityTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String tagKey; // Ex: "PCD", "MULHER", "NEGRO" (o identificador único)

    @NotBlank
    @Column(nullable = false)
    private String displayName; // Ex: "Pessoa com Deficiência", "Mulher" (o rótulo visível)

    // Relação inversa (quais utilizadores têm esta tag)
    @ManyToMany(mappedBy = "diversityTags", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    // Relação inversa (quais vagas procuram esta tag)
    @ManyToMany(mappedBy = "targetGroups", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Opportunity> opportunities = new HashSet<>();

    // Construtores
    public DiversityTag() {}

    public DiversityTag(String tagKey, String displayName) {
        this.tagKey = tagKey;
        this.displayName = displayName;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTagKey() { return tagKey; }
    public void setTagKey(String tagKey) { this.tagKey = tagKey; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    
    // Getters/Setters para as relações (importante para o JPA)
    public Set<User> getUsers() { return users; }
    public void setUsers(Set<User> users) { this.users = users; }
    public Set<Opportunity> getOpportunities() { return opportunities; }
    public void setOpportunities(Set<Opportunity> opportunities) { this.opportunities = opportunities; }
}