package com.elono.model;

import java.util.Date;

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
public class Promocao {

	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private long id;

	@NotNull
	@Column( name = "validade" )
	private Date validade;
	
	//sempre em %
	@NotNull
	@Column( name="valor" )
	private int valor;

	@NotNull
	@Column( name = "todosProdutos" )
	private boolean todosProdutos;
	
	@ManyToOne
	private Produto produto;

}
