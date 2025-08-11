import { createContext, useContext } from 'react';

const ChartInstanceContext = createContext(null);
const useChartInstanceContext = () => {
    const context = useContext(ChartInstanceContext);
    if (!context) {
        throw new Error('useChartInstanceContext must be used within a Chart component');
    }
    return context;
};
// Backward compatibility exports
const SingleChartContext = ChartInstanceContext;
const useSingleChartContext = useChartInstanceContext;

export { ChartInstanceContext, SingleChartContext, useChartInstanceContext, useSingleChartContext };
