import express from 'express'; 

// Import Modules 
import AddFriend from '../Modules/AddFriend.js';

const AddFriendRoute = express.Router(); 


AddFriendRoute.post('/Add', async(req, res)=>{
  const { friendUsername, clientUsername } = req.body; 
  console.log(friendUsername, clientUsername, "from AddFriendRoute.js")
  try{
    await AddFriend(friendUsername, clientUsername); 

  }catch(error){
    res.status(500).json({
      error: error.message
    })
  }

})


export default AddFriendRoute; 