import { jsx } from 'react/jsx-runtime';
import { forwardRef, useContext, useMemo } from 'react';
import { GlobalChartsContext } from '../../providers/chart-context/global-charts-provider.js';
import { SingleChartContext } from '../private/single-chart-context/single-chart-context.js';
import { BaseLegend } from './private/base-legend.js';

const Legend = forwardRef(({ chartId, items, ...props }, ref) => {
    // Get context but don't throw if it doesn't exist
    const context = useContext(GlobalChartsContext);
    const singleChartContext = useContext(SingleChartContext);
    // When chartId is used, it is standalone mode
    // When chartId is not provided, we use the context's chartId, meaning it is in a single chart context
    const contextChartId = chartId ?? singleChartContext?.chartId;
    // Use useMemo to ensure re-rendering when context changes
    const contextItems = useMemo(() => {
        return contextChartId && context
            ? context.getChartData(contextChartId)?.legendItems
            : undefined;
    }, [contextChartId, context]);
    // Provided items take precedence over context items
    const legendItems = (items || contextItems);
    if (!legendItems) {
        return null;
    }
    return jsx(BaseLegend, { ref: ref, items: legendItems, ...props });
});

export { Legend };
