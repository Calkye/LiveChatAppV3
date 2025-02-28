import ConnectToDb from "../../../Connection.js";
import { createFriendCollection } from "./AddFriendModule.js";

const GetFriendRequestsModule = async(clientUsername)=>{
  const clientDb = await ConnectToDb("Users"); 
  const friendDb = await ConnectToDb("Friends"); 
  try{
    const UserAccountData = await clientDb.findOne({username: clientUsername}); 
    const UserFriendCollectionData = await friendDb.findOne({_id: UserAccountData._id}); 
     
    if(!UserFriendCollectionData) await createFriendCollection(UserAccountData); 
    if(!UserAccountData) return {Success: false, Message: "No user exists"}; 
    
    const {requests} = UserFriendCollectionData;


    return {Success: true, Message: "Successfully found requests", data: requests}; 
  }catch(error){
    return { Success: false, message: error.message}; 
  }
}

export default GetFriendRequestsModule; 