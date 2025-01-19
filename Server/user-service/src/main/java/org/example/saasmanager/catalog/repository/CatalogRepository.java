package org.example.saasmanager.catalog.repository;

import org.example.shared.entities.CatalogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatalogRepository extends JpaRepository<CatalogEntity,Integer> {

}
