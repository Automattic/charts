import * as react from 'react';
import { FC, ReactNode } from 'react';
import { ChartContextValue } from './types.js';

declare const GlobalChartsContext: react.Context<ChartContextValue>;
interface GlobalChartsProviderProps {
    children: ReactNode;
}
declare const GlobalChartsProvider: FC<GlobalChartsProviderProps>;
declare const useGlobalChartsContext: () => ChartContextValue;

export { GlobalChartsContext, GlobalChartsProvider, type GlobalChartsProviderProps, useGlobalChartsContext };
