const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {
  userJoinGroup,
  getCurrentUserDetails,
  userLeaveGroup,
  getGroupUsers,
} = require('./utils/users');

io.on('connection', (socket) => {
  socket.on('joinGroup', (data) => {
    const user = userJoinGroup(socket.id, data.username, data.room);
    console.log(`${user.username} user connected to ${user.room}`);
    socket.join(user.room);

    // Welcome current user
    // socket.emit('message', formatMessage(botName, `Welcome to ${data.room}!`));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit('message', `${user.username} has joined group`);

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getGroupUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUserDetails(socket.id);
    console.log('send to the group');
    io.to(user.room).emit('message', msg);
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeaveGroup(socket.id);

    if (user) {
      io.to(user.room).emit('message', `${user.username} has left the group`);

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getGroupUsers(user.room),
      });
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
