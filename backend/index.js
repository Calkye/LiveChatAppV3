// Import necessary modules
import dotenv from 'dotenv'; 
import express from 'express';
import http from 'http'; 
import { Server } from 'socket.io';
import cors from 'cors'; 
import CookieParser from 'cookie-parser'; 

// Import custom middleware 
import VerifyTokens from './src/Modules/Jwt/VerifyTokens.js';

// Import socket io routes 
import AddFriend from './src/io/routes/AddFriend.js';
import GetFriendRequests from './src/io/routes/GetFriendRequests.js';
import AcceptFriendRequest from './src/io/routes/AcceptFriendRequest.js';
import RetrieveFriendList from './src/io/routes/RetrieveFriendList.js';

// Import Express routes 
import CreateAccountRoute from './src/express/Routes/CreateAccountRoute.js';
import AddFriendRoute from './src/express/Routes/AddFriendRoute.js';

dotenv.config(); 

const app = express(); 
app.use(express.json());
app.use(CookieParser()); 

// Updated CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',           // Development frontend
    'http://localhost:5173/MainApp',   // Specific route for your app
    // Add any other origins here as needed
  ],
  credentials: true, 
};

app.use(cors(corsOptions));

const server = http.createServer(app); 
const io = new Server(server, {
  cors: corsOptions, // Ensure socket.io uses the same CORS configuration
}); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Socket.io namespace 
const friendsNameSpace = io.of('/friends'); 

// Object to track connected users
let connectedUsers = {};

friendsNameSpace.on('connection', (socket) => {
  console.log('User has connected to the namespace /friends: ', socket.id); 

  // Add friend handler
  socket.on('AddFriend', (clientUsername, friendUsername) => {
    try {
      AddFriend(socket, clientUsername, friendUsername); 
    } catch (error) {
      console.error('Error in AddFriend:', error);
    }
  });

  // Get friend requests handler
  socket.on('GetFriendRequests', (clientUsername) => {
    try {
      if (!socket || !GetFriendRequests) return;
      GetFriendRequests(socket, clientUsername); 
    } catch (error) {
      console.error('Error in GetFriendRequests:', error);
    }
  });

  // Accept friend request handler
  socket.on('AcceptFriendRequest', (clientUsername, friendUsername) => {
    try {
      AcceptFriendRequest(socket, clientUsername, friendUsername);
    } catch (error) {
      console.error('Error in AcceptFriendRequest:', error);
    }
  });

  // Retrieve friend list handler
  socket.on('RetrieveFriendList', (clientUsername) => {
    try {
      RetrieveFriendList(socket, clientUsername);
    } catch (error) {
      console.error('Error in RetrieveFriendList:', error);
    }
  });

  // Any code above this line works as expect, let' just focus on the below code.

  // Register handler (associates socket with usernames)
  socket.on('Register', (clientUsername, friendUsername) => {
    if (!clientUsername || !friendUsername) {
      console.error('Missing client or friend username');
      return;
    }
    
    // Add users to the connectedUsers object if not already present
    if (!connectedUsers[clientUsername]) connectedUsers[clientUsername] = socket;
    if (!connectedUsers[friendUsername]) connectedUsers[friendUsername] = socket;
    
    const RoomId = [clientUsername, friendUsername].sort().join("_");
  
    if (!socket.rooms.has(RoomId)) {
      console.log("Joining both friends to the room id:", RoomId);
      socket.join(RoomId);
    }
  });
  
  // Disconnection handler (removes client from connectedUsers)
  socket.on('disconectRegister', (clientUsername) => {
    for (const username in connectedUsers) {
      if (connectedUsers[username] === clientUsername) { 
        console.log(`User: ${clientUsername} disconnected from socket: ${connectedUsers[username]}`); 
        delete connectedUsers[clientUsername]; 
      }
    }
  });

  // Send message handler
  socket.on('sendMessage', (TempMessage, clientUsername, friendUsername) => {
    try {
      const client = connectedUsers[clientUsername]; 
      const friend = connectedUsers[friendUsername];

      // Error handling for missing client or friend
      if (!client) return socket.emit("sendMessageError", "Client is not connected to the server"); 
      if (!friend) return socket.emit("sendMessageError", "Friend is not online"); 

      const RoomId = [clientUsername, friendUsername].sort().join("_");

      // Ensure both users are in the room
      if (!socket.adapter.rooms.get(RoomId)) {
        socket.join(RoomId); 
        console.log('Users joined room id: ', RoomId); 
      }

      console.log(`Sending message to ${RoomId} from ${clientUsername} to ${friendUsername}: ${TempMessage}`);
      socket.to(RoomId).emit("newMessage", TempMessage); // sends to the friend only
    } catch (error) {
      console.log('Error in sendMessage:', error.message); 
      socket.emit('sendMessageError', error.message); 
    }
  });
});

// End of Socket Routes 

// Setup express routes
app.use('/Users', CreateAccountRoute); 
app.use('/Friends', VerifyTokens, AddFriendRoute);

// Setup the server
const port = process.env.PORT || 3000; 
server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
