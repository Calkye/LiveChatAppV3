import express from 'express'; 

// Middle Wear
import rateLimit from 'express-rate-limit'; 

import CreateTokens from '../../Modules/Jwt/CreateTokens.js';
import VerifyTokens from '../../Modules/Jwt/VerifyTokens.js';

import PaswordHasher from '../../Modules/HashPasswords.js';
import CreateUser from '../Modules/CreateUsers.js';
import VerifyPasswords from '../../Modules/Database/VerifyPasswords.js';

const AccountRoute = express.Router(); 


AccountRoute.use(rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes
  // max: 5, // limit each IP to 5 requests per window
  // message: 'Too many login attempts. Try again later.'
})); 

AccountRoute.post('/Create', CreateTokens, async(req, res)=>{
  const { username } = req.body.data; 
  const { password } = req.body.data; 
  try{
    const HashedPassword = await PaswordHasher(password); 
    
    const newUser = await CreateUser(username, HashedPassword); 
    if(newUser.Success){ 
      return res.status(200).json({message: "Successfully created a new user"})
    }else{ 
      return res.status(400).json({message: "error occured"})
    }
  }catch(error){ 
    res.status(500).json({
      erorr: error.message
    })
  }
})

AccountRoute.post('/Login', CreateTokens, async(req, res)=>{
  const { username, password } = req.body.data; 
  try{
    const isVerified = await VerifyPasswords(username, password); 
    if(isVerified.Success){ 
      return res.status(200).json({message: "Success"})
    }else{ 
      return res.status(400).json({message: isVerified.message})
    }
  }catch(error){
    res.status(500).json({
      error: error.message
    })
  }
})



export default AccountRoute; 