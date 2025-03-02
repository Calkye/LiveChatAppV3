import './Css/Directmessages.css'; 

import { useContext, useEffect, useState } from 'react';

import { FriendContext } from '../ContextApi/FriendContextApi.jsx';
import { MessagesContext } from '../ContextApi/MessagesContextApi.jsx';
import Connection from '../ContextApi/ConnectionContextApi.jsx';

import GetFriends from './GetFriends.js';
import UserInfo from './UserInfo.jsx'; 

const DirectMessages = ({ ImageUrl }) => {
  const { clientUsername, friendUsernames, setFriendUsernames, setSelectedFriend } = useContext(FriendContext) || {};
  const { ReceivedMessages } = useContext(MessagesContext);  
  const [socket, setSocket ] = useState(null); 

  useEffect(() => {
    // Establish a connection when the component mounts
    Connection('friends')
      .then((socket) => {
        setSocket(socket);
        // Now you can use the socket here
      })
      .catch((error) => {
        console.error('Error connecting to socket:', error);
      });

    return () => {
      if (socket) {
        socket.disconnect();
        console.log(`Disconnected from socket with ID: ${socket.id}`);
      }
    };
  }, []); // Empty array ensures this only runs on mount

  useEffect(() => { 
    if (socket) { 
      const interval = setInterval(() => {
        GetFriends(socket, clientUsername, setFriendUsernames);
      }, 5000);
  
      return () => {
        clearInterval(interval);
      };
    }
  }, [socket]);

  const handleOnClick = (username) => {
    setSelectedFriend(username);
    if (socket) {
      socket.emit('Register', clientUsername, username);
      console.log('Emitting register event:', username);
    }
  };

  // Creating an object to map friend usernames to their latest message
  const latestMessages = ReceivedMessages.reduce((acc, msg) => {
    if (msg.username) {
      acc[msg.username] = msg.msg;
    }
    return acc;
  }, {});

  return (
    <div className="DirectMessages">
      <h2 className="Title">All Chats</h2>
      {friendUsernames.map((username, index) => {
        const latestMessage = latestMessages[username] || "No messages yet";  // Accessing the latest message from the map

        return (
          <div onClick={() => handleOnClick(username)} key={index}>
            <UserInfo Username={username} IsMessage={false} Message={latestMessage} />
          </div>
        );
      })}
    </div>
  );
};

export default DirectMessages;
