import ConnectToDb from "../../../Connection.js";
import bcrypt from 'bcrypt'

const VerifyPasswords = async(username, password)=>{
  const client = await ConnectToDb("Users"); 
  try{
    // Find Current User; 
    const CurrentUser = await client.findOne({username: username}); 
    if(CurrentUser){ 
      // Check if Current users password is equal to the one in the database; 
      const isMatch = bcrypt.compare(password, CurrentUser.password)
      if(isMatch){
        return { Success: true}
      }else{ 
        return {Success: false, message: "Invalid password"}
      }
    }else{ 
      return { Success: false, message: "User not found"}
    }

  }catch(error){
    console.log(error.message); 
    return new error; 
  }
}

export default VerifyPasswords