import * as _visx_xychart from '@visx/xychart';
import { ChartTheme, SeriesData } from '../../types.js';
import { FC, ReactNode } from 'react';

/**
 * Hook to access chart theme
 * @return {object} A built theme configuration compatible with visx charts
 */
declare const useChartTheme: () => ChartTheme;
declare const useXYChartTheme: (data: SeriesData[]) => _visx_xychart.XYChartTheme;
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

export { ThemeProvider, useChartTheme, useXYChartTheme };
