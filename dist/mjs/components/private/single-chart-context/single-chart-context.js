import { createContext } from 'react';

const ChartInstanceContext = createContext(null);
// Backward compatibility exports
const SingleChartContext = ChartInstanceContext;

export { ChartInstanceContext, SingleChartContext };
