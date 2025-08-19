'use strict';

var xychart = require('@visx/xychart');
var react = require('react');
var useGlobalChartTheme = require('./use-global-chart-theme.js');

const useXYChartTheme = (data) => {
    const theme = useGlobalChartTheme.useGlobalChartTheme();
    return react.useMemo(() => {
        const seriesColors = (data ?? [])
            .map(series => series.options?.stroke)
            .filter((color) => Boolean(color));
        return xychart.buildChartTheme({
            ...theme,
            colors: [...seriesColors, ...(theme.colors ?? [])],
        });
    }, [theme, data]);
};

exports.useXYChartTheme = useXYChartTheme;
