import { useContext } from 'react';
import { ChartInstanceContext } from './single-chart-context.js';

const useChartInstanceContext = () => {
    const context = useContext(ChartInstanceContext);
    if (!context) {
        throw new Error('useChartInstanceContext must be used within a Chart component');
    }
    return context;
};
const useSingleChartContext = useChartInstanceContext;

export { useChartInstanceContext, useSingleChartContext };
