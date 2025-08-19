import * as react from 'react';
import { FC, ReactNode } from 'react';
import { ChartContextValue } from './types.js';
import { ChartTheme } from '../../types.js';

declare const GlobalChartsContext: react.Context<ChartContextValue>;
interface GlobalChartsProviderProps {
    children: ReactNode;
    /** Optional theme override. Considered static for provider lifecycle. */
    theme?: Partial<ChartTheme>;
}
declare const GlobalChartsProvider: FC<GlobalChartsProviderProps>;
declare const useGlobalChartsContext: () => ChartContextValue;

export { GlobalChartsContext, GlobalChartsProvider, type GlobalChartsProviderProps, useGlobalChartsContext };
