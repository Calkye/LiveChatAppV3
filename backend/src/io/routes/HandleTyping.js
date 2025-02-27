const HandleTyping = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // socket.on("typing", () => {
    //   console.log(`User id: ${socket.id} has started typing`);
    // });

    // socket.on("stoppedTyping", () => {
    //   console.log(`User id: ${socket.id} has stopped typing`);
    // });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default HandleTyping; 