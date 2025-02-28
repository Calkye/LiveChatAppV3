import ConnectToDb from "../../../Connection.js";

const RetrieveFriendsListModule = async(username)=>{
  const clientDb = await ConnectToDb("Users"); 
  const friendDb = await ConnectToDb("Friends");
  try{
    const UserAccountData = await clientDb.findOne({username: username}); 
    
    if(!UserAccountData) throw new Error("No user account data found"); 
    const UserFriendsCollectionData = await friendDb.findOne({ _id: UserAccountData._id});
    
    if(!UserFriendsCollectionData) throw new Error("No friends collection data found");
    const { friends } = UserFriendsCollectionData;

    return {Success: true, Message: "Successfully retrieved friends list", data: friends}; 
  }catch(error){
    throw new Error(error.message); 
  }
}


export default RetrieveFriendsListModule; 