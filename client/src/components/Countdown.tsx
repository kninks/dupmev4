import React, { useEffect, useState } from 'react'

interface Props {
    duration: number;
    onTimeout: () => void; 
    isRunning: boolean;
}

function Countdown({ duration, isRunning, onTimeout }: Props) {
    const [countdown, setCountdown] = useState(duration);

    useEffect(() => {
        if (isRunning) {
            if (countdown === 0) {
                onTimeout();
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
        }
        
    }, [isRunning, countdown])

    return (
        <>{countdown}</>
    )
}

export default Countdown