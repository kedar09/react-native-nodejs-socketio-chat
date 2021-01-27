const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const {
  userJoinGroup,
  getCurrentUserDetails,
  userLeaveGroup,
} = require('./utils/users');

io.on('connection', (socket) => {
  socket.on('joinGroup', (data) => {
    const user = userJoinGroup(socket.id, data.username, data.room);
    console.log(`${user.username} user connected to ${user.room}`);
    socket.join(user.room);

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit('roomNotification', `${user.username} has joined group`);
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUserDetails(socket.id);
    console.log('msg to');
    console.log(user);
    io.to(user.room).emit('message', msg);
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeaveGroup(socket.id);

    if (user) {
      console.log(`${user.username} is left the group!`);
      io.to(user.room).emit(
        'roomNotification',
        `${user.username} has left the group`,
      );
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
