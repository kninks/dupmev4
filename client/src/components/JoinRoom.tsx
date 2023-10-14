import React, { useEffect, useState } from "react";
import socket from "../socket";
import Piano from "./Piano";

function JoinRoom() {
  // Join room
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState<{room: string, players: {player: {id: string, name: string}, score: number}}[]>([]);
  const [enteredRoom, setEnteredRoom] = useState(false);
  const [playersInRoom, setPlayersInRoom] = useState<{id: string, name: string, room: string}[]>([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setEnteredRoom(true);
      console.log("join_room", room);
    }
  };

    useEffect(() => {
        socket.on("rooms", (data) => {
            setRooms(data)
            if (data.length === 0) {
                console.log('no rooms')
            } else {
                console.log(`rooms ${data}`)
            }
        });
        
    }, [socket]);  

    useEffect(() => {
        socket.on("players_in_room", (data) => {
        setPlayersInRoom(data);
        console.log("players_in_room", data);
        });
    }, [socket]);

  return (
    <>
      <h1>JoinRoom</h1>

        <p>Current rooms: </p>
            {rooms.map((item) => (
                <div key={item.room}>
                    {item.room}
                </div>
            ))}

      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>

      {enteredRoom && (
        <>
          <p>room: {room}</p>
          {playersInRoom.map((item) => (
              <div key={item.id}>{item.id}, {item.name}, {item.room}</div>
          ))}

        {/* <PianoCreate room={room} />
        <PianoFollow room={room}/> */}
        <Piano room={room}/>
        </>
      )}
    </>
  );
}

export default JoinRoom;
