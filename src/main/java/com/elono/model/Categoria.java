package com.elono.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class Categoria {

	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private long id;

	@NotNull
	@Column( name = "nome", length = 50 )
	private String nome;

	@OneToMany( mappedBy = "categoria" )
	private List<Produto> produtos;

	@ManyToOne
	private Promocao promocao;
}
