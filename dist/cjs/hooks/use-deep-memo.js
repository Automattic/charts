'use strict';

var isEqual = require('fast-deep-equal');
var react = require('react');

/**
 * Custom hook to memoize a value using deep equality comparison.
 * Prevents unnecessary re-renders when objects have the same content but different references.
 *
 * @param value - The value to memoize with deep equality comparison
 * @return The memoized value that only changes when deeply different
 */
const useDeepMemo = (value) => {
    const ref = react.useRef(value);
    if (!isEqual(ref.current, value)) {
        ref.current = value;
    }
    return ref.current;
};

exports.useDeepMemo = useDeepMemo;
