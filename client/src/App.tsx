import { useEffect, useState } from 'react'
import './App.css'
import { io } from "socket.io-client";

import Piano from './components/Piano';

const socket = io("http://localhost:3000");

function App() {

  return (
    <div className="App">
      <Piano />
    </div>
  )
}

export default App
