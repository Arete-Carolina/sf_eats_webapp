package com.sf_eats.webapp.controller;

import com.sf_eats.webapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestaurantController {
    @Autowired
    RestaurantRepository restaurantRepository;

//    @GetMapping("/restaurants")
//    @PostMapping("/restaurants")
}

