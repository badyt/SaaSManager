package org.example.saasmanager.licenses.mapper;

import com.example.licenses.model.LicenseDTO;
import org.example.saasmanager.subscriptions.repository.SubscriptionsRepository;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.License;
import org.example.shared.entities.Subscription;
import org.example.shared.entities.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface LicenseMapper {

    @Mapping(source = "subscription", target = "subscriptionId", qualifiedByName = "subscriptionToSubscriptionId")
    @Mapping(source = "user", target = "userId", qualifiedByName = "userToUserId")
    @Mapping(source = "user", target = "userName", qualifiedByName = "userToUserName")
    @Mapping(source = "subscription", target = "toolName", qualifiedByName = "subscriptionToToolName")
    @Mapping(source = "allocatedAt", target = "allocatedAt", qualifiedByName = "localDateTimeToOffsetDateTime")
    @Mapping(source = "lastUsedAt", target = "lastUsedAt", qualifiedByName = "localDateTimeToOffsetDateTime")
    LicenseDTO toDto(License license);

    @Mapping(source = "subscriptionId", target = "subscription", qualifiedByName = "subscriptionIdToSubscription")
    @Mapping(source = "userId", target = "user", qualifiedByName = "userIdToUser")
    @Mapping(source = "allocatedAt", target = "allocatedAt", qualifiedByName = "offsetDateTimeToLocalDateTime")
    @Mapping(source = "lastUsedAt", target = "lastUsedAt", qualifiedByName = "offsetDateTimeToLocalDateTime")
    License toEntity(LicenseDTO licenseDTO, @Context SubscriptionsRepository subscriptionsRepository, @Context UserRepository userRepository);

    List<LicenseDTO> toDtoList (List<License> licenses);

    // Custom mapping method for Integer (subscription ID) -> subscription
    @Named("subscriptionIdToSubscription")
    default Subscription subscriptionIdToSubscription(Integer subscriptionId, @Context SubscriptionsRepository subscriptionsRepository) {
        if (subscriptionId == null) {
            return null;
        }
        Optional<Subscription> tool = subscriptionsRepository.findById(subscriptionId);
        return tool.orElse(null);
    }

    // Custom mapping method for subscription -> subscriptionId
    @Named("subscriptionToSubscriptionId")
    default Integer subscriptionToSubscriptionId(Subscription subscription) {
        return subscription != null ? subscription.getSubscriptionId() : null;
    }

    // Custom mapping method for Integer (user ID) -> user
    @Named("userIdToUser")
    default User userIdToUser(Integer userId, @Context UserRepository userRepository) {
        if (userId == null) {
            return null;
        }
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    // Custom mapping method for user -> userId
    @Named("userToUserId")
    default Integer userToUserId(User user) {
        return user != null ? user.getUserId() : null;
    }

    // Custom mapping method for user -> userName
    @Named("userToUserName")
    default  String userToUserName(User user) {
        return user != null ? user.getName() : null;
    }


    // Custom mapping method for user -> userName
    @Named("subscriptionToToolName")
    default  String subscriptionToToolName(Subscription subscription) {
        return subscription != null ? subscription.getTool().getName() : null;
    }

    // Custom mapping method for LocalDateTime -> OffsetDateTime
    @Named("localDateTimeToOffsetDateTime")
    default OffsetDateTime localDateTimeToOffsetDateTime(LocalDateTime localDateTime) {
        return localDateTime != null ? localDateTime.atOffset(ZoneOffset.UTC) : null;
    }

    // Custom mapping method for OffsetDateTime -> LocalDateTime
    @Named("offsetDateTimeToLocalDateTime")
    default LocalDateTime offsetDateTimeToLocalDateTime(OffsetDateTime offsetDateTime) {
        return offsetDateTime != null ? offsetDateTime.toLocalDateTime() : null;
    }
}
