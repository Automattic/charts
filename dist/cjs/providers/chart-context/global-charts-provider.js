'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var themes = require('../theme/themes.js');

const GlobalChartsContext = react.createContext(null);
const GlobalChartsProvider = ({ children, theme = {}, }) => {
    const [charts, setCharts] = react.useState(() => new Map());
    const providerTheme = react.useMemo(() => ({ ...themes.defaultTheme, ...theme }), [theme]);
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
        theme: providerTheme,
    }), [charts, registerChart, unregisterChart, getChartData, providerTheme]);
    return jsxRuntime.jsx(GlobalChartsContext.Provider, { value: value, children: children });
};
const useGlobalChartsContext = () => {
    const context = react.useContext(GlobalChartsContext);
    if (!context) {
        throw new Error('useGlobalChartsContext must be used within a GlobalChartsProvider');
    }
    return context;
};

exports.GlobalChartsContext = GlobalChartsContext;
exports.GlobalChartsProvider = GlobalChartsProvider;
exports.useGlobalChartsContext = useGlobalChartsContext;
