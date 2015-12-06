package com.elono.controllers;

import java.util.Iterator;
import java.util.List;

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
import com.elono.model.ImagemFilter;
import com.elono.services.UploadImagemService;

@CrossOrigin
@RestController
public class UploadImagemController2 {
	@Autowired
	UploadImagemService uploadImagemService;

	// Download a file
	@RequestMapping( value = "/imagem/download", method = RequestMethod.GET )
	public ResponseEntity<?> downloadFile( @RequestParam( "filename" ) String filename) {

		Imagem imagem = uploadImagemService.findByFilename( filename );

		// No file found based on the supplied filename
		if ( imagem == null ) { return new ResponseEntity<>( "{}", HttpStatus.NOT_FOUND ); }

		// Generate the http headers with the file properties
		HttpHeaders headers = new HttpHeaders();
		headers.add( "content-disposition", "attachment; filename=" + imagem.getFilename() );

		// Split the mimeType into primary and sub types
		String primaryType, subType;
		try {
			primaryType = imagem.getMimeType().split( "/" )[0];
			subType = imagem.getMimeType().split( "/" )[1];
		} catch ( IndexOutOfBoundsException | NullPointerException ex ) {
			return new ResponseEntity<>( "{}", HttpStatus.INTERNAL_SERVER_ERROR );
		}

		headers.setContentType( new MediaType( primaryType, subType ) );

		return new ResponseEntity<>( imagem.getFile(), headers, HttpStatus.OK );
	}

	// Download a file
	@RequestMapping( value = "/imagens", method = RequestMethod.GET )
	public ResponseEntity<?> listFile() {

		List<ImagemFilter> listaImagem = uploadImagemService.listImagem();

		if ( listaImagem.size() == 0 ) { return new ResponseEntity<>( "{}", HttpStatus.NOT_FOUND ); }

		return new ResponseEntity<>( listaImagem, HttpStatus.OK );
	}

	@RequestMapping( value = "/imagem/upload", method = RequestMethod.POST )
	public ResponseEntity<?> uploadFile( MultipartHttpServletRequest request ) {
		try {
			Iterator<String> itr = request.getFileNames();

			while ( itr.hasNext() ) {
				String uploadedFile = itr.next();
				MultipartFile file = request.getFile( uploadedFile );
				String mimeType = file.getContentType();
				String filename = file.getOriginalFilename();
				byte[] bytes = file.getBytes();

				Imagem newFile = new Imagem();
				newFile.setFile( bytes );
				newFile.setMimeType( mimeType );
				newFile.setFilename( filename );

				uploadImagemService.uploadFile( newFile );
			}
		} catch ( Exception e ) {
			return new ResponseEntity<>( "{}", HttpStatus.INTERNAL_SERVER_ERROR );
		}

		return new ResponseEntity<>( "{}", HttpStatus.OK );
	}

}