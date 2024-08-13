const { Server } = require("socket.io");

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log("Setting up Socket.io");

        const io = new Server(res.socket.server);
        io.on("connection", (socket) => {
            console.log("New user connected:", socket.id);

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });

            socket.on("chat message", ({ username, message }) => {
                console.log("Received chat message from", username, ":", message);
                io.emit("chat message", { username, message });
            });
        });

        res.socket.server.io = io;
    } else {
        console.log("Socket.io already set up");
    }
    res.end();
};

export default ioHandler;
