package org.example.saasmanager.subscriptions.mapper;

import com.example.subscriptions.model.SubscriptionDTO;
import com.example.subscriptions.model.SubscriptionDTOTool;
import org.example.saasmanager.catalog.repository.CatalogRepository;
import net.saas.shared.entities.CatalogEntity;
import net.saas.shared.entities.Subscription;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {

    @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "offsetDateTimeToLocalDateTime")
    @Mapping(source = "tool", target = "tool", qualifiedByName = "mapToolDTOToEntity")
    @Mapping(source = "cost", target = "cost", qualifiedByName = "floatToBigDecimal")
    @Mapping(source = "renewalDate", target = "renewalDate")
    @Mapping(source = "licenseCount", target = "licenseCount")
    @Mapping(source = "allocatedLicenses", target = "allocatedLicenses")
    Subscription toEntity(SubscriptionDTO subscriptionDTO, @Context CatalogRepository catalogRepository);

    @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "localDateTimeToOffsetDateTime")
    @Mapping(source = "tool", target = "tool", qualifiedByName = "mapToolEntityToDTO")
    @Mapping(source = "cost", target = "cost", qualifiedByName = "bigDecimalToFloat")
    @Mapping(source = "renewalDate", target = "renewalDate")
    @Mapping(source = "licenseCount", target = "licenseCount")
    @Mapping(source = "allocatedLicenses", target = "allocatedLicenses")
    SubscriptionDTO toDto(Subscription subscription);

    List<SubscriptionDTO> toDtoList(List<Subscription> subscriptions);

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

    // Custom mapping method for Tool -> toolId
    @Named("toolToToolId")
    default Integer toolToToolId(CatalogEntity tool) {
        return tool != null ? tool.getToolId() : null;
    }

    // Custom mapping method for Integer (tool ID) -> Tool
    @Named("toolIdToTool")
    default CatalogEntity toolIdToTool(Integer toolId, @Context CatalogRepository catalogRepository) {
        if (toolId == null) {
            return null;
        }
        Optional<CatalogEntity> tool = catalogRepository.findById(toolId);
        return tool.orElse(null);
    }

    // Convert Tool Entity to DTO with Date Mapping
    @Named("mapToolEntityToDTO")
    default SubscriptionDTOTool mapToolEntityToDTO(CatalogEntity tool) {
        if (tool == null) return null;
        return new SubscriptionDTOTool().toolId(tool.getToolId())
                .name(tool.getName())
                .description(tool.getDescription())
                .defaultCost(tool.getDefaultCost())
                .createdAt(tool.getCreatedAt().atOffset(ZoneOffset.UTC));
    }

    // Convert Tool DTO to Entity with Date Mapping
    @Named("mapToolDTOToEntity")
    default CatalogEntity mapToolDTOToEntity(SubscriptionDTOTool toolDTO) {
        if (toolDTO == null) return null;
        return new CatalogEntity(
                toolDTO.getToolId(),
                toolDTO.getName(),
                toolDTO.getDescription(),
                (toolDTO.getDefaultCost()),
                toolDTO.getCreatedAt().toLocalDateTime() // Convert OffsetDateTime to LocalDateTime
        );
    }

    // Custom conversion from Float to BigDecimal
    @Named("floatToBigDecimal")
    default BigDecimal floatToBigDecimal(Float cost) {
        return cost != null ? BigDecimal.valueOf(cost) : null;
    }

    // Custom conversion from BigDecimal to Float
    @Named("bigDecimalToFloat")
    default Float bigDecimalToFloat(BigDecimal cost) {
        return cost != null ? cost.floatValue() : null;
    }
}
