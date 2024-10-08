document.addEventListener('DOMContentLoaded', () => {
    const socket = io();  // Ensure this is correctly initialized

    // Handle connection
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    // Handle errors
    socket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
    });

    // Handle chat messages
    socket.on('chat message', ({ username: sender, message }) => {
        console.log('Received message from', sender, ':', message);
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.textContent = message;

        if (sender === username) {
            messageElement.classList.add('sent');
        } else {
            messageElement.classList.add('received');
            const usernameElement = document.createElement('div');
            usernameElement.className = 'username';
            usernameElement.textContent = sender;
            messageElement.prepend(usernameElement);
        }

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    // Handle setting username
    const usernameInput = document.getElementById('username-input');
    const setUsernameButton = document.getElementById('set-username-button');
    let username = '';

    setUsernameButton.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (username) {
            usernameInput.disabled = true;
            setUsernameButton.disabled = true;
            console.log('Username set:', username);
        }
    });

    // Handle sending messages
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        console.log('Attempting to send message:', message);
        if (message && username) {
            console.log('Emitting chat message:', { username, message });
            socket.emit('chat message', { username, message });
            messageInput.value = '';  // Clear input field after sending
        } else {
            console.log('Message or username is empty');
        }
    }
});
