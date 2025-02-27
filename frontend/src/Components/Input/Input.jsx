import './Css/Input.css';
import { useState, useContext, useEffect } from 'react';
import { MessagesContext } from '../../ContextApi/MessagesContextApi.jsx'; 
import SendButton from '../../../public/SendButton.svg'; 
import { io } from "socket.io-client";  // Import Socket.io client

const socket = io("http://localhost:3000");  // Replace with your server URL

const Input = () => {
  const [TempMessage, setTempMessage] = useState(''); 
  const { Message, setMessage } = useContext(MessagesContext); 
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(()=>{
    // Emit "typing" event
    socket.emit("typing");
 
  }, [TempMessage])

  const UpdateMessages = (e) => {
    e.preventDefault();
    if (TempMessage.trim() !== '') {
      setMessage([...Message, TempMessage]);  
      setTempMessage('');  
      socket.emit("stoppedTyping");  // Stop typing when message is sent
    }
  };



  const handleTyping = (e) => {
    setTempMessage(e.target.value);
 
    
    // Clear the previous timeout if user types again
    if (typingTimeout) clearTimeout(typingTimeout);

    // Set a new timeout to emit "stoppedTyping" after 2 seconds of inactivity
    const timeout = setTimeout(() => {
      socket.emit("stoppedTyping");
    }, 2000);
    
    setTypingTimeout(timeout);
  };

  return (
    <div className="Inputed-Container-2">
      <div className="Input">
        <form onSubmit={UpdateMessages}>
          <input 
            type="text" 
            placeholder='Type a message..' 
            value={TempMessage} 
            onChange={handleTyping}  // Detect typing
          />
        </form>
      </div>
      <div className="SendButton" onClick={UpdateMessages}>
        <img src={SendButton} alt="Send" />
      </div>
    </div>
  );
};

export default Input;
