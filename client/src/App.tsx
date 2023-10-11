import { useEffect, useState } from 'react'
import './App.css'
import { io } from "socket.io-client";

import Piano from './components/Piano';
import Countdown from './components/Countdown';
import Timer from './components/Timer';

const socket = io("http://localhost:3000");

function App() {
  const handleTimeout = () => {
    console.log("Timeout function called in ParentComponent");
  };

  return (

    <div className="App">
      {/* <Piano /> */}
      <><Countdown duration={3} onTimeout={() => console.log("Timeout function called in ParentComponent")} /></>
    </div>
  )
}

export default App
