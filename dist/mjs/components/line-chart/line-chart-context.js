import { createContext, useContext } from 'react';

const LineChartContext = createContext(null);
const useLineChartContext = () => {
    const context = useContext(LineChartContext);
    if (!context) {
        throw new Error('useLineChartContext must be used within a LineChart component');
    }
    return context;
};

export { LineChartContext, useLineChartContext };
