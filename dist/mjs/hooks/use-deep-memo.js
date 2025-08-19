import isEqual from 'fast-deep-equal';
import { useRef } from 'react';

/**
 * Custom hook to memoize a value using deep equality comparison.
 * Prevents unnecessary re-renders when objects have the same content but different references.
 *
 * @param value - The value to memoize with deep equality comparison
 * @return The memoized value that only changes when deeply different
 */
const useDeepMemo = (value) => {
    const ref = useRef(value);
    if (!isEqual(ref.current, value)) {
        ref.current = value;
    }
    return ref.current;
};

export { useDeepMemo };
