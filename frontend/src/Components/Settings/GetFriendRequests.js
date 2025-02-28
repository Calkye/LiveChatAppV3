

const GetFriendRequests = (socket, clientUsername, setData)=>{
  try{
    if(!socket) return; 
    socket.emit('GetFriendRequests', clientUsername); 

    socket.once("GetFriendRequestsData", (data)=>{
      setData([...data]);  
    })


    socket.on('GetFriendRequestError', (error)=>{
      console.error(error); 
    })
  }catch(error){
    console.error(error.message); 

  }
}

export default GetFriendRequests; 