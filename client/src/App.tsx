import { useEffect, useState } from 'react'
import './App.css'
import { io } from "socket.io-client";

import Piano from './components/Piano';
import Timer from './components/Timer';
import Countdown from './components/Countdown';

const socket = io("http://localhost:3000");

function App() {
  // const sendMessage = () => {
  //   socket.emit("send_message", { message: "Hello" });
  // };

  // useEffect(() => {
  //   socket.on("receive_message")
  // }, [socket])

  return (
    <div className="App">
      <Piano />
      <Countdown initialSeconds={10} />
    </div>
  )
}

export default App
