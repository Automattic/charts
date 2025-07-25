'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

const ChartContext = react.createContext(null);
const ChartProvider = ({ children }) => {
    const chartsRef = react.useRef(new Map());
    const registerChart = react.useCallback((id, data) => {
        chartsRef.current.set(id, data);
    }, []);
    const unregisterChart = react.useCallback((id) => {
        chartsRef.current.delete(id);
    }, []);
    const getChartData = react.useCallback((id) => {
        return chartsRef.current.get(id);
    }, []);
    const value = react.useMemo(() => ({
        charts: chartsRef.current,
        registerChart,
        unregisterChart,
        getChartData,
    }), [registerChart, unregisterChart, getChartData]);
    return jsxRuntime.jsx(ChartContext.Provider, { value: value, children: children });
};
const useChartContext = () => {
    const context = react.useContext(ChartContext);
    if (!context) {
        throw new Error('useChartContext must be used within a ChartProvider');
    }
    return context;
};

exports.ChartProvider = ChartProvider;
exports.useChartContext = useChartContext;
