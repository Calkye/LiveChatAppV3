import { GetFriendRequest } from "../../express/Modules/GetFriends.js";

const GetRequests = async(socket, username)=>{
  const clientData = await GetFriendRequest(username) || []; 

  if(clientData){ 
    socket.emit('friendRequests', clientData.requests);
  }else{
    socket.emit('friendRequests', ["No Data provided"]);
  }
  
}

export default GetRequests;