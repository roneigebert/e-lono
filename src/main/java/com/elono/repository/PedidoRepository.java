package com.elono.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elono.model.Pedido;

@RepositoryRestResource(collectionResourceRel = "pedidos", path = "pedidos")
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
