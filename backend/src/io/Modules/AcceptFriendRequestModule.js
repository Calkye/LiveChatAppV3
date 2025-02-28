import ConnectToDb from "../../../Connection.js";
import { createFriendCollection } from "./AddFriendModule.js";

const updateAccountData = async(clientData, friendData)=>{
  const friendDb = await ConnectToDb("Friends"); 
  try{
    const clientFriendCollectionData = await friendDb.findOne({_id: clientData._id});
    const friendCollectionData = await friendDb.findOne({_id: friendData._id});
    if(!clientFriendCollectionData) await createFriendCollection(clientData);
    if(!friendCollectionData) await createFriendCollection(friendData); 
    const UpdatedClientFriendCollectionData = await friendDb.updateOne(
      {_id: clientData._id},
      {$addToSet: {friends: friendData.username}} 
    )
    const UpdatedFriendCollectionData = await friendDb.updateOne(
      {_id: friendData._id}, 
      {$addToSet: {friends: clientData.username}} 
    ); 
    await friendDb.updateOne(
      {_id: clientData._id}, 
      {$pull: {requests: friendData.username}}
    );

    if(!UpdatedClientFriendCollectionData.modifiedCount && !UpdatedFriendCollectionData.modifiedCount){
      return { Success: false, Message: "Failed to add friends"}
    }

    return {Success: true, Message: "Successfully added friends"}; 
  }catch(error){
    throw error; 
  }
}


const AcceptFriendRequestModule = async(clientUsername, friendUsername)=>{
  console.log("User: ", clientUsername, " FriendUsername: ", friendUsername); 
  const clientDb = await ConnectToDb("Users");
  try{
    const clientAccountData = await clientDb.findOne({username: clientUsername});
    const friendAccountData = await clientDb.findOne({username: friendUsername}); 
    if(!clientAccountData) return {Success: false, Message: "No client account found"}; 
    if(!friendAccountData) return {Success: false, Message: "No friend account found"}; 
    const response = await  updateAccountData(clientAccountData, friendAccountData); 
    if(!response.Success) return {Success: false, Message: response.Message}; 

    return {Success: true, Message: response.Message}; 
  }catch(error){
    console.log(error.message); 
    return{ 
      Success: false, 
      Message: error.message
    }
  }

}


export default AcceptFriendRequestModule; 