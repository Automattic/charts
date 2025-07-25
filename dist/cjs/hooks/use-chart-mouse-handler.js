'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var event = require('@visx/event');
var tooltip = require('@visx/tooltip');
var react = require('react');

/**
 * Hook to handle mouse interactions for chart components
 *
 * @param {UseChartMouseHandlerProps} props - Hook configuration
 * @return {UseChartMouseHandlerReturn} Object containing handlers and tooltip state
 */
const useChartMouseHandler = ({ withTooltips, }) => {
    const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = tooltip.useTooltip();
    // TODO: either debounce/throttle or use useTooltipInPortal with built-in debounce
    const onMouseMove = react.useCallback((event$1, data) => {
        if (!withTooltips) {
            return;
        }
        const coords = event.localPoint(event$1);
        if (!coords) {
            return;
        }
        showTooltip({
            tooltipData: data,
            tooltipLeft: coords.x,
            tooltipTop: coords.y - 10,
        });
    }, [withTooltips, showTooltip]);
    const onMouseLeave = react.useCallback(() => {
        if (!withTooltips) {
            return;
        }
        hideTooltip();
    }, [withTooltips, hideTooltip]);
    return {
        onMouseMove,
        onMouseLeave,
        tooltipOpen,
        tooltipData: tooltipData || null,
        tooltipLeft,
        tooltipTop,
    };
};

exports.default = useChartMouseHandler;
