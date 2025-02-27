import ConnectToDb from "../../../Connection.js";


export const GetFriendRequest = async(clientUsername)=>{
  try{
    const UserDb = await ConnectToDb("Users");
    const friendDb = await ConnectToDb("Friends");
    const ClientData = await UserDb.findOne({ 
      username: clientUsername
    })
    
    const clientFriends = await friendDb.findOne({ 
      _id: ClientData._id
    })
    return clientFriends;
    
  }catch(error){
    console.log(error.message); 
    throw new Error(error.message); 
  }


}







const GetFriends = async(clientUsername)=>{ 
  try{  


  }catch(error){
    console.log(error); 
  }
}


export default GetFriends