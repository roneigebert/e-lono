package com.elono.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elono.model.Imagem;

@RepositoryRestResource( collectionResourceRel = "imagens", path = "imagens" )
public interface ImagemRepository extends JpaRepository<Imagem, String> {
	
	Imagem findByName(@Param("name") String fileName);

}