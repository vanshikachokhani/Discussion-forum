// Libraray
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require('mongoose');
const Chats = require("./models/Chats");
const Rooms = require("./models/Rooms");
const Users = require("./models/Users");

const { addUser, removeUser, getUser, getRoomUsers } = require("./entity");

// Instances
const app = express()
const server = http.createServer(app);
const io = socketio(server,{cors: { origin: '*' }})
const mongoDB = 'mongodb+srv://vanshika:vanshika123@cluster0.1fsdc.mongodb.net/Discussion-forum?retryWrites=true&w=majority'


// End point
app.get('/',(req,res) => {
  res.json("Api is working");
})

mongoose
.connect(mongoDB)
.then(()=>{
  console.log("Database connected");
})
.catch((err) => console.error(err));

// Socket

io.on('connect',(socket) => {
  

  socket.on('join',({user,room},callback) => {
    console.log(user,room)
      const {response , error} = addUser({id: socket.id , user:user, room: room})

      console.log(response)

      if(error) {
        callback(error)
        return;
      }
      socket.join(response.room);
      Chats.find({room:`${response.room}`}).then((res)=>{
        res.map((result) => {
          socket.emit('output-message', {user: result.author, text: result.msg});
        })
      })
      socket.emit('message', { user: 'Admin' , text: `Welcome ${response.user} ` });
      socket.broadcast.to(response.room).emit('message', { user: 'Admin', text : `${response.user} has joined the room` })
      io.to(response.room).emit('roomMembers', getRoomUsers(response.room))
  })

  socket.on('sendMessage',(message,callback) => {
    
    const user = getUser(socket.id);
    const chat = new Chats({msg:message, author:user.user, room:user.room});

    chat.save().then(() => {
      io.to(user.room).emit('message',{ user: user.user, text : message });
    });
    callback()
  })

  socket.on('disconnect',() => {
    console.log("User disconnected");
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message',{ user: 'admin', text : `${user.user} has left` })
    }
  })

  


  
})




server.listen(8000,() => console.log('Server started on 8000'))