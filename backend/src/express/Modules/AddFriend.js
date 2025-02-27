import ConnectToDb from "../../../Connection.js";
import { ObjectId } from 'mongodb';

const AddFriend = async (friend, clientUsername) => {
  const friendDb = await ConnectToDb("Friends");
  const UserDb = await ConnectToDb("Users");

  try {
    const ClientData = await UserDb.findOne({ 
      username: clientUsername
    });
    const friendAccountData = await  UserDb.findOne({
      username: friend
    }); 
    if(ClientData && friendAccountData){
      const ClientFriendDbData = await friendDb.findOne({
        _id: ClientData._id
      });
      const FriendData = await friendDb.findOne({ 
        _id: friendAccountData._id
      }); 
      if(ClientFriendDbData && FriendData){
        // In this case both have collections so just update the friends collection 
        await friendDb.updateOne(
          {_id: friendAccountData._id}, 
          {$addToSet: {requests: clientUsername}}
        )

      }else if(ClientFriendDbData){ 
        // Cient has collection but the friend doesn't so initalise the friend collection and update the requests 
        await friendDb.updateOne(
          {_id: friendAccountData._id }, 
          {$addToSet: {requests: clientUsername}}
        )
      }else if(FriendData){ 
        // Friend has collection but the client user doesn't so initalise the friend collection for the client  
          await friendDb.insertOne({ 
          _id: ClientData._id, 
          friends: [], 
          requests: [] 
        }); 
        await friendDb.updateOne(
          {_id: friendAccountData._id,},
          {$addToSet: {requests: clientUsername}}
        )

      }else{ 
        // Both do not have friend collections, initalise both (:
          await friendDb.insertOne({
            _id: ClientData._id, 
            friends: [], 
            requests: []
          });
          await friendDb.insertOne({
            _id: friendAccountData._id,  
            friends: [], 
            requests: [clientUsername]
          });
      }




    }else{ 
      throw new Error("No username and friend username provided")
    }


  } catch (error) {
    console.log('Error while adding friend:', error.message);
    return { Success: false, message: error.message };
  }
}

export default AddFriend;
