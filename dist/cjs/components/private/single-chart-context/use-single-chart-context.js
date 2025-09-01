'use strict';

var react = require('react');
var singleChartContext = require('./single-chart-context.js');

const useChartInstanceContext = () => {
    const context = react.useContext(singleChartContext.ChartInstanceContext);
    if (!context) {
        throw new Error('useChartInstanceContext must be used within a Chart component');
    }
    return context;
};
const useSingleChartContext = useChartInstanceContext;

exports.useChartInstanceContext = useChartInstanceContext;
exports.useSingleChartContext = useSingleChartContext;
