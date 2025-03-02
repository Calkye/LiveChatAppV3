import './Css/Input.css';

import { useState, useContext, useEffect } from 'react';

import { MessagesContext } from '../../ContextApi/MessagesContextApi.jsx';
import { FriendContext } from '../../ContextApi/FriendContextApi.jsx';
import Connection from '../../ContextApi/ConnectionContextApi.jsx';

import SendMessage from './SendMessage.js';

import SendButton from '../../../public/SendButton.svg';


const Input = () => {
  const [TempMessage, setTempMessage] = useState(''); 
  const { Message, setMessage, setRecievedMessages } = useContext(MessagesContext); 
  const { clientUsername, selectedFriend } = useContext(FriendContext); 
  const [socket, setSocket ] = useState(null); 

  useEffect(() => {
    Connection('friends')
      .then((socket) => {
        setSocket(socket);
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
  }, []);

  useEffect(()=>{
    if(!socket) return;
    if(!selectedFriend){ 
      socket.emit("disconectRegister", clientUsername); 
    }
    return ()=>{
      socket.close(); 
    }
  }, [selectedFriend])

  const handleMessages = (e) => {
    e.preventDefault();
    if(!socket) return console.log("Socket is not connected yet!"); 
    try{
      SendMessage(socket, TempMessage, clientUsername, selectedFriend); 
      setMessage(TempMessage); 
      setTempMessage('');

    }catch(error){
      console.log(error); 
    }
  };

  return (
    <div className="Inputed-Container-2">
      <div className="Input">
        <form onSubmit={handleMessages}>
          <input 
            type="text" 
            placeholder='Type a message..' 
            value={TempMessage} 
            onChange={(e) => { setTempMessage(e.target.value); }} 
          />
          <div className="SendButton" onClick={handleMessages}>
            <img src={SendButton} alt="Send" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
