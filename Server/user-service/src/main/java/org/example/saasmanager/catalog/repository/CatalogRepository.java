package org.example.saasmanager.catalog.repository;

import net.saas.shared.entities.CatalogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatalogRepository extends JpaRepository<CatalogEntity,Integer> {

}
