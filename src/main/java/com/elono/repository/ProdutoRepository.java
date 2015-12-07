package com.elono.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elono.model.Produto;

@RepositoryRestResource(collectionResourceRel = "produtos", path = "produtos")
public interface ProdutoRepository extends CrudRepository<Produto, Long> {

	List<Produto> findByDisponivel(@Param("disponivel") boolean disponivel);

}
