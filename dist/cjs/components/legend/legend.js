'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var chartContext = require('../../providers/chart-context/chart-context.js');
var baseLegend = require('./base-legend.js');

const Legend = react.forwardRef(({ chartId, items, ...props }, ref) => {
    // Get context but don't throw if it doesn't exist
    const context = react.useContext(chartContext.ChartContext);
    // Use useMemo to ensure re-rendering when context changes
    const contextItems = react.useMemo(() => {
        return chartId && context ? context.getChartData(chartId)?.legendItems : undefined;
    }, [chartId, context]);
    // Use context items if available, otherwise fall back to provided items
    const legendItems = (contextItems || items);
    if (!legendItems) {
        return null;
    }
    return jsxRuntime.jsx(baseLegend.BaseLegend, { ref: ref, items: legendItems, ...props });
});

exports.Legend = Legend;
