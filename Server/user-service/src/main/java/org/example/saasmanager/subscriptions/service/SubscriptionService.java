package org.example.saasmanager.subscriptions.service;

import com.example.subscriptions.model.NewSubscription;
import com.example.subscriptions.model.SubscriptionDTO;
import com.example.subscriptions.model.UpdateSubscription;
import org.example.saasmanager.catalog.repository.CatalogRepository;
import org.example.saasmanager.subscriptions.mapper.SubscriptionMapper;
import org.example.saasmanager.subscriptions.repository.SubscriptionsRepository;
import org.example.shared.entities.CatalogEntity;
import org.example.shared.entities.Subscription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SubscriptionService {
    private final SubscriptionsRepository subscriptionsRepository;
    private final SubscriptionMapper subscriptionMapper;
    private final CatalogRepository catalogRepository;

    @Autowired
    public SubscriptionService(SubscriptionsRepository subscriptionsRepository, SubscriptionMapper subscriptionMapper
            , CatalogRepository catalogRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.subscriptionMapper = subscriptionMapper;
        this.catalogRepository = catalogRepository;
    }

    public SubscriptionDTO createNewSubscription(NewSubscription newSubscription) {
        CatalogEntity tool = catalogRepository.findById(newSubscription.getToolId())
                .orElseThrow(() -> new IllegalArgumentException("Tool not found"));
        Subscription createdSubscription = Subscription.builder()
                .tool(tool)
                .renewalDate(newSubscription.getRenewalDate())
                .cost(BigDecimal.valueOf(newSubscription.getCost()))
                .licenseCount(newSubscription.getLicenseCount()).build();
        Subscription savedSubscription = subscriptionsRepository.save(createdSubscription);
        return subscriptionMapper.toDto(savedSubscription);
    }

    public List<SubscriptionDTO> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionsRepository.findAll();
        return subscriptionMapper.toDtoList(subscriptions);
    }

    public Optional<SubscriptionDTO> getSubscription(Integer subscriptionId) {
        Optional<Subscription> subscription = subscriptionsRepository.findById(subscriptionId);
        return subscription.map(subscriptionMapper::toDto);
    }

    public SubscriptionDTO updateSubscription(Integer subscriptionId, UpdateSubscription updateSubscription) {
        Subscription existingSubscription = subscriptionsRepository.findById(subscriptionId)
                .orElseThrow(() -> new NoSuchElementException("Subscription not found with ID: " + subscriptionId));
        if (updateSubscription.getCost() != null) {
            existingSubscription.setCost(BigDecimal.valueOf(updateSubscription.getCost()));
        }
        if (updateSubscription.getRenewalDate() != null) {
            existingSubscription.setRenewalDate(updateSubscription.getRenewalDate());
        }

        if (updateSubscription.getLicenseCount() != null) {
            existingSubscription.setLicenseCount(updateSubscription.getLicenseCount());
        }

        Subscription savedSubscription = subscriptionsRepository.save(existingSubscription);
        return subscriptionMapper.toDto(savedSubscription);
    }
}
