'use strict';

var react = require('react');

/**
 * Hook to measure the height of a DOM element.
 * Returns a ref to attach to the element and the current height in pixels.
 *
 * @param {object} props               - Optional props.
 * @param {number} props.initialHeight - The initial height to use.
 *
 * @return {[Function, number]} A tuple containing a ref to attach to the element and the current height in pixels
 */
function useElementHeight({ initialHeight = 0, } = {}) {
    const [height, setHeight] = react.useState(initialHeight);
    const observerRef = react.useRef(null);
    const refCallback = react.useCallback((node) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        if (node) {
            const handleResize = () => {
                setHeight(node.getBoundingClientRect().height || 0);
            };
            handleResize();
            const resizeObserver = new window.ResizeObserver(handleResize);
            resizeObserver.observe(node);
            observerRef.current = resizeObserver;
        }
    }, []);
    return [refCallback, height];
}

exports.useElementHeight = useElementHeight;
