import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime: number, onTimeOut: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTimerRunning(false);
      onTimeOut();
    }
  }, [timerRunning, timeLeft, onTimeOut]);

  const startTimer = useCallback(() => {
    setTimerRunning(true);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return { timeLeft, startTimer, resetTimer };
};
