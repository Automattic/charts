import { jsx } from 'react/jsx-runtime';
import { buildChartTheme } from '@visx/xychart';
import { createContext, useContext, useMemo } from 'react';
import { defaultTheme } from './themes.js';

/**
 * Context for sharing theme configuration across components
 */
const ThemeContext = createContext(defaultTheme);
/**
 * Hook to access chart theme
 * @return {object} A built theme configuration compatible with visx charts
 */
const useChartTheme = () => {
    const theme = useContext(ThemeContext);
    return theme;
};
const useXYChartTheme = (data) => {
    const providerTheme = useChartTheme();
    return useMemo(() => {
        const seriesColors = (data ?? [])
            .map(series => series.options?.stroke)
            .filter((color) => Boolean(color));
        return buildChartTheme({
            ...providerTheme,
            colors: [...seriesColors, ...(providerTheme.colors ?? [])],
        });
    }, [providerTheme, data]);
};
// Provider component for chart theming
// Allows theme customization through props while maintaining default values
const ThemeProvider = ({ theme = {}, children }) => {
    const mergedTheme = { ...defaultTheme, ...theme };
    return jsx(ThemeContext.Provider, { value: mergedTheme, children: children });
};

export { ThemeProvider, useChartTheme, useXYChartTheme };
