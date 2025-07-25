'use strict';

var jsxRuntime = require('react/jsx-runtime');
var xychart = require('@visx/xychart');
var react = require('react');
var themes = require('./themes.js');

/**
 * Context for sharing theme configuration across components
 */
const ThemeContext = react.createContext(themes.defaultTheme);
/**
 * Hook to access chart theme
 * @return {object} A built theme configuration compatible with visx charts
 */
const useChartTheme = () => {
    const theme = react.useContext(ThemeContext);
    return theme;
};
const useXYChartTheme = (data) => {
    const providerTheme = useChartTheme();
    return react.useMemo(() => {
        const seriesColors = (data ?? [])
            .map(series => series.options?.stroke)
            .filter((color) => Boolean(color));
        return xychart.buildChartTheme({
            ...providerTheme,
            colors: [...seriesColors, ...(providerTheme.colors ?? [])],
        });
    }, [providerTheme, data]);
};
// Provider component for chart theming
// Allows theme customization through props while maintaining default values
const ThemeProvider = ({ theme = {}, children }) => {
    const mergedTheme = { ...themes.defaultTheme, ...theme };
    return jsxRuntime.jsx(ThemeContext.Provider, { value: mergedTheme, children: children });
};

exports.ThemeProvider = ThemeProvider;
exports.useChartTheme = useChartTheme;
exports.useXYChartTheme = useXYChartTheme;
