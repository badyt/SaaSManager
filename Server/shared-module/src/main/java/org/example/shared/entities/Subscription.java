package org.example.shared.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@Table(name = "subscriptions")
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscription_id")
    private Integer subscriptionId;

    @ManyToOne
    @JoinColumn(name = "tool_id", nullable = false)
    private CatalogEntity tool;

    @Column(name = "renewal_date", nullable = false)
    private LocalDate renewalDate;

    @Column(name = "cost", precision = 10, scale = 2, nullable = false)
    private BigDecimal cost;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "license_count", nullable = false)
    private Integer licenseCount;
}
