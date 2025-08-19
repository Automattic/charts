import { ChartTheme } from '../types.js';

/**
 * Hook to get the effective chart theme, merging global and local themes.
 *
 * This hook combines the global theme from GlobalChartsProvider with the local theme
 * from ThemeProvider. The global theme provides the base, while the local theme
 * can override specific properties for fine-grained customization.
 *
 * @return The effective chart theme to use
 */
declare const useGlobalChartTheme: () => ChartTheme;

export { useGlobalChartTheme };
