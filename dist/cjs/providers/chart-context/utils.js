'use strict';

var react = require('react');
var chartContext = require('./chart-context.js');

const useChartId = (providedId) => {
    const generatedId = react.useId();
    return providedId || generatedId;
};
const useChartRegistration = (chartId, legendItems, theme, chartType, isDataValid, metadata) => {
    const { registerChart, unregisterChart } = chartContext.useChartContext();
    // Memoize metadata to prevent unnecessary re-renders
    const memoizedMetadata = react.useMemo(() => metadata, [metadata]);
    react.useEffect(() => {
        // Only register if data is valid
        if (isDataValid) {
            registerChart(chartId, {
                legendItems,
                theme,
                chartType,
                metadata: memoizedMetadata,
            });
        }
        return () => {
            unregisterChart(chartId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        chartId,
        legendItems,
        theme,
        chartType,
        memoizedMetadata,
        isDataValid,
        // Removed registerChart and unregisterChart from dependencies
        // They are stable functions created with useCallback and empty deps
    ]);
};

exports.useChartId = useChartId;
exports.useChartRegistration = useChartRegistration;
