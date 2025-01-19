package org.example.shared.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@Table(name = "catalog")
@NoArgsConstructor
@AllArgsConstructor
public class CatalogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_id")
    private Integer toolId;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "default_cost", precision = 10, scale = 2, nullable = false)
    private BigDecimal defaultCost;

    @Column(name = "created_at", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
