

const SendMessage = async(socket, message, clientUsername, friendUsername)=>{
  try{
    socket.emit('newMessage', message); 


    
  }catch(error){
    console.log(error.message); 
  }
}

export default SendMessage; 