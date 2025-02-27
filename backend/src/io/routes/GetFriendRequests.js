
import GetFriendRequestsModule from "../Modules/GetFriendRequestsModule.js";


const GetFriendRequests = async(socket, clientUsername)=>{
  try{
    if(!clientUsername) socket.emit('GetFriendRequestError', "No client username provided"); 
    const Response = await GetFriendRequestsModule(clientUsername); 




    if(!Response.Success) return socket.emit('GetFriendRequestError', Response.Message);
    const requests = Response.data;
    
    socket.emit("GetFriendRequestsData", requests); 
  }catch(error){
    socket.emit('GetFriendRequestError', error); 
    console.error(error.message); 
  }
}

export default GetFriendRequests; 