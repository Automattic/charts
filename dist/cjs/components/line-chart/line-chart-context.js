'use strict';

var react = require('react');

const LineChartContext = react.createContext(null);
const useLineChartContext = () => {
    const context = react.useContext(LineChartContext);
    if (!context) {
        throw new Error('useLineChartContext must be used within a LineChart component');
    }
    return context;
};

exports.LineChartContext = LineChartContext;
exports.useLineChartContext = useLineChartContext;
