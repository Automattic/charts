'use strict';

var react = require('react');
var useDeepMemo = require('../../../hooks/use-deep-memo.js');
require('@visx/event');
require('@visx/tooltip');
require('@visx/xychart');
require('../global-charts-provider.js');
var useGlobalChartsContext = require('./use-global-charts-context.js');
require('date-fns');
require('@automattic/number-formatters');
require('@visx/text');
require('deepmerge');
require('../../theme/theme-provider.js');
require('@visx/scale');

const useChartRegistration = ({ chartId, legendItems, chartType, isDataValid, metadata, }) => {
    const { registerChart, unregisterChart } = useGlobalChartsContext.useGlobalChartsContext();
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

exports.useChartRegistration = useChartRegistration;
