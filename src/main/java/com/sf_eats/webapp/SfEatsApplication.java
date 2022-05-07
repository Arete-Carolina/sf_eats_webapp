package com.sf_eats.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import javax.sql.DataSource;

@SpringBootApplication (exclude = DataSourceAutoConfiguration.class)
public class SfEatsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SfEatsApplication.class, args);
	}

}
