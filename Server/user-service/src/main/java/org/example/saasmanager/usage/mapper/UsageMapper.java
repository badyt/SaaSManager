package org.example.saasmanager.usage.mapper;

import com.example.usage_monitoring.model.UsageLogDTO;
import org.example.saasmanager.licenses.repository.LicenseRepository;
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
    @Mapping(source = "licenseId", target = "license", qualifiedByName = "licenseIdToLicense")
    @Mapping(source = "activityDate", target = "activityDate", qualifiedByName = "offsetDateTimeToLocalDateTime")
    UsageLog toEntity(UsageLogDTO usageLogDTO, @Context LicenseRepository licenseRepository);

    @Mapping(source = "license", target = "licenseId", qualifiedByName = "licenseToLicenseId")
    @Mapping(source = "license", target = "userName", qualifiedByName = "licenseToUserName")
    @Mapping(source = "license", target = "toolName", qualifiedByName = "licenseToToolName")
    @Mapping(source = "activityDate", target = "activityDate", qualifiedByName = "localDateTimeToOffsetDateTime")
    UsageLogDTO toDto(UsageLog usageLog);

    List<UsageLogDTO> toDtoList(List<UsageLog> usageLogs);


    // Custom mapping method for Integer (license ID) -> License
    @Named("licenseIdToLicense")
    default License licenseIdToLicense(Integer licenseId, @Context LicenseRepository licenseRepository) {
        if (licenseId == null) {
            return null;
        }
        Optional<License> license = licenseRepository.findById(licenseId);
        return license.orElse(null);
    }

    // Custom mapping method for License -> Integer (license ID)
    @Named("licenseToLicenseId")
    default Integer licenseToLicenseId(License license) {
        return license != null ? license.getLicenseId() : null;
    }

    // Custom mapping method for License -> String (username)
    @Named("licenseToUserName")
    default String licenseToUserName(License license) {
        return license != null ? license.getUser().getName() : null;
    }

    // Custom mapping method for License -> String (toolname)
    @Named("licenseToToolName")
    default String licenseToToolName(License license) {
        return license != null ? license.getSubscription().getTool().getName() : null;
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
