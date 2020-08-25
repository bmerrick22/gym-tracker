# Gymsite

# About
This project was developed in response to an issue I faced when signing up for a workout slot with my University's gym. As I now have to reserve a spot digitally at my gym in advance, I struggle with finding available times that work with my schedule. Gym slots are released 2.5 days in advance, and I often forget to sign up for my work out slots as I am a busy college student. So, I developed this site to help me with my issue. After inputting a date, and then a time, the user is able to see if their desired slot is "available," "not available", or "not yet available." The "not yet available" feature means that a workout slot is not present on the university site, however, the gym tracker site will send you an email when it is!

## Project Breakdown
I built this project as a full-stack system upon mainly self-taught knowledge. The back-end is a Python/Flask API that is hosted in the Google App Enginer cloud. The script scrapes the university gym site for data, formats it into JSON, and makes it availabel for POST and GET requests. On the front-end, I created an Angular 9 app hosted by netlify. This site makes use of components, forms, and http requests to display information and communicate with the back-end. All code can be found here, on my GitHub. 

## Development Info
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

