import dotenv from 'dotenv'; 
import express from 'express';


import http from 'http'; 
import { Server } from 'socket.io';

import cors from 'cors'; 
import CookieParser from 'cookie-parser'; 

// Import custom middle wear 
import VerifyTokens from './src/Modules/Jwt/VerifyTokens.js';

// Import socket io routes 
import AddFriend from './src/io/routes/AddFriend.js';
import GetFriendRequests from './src/io/routes/GetFriendRequests.js';

// Import Express routes 
import CreateAccountRoute from './src/express/Routes/CreateAccountRoute.js';
import AddFriendRoute from './src/express/Routes/AddFriendRoute.js';

dotenv.config(); 

const app = express(); 
app.use(express.json());
app.use(CookieParser()); 


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
  
}))

const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
}); 

// Socket.io namespace 
const friendsNameSpace = io.of('/friends'); 


friendsNameSpace.on('connection', (socket)=>{
  console.log('User has connected to the namespace /friends: ', socket.id); 

  socket.on('AddFriend', (clientUsername, friendUsername)=>{
    AddFriend(socket, clientUsername, friendUsername); 
  })

  socket.on('GetFriendRequests', (clientUsername)=>{
    if(!socket || !GetFriendRequests) return;
    GetFriendRequests(socket, clientUsername); 
  })
})



// Setup express routes
app.use('/Users', CreateAccountRoute); 
app.use('/Friends', VerifyTokens, AddFriendRoute)


// Setup the server
const port = process.env.PORT || 3000; 



server.listen(port, ()=>console.log(`Server is runnning on http://localhost:${port}`)); 