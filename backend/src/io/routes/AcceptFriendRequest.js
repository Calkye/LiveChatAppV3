import AcceptFriendRequestModule from "../Modules/AcceptFriendRequestModule.js";



const AcceptFriendRequest = async(socket, clientUsername, friendUsername)=>{
  try{
    if(!socket || !clientUsername || !friendUsername) return socket.emit('AcceptFriendRequestError', "No client or friend username provided");
    console.log('User: ', clientUsername, ' is accepting friend request from: ', friendUsername);

    const response = await AcceptFriendRequestModule(clientUsername, friendUsername); 
    if(!response.Success) return socket.emit('AcceptFriendRequestError', response.Message);
    
    socket.emit('AcceptFriendRequestSuccess', response.Message);
  }catch(error){
    console.error(error.message); 
    socket.emit('AcceptFriendRequestError', error.message);
  }
}

export default AcceptFriendRequest; 