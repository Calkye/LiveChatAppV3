import ConnectToDb from "../../../Connection.js"

export const createFriendCollection = async(clientData)=>{
  const FriendDb = await ConnectToDb("Friends");
  const newFriendCollection = await FriendDb.insertOne({
    _id: clientData._id,
    friends: [], 
    requests: [], 
  });
  return newFriendCollection; 
}

const UpdateData = async(clientData, friendData)=>{
  const FriendDb = await ConnectToDb("Friends");
  const clientFriendData = await FriendDb.findOne(
    {_id: clientData._id}
  );
  const friendCollectionData =  await FriendDb.findOne({
    _id: friendData._id
  });
  try{
    if(!clientFriendData) await createFriendCollection(clientData);
    if(!friendCollectionData) await createFriendCollection(friendData);
    const UpdatedFriendCollectionData = await FriendDb.updateOne(
      {_id: friendData._id},
      {$addToSet: {requests: clientData.username}}
    );
    if(UpdatedFriendCollectionData.modifiedCount) return {Success: true, message: "Successfully added friend"}; 

  }catch(error){
    console.log(error); 
    return {Success: false, message: error.message}; 
  }
}


const AddFriendModule = async(username, friendUsername)=>{
  const clientDb = await ConnectToDb("Users"); 
  try{
    if(username === friendUsername) return new Error("You cannot add yourself as a friend");
    const userData = await clientDb.findOne({username: username});
    const friendData = await clientDb.findOne({username: friendUsername});

    switch (true){ 
      case !userData: 
        return {Success: false, Message: "No user found"}; 
      case !friendData: 
        return {Success: false, Message: "No friend found"}; 
      default: 
        break
    }
    

    const Response = await UpdateData(userData, friendData);
    if(!Response?.Success){ 
      return {Success: false, message: Response.message}; 
    }

    return { Success: true, Message: "Successfully added friends" }
  }catch(error){
    return new Error(error); 
  }
}

export default AddFriendModule; 