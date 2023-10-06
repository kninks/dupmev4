import { useEffect, useState } from 'react'
import './App.css'
import { io } from "socket.io-client";
import Piano from './components/Piano';

const socket = io("http://localhost:3001");

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
    </div>
  )
}

export default App
