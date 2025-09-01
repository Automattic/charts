import { useMemo, useEffect } from 'react';
import { useDeepMemo } from '../../../hooks/use-deep-memo.js';
import '@visx/event';
import '@visx/tooltip';
import '@visx/xychart';
import '../global-charts-provider.js';
import { useGlobalChartsContext } from './use-global-charts-context.js';
import 'date-fns';
import '@automattic/number-formatters';
import '@visx/text';
import 'deepmerge';
import '../../theme/theme-provider.js';
import '@visx/scale';

const useChartRegistration = ({ chartId, legendItems, chartType, isDataValid, metadata, }) => {
    const { registerChart, unregisterChart } = useGlobalChartsContext();
    // Memoize legendItems with deep comparison to prevent infinite loops
    const stableLegendItems = useDeepMemo(legendItems);
    // Memoize metadata to prevent unnecessary re-renders
    const memoizedMetadata = useMemo(() => metadata, [metadata]);
    useEffect(() => {
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

export { useChartRegistration };
