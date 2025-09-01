'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var globalChartsProvider = require('../../providers/chart-context/global-charts-provider.js');
var singleChartContext = require('../private/single-chart-context/single-chart-context.js');
var baseLegend = require('./private/base-legend.js');

const Legend = react.forwardRef(({ chartId, items, ...props }, ref) => {
    // Get context but don't throw if it doesn't exist
    const context = react.useContext(globalChartsProvider.GlobalChartsContext);
    const singleChartContext$1 = react.useContext(singleChartContext.SingleChartContext);
    // When chartId is used, it is standalone mode
    // When chartId is not provided, we use the context's chartId, meaning it is in a single chart context
    const contextChartId = chartId ?? singleChartContext$1?.chartId;
    // Use useMemo to ensure re-rendering when context changes
    const contextItems = react.useMemo(() => {
        return contextChartId && context
            ? context.getChartData(contextChartId)?.legendItems
            : undefined;
    }, [contextChartId, context]);
    // Provided items take precedence over context items
    const legendItems = (items || contextItems);
    if (!legendItems) {
        return null;
    }
    return jsxRuntime.jsx(baseLegend.BaseLegend, { ref: ref, items: legendItems, ...props });
});

exports.Legend = Legend;
