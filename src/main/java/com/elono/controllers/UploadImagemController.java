package com.elono.controllers;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.elono.model.Imagem;
import com.elono.services.UploadImagemService;

@CrossOrigin
@RestController
public class UploadImagemController {
	
	@Autowired
	UploadImagemService uploadImagemService;

	@RequestMapping( value = "/imagem/download", method = RequestMethod.GET )
	public ResponseEntity<?> download( @RequestParam( "name" ) String name) throws IOException{
		final Imagem imagem = uploadImagemService.findByName( name );
		if ( imagem == null )
			return new ResponseEntity<>( "{}", HttpStatus.NOT_FOUND );
		final HttpHeaders headers = new HttpHeaders();
		headers.add( "content-disposition", "attachment; filename=" + imagem.getName() );
		final String primaryType = imagem.getMimeType().split( "/" )[0];
		final String subType = imagem.getMimeType().split( "/" )[1];
		headers.setContentType( new MediaType( primaryType, subType ) );
		return new ResponseEntity<>( imagem.getFile(), headers, HttpStatus.OK );
	}

	@RequestMapping( value = "/imagem/upload", method = RequestMethod.POST )
	public ResponseEntity<?> uploadFile( MultipartHttpServletRequest request ) throws IOException{
		final MultipartFile file = request.getFile( "file" );
		final Imagem imagem = new Imagem();
		imagem.setFile( file.getBytes() );
		imagem.setMimeType( file.getContentType() );
		imagem.setName( UUID.randomUUID().toString() );
		uploadImagemService.uploadFile( imagem );
		return new ResponseEntity<>( imagem, HttpStatus.OK );
	}

}