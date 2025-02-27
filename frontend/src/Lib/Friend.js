import axios from 'axios'; 

axios.defaults.withCredentials = true; 

class friend { 
  constructor(friendUsername, username){ 
    this.friendUsername = friendUsername;
    this.username = username; 
  }
  
  async AddFriend(){  
    try {
      const response = await axios.post('http://localhost:3000/Friends/Add', {
        friendUsername: this.friendUsername,
        clientUsername: this.username,

      }, {withCredentials: true});

      console.log("response from the server: ", response); 
      return { Success: true };
    } catch (error) {
      console.error('Error from adding friend: ', error.message);
      return { Success: false };
    }
  }
}

export default friend;
