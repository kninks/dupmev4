import { useEffect, useState } from 'react'
import './App.css'
import { io } from "socket.io-client";

import Piano from './components/Piano';
import Countdown from './components/Countdown';
import Timer from './components/Timer';
import PianoP1 from './components/PianoP1';
import PianoP2 from './components/PianoP2';

const socket = io("http://localhost:3000");

function App() {
  const handleTimeout = () => {
    console.log("Timeout function called in ParentComponent");
  };

  return (

    <div className="App">
      {/* <Piano /> */}
      <PianoP1 />
      <PianoP2 />
    </div>
  )
}

export default App
