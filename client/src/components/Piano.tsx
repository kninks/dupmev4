import React, { useEffect, useState } from 'react';
import './Component.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function Piano() {
    const allnotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const [noteslist, setNoteslist] = useState<{id: number, note: string}[]>([]);

    // Notes clicking
    const handleClickNote = (item: string) => {
    const newNote = {id: noteslist.length, note:item};
    setNoteslist([...noteslist, newNote]); //Add in array
    // console.log(item);
    };

    useEffect(() => {
        console.log("A note added", noteslist)
    }, [noteslist])

    // Set coundown
    const [countdown10, setCountdown10] = useState(10);
    const [countdown20, setCountdown20] = useState(20);
    const [startCountdown20, setStartCountdown20] = useState(false);

    useEffect (() => {
        if (countdown10 === 0) {
            sendNoteslist();
        }
        const interval10 = setInterval(() => {
            setCountdown10((prevCount10) => {
                if (prevCount10 <= 1) {
                    clearInterval(interval10);
                    return 0;
                };
                return prevCount10 - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval10);
        };
    }, [countdown10]);

    useEffect(() => {
        if (startCountdown20) {
            if (countdown20 === 0) {
                checkNotelist(noteslistReceived, noteslist);
            }
            const interval20 = setInterval(() => {
                setCountdown20((prevCount20) => {
                    if (prevCount20 <= 1) {
                        clearInterval(interval20);
                        return 0;
                    };
                    return prevCount20 - 1;
                });
            }, 1000);
    
            return () => {
                clearInterval(interval20);
            };
        }
    }, [startCountdown20, countdown20])

    // Socket event for sending notes
    const sendNoteslist = () => {
        console.log("Noteslist is sent", noteslist)
        socket.emit("send_noteslist", noteslist);
    };

    // Received notes
    const [noteslistReceived, setNoteslistReceived] = useState<{id: number, note: string}[]>([]);

    useEffect(() => {
        socket.on("receive_noteslist", (data) => {
            setNoteslistReceived(data);
            console.log("receive_noteslist", data);
            setNoteslist([]);
            setStartCountdown20(true);
        });
    }, [socket]);

    // Score checking
    const [score, setScore] = useState(0)

    const checkNotelist = (arrayReceived: {id: number, note: string}[], arraySubmit: {id: number, note: string}[]) => {
        const maxLenght = Math.max(arrayReceived.length, arraySubmit.length);
        console.log("checkNotelist", arrayReceived, arraySubmit, maxLenght);

        let updatedScore = score;

        for (let i = 0; i < maxLenght; i++) {
            if (arrayReceived[i].id === arraySubmit[i].id && arrayReceived[i].note === arraySubmit[i].note) {
                updatedScore++;
                console.log(`same at index ${i}:`, updatedScore);
            }
        };

        setScore(updatedScore);
    };

    return (
        <>
            <h1>p1 Seconds Left: {countdown10}</h1>
            <h1>p2 Seconds Left: {countdown20}</h1>
            <p>score: {score}</p>
            
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