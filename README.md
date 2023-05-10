# gymNEXUS
## Description
A web app for coaches to create and assign routines to their clients. 
The clients can then view their routines. You can watch it in action on my IG account [here](https://www.instagram.com/reel/CsAaHrOr4hu/?utm_source=ig_web_button_share_sheet&igshid=MzRlODBiNWFlZA==). 

## Table of Contents
* [Installation](#installation)
* [Features and usage](#features-and-usage)
* [Technologies](#technologies)
* [TODO List](#todo-list)

## Installation
1. run `npm install` to install all dependencies from each folder (backend and frontend)
2. create a .env file in the backend folder and add the following variables:
   * JWT_SECRET = "your secret"
   * MONGO_URI = "your mongo uri"
   * PORT = "your port"
3. start by runnin `npm start` in the backend folder and then `npm run dev` in the frontend folder
4. go to localhost:3000 to view the app

## Features and usage
* Passwords are hashed using bcrypt
* Login and logout
* JWT authentication
* Create a coach account (this can be made in the main page by hitting the "I am new" button)
* Create a client account (Each coach can create a client account by going to the "Clients" page and hitting the "Create" button)
* Create, read, update and delete a routine. The page supports adding days to workouts and exercises to days. 
* Workout routines have a name, a list of days, each day have a day name, focus and a list of exercises, and each exercise have a name, sets, reps, cadence and notes. 
* Assign a routine to a client (this can be done by hitting the "Clients" button, selecting a client and hitting the "Assign workout" button)
* Each client has a list of assigned workouts, listed in the "Clients" dashboard.

## Technologies
* MongoDB
* Express
* Next.js
* Node.js

## TODO List
- [ ] Add a paid sign up feature
- [ ] Add a confirmation email feature
- [ ] Add a "Forgot username" feature
- [ ] Add a "Forgot password" feature
- [ ] Add metrics for the users to track their progress
- [ ] Improve the UI
- [ ] Make the app responsive
- [ ] Improve the UX
- [ ] Improve the security of the app
- [ ] Improve the code, maybe using a repository pattern which will make the code more readable and easier to maintain


