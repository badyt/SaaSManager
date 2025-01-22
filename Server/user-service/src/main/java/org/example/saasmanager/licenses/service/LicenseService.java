package org.example.saasmanager.licenses.service;

import com.example.licenses.model.LicenseDTO;
import com.example.licenses.model.NewLicense;
import com.example.users.model.UserDTO;
import org.example.saasmanager.licenses.mapper.LicenseMapper;
import org.example.saasmanager.licenses.repository.LicenseRepository;
import org.example.saasmanager.subscriptions.repository.SubscriptionsRepository;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.License;
import org.example.shared.entities.Subscription;
import org.example.shared.entities.User;
import org.example.shared.entities.UserTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LicenseService {
    private final LicenseRepository licenseRepository;
    private final LicenseMapper licenseMapper;
    private final SubscriptionsRepository subscriptionsRepository;
    private final UserRepository userRepository;

    @Autowired
    public LicenseService(LicenseRepository licenseRepository, LicenseMapper licenseMapper,
                          SubscriptionsRepository subscriptionsRepository, UserRepository userRepository) {
        this.licenseRepository = licenseRepository;
        this.licenseMapper = licenseMapper;
        this.subscriptionsRepository = subscriptionsRepository;
        this.userRepository = userRepository;
    }

    public List<LicenseDTO> getAllLicenses() {
        List<License> foundLicenses = licenseRepository.findAll();
        return licenseMapper.toDtoList(foundLicenses);
    }

    @Transactional
    public LicenseDTO allocateLicense(NewLicense newLicense) {
        Subscription subscription = subscriptionsRepository.findById(newLicense.getSubscriptionId())
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        if (subscription.getAllocatedLicenses() >= subscription.getLicenseCount()) {
            throw new IllegalStateException("No more licenses available to allocate.");
        }
        if (licenseRepository.existsBySubscriptionIdAndUserId(newLicense.getSubscriptionId(), newLicense.getUserId())) {
            throw new IllegalArgumentException("User already has a license for this subscription.");
        }

        License license = License.builder()
                .subscription(subscriptionsRepository.findById(newLicense.getSubscriptionId()).orElseThrow())
                .user(userRepository.findById(newLicense.getUserId()).orElseThrow())
                .build();
        License savedLicense = licenseRepository.save(license);

        subscription.setAllocatedLicenses(subscription.getAllocatedLicenses() + 1);
        subscriptionsRepository.save(subscription);
        return licenseMapper.toDto(savedLicense);
    }

    @Transactional
    public void revokeLicense(Integer licenseId) {
        License license = licenseRepository.findById(licenseId)
                .orElseThrow(() -> new IllegalArgumentException("License was not found"));
        Subscription subscription = license.getSubscription();
        licenseRepository.delete(license);
        subscription.setAllocatedLicenses(subscription.getAllocatedLicenses() - 1);
        subscriptionsRepository.save(subscription);
    }

    public int getLicenseCountBySubscriptionId(Integer subscriptionId) {
        return licenseRepository.countBySubscriptionId(subscriptionId);
    }

    public List<LicenseDTO> getAllBySubscription(Integer subscriptionId) {
        List<License> foundLicenses = licenseRepository.findAllBySubscriptionId(subscriptionId);
        return licenseMapper.toDtoList(foundLicenses);
    }

    public List<LicenseDTO> getAllByUser(Integer userId) {
        List<License> foundLicenses = licenseRepository.findAllByUserId(userId);
        return licenseMapper.toDtoList(foundLicenses);
    }
}
