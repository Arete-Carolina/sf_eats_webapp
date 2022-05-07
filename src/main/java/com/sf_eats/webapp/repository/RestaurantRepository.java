package com.sf_eats.webapp.repository;

import com.sf_eats.webapp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
