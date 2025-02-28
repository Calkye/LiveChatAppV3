import axios from 'axios'; 
import { useContext } from 'react';


axios.defaults.withCredentials = true; 


class User { 
  constructor(username, password){ 
    this.username = username; 
    this.password = password; 
  }
  async ClearFriendRequests(){
    console.log("Clearning Friend Requests")
    // try{
    //   await axios.post('http://localhost:3000/Friends/Requests/Clear', { 
    //     data: {
    //       username: this.username
    //     }
    //   }, {withCredentials: true})
    //   return {Success: true}
    // }catch(error){
    //   return {Success: false}
    //   console.error(error.message); 
    // }
  }



  async  CreateAccount(){ 
    const response = await axios.post('http://localhost:3000/Users/Create', {
      data: {
        username: this.username, 
        password: this.password
      }
    }, {withCredentials: true}); 
    if(response.status === 200){ 
      return {Success: true}; 
    }else{
      return { Success:false}
    }
    
  }
  async Login(){ 
    try{
      await axios.post('http://localhost:3000/Users/Login', {
        data: {
          username: this.username, 
          password: this.password
        }
      }, {withCredentials: true})
      return {Success: true}
    }catch(error){

      console.log(error.message); 
      return { Success:false}
    }
  }
}

export default User; 