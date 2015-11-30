package com.elono.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Pedido {
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private long id;

	@ManyToOne
	private Usuario usuario;

	@OneToMany( mappedBy = "pedido" )
	private List<ItemPedido> itens;

	@NotNull
	@Enumerated( EnumType.STRING )
	@Column( name = "status_pedido" )
	private EnumStatusPedido statusPedido;
}
