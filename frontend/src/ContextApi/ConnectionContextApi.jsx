import { io } from "socket.io-client";

let socket = null;

const Connection = (route) => {
  return new Promise((resolve, reject) => {
    try {
      if (socket) {
        return resolve(socket);
      }

      socket = io(`http://localhost:3000/${route}`);
      
      socket.on('connect', () => {
        console.log(`Connected to socket with ID: ${socket.id}`);
        resolve(socket);  
      });

      socket.on('connect_error', (error) => {
        console.error("Connection failed:", error);
        reject(error);
      });

    } catch (error) {
      console.error("Error in creating connection:", error);
      reject(error);
    }
  });
}

export default Connection;
