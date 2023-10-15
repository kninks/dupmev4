import React, { useEffect, useState } from "react";
import socket from "../socket";
import Piano from "./Piano";

function JoinRoom() {
  // Join room
  const [room, setRoom] = useState("");
  const [enteredRoom, setEnteredRoom] = useState(false);
  const [playersInRoom, setPlayersInRoom] = useState<{sid: string, name: string, room: string}[]>([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setEnteredRoom(true);
      console.log("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("players_in_room", (data) => {
      setPlayersInRoom(data);
      console.log("players_in_room", data);
    });
  }, [socket]);

  return (
    <>
      <h1>JoinRoom</h1>
        <div>{enteredRoom ? (<>
            <p>room: {room}</p>
            {playersInRoom.map((item) => (
                <div key={item.sid}>{item.sid}, {item.name}, {item.room}</div>
            ))}
            <button>leave this room</button>
            <Piano room={room}/>
        </>) : (<>
            <input
                placeholder="Room Number..."
                onChange={(event) => {
                setRoom(event.target.value);
                }}
            />
            <button onClick={joinRoom}> Join Room</button>
        </>)}</div>
    </>
  );
}

export default JoinRoom;