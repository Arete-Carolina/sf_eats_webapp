SF EATS

A full stack application to show all the restaurants and food-trucks in San Francisco,CA.

This application allows the user to see restaurants and food trucks in San Francisco. The user is also able to sort the restaurants by name and location in both ascending and descending order.

The user is also able to see the restaurant details by clicking on the restaurant name, which will render the restaurant info in another page, and display an image to make the page more interesting.

Additionally, the user is able to add a new restaurant by simply clicking on “Restaurant Registration”. Restaurant registration will generate a state in which the user is able to add all the needed info. If the user skips a field, the program will simply take null as a response. Once the user has registered the restaurant, the restaurant will show up at the end of the list of restaurants.


<!-- TABLE OF CONTENTS

Back-end:
Front-end: -->


TECH STACK AND ARCHITECTURAL CONSIDERATIONS

Back-end: Spring Boot, Java, MySQL
Front-end: React.js, Bootstrap
MVC: throughout the whole project MVC was applied. In the front-end, the controller has the *, and the model has the **. In the back-end, the controller has RestaurantController.java, and the model has Restaurant.java.
OOP: Throughout the project, inheritance was applied to use properties from one class to other classes. For instance, *****

****Names, relationships and purposes of all components****

ENDPOINTS

GET - Sort the list of restaurants by name and address
GET - View restaurants details
POST - Add restaurants

FULL WEB APP

![Screenshot](imgs/Screen%20Shot%202022-05-09%20at%201.07.30%20PM.png)
![Screnshot](imgs/Screen%20Shot%202022-05-09%20at%201.10.53%20PM.png)