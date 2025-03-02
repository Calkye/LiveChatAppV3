import {  createContext, useState, useEffect } from "react";



export const MessagesContext = createContext([
  {
    Message: '', 
    setMessage: ()=>{}, 
    Username: '', 
    setUsername: ()=>{},
    ReceivedMessages: [],
    setRecievedMessages: ()=>{}, 
    RecevierUsername: '', 
    setReceiverUsername: ()=>{}
  }
]); 



export const MessageContextProvider = ({children}) =>{
  const [Message, setMessage ] = useState(''); 
  const [Username, setUsername] = useState(''); 

  const [ReceivedMessages, setRecievedMessages ] = useState([]);
  const [RecevierUsername, setReceiverUsername] = useState('')



  return(
    <MessagesContext.Provider value={{Message, setMessage, Username, setUsername, ReceivedMessages, setRecievedMessages, RecevierUsername, setReceiverUsername}}>
      {children}
    </MessagesContext.Provider>
  )
}