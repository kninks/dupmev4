import React from 'react'
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function Piano() {
    const sendMessage = () => {
        socket.emit("send_message", { message: "Hello" });
      };

    return (
        <div>
            <input placeholder="Message..."/>
            <button onClick={sendMessage}>Submit</button>
        </div>

    )
}

export default Piano