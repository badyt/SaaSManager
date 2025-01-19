package org.example.shared.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@Table(name = "licenses")
@NoArgsConstructor
@AllArgsConstructor
public class License {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "license_id")
    private Integer licenseId;

    @ManyToOne
    @JoinColumn(name = "subscription_id", nullable = false)
    private Subscription subscription;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;

    @Column(name = "allocated_at")
    @Builder.Default
    private LocalDateTime allocatedAt = LocalDateTime.now();

    @Column(name = "last_used_at")
    @Builder.Default
    private LocalDateTime lastUsedAt = LocalDateTime.now();;
}
