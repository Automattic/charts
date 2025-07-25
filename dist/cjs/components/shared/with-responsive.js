'use strict';

var jsxRuntime = require('react/jsx-runtime');
var responsive = require('@visx/responsive');

const useResponsiveDimensions = ({ resizeDebounceTime = 300, maxWidth = 1200, aspectRatio = 0.5, }) => {
    const { parentRef, width: parentWidth } = responsive.useParentSize({
        debounceTime: resizeDebounceTime,
        enableDebounceLeadingCall: true,
    });
    const containerWidth = parentWidth > 0 ? Math.min(parentWidth, maxWidth) : 0;
    const containerHeight = containerWidth * aspectRatio;
    return { parentRef, width: containerWidth, height: containerHeight };
};
/**
 * A higher-order component that provides responsive dimensions
 * to the wrapped chart component using useParentSize from @visx/responsive.
 *
 * @param WrappedComponent - The chart component to be wrapped.
 * @return A functional component that renders the wrapped component with responsive dimensions.
 */
function withResponsive(// 'options' is excluded so that each chart can define its own options type
WrappedComponent) {
    return function ResponsiveChart({ resizeDebounceTime = 300, maxWidth = 1200, aspectRatio = 0.5, ...chartProps }) {
        const { parentRef, width: containerWidth, height: containerHeight, } = useResponsiveDimensions({
            resizeDebounceTime,
            maxWidth,
            aspectRatio,
        });
        return (jsxRuntime.jsx("div", { ref: parentRef, style: {
                width: '100%',
                height: chartProps.height ?? 'auto',
            }, children: jsxRuntime.jsx(WrappedComponent, { width: containerWidth, height: containerHeight, size: containerWidth, ...chartProps }) }));
    };
}

exports.withResponsive = withResponsive;
