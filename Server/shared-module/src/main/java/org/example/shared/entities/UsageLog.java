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
@Table(name = "usage_logs")
@NoArgsConstructor
@AllArgsConstructor
public class UsageLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Integer logId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "subscription_id", nullable = false)
    private Subscription subscription;

    @Builder.Default
    @Column(name = "activity_date", nullable = false, updatable = false)
    private LocalDateTime activityDate = LocalDateTime.now();

    @Column(name = "activity_type",nullable = false)
    private String activityType;
}
