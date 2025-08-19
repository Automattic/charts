import { buildChartTheme } from '@visx/xychart';
import { useMemo } from 'react';
import { useGlobalChartTheme } from './use-global-chart-theme.js';

const useXYChartTheme = (data) => {
    const theme = useGlobalChartTheme();
    return useMemo(() => {
        const seriesColors = (data ?? [])
            .map(series => series.options?.stroke)
            .filter((color) => Boolean(color));
        return buildChartTheme({
            ...theme,
            colors: [...seriesColors, ...(theme.colors ?? [])],
        });
    }, [theme, data]);
};

export { useXYChartTheme };
