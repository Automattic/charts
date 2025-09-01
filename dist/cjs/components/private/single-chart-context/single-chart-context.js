'use strict';

var react = require('react');

const ChartInstanceContext = react.createContext(null);
// Backward compatibility exports
const SingleChartContext = ChartInstanceContext;

exports.ChartInstanceContext = ChartInstanceContext;
exports.SingleChartContext = SingleChartContext;
