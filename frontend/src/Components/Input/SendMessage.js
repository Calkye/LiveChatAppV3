const SendMessage = (socket, TempMessage, clientUsername, friendUsername) => {
  if (!socket) {
    console.log("No socket provided");
    return;
  }
  try {
    socket.emit('sendMessage', TempMessage, clientUsername, friendUsername);
    console.log("Message sent:", TempMessage);

    socket.on('sendMessageError', (error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default SendMessage;