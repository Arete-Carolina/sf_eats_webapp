package com.sf_eats.webapp.controller;

import com.sf_eats.webapp.model.Restaurant;
import com.sf_eats.webapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class RestaurantController {
    @Autowired
    RestaurantRepository restaurantRepository;

    @GetMapping("/restaurants")
    public ResponseEntity<Iterable<Restaurant>> getAllRestaurants(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String page
    ) {
//      PAGINATION
        int pageInt = 0;
        try {
            if (page != null) pageInt = Integer.parseInt(page);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

//      SORTING
        List<String> validSortCols = Arrays.asList("id", "applicant", "address");
        List<String> validSortDirs = Arrays.asList("asc", "desc");
        String sortByCol = "id";
        String sortByDirStr = "asc";

        if (sortBy != null) {
            try {
                List<String> sortBySplit = Arrays.asList(sortBy.toLowerCase().split(","));
                sortByCol = sortBySplit.get(0);
                sortByDirStr = (sortBySplit.size() > 1) ? sortBySplit.get(1) : "asc";
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        }

        if (!validSortDirs.contains(sortByDirStr) || !validSortCols.contains(sortByCol)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        Sort.Direction sortByDir = sortByDirStr.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

        try {
            Iterable<Restaurant> restaurants = restaurantRepository.findAll(
                    PageRequest.of(pageInt, 25, Sort.by(sortByDir, sortByCol)));
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable("id") long id) {
        Optional<Restaurant> restaurantData = restaurantRepository.findById(id);
        return restaurantData
                .map(restaurant -> new ResponseEntity<>(restaurant, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping("/restaurants")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
        try {
            Restaurant _restaurant = restaurantRepository.save(restaurant);
            return new ResponseEntity<>(_restaurant, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

