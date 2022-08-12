import { useRef, useEffect, useCallback } from "react";

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

// Utility helper for random number generation
export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Reference: https://www.joshwcomeau.com/snippets/react-hooks/use-random-interval/
export default function useRandomInterval(callback, minDelay, maxDelay) {
  const timeoutId = useRef(null);

  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let isEnabled =
      typeof minDelay === 'number' && typeof maxDelay === 'number';

    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);

  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);

  return cancel;
};