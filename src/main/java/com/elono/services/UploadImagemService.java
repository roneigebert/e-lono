package com.elono.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elono.model.Imagem;
import com.elono.model.ImagemFilter;
import com.elono.repository.ImagemRepository;

import lombok.val;

@Service
public class UploadImagemService {

	@Autowired
	ImagemRepository imagemRepository;

	public Imagem findByFilename( String filename ) {
		return imagemRepository.findByFilename( filename );
	}

	// Upload the file
	public void uploadFile( Imagem doc ) {
		imagemRepository.saveAndFlush( doc );
	}

	// Upload the file
	public List<ImagemFilter> listImagem() {
		val listaRetorno = new ArrayList<ImagemFilter>();
		for ( Imagem imagem : imagemRepository.findAll() ) {
			listaRetorno.add(
					new ImagemFilter( imagem.getFilename(), "http://localhost:8080/imagem/download?filename=" + imagem.getFilename() ) );
		}
		return listaRetorno;
	}

}
