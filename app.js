require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on("connection", (socket) => {
    // send a message to the client
    socket.emit("hello", "world");

    // receive a message from the client
    socket.on("howdy", (arg) => {
        console.log(arg);
    })
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})