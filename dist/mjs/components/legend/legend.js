import { jsx } from 'react/jsx-runtime';
import { forwardRef, useContext, useMemo } from 'react';
import { ChartContext } from '../../providers/chart-context/chart-context.js';
import { BaseLegend } from './base-legend.js';

const Legend = forwardRef(({ chartId, items, ...props }, ref) => {
    // Get context but don't throw if it doesn't exist
    const context = useContext(ChartContext);
    // Use useMemo to ensure re-rendering when context changes
    const contextItems = useMemo(() => {
        return chartId && context ? context.getChartData(chartId)?.legendItems : undefined;
    }, [chartId, context]);
    // Use context items if available, otherwise fall back to provided items
    const legendItems = (contextItems || items);
    if (!legendItems) {
        return null;
    }
    return jsx(BaseLegend, { ref: ref, items: legendItems, ...props });
});

export { Legend };
