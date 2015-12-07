package com.elono.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@Entity
public class Imagem {
	
	@Id
    private String name;

    @Lob
    @NotNull
    @JsonIgnore
    private byte[] file;

    @Column
    private String mimeType;
		

}
