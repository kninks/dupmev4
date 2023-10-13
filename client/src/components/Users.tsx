import React, { ChangeEvent, useEffect, useState } from 'react'
import socket from '../socket';

function Users() {
    const [users, setUsers] = useState<{id: number, name: string}[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [name, setName] = useState<string>("");

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmitName = () => {
        console.log("submit_name", name);
        socket.emit("submit_name", name);
        socket.connect()
    }

    useEffect(() => {
        socket.on("users", (data) => {
            console.log("users", data);
            setUsers(data);
        });

        socket.on("connect", () => {
            setIsConnected(true);
            console.log(`${name} connected`)
        })

        socket.on("disconnect", () => {
            setIsConnected(false);
            console.log(`${name} disconnected`)
        });
    }, [socket]);

    return (
        <>
        <h1>Welcome !</h1>
        <div>{isConnected ? ( <>
            <h3>Current players: {users.length}</h3>
            {users.map((item) => (
                <div key={item.id}>{item.id}, {item.name}</div>
            ))}
        </> ) : ( <>
            <input 
                type='text'
                value={name}
                onChange={handleNameChange}
                placeholder='Enter your name'
            />
            <button onClick={handleSubmitName}>Submit</button>
        </> )}
        </div>
        </>
    )
}

export default Users