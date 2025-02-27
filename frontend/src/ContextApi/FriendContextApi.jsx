import { createContext, useState, useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

import friend from "../Lib/Friend.js";

export const FriendContext = createContext({ 
  clientUsername: '', 
  setClientUsername: ()=>{}, 
  friendUsernames: [''], 
  setFriendUsernames: ()=>{}, 
  addedUsernames: '', 
  setAddedUsernames: ()=>{}, 
  Id: [''],
  setId: ()=>{},  
  pfp: [''], 
  setPfp: ()=>{}
});

export const FriendContextProvider = ({children})=>{
  const [clientUsername, setClientUsername] = useSessionStorage("clientUsername", "'"); 
  const [ friendUsernames, setFriendUsernames ] = useSessionStorage("friendUsernames", "");
  const [ addedUsernames, setAddedUsernames] = useState("");  
  const [ Id, setId] = useState(['']); 
  const [pfp, setPfp] = useState(['']); 

  useEffect(()=>{
    console.log('Adding user: ', addedUsernames); 


  }, [addedUsernames])

  return ( 
    <FriendContext.Provider value={{ clientUsername, setClientUsername, friendUsernames, setFriendUsernames, addedUsernames, setAddedUsernames, Id, setId, pfp, setPfp}}>
      {children}
    </FriendContext.Provider>
  )
}