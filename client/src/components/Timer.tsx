import React, { useEffect, useState } from 'react'

interface Props {
    duration: number;
  }

function Timer({duration}: Props) {
    const [countdown, setCountdown] = useState(duration);

    useEffect(() => {
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

    return ({countdown})
}

export default Timer