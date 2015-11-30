package com.elono.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
	@Column( name = "nome", length = 50 )
	private String nome;

	@NotNull
	@Enumerated( EnumType.STRING )
	@Column( name = "tipo" )
	private EnumPromocao tipo;

	@NotNull
	@Column( name = "dataValidade" )
	private Date dataValidade;

	@NotNull
	@OneToMany( mappedBy = "promocao" )
	private List<Produto> produtos;

	@NotNull
	@OneToMany( mappedBy = "promocao" )
	private List<Categoria> categorias;
}
