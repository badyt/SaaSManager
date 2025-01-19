package org.example.saasmanager.subscriptions.controller;

import com.example.subscriptions.api.SubscriptionsApi;
import com.example.subscriptions.model.NewSubscription;
import com.example.subscriptions.model.SubscriptionDTO;
import com.example.subscriptions.model.UpdateSubscription;
import org.example.saasmanager.subscriptions.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
public class SubscriptionController implements SubscriptionsApi {
    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @Override
    public ResponseEntity<SubscriptionDTO> createNewSubscription(NewSubscription newSubscription) {
        SubscriptionDTO createdSubscription = subscriptionService.createNewSubscription(newSubscription);
        return new ResponseEntity<>(createdSubscription, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<SubscriptionDTO>> getAllSubscriptions() {
        List<SubscriptionDTO> foundSubscriptions = subscriptionService.getAllSubscriptions();
        return new ResponseEntity<>(foundSubscriptions, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SubscriptionDTO> getSubscriptionById(Integer subscriptionId) {
        Optional<SubscriptionDTO> foundSubscription = subscriptionService.getSubscription(subscriptionId);
        return foundSubscription
                .map(ResponseEntity::ok)  // Return 200 OK with if found
                .orElseGet(() -> ResponseEntity.notFound().build()); // 404 Not Found if not found
    }

    public ResponseEntity<SubscriptionDTO> updateSubscription(Integer subscriptionId, UpdateSubscription updateSubscription) {
        try {
            SubscriptionDTO updatedSubscription = subscriptionService.updateSubscription(subscriptionId, updateSubscription);
            return ResponseEntity.ok(updatedSubscription); // 200 OK with updated data
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build(); // 404 Not Found if doesn't exist
        }
    }

}
