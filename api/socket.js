const express = require('express');
const http = require('http');
const { Server } = require('socket.io');  // Import Server from socket.io

const app = express();
const server = http.createServer(app);
const io = new Server(server, {   // Initialize Socket.IO with the server
    path: '/api/socket',         // Define the path for Socket.IO
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(express.static('public'));

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
