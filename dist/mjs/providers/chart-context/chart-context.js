import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useCallback, useMemo, useContext } from 'react';

const ChartContext = createContext(null);
const ChartProvider = ({ children }) => {
    const [charts, setCharts] = useState(() => new Map());
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
    }), [charts, registerChart, unregisterChart, getChartData]);
    return jsx(ChartContext.Provider, { value: value, children: children });
};
const useChartContext = () => {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error('useChartContext must be used within a ChartProvider');
    }
    return context;
};

export { ChartContext, ChartProvider, useChartContext };
