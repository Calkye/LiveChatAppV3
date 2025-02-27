

const handleAddFriend = (socket, clientUsername, friendUsername) => {
  try {
    socket.once('AddFriendError', (error) => {
      console.log(error);
    });
    if (!friendUsername) throw new Error('Invalid argument: friendUsername is required');

    socket.emit('AddFriend', clientUsername, friendUsername);

    // Can only send 1 request at a time, to fix refresh. --Fix this later
    socket.on('AddFriendError', (error) => {
     console.log(error); 
    });
  } catch (error) {
    console.log(error)
  }
};


   

export default handleAddFriend;
