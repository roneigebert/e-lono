package com.elono.model;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class Imagem {
	
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private long id;

	@NotNull
	@Column( name = "endereco", length = 100 )
	private String endereco;

	@OneToMany( mappedBy = "imagem" )
	private List<Produto> produtos;

}
