package org.example.saasmanager.usage.mapper;

import com.example.usage_monitoring.model.UsageLogDTO;
import org.example.saasmanager.subscriptions.repository.SubscriptionsRepository;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.*;
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
public interface UsageMapper {
    @Mapping(source = "userId", target = "user", qualifiedByName = "userIdToUser")
    @Mapping(source = "subscriptionId", target = "subscription", qualifiedByName = "subscriptionIdToSubscription")
    @Mapping(source = "activityDate", target = "activityDate", qualifiedByName = "offsetDateTimeToLocalDateTime")
    UsageLog toEntity(UsageLogDTO usageLogDTO, @Context UserRepository userRepository, @Context SubscriptionsRepository subscriptionsRepository);

    @Mapping(source = "user", target = "userId", qualifiedByName = "userToUserId")
    @Mapping(source = "subscription", target = "subscriptionId", qualifiedByName = "subscriptionToSubscriptionId")
    @Mapping(source = "activityDate", target = "activityDate", qualifiedByName = "localDateTimeToOffsetDateTime")
    UsageLogDTO toDto(UsageLog usageLog);

    List<UsageLogDTO> toDtoList(List<UsageLog> usageLogs);


    // Custom mapping method for Integer (user ID) -> User
    @Named("userIdToUser")
    default User userIdToUser(Integer userId, @Context UserRepository userRepository) {
        if (userId == null) {
            return null;
        }
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    // Custom mapping method for Integer (subscription ID) -> Subscription
    @Named("subscriptionIdToSubscription")
    default Subscription subscriptionIdToSubscription(Integer subscriptionId, @Context SubscriptionsRepository subscriptionsRepository) {
        if (subscriptionId == null) {
            return null;
        }
        Optional<Subscription> subscription = subscriptionsRepository.findById(subscriptionId);
        return subscription.orElse(null);
    }

    // Custom mapping method for User -> Integer (user ID)
    @Named("userToUserId")
    default Integer userToUserId(User user) {
        return user != null ? user.getUserId() : null;
    }

    // Custom mapping method for Subscription -> Integer (subscription ID)
    @Named("subscriptionToSubscriptionId")
    default Integer roleToRoleId(Subscription subscription) {
        return subscription != null ? subscription.getSubscriptionId() : null;
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
