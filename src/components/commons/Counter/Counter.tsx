import { useEffect, useState } from 'react'
import type { CounterProps } from './Counter.types';

export const Counter = ({ value }: CounterProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;

        const duration = 1200;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;

            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return <>{count}</>;
}
