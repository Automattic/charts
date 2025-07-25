import { ChartContextValue } from './types.js';
import { FC, ReactNode } from 'react';

interface ChartProviderProps {
    children: ReactNode;
}
declare const ChartProvider: FC<ChartProviderProps>;
declare const useChartContext: () => ChartContextValue;

export { ChartProvider, type ChartProviderProps, useChartContext };
