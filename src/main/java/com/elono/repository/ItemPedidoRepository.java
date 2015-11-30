package com.elono.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elono.model.ItemPedido;

@RepositoryRestResource(collectionResourceRel = "itens", path = "itens")
public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {

}
