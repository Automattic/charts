import { buildChartTheme } from '@visx/xychart';
import { useMemo } from 'react';
import '../providers/chart-context/global-charts-provider.js';
import 'fast-deep-equal';
import '@visx/event';
import '@visx/tooltip';
import 'date-fns';
import '@automattic/number-formatters';
import '@visx/text';
import 'deepmerge';
import '@visx/scale';
import { useGlobalChartsTheme } from '../providers/chart-context/hooks/use-global-charts-theme.js';

const useXYChartTheme = (data) => {
    const theme = useGlobalChartsTheme();
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
