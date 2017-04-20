# Merlion Learns to Code
Merlion Learns to Code is a web application which allows users to search for technology bootcamps in Singapore. This is a CRUD application, using Express (framework) and MongoDB (NoSQL database). This application also allows users to sign up through a simple registration.

## Outline
### Unrestricted Access (Public View)
Prospective students are able to use a search form to enter criteria for the bootcamps they are seeking. They are then directed to a summarised version of results and can also choose to view the full details of a course they are interested in.

This part of the application uses:
* READ

### User Restricted Access
Users can sign up so that they are able to "favourite" courses that they are interested in. These will be saved to their account.

This part of the application uses:
* READ
* UPDATE

### Admin Restricted Access
Administrators can add new courses and amend and/or delete existing courses.

The application allows administrators to sign up and subsequently log in although this would be unlikely in a real-life situation. This was done so that people interested in this project can have access to this part of the application by signing up.

This part of the application uses:
* CREATE
* READ
* UPDATE
* DELETE

## Use Cases
### Use Cases Diagram
![Use Cases Image](http://i.imgur.com/wWXYlgI.jpg)

### Prospect
The prospective student is able to register, log in, compare bootcamps, favourite bootcamps and express interest(functionality to be implemented).

### Bootcamp Administrator
The bootcamp administrator is able to register, log in, CRUD bootcamps and view an expression of interest from a prospective student(functionality to be implemented).

## ERD
![ERD Image](http://i.imgur.com/z5XC40c.jpg)

### Relationships Explained
Each course can be favourited many times or none at all thus the use of "zero or many" to represent this relationship. Conversely, a favourite must only be associated with one course.

Likewise, a prospect can have many favourites or none at all. Conversely, a favourite must only be associated with one prospect.

## Live Version

Deployed on: [Heroku](https://merlionlearns.herokuapp.com/)

## Built With
* node.js
* Express (framework)
* MongoDB
* JavaScript
* CSS
* HTML

## Development
### Models
There are three models:
* admin
* course
* user

The admin model provides the schema for authentication of administrators, namely involving the email and password fields.

The course model provides the schema for all courses used in the application. The information from this schema is used in all the CRUD functions.

The user model provides the schema for authentication of users and also contains the array of user favourites.

### Authentication
This application uses a simple registration method. The main part of authentication follows Chris Sevilleja's tutorial on [Scotch.io](https://scotch.io/tutorials/easy-node-authentication-setup-and-local).

However, as two models needed authentication, amendments were made to the tutorial to allow both models to serialize, deserialize and have separate restricted pages.

## Improvements/ Known Bugs
* Login Issues
* Organisation of project: controllers, routers, views folder
* Default values on form

## Authors
Maria Wilson - hexhex23

## Acknowledgments
This application is built for programming practice purposes only.

[Google Fonts](https://fonts.googleapis.com/css?family=Oswald|Pacifico)

[Scotch.io (authentication)](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)

[Switchup (inspiration)](https://www.switchup.org/)
