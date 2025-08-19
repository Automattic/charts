'use strict';

var react = require('react');
var useDeepMemo = require('../../hooks/use-deep-memo.js');
var globalChartsProvider = require('./global-charts-provider.js');
require('../theme/theme-provider.js');
require('deepmerge');
require('@visx/event');
require('@visx/tooltip');
require('@visx/xychart');

const useChartId = (providedId) => {
    const generatedId = react.useId();
    return providedId || generatedId;
};
const useChartRegistration = ({ chartId, legendItems, chartType, isDataValid, metadata, }) => {
    const { registerChart, unregisterChart } = globalChartsProvider.useGlobalChartsContext();
    // Memoize legendItems with deep comparison to prevent infinite loops
    const stableLegendItems = useDeepMemo.useDeepMemo(legendItems);
    // Memoize metadata to prevent unnecessary re-renders
    const memoizedMetadata = react.useMemo(() => metadata, [metadata]);
    react.useEffect(() => {
        // Only register if data is valid
        if (isDataValid) {
            registerChart(chartId, {
                legendItems: stableLegendItems,
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
        stableLegendItems,
        chartType,
        memoizedMetadata,
        isDataValid,
        // Removed registerChart and unregisterChart from dependencies
        // They are stable functions created with useCallback and empty deps
    ]);
};

exports.useChartId = useChartId;
exports.useChartRegistration = useChartRegistration;
