import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

const users: {sid: string, name: string, roomId: string, score: number}[] = [];
const rooms: string[] = ["room 1", "room 2", "room 3", "room 4", "room 5"];

io.on("connection", (socket) => {
    // Connection -------------------------------------
    console.log(`Boombayah connected: ${socket.id}`)

    socket.on("submit_name", (data) => {
        const user = {sid: socket.id, name: data, roomId: "main", score: 0};
        users.push(user);
        console.log("users: ");
        console.log(users);

        // Send the list of all connected users to the client
        io.emit('users', users);
        io.emit('rooms', rooms);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);

        // Remove the user from the connected users array
        const userIndex = users.findIndex((user) => user.sid === socket.id);
        if (userIndex !== -1) {
            const roomId = users[userIndex].roomId;
            users.splice(userIndex, 1);

            const playersInRoom = users.filter((user) => user.roomId === roomId);
            console.log(`players in room ${roomId} =`)
            console.log(playersInRoom)

            // // Broadcasting the list of players in the room to all users in the room
            io.to(roomId).emit('players_in_room', playersInRoom);
        }
        console.log("users: ");
        console.log(users);

        // Send the updated list of connected users to all clients
        io.emit('users', users);
    });
    // -------------------------------------

    // Room -------------------------------------
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`${socket.id} join_room ${data}`);

        // /Update the room property for the user in the users array
        const userIndex = users.findIndex((user) => user.sid === socket.id);
        if (userIndex !== -1) {
            users[userIndex].roomId = data;
        }

        // Send the list of players in the room to the client who entered the room
        const playersInRoom = users.filter((user) => user.roomId === data);

        // Broadcasting the list of players in the room to all users in the room
        io.to(data).emit('players_in_room', playersInRoom);

        // Broadcasting the updated user
        io.emit('users', users);
    })

    socket.on('leave_room', (data) => {
        socket.leave(data);
        console.log(`${socket.id} leave_room ${data}`);

        // /Update the room property for the user in the users array
        const userIndex = users.findIndex((user) => user.sid === socket.id);
        if (userIndex !== -1) {
            users[userIndex].roomId = "main";
        }

        // Send the list of players in the room to the client who entered the room
        const playersInRoom = users.filter((user) => user.roomId === data);
        console.log(`players in room ${data} =`)
        console.log(playersInRoom)

        // Broadcasting the list of players in the room to all users in the room
        io.to(data).emit('players_in_room', playersInRoom);

        // Broadcasting the updated user
        io.emit('users', users);
    })
    // -------------------------------------

    // Game -------------------------------------
    socket.on("ready", (data) => {
        // player ready
    })

    // if both player ready -> randomize P1
    const P1 = true;
    const P2 = true;
    if (P1 && P2) {
        io.to("P1 socket.id").emit("start_game", "P1 socket.id")
    }

    socket.on("send_notelist", (data) => {
        console.log("receive_notelist", data)
        // socket.to sends the event to all sockets in the specified room, but it does not include the current socket.
        // io.to send the event to all sockets in the specified room, regardless of the namespace.
        socket.to(data.roomId).emit("receive_notelist", data);
    })

    socket.on("end_round", (data) => {
        // set score
        io.to(data.roomId).emit("start_round", "next round start!");
        console.log(data)
    })

    socket.on("end_game", (data) => {
        console.log(`end_game: ${data}`)
        // set score
    })

    socket.on("reset", (data) => {
        io.to(data).emit("receive_reset", "")
        console.log(`${data} reset game`)
    })
    // -------------------------------------
})

server.listen(3000, () => {
    console.log("Boombayah is running");
})