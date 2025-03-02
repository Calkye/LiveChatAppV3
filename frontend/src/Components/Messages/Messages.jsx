import './Css/Messages.css';
import { useContext, useEffect, useState } from 'react';
import { FriendContext } from '../../ContextApi/FriendContextApi.jsx';
import { MessagesContext } from '../../ContextApi/MessagesContextApi.jsx';
import Connection from '../../ContextApi/ConnectionContextApi.jsx';
import UserInfo from '../UserInfo.jsx';

const Messages = () => {
  const { selectedFriend, clientUsername } = useContext(FriendContext);
  const { Message } = useContext(MessagesContext); 
  const [allMessages, setAllMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // Setup Socket Connection 
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
    const handleNewMessage = (message)=>{
      setAllMessages(prevMessage=>[
        ...prevMessage, 
        {username: selectedFriend, message: message}
      ]); 
    }

    
    socket.on('newMessage',handleNewMessage);
    return ()=>{
      socket.off('newMessage', handleNewMessage); 
    }
  }, [socket])
  useEffect(()=>{
    setAllMessages(prevMessage=>[
      ...prevMessage, 
      {username: clientUsername, message: Message}
    ])
    console.log(`UpdatedMessage: ${Message}`)
  }, [Message])


  return (
    <div className="Center-Right">
      {selectedFriend ? (
        <div className="Message-Container">
          {allMessages.length > 0 ? (
            allMessages.map(({ username, message }, index) => (
              <UserInfo key={index} Username={ username === clientUsername ? clientUsername: selectedFriend} isMessage={true} Message={message}/>
            ))
          ) : (
            <div>No messages yet</div>
          )}
        </div>
      ) : (
        <div className="No-User-Selected">
          <p>Select a friend to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
