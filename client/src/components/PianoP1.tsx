import React, { useEffect, useState } from 'react'
import './Component.css';
import { io } from "socket.io-client";
import Countdown from './Countdown';

const socket = io("http://localhost:3000");

function PianoP1() {
    const allnotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const [notelist, setNotelist] = useState<{id: number, note: string}[]>([]);

    //handle P1 ready
    const handleReady = () => {
        console.log("P1 ready");
    };

    // Notes clicking
    const handleClickNote = (item: string) => {
        const newNote = {id: notelist.length, note:item};
        setNotelist([...notelist, newNote]); //Add in array
    };

    useEffect(() => {
        console.log("A note added", notelist)
    }, [notelist])

    // Socket event for sending notes
    const sendNoteslist = () => {
        console.log("Notelist is sent", notelist)
        socket.emit("send_notelist", notelist);
    };

    return (
        <>
        <h1>PianoP1</h1>
        <p>P1 Seconds left:</p> <Countdown duration={10} isRunning={true} onTimeout={() => sendNoteslist()} />

        <div className='piano-container'>
            {allnotes.map((item) => (
                <div key={item} onClick={() => {handleClickNote(item);}}>
                    {item}
                </div>
            ))}
        </div>

        <h1>Display</h1>
        <div className='piano-container'>
            {notelist.map((item) => (
                <div key={item.id}>{item.note}</div>
            ))}
        </div>
        </>
    )
}

export default PianoP1