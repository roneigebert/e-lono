package com.elono.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;

import com.elono.model.Promocao;

@RepositoryRestResource(collectionResourceRel = "promocoes", path = "promocoes")
public interface PromocaoRepository extends JpaRepository<Promocao, Long> {

    List<Promocao> findByValidadeAfter( @Param( "validade" ) @DateTimeFormat( pattern = "yyyyMMdd" ) Date validade);
    
}
