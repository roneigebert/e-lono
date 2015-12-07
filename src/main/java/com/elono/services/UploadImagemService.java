package com.elono.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elono.model.Imagem;
import com.elono.repository.ImagemRepository;

@Service
public class UploadImagemService {

	@Autowired
	ImagemRepository imagemRepository;

	public Imagem findByName( String filename ) {
		return imagemRepository.findByName( filename );
	}

	public void uploadFile( Imagem doc ) {
		imagemRepository.saveAndFlush( doc );
	}

}
