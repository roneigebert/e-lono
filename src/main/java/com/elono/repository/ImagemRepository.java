package com.elono.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elono.model.Imagem;

@RepositoryRestResource(collectionResourceRel = "imagens", path = "imagens")
public interface ImagemRepository extends CrudRepository<Imagem, Long> {

}
