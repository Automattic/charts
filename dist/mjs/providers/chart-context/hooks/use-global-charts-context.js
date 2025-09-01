import { useContext } from 'react';
import { GlobalChartsContext } from '../global-charts-provider.js';

const useGlobalChartsContext = () => {
    const context = useContext(GlobalChartsContext);
    if (!context) {
        throw new Error('useGlobalChartsContext must be used within a GlobalChartsProvider');
    }
    return context;
};

export { useGlobalChartsContext };
