package com.elono.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import lombok.val;

@Controller
public class UploadImagemController {

	@Autowired
	private Environment env;

	@RequestMapping( value = "/uploadImagem", method = RequestMethod.POST )
	@ResponseBody
	public ResponseEntity<?> uploadImagem(@RequestParam( "uploadImagem" ) MultipartFile uploadImagem) {

		String[] ext = uploadImagem.getOriginalFilename().toLowerCase().split( "\\." );

		val fileUploaded = UUID.randomUUID().toString() + "." + ext[( ext.length - 1 )];

		val directory = env.getProperty( "elono.paths.uploadedImagem" );
		HttpHeaders headers = new HttpHeaders();

		try {
			val filePath = new File( Paths.get( directory, fileUploaded ).toString() );
			val stream = new BufferedOutputStream( new FileOutputStream( filePath ) );
			stream.write( uploadImagem.getBytes() );
			stream.close();
			headers.setLocation( filePath.toURI() );
		} catch ( Exception e ) {
			System.out.println( e.getMessage() );
			e.printStackTrace();
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST );
		}

		return new ResponseEntity<Void>( headers, HttpStatus.CREATED );
	} // method uploadFile

}
