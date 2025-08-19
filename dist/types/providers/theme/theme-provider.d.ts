import { ChartTheme } from '../../types.js';
import { FC, ReactNode } from 'react';

/**
 * Hook to access chart theme
 * @return {object} A built theme configuration compatible with visx charts
 */
declare const useChartTheme: () => Partial<ChartTheme>;
/**
 * Props for the ThemeProvider component
 */
type ThemeProviderProps = {
    /** Optional partial theme override */
    theme?: Partial<ChartTheme>;
    /** Child components that will have access to the theme */
    children: ReactNode;
};
declare const ThemeProvider: FC<ThemeProviderProps>;

export { ThemeProvider, useChartTheme };
