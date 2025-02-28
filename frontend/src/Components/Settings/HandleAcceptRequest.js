



const handleAcceptRequest = (socket, username, friendUsername, setFriendUsernames, setSelectedFriend)=>{
  try{
    socket.emit('AcceptFriendRequest', username, friendUsername)

    socket.on('AcceptFriendRequestSuccess', (message)=>{
      console.log('Message'); 
      setFriendUsernames(prevFriends => [...prevFriends, friendUsername]); 
      setSelectedFriend(friendUsername);
    })


    socket.on('AcceptFriendRequestError', (error)=>{
      console.log(error);  
    })
  }catch(error){
    console.log(error); 
  }
}

export default handleAcceptRequest; 