package org.example.saasmanager.catalog.controller;

import com.example.catalog.api.CatalogApi;
import com.example.catalog.model.NewSaaSTool;
import com.example.catalog.model.SaaSTool;
import jakarta.persistence.EntityNotFoundException;
import org.example.saasmanager.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CatalogController implements CatalogApi {
    private final CatalogService catalogService;

    @Autowired
    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @Override
    public ResponseEntity<SaaSTool> addSaaSTool(NewSaaSTool newSaaSTool){
        SaaSTool createdSaasTool = catalogService.addSaasTool(newSaaSTool);
        return new ResponseEntity<>(createdSaasTool, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<SaaSTool>> getCatalog() {
        List<SaaSTool> saaSTools = catalogService.getAllSaaSTools();
        return new ResponseEntity<>(saaSTools,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> removeTool(Integer toolId) {
        try {
            catalogService.deleteTool(toolId);
            return ResponseEntity.noContent().build(); // 204 No Content on successful delete
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404 Not Found if tool doesn't exist
        }
    }
}
