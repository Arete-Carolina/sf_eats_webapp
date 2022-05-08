package com.sf_eats.webapp.repository;

import com.sf_eats.webapp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long> {
}
