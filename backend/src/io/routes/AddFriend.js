import AddFriendModule from "../Modules/AddFriendModule.js";

const AddFriend = async(socket, username, friendUsername)=>{
  try{
    if(!socket || !username || !friendUsername) socket.emit('AddFriendError', "Please provide a username, and a friend username"); 
    console.log(username, friendUsername, "from AddFriend.js");
    
    const isFriendAdded = await AddFriendModule(username, friendUsername);    

    
    if(isFriendAdded.Success){
      console.log('Successfully Added friends: ', username, friendUsername)  
    }
  }catch(error){ 
    console.log(error); 
    socket.emit('AddFriendError', error); 
  }

}

export default AddFriend