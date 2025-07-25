'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

const ChartContext = react.createContext(null);
const ChartProvider = ({ children }) => {
    const [charts, setCharts] = react.useState(() => new Map());
    const registerChart = react.useCallback((id, data) => {
        setCharts(prev => new Map(prev).set(id, data));
    }, []);
    const unregisterChart = react.useCallback((id) => {
        setCharts(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    }, []);
    const getChartData = react.useCallback((id) => {
        return charts.get(id);
    }, [charts]);
    const value = react.useMemo(() => ({
        charts,
        registerChart,
        unregisterChart,
        getChartData,
    }), [charts, registerChart, unregisterChart, getChartData]);
    return jsxRuntime.jsx(ChartContext.Provider, { value: value, children: children });
};
const useChartContext = () => {
    const context = react.useContext(ChartContext);
    if (!context) {
        throw new Error('useChartContext must be used within a ChartProvider');
    }
    return context;
};

exports.ChartContext = ChartContext;
exports.ChartProvider = ChartProvider;
exports.useChartContext = useChartContext;
