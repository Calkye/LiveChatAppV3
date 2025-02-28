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
  setPfp: ()=>{},
  selectedFriend: '',
  setSelectedFriend: ()=>{}, 
});

export const FriendContextProvider = ({children})=>{
  const [clientUsername, setClientUsername] = useSessionStorage("clientUsername", "'"); 
  const [ friendUsernames, setFriendUsernames ] = useState([]);
  const [ addedUsernames, setAddedUsernames] = useState("");  
  const [ Id, setId] = useState(['']); 
  const [pfp, setPfp] = useState(['']); 
  const [ selectedFriend, setSelectedFriend] = useState('');


 
  return ( 
    <FriendContext.Provider value={{ clientUsername, setClientUsername, friendUsernames, setFriendUsernames, addedUsernames, setAddedUsernames, Id, setId, pfp, setPfp, selectedFriend, setSelectedFriend}}>
      {children}
    </FriendContext.Provider>
  )
}