import { useId, useMemo, useEffect } from 'react';
import { useChartContext } from './chart-context.js';

const useChartId = (providedId) => {
    const generatedId = useId();
    return providedId || generatedId;
};
const useChartRegistration = (chartId, legendItems, theme, chartType, isDataValid, metadata) => {
    const { registerChart, unregisterChart } = useChartContext();
    // Memoize metadata to prevent unnecessary re-renders
    const memoizedMetadata = useMemo(() => metadata, [metadata]);
    useEffect(() => {
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
    }, [
        chartId,
        legendItems,
        theme,
        chartType,
        memoizedMetadata,
        isDataValid,
        registerChart,
        unregisterChart,
    ]);
};

export { useChartId, useChartRegistration };
