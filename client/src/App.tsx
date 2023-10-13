import { useEffect, useState } from 'react'
import './App.css'
import { io } from "socket.io-client";

import Piano from './components/Piano';
import Countdown from './components/Countdown';
import Timer from './components/Timer';
import PianoP1 from './components/PianoP1';
import PianoP2 from './components/PianoP2';
import Users from './components/Users';

function App() {
    return (
        <div className="App">
            {/* <Piano /> */}
            {/* <PianoP1 />
            <PianoP2 /> */}
            <Users />
        </div>
    )
}

export default App
