import './Css/Directmessages.css'; 

import { io } from 'socket.io-client'; 

import { useContext, useEffect } from 'react';

import { FriendContext } from '../ContextApi/FriendContextApi.jsx';
import UserInfo from './UserInfo.jsx'; 

import GetFriends from './GetFriends.js';

const DirectMessages = ({ImageUrl})=>{
  const { clientUsername, friendUsernames, setFriendUsernames } = useContext(FriendContext) || [''];

  useEffect(()=>{
    const newSocket = io('http://localhost:3000/friends');

    const interval = setInterval(() => {
      GetFriends(newSocket, clientUsername, setFriendUsernames); 
    }, 5000);

    return () => clearInterval(interval);
  },[])




  return (
    <div className="DirectMessages">
      <h2 className='Title'>All Chats</h2>
        {
          friendUsernames.map((username, index)=>{
            return(
              <>
                <UserInfo
                Username={username}/>  
              </>
            )
          })
        }
    </div>
  )
}

export default DirectMessages; 