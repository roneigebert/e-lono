package com.elono.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Usuario {
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private long id;

	@NotNull
	@Column( name = "nome", length = 100 )
	private String nome;

	@NotNull
	@Column( name = "email", length = 100 )
	private String email;

	@NotNull
	@Column( name = "confirmado" )
	private Boolean confirmado = false;

}
