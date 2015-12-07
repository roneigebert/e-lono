package com.elono;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.elono.model.Pedido;

@SpringBootApplication
public class Application extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure( SpringApplicationBuilder application ) {
		return application.sources( Application.class );
	}

	public static void main( String[] args ) throws Exception {
		ConfigurableApplicationContext ctx = SpringApplication.run( Application.class, args );

		RepositoryRestConfiguration restConfiguration = ctx.getBean( RepositoryRestConfiguration.class );

		restConfiguration.exposeIdsFor( Pedido.class );
	}

}