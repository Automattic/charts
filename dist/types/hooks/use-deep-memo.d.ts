/**
 * Custom hook to memoize a value using deep equality comparison.
 * Prevents unnecessary re-renders when objects have the same content but different references.
 *
 * @param value - The value to memoize with deep equality comparison
 * @return The memoized value that only changes when deeply different
 */
declare const useDeepMemo: <T>(value: T) => T;

export { useDeepMemo };
