package org.example.saasmanager.catalog.service;

import com.example.catalog.model.NewSaaSTool;
import com.example.catalog.model.SaaSTool;
import jakarta.persistence.EntityNotFoundException;
import org.example.saasmanager.catalog.mapper.CatalogEntityMapper;
import org.example.saasmanager.catalog.repository.CatalogRepository;
import org.example.shared.entities.CatalogEntity;
import org.example.shared.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CatalogService {
    private final CatalogRepository catalogRepository;
    private final CatalogEntityMapper catalogEntityMapper;

    @Autowired
    public CatalogService(CatalogRepository catalogRepository,CatalogEntityMapper catalogEntityMapper){
        this.catalogRepository = catalogRepository;
        this.catalogEntityMapper = catalogEntityMapper;
    }

    public List<SaaSTool> getAllSaaSTools (){
        List<CatalogEntity> saaSTools = catalogRepository.findAll();
        return catalogEntityMapper.toDtoList(saaSTools);
    }

    public SaaSTool getToolById(Integer toolId) {
        CatalogEntity foundTool = catalogRepository.findById(toolId)
                .orElseThrow(() -> new EntityNotFoundException("Tool not found with ID: " + toolId));
        return catalogEntityMapper.toDto(foundTool);
    }

    public SaaSTool addSaasTool (NewSaaSTool newSaaSTool) {
        CatalogEntity newCatalogEntity = CatalogEntity.builder()
                .name(newSaaSTool.getName())
                .description(newSaaSTool.getDescription())
                .defaultCost(BigDecimal.valueOf(newSaaSTool.getDefaultCost()))
                .build();
        CatalogEntity savedEntity = catalogRepository.save(newCatalogEntity);
        return catalogEntityMapper.toDto(savedEntity);
    }

    public void deleteTool(Integer toolId) {
        CatalogEntity tool = catalogRepository.findById(toolId)
                .orElseThrow(() -> new EntityNotFoundException("Tool not found with ID: " + toolId));
        catalogRepository.delete(tool);
    }
}
