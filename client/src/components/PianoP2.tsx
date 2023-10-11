import React, { useEffect, useState } from 'react'
import './Component.css';
import { io } from "socket.io-client";
import Countdown from './Countdown';

const socket = io("http://localhost:3000");

function PianoP2() {
    const allnotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const [notelist, setNotelist] = useState<{id: number, note: string}[]>([]);

    //handle P2 ready
    const handleReady = () => {
        console.log("P2 ready");
    };

    // Notes clicking
    const handleClickNote = (item: string) => {
        const newNote = {id: notelist.length, note:item};
        setNotelist([...notelist, newNote]); //Add in array
    };

    useEffect(() => {
        console.log("A note added", notelist)
    }, [notelist])

    // Received notes
    const [notelistReceived, setNotelistReceived] = useState<{id: number, note: string}[]>([]);

    useEffect(() => {
        socket.on("receive_noteslist", (data) => {
            setNotelistReceived(data);
            console.log("receive_noteslist", data);
            setNotelist([]);
        });
    }, [socket]);

    // Scoring
    const checkNotelist = () => {
        console.log("Checked")
    }
    // const [score, setScore] = useState(0)

    // const checkNotelist = (arrayReceived: {id: number, note: string}[], arraySubmit: {id: number, note: string}[]) => {
    //     const maxLenght = Math.max(arrayReceived.length, arraySubmit.length);
    //     console.log("checkNotelist", arrayReceived, arraySubmit, maxLenght);

    //     let updatedScore = score;

    //     for (let i = 0; i < maxLenght; i++) {
    //         if (arrayReceived[i].id === arraySubmit[i].id && arrayReceived[i].note === arraySubmit[i].note) {
    //             updatedScore++;
    //             console.log(`same at index ${i}:`, updatedScore);
    //         }
    //     };

    //     setScore(updatedScore);
    // };


    return (
        <>
        <h1>PianoP1</h1>
        <p>P1 Seconds left:</p> <Countdown duration={10} isRunning={false} onTimeout={() => checkNotelist()} />

        <h1>Received</h1>
            <div className='piano-container'>
                {notelistReceived.map((item) => (
                    <div key={item.id}>{item.note}</div>
                ))}
            </div>

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

export default PianoP2