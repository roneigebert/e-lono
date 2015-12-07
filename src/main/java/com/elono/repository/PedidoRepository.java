package com.elono.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.elono.model.EnumStatusPedido;
import com.elono.model.Pedido;

@RepositoryRestResource(collectionResourceRel = "pedidos", path = "pedidos")
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

	List<Pedido> findByStatusPedido( @Param( "statusPedido" ) EnumStatusPedido status );
	
}
