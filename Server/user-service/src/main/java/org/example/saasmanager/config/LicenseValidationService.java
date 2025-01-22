package org.example.saasmanager.config;


import org.example.saasmanager.licenses.repository.LicenseRepository;
import org.example.saasmanager.subscriptions.repository.SubscriptionsRepository;
import org.example.shared.entities.Subscription;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LicenseValidationService {

    private final SubscriptionsRepository subscriptionsRepository;
    private final LicenseRepository licenseRepository;

    public LicenseValidationService(SubscriptionsRepository subscriptionsRepository, LicenseRepository licenseRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.licenseRepository = licenseRepository;
    }

    @Scheduled(cron = "0 0 * * * *") // Runs every hour at the top of the hour
    @Transactional
    public void validateAllocatedLicenses() {
        List<Subscription> subscriptions = subscriptionsRepository.findAll();
        for (Subscription subscription : subscriptions) {
            long actualAllocatedLicenses = licenseRepository.countBySubscriptionId(subscription.getSubscriptionId());

            if (actualAllocatedLicenses != subscription.getAllocatedLicenses()) {
                System.out.println("Discrepancy found for subscription ID: " + subscription.getSubscriptionId());
                System.out.println(actualAllocatedLicenses);
                System.out.println(subscription.getAllocatedLicenses());
                // Optionally auto-correct the count
                subscription.setAllocatedLicenses((int) actualAllocatedLicenses);
                subscriptionsRepository.save(subscription);

                System.out.println("Corrected allocated licenses for subscription ID: " + subscription.getSubscriptionId());
            }
        }
        System.out.println("License validation job completed.");
    }
}
