import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useMemo, useCallback, useContext } from 'react';
import { defaultTheme } from '../theme/themes.js';

const GlobalChartsContext = createContext(null);
const GlobalChartsProvider = ({ children, theme = {}, }) => {
    const [charts, setCharts] = useState(() => new Map());
    const providerTheme = useMemo(() => ({ ...defaultTheme, ...theme }), [theme]);
    const registerChart = useCallback((id, data) => {
        setCharts(prev => new Map(prev).set(id, data));
    }, []);
    const unregisterChart = useCallback((id) => {
        setCharts(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    }, []);
    const getChartData = useCallback((id) => {
        return charts.get(id);
    }, [charts]);
    const value = useMemo(() => ({
        charts,
        registerChart,
        unregisterChart,
        getChartData,
        theme: providerTheme,
    }), [charts, registerChart, unregisterChart, getChartData, providerTheme]);
    return jsx(GlobalChartsContext.Provider, { value: value, children: children });
};
const useGlobalChartsContext = () => {
    const context = useContext(GlobalChartsContext);
    if (!context) {
        throw new Error('useGlobalChartsContext must be used within a GlobalChartsProvider');
    }
    return context;
};

export { GlobalChartsContext, GlobalChartsProvider, useGlobalChartsContext };
