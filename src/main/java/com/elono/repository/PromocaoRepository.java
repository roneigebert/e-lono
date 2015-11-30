package com.elono.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elono.model.Promocao;

@RepositoryRestResource(collectionResourceRel = "promocao", path = "promocao")
public interface PromocaoRepository extends JpaRepository<Promocao, Long> {

}
