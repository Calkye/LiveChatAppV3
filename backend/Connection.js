import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'; 

dotenv.config(); 


const ConnectToDb = async(Collection)=>{
  try{
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect(); 
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(Collection); 
    return collection; 
  }catch(error){
    console.log(error); 
  }
}

export default ConnectToDb; 
