import { localPoint } from '@visx/event';
import { useTooltip } from '@visx/tooltip';
import { useCallback } from 'react';

/**
 * Hook to handle mouse interactions for chart components
 *
 * @param {UseChartMouseHandlerProps} props - Hook configuration
 * @return {UseChartMouseHandlerReturn} Object containing handlers and tooltip state
 */
const useChartMouseHandler = ({ withTooltips, }) => {
    const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
    // TODO: either debounce/throttle or use useTooltipInPortal with built-in debounce
    const onMouseMove = useCallback((event, data) => {
        if (!withTooltips) {
            return;
        }
        const coords = localPoint(event);
        if (!coords) {
            return;
        }
        showTooltip({
            tooltipData: data,
            tooltipLeft: coords.x,
            tooltipTop: coords.y - 10,
        });
    }, [withTooltips, showTooltip]);
    const onMouseLeave = useCallback(() => {
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

export { useChartMouseHandler as default };
