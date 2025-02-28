


const GetFriends = (socket, username, setData)=>{
  try{
    if(!socket || !username) console.log('No socket or username provided - client'); 
    socket.emit('RetrieveFriendList', username); 

    socket.on('RetrieveFriendListSuccess', (friendList)=>{
      setData([...friendList])
    })

    socket.on('RetrieveFriendListError', (error)=>{
      console.log(`Error from retrieving  friendlist: ${error}`);
    })
  }catch(error){
    console.log(error.message); 
  }
}


export default GetFriends; 