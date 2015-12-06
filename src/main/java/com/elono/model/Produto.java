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
public class Produto {
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private long id;

	@NotNull
	@Column( name = "nome", length = 50 )
	private String nome;

	@NotNull
	@Column( name = "valor", columnDefinition = "Decimal(10,2) default '0.00'" )
	private Double valor;

	@NotNull
	@Column( name = "descricao", length = 1000 )
	private String descricao;

	@NotNull
	@Column( name = "disponivel" )
	private Boolean disponivel;

	@NotNull
	@Column( name = "imagem" )
	private String imagem;

	@ManyToOne
	private Categoria categoria;

	@ManyToOne
	private Promocao promocao;

}
