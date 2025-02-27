import {  createContext, useState, useEffect } from "react";



export const MessagesContext = createContext([
  {
    Message: [''], 
    setMessage: ()=>{}, 
    Username: '', 
    setUsername: ()=>{},
    ReceivedMessages: [''],
    setRecievedMessages: ()=>{}, 
    RecevierUsername: '', 
    setReceiverUsername: ()=>{}
  }
]); 



export const MessageContextProvider = ({children}) =>{
  const [Message, setMessage ] = useState(['test']); 
  const [Username, setUsername] = useState(''); 

  const [ReceivedMessages, setRecievedMessages ] = useState(['test']);
  const [RecevierUsername, setReceiverUsername] = useState('')


  // Request Update to backend 
  // useEffect(async()=>{
  //   const UpdatedDataRequest = await axios.post('http://localhost:3000/Update/Messages', { 
  //     data: { 
  //       client: { 
  //         Messages: Message, 
  //         UserId: UserId
  //       },
  //       Reciever: {
  //         Id: ReceiverId
  //       }
  //     }
  //   }).catch((response)=>{
  //     if(response){ 
  //       console.log('Response from backend', response); 
  //     }
  //   })
  //   console.log('Request from Updating Messages', UpdatedDataRequest); 
  // }, [Message, ReceivedMessages]); 


  return(
    <MessagesContext.Provider value={{Message, setMessage, Username, setUsername, ReceivedMessages, setRecievedMessages, RecevierUsername, setReceiverUsername}}>
      {children}
    </MessagesContext.Provider>
  )
}