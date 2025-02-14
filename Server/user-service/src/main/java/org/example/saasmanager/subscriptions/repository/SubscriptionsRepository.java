package org.example.saasmanager.subscriptions.repository;

import net.saas.shared.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionsRepository extends JpaRepository<Subscription,Integer> {

}
