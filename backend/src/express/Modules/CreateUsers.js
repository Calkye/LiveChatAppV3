import ConnectToDb from "../../../Connection.js";

const CreateUser = async(username, password)=>{
  const db = await ConnectToDb("Users");
  try{
    const newUser = await db.insertOne({ 
      username: username, 
      password: password
    }); 
    if(newUser.insertedId){ 
      return { Success: true }
    }



  }catch(error){
    console.log(error.message); 
    return new Error(error.message); 
  }
}

export default CreateUser; 