package org.example.saasmanager.catalog.mapper;

import com.example.catalog.model.SaaSTool;
import net.saas.shared.entities.CatalogEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CatalogEntityMapper {
    @Mapping(source = "toolId", target = "toolId")
    @Mapping(source = "defaultCost", target = "defaultCost",qualifiedByName = "bigDecimalToFloat")
    @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "localDateTimeToOffsetDateTime")
    SaaSTool toDto(CatalogEntity catalogEntity);

    @Mapping(source = "toolId", target = "toolId")
    @Mapping(source = "defaultCost", target = "defaultCost", qualifiedByName = "floatToBigDecimal")
    @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "offsetDateTimeToLocalDateTime")
    CatalogEntity toEntity(SaaSTool saasTool);

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

    List<SaaSTool> toDtoList(List<CatalogEntity> catalogEntities);

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