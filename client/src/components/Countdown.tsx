import React, { useEffect, useState } from 'react'

interface Props {
    duration: number;
    onTimeout: () => void; 
}

function Countdown({ duration, onTimeout }: Props) {
    const [countdown, setCountdown] = useState(duration);

    useEffect(() => {
        if (countdown === 0) {
            onTimeout();
            console.log("timeoit !!")
        }
        const interval = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(interval);
                    return 0;
                };
                return prevCount - 1;
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [countdown])

    return (
        <>{countdown}</>
    )
}

export default Countdown