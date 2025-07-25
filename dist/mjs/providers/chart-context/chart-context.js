import { jsx } from 'react/jsx-runtime';
import { createContext, useRef, useCallback, useMemo, useContext } from 'react';

const ChartContext = createContext(null);
const ChartProvider = ({ children }) => {
    const chartsRef = useRef(new Map());
    const registerChart = useCallback((id, data) => {
        chartsRef.current.set(id, data);
    }, []);
    const unregisterChart = useCallback((id) => {
        chartsRef.current.delete(id);
    }, []);
    const getChartData = useCallback((id) => {
        return chartsRef.current.get(id);
    }, []);
    const value = useMemo(() => ({
        charts: chartsRef.current,
        registerChart,
        unregisterChart,
        getChartData,
    }), [registerChart, unregisterChart, getChartData]);
    return jsx(ChartContext.Provider, { value: value, children: children });
};
const useChartContext = () => {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error('useChartContext must be used within a ChartProvider');
    }
    return context;
};

export { ChartProvider, useChartContext };
