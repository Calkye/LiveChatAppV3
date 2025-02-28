import RetrieveFriendsListModule from "../Modules/RetrieveFriendsListModule.js";

const RetrieveFriendList = async(socket, username)=>{
  try{
    if(!socket || !username) return socket.emit('RetrieveFriendListError', "No socket or username provided - Server"); 
    const friendsList = await RetrieveFriendsListModule(username); 

    if(!friendsList) return socket.emit('RetrieveFriendListError', "No friends list found - Server"); 
    
    socket.emit('RetrieveFriendListSuccess', friendsList.data); 
  }catch(error){
    console.log(error.message); 
  }
}

export default RetrieveFriendList; 