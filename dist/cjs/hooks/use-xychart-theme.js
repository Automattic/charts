'use strict';

var xychart = require('@visx/xychart');
var react = require('react');
require('../providers/chart-context/global-charts-provider.js');
require('fast-deep-equal');
require('@visx/event');
require('@visx/tooltip');
require('date-fns');
require('@automattic/number-formatters');
require('@visx/text');
require('deepmerge');
require('@visx/scale');
var useGlobalChartsTheme = require('../providers/chart-context/hooks/use-global-charts-theme.js');

const useXYChartTheme = (data) => {
    const theme = useGlobalChartsTheme.useGlobalChartsTheme();
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
