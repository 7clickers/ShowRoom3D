import { useRef, useEffect } from 'react';

function useThrottledDispatch(action, value, delay) {
  const valueRef = useRef(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const dispatchAction = () => {
      action(valueRef.current);
      timeoutRef.current = null;
    };

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(dispatchAction, delay);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [action, delay]);
}

export default useThrottledDispatch;