package com.sf_eats.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.sql.DataSource;

@SpringBootApplication
@EnableJpaRepositories("com.sf_eats.webapp.repository")
public class SfEatsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SfEatsApplication.class, args);
	}

}
