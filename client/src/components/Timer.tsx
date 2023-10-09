import React, { useRef, useState, useEffect } from 'react'

interface Props {
    onTimeout: () => void;
    initialSeconds: number;
}

function Timer({onTimeout, initialSeconds}: Props) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() =>  {
        const intervalId = setInterval(() => {
            setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
            if (secondsLeft === 1) {
                clearInterval(intervalId);
                onTimeout();
            }
        }, 1000)

        return () => clearInterval(intervalId);
    }, [secondsLeft, onTimeout])

    return (
        <>
            Seconds Left: {secondsLeft}
        </>
    )
}

export default Timer