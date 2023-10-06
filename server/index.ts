//express
import express from "express";
import http from "http";
//cors
import cors from "cors";
//socket
import { Server, Socket } from "socket.io";


const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
    
    })
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});