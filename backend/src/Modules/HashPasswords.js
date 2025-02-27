import bcrypt from 'bcrypt'; 

const hashedPassword = async(password)=>{
  try{
    const saltRounds = 10; 
    const hashedPassaword =  await bcrypt.hash(password, saltRounds); 
    return hashedPassaword; 

  }catch(error){
    throw error; 
  }
}

export default hashedPassword; 