import React, { useState, useEffect } from 'react';

interface CountdownProps {
  initialSeconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div>
      <h1>{seconds} seconds</h1>
    </div>
  );
};

export default Countdown;
