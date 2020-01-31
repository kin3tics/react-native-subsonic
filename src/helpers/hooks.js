import { useRef, useEffect } from 'react';

export const useCompare = (val) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
}

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}