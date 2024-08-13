const { Server } = require('socket.io');

module.exports = (req, res) => {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.io');

    const io = new Server(res.socket.server, {
      path: '/api/socket',
      cors: {
        origin: '*', // Allow all origins
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('New user connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });

      socket.on('chat message', ({ username, message }) => {
        console.log('Received chat message from', username, ':', message);
        io.emit('chat message', { username, message });
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};
