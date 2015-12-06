package com.elono.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Imagem {
	
	@Id
    private String filename;

    @Lob
    private byte[] file;

    private String mimeType;
		

}
