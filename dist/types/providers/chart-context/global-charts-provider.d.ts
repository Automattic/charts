import * as react from 'react';
import { FC, ReactNode } from 'react';
import { GlobalChartsContextValue } from './types.js';
import { ChartTheme } from '../../types.js';

declare const GlobalChartsContext: react.Context<GlobalChartsContextValue>;
interface GlobalChartsProviderProps {
    children: ReactNode;
    /** Optional theme override. Considered static for provider lifecycle. */
    theme?: Partial<ChartTheme>;
}
declare const GlobalChartsProvider: FC<GlobalChartsProviderProps>;

export { GlobalChartsContext, GlobalChartsProvider, type GlobalChartsProviderProps };
