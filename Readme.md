# Getting started with Discuss-It

## Technologies Used in Project
React Js (Client Side): Version 17.0.1\
Node/Express Js (Server Side): Version 4.17.1\
MongoDb Atlas to store the data.\ 

## Setting up the environment
Before runing the application a couple of commands are needed to be run.

In the project directory,
### `cd backend`
### `npm i`

### `cd my-app`
### `npm i`
Both will download the npm dependancies

### `npm start` 
In both the directories my-app and backend
Runs the client and server side concurrently.\
Open [http://localhost:3000](http://localhost:3000) to view client side in the browser.\
Open [http://localhost:8000](http://localhost:8000) to view server side in the browser.

## Testing the application
- Open different tabs in the browser window at url [http://localhost:3000](http://localhost:3000)  to join rooms for different users
- Enter the username and room name(case insensitive) to join the discussion.

## Troubleshooting
![WhatsApp Image 2021-11-26 at 21 09 44](https://user-images.githubusercontent.com/54857354/143604694-a7d3da94-4598-48d0-ae9d-6e9ed0146e25.jpeg)
Sometimes error faced while installing the dependencies in server side 
Run Command : `npm install nodemon`

## Schemas of the Collections.
There are three collections Chats, Users, Rooms, to store the data.
Following are the schemas:
### Users
name: Name of the user,\
room: Room the user has joined
### Chats
message: String message user has posted,\
author: User who posted the message,\
room: Room in which the message is posted.
### Rooms
room: Room name,\
User: Foreign key reference to user table.

#### *For testing purpose the database is made public






