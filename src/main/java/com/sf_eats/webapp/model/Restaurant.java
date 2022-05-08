package com.sf_eats.webapp.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    @Column(name ="applicant")
    private String applicant;
    @Column(name ="locationDescription")
    private String locationDescription;
    @Column(name ="address")
    private String address;
    @Column(name ="photo")
    private String photo;
    @Column(name ="foodItems",length=1000)
    private String foodItems;
    @Column(name ="latitude")
    private float latitude;
    @Column(name ="longitude")
    private float longitude;
    @Column(name ="schedule")
    private String schedule;
    @Column(name ="location")
    private String location;

    public Restaurant(){

    }
    public Restaurant(String applicant, String locationDescription, String address, String photo, String foodItems, float latitude, float longitude, String schedule, String location) {
        this.applicant = applicant;
        this.locationDescription = locationDescription;
        this.address = address;
        this.photo = photo;
        this.foodItems = foodItems;
        this.latitude = latitude;
        this.longitude = longitude;
        this.schedule = schedule;
        this.location = location;
    }

    public long getId() {
        return id;
    }

    public String getApplicant() {
        return applicant;
    }

    public void setApplicant(String applicant) {
        this.applicant = applicant;
    }

    public String getLocationDescription() {
        return locationDescription;
    }

    public void setLocationDescription(String locationDescription) {
        this.locationDescription = locationDescription;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getFoodItems() {
        return foodItems;
    }

    public void setFoodItems(String foodItems) {
        this.foodItems = foodItems;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}


