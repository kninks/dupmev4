import React, { useEffect, useRef, useState } from 'react';
import './Component.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function Piano() {
    const allnotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

    // Sent notes
    const [noteslist, setNoteslist] = useState<{id: number, note: string}[]>([]);
    const handleClickNote = (item: string) => {
        const newNote = {id: noteslist.length, note:item};
        setNoteslist([...noteslist, newNote]); //add in array
        console.log(item);
    };

    /// Timer for sending notes
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prevSecondsLeft) => {
                if (prevSecondsLeft === 1) {
                    sendNoteslist();
                    clearInterval(timer);
                    return 0;
                }
                return prevSecondsLeft - 1;
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Socket event for sending notes
    const sendNoteslist = () => {
        console.log("Noteslist is sent", {noteslist:noteslist})
        socket.emit("send_noteslist", {noteslist:noteslist});
    };

    // Received notes
    const [noteslistReceived, setNoteslistReceived] = useState<{id: number, note: string}[]>([]);

    useEffect(() => {
        socket.on("receive_noteslist", (data) => {
            setNoteslistReceived(data.noteslist);
        });
    }, [socket]);

    // Call sendNoteslist when the countdown is over
    const handleTimeout = () => {
        sendNoteslist(); // Call sendNoteslist when the countdown is over
      };

    return (
        <>
            <h1>Seconds Left: {secondsLeft}</h1>
            
            <h1>Piano</h1>
            <div className='piano-container'>
                {allnotes.map((item) => (
                    <div key={item} onClick={() => {handleClickNote(item);}}>
                        {item}
                    </div>
                ))}
            </div>

            <h1>Display</h1>
            <div className='piano-container'>
                {noteslist.map((item) => (
                    <div key={item.id}>{item.note}</div>
                ))}
            </div>

            <h1>Received</h1>
            <div className='piano-container'>
                {noteslistReceived.map((item) => (
                    <div key={item.id}>{item.note}</div>
                ))}
            </div>
        </>
    )
}

export default Piano