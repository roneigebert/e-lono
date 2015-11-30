package com.elono.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ItemPedido {

	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private long id;

	@ManyToOne
	private Produto produto;

	@NotNull
	private Integer quantidade;

	@ManyToOne
	private Pedido pedido;

	@NotNull
	@Column( name = "valor", columnDefinition = "Decimal(10,2) default '0.00'" )
	private Double valor;

	@NotNull
	@Column( name = "valorDesconto", columnDefinition = "Decimal(10,2) default '0.00'" )
	private Double valorDesconto;

}
