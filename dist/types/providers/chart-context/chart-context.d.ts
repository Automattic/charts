import * as react from 'react';
import { FC, ReactNode } from 'react';
import { ChartContextValue } from './types.js';

declare const ChartContext: react.Context<ChartContextValue>;
interface ChartProviderProps {
    children: ReactNode;
}
declare const ChartProvider: FC<ChartProviderProps>;
declare const useChartContext: () => ChartContextValue;

export { ChartContext, ChartProvider, type ChartProviderProps, useChartContext };
