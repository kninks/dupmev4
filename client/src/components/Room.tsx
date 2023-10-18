import React, { useEffect, useState } from "react";
import socket from "../socket";
import Piano from "./Piano";
import "./Component.css";

function Room() {
    const [rooms, setRooms] = useState<{ roomId: string, round: number }[]>([]);
    const [roomId, setRoomId] = useState("");
    const [inRoom, setInRoom] = useState(false);
    const [playersInRoom, setPlayersInRoom] = useState<{sid: string, name: string, roomId: string, score: number, ready: boolean, P1: boolean}[]>([]);

    const handleJoin = (item: string) => {
        socket.emit('join_room', item);
        setInRoom(true);
        console.log("join_room", item);
        setRoomId(item);
    };

    const handleLeave = () => {
        socket.emit('leave_room', roomId);
        setInRoom(false);
        console.log("leave_room");
        setRoomId("main");
    };

    useEffect(() => {
        socket.on("rooms", (data) => {
            setRooms(data);
        });
        socket.on("players_in_room", (data) => {
            setPlayersInRoom(data);
        });
    }, [socket]);
    return (
        <>
            <h1>JoinRoom</h1>
            {inRoom ? ( 
                <>
                    <p>room: {roomId}</p>
                    {playersInRoom.map((item) => (
                        <div key={item.sid}>
                            {item.sid}, {item.name}, {item.roomId}, {item.score}
                        </div>
                    ))}
                    <button onClick={handleLeave}>leave this room</button>
                    <Piano roomId={roomId} />
                </> ) : ( <>
                    {/* <input
                        placeholder="Room Number..."
                        onChange={(event) => {
                        setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}> Join Room</button> */}
                    <div className="rooms-container">
                        {rooms.map((item) => (
                            <div
                                key={item.roomId}
                                onClick={() => {handleJoin(item.roomId);}}
                            >
                                {item.roomId}
                            </div>
                        ))}
                    </div>
            </>
            )}
        </>
    )
}

export default Room