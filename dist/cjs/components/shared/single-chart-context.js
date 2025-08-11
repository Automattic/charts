'use strict';

var react = require('react');

const ChartInstanceContext = react.createContext(null);
const useChartInstanceContext = () => {
    const context = react.useContext(ChartInstanceContext);
    if (!context) {
        throw new Error('useChartInstanceContext must be used within a Chart component');
    }
    return context;
};
// Backward compatibility exports
const SingleChartContext = ChartInstanceContext;
const useSingleChartContext = useChartInstanceContext;

exports.ChartInstanceContext = ChartInstanceContext;
exports.SingleChartContext = SingleChartContext;
exports.useChartInstanceContext = useChartInstanceContext;
exports.useSingleChartContext = useSingleChartContext;
