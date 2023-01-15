import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        const ms = setTimeout(() => setDebounce(value), delay);
        return () => {
            clearTimeout(ms);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debounce;
}

export default useDebounce;