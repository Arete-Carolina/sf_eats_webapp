package com.sf_eats.webapp.controller;

import com.sf_eats.webapp.model.Restaurant;
import com.sf_eats.webapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RestaurantController {
    @Autowired
    RestaurantRepository restaurantRepository;

    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants(@RequestParam(required = false) String sortBy) {
        System.out.println(sortBy);

        try {
            System.out.println(restaurantRepository.findAll());
            List<Restaurant> restaurants = new ArrayList<Restaurant>(restaurantRepository.findAll());

            System.out.println(restaurants);

            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//    @PostMapping("/restaurants")
//    public ResponseEntity<Restaurant> createTutorial(@RequestBody Restaurant restaurant) {
//        try {
//            Restaurant _restaurant = restaurantRepository
//                    .save(new Restaurant(restaurant.getTitle(), restaurant.getDescription(), false));
//            return new ResponseEntity<>(_restaurant, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}

