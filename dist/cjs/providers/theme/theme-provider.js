'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/**
 * Context for sharing theme configuration across components
 */
const ThemeContext = react.createContext({});
/**
 * Hook to access chart theme
 * @return {object} A built theme configuration compatible with visx charts
 */
const useChartTheme = () => {
    const theme = react.useContext(ThemeContext);
    return theme;
};
// Provider component for chart theming
// Allows theme customization through props while maintaining default values
const ThemeProvider = ({ theme = {}, children }) => {
    return jsxRuntime.jsx(ThemeContext.Provider, { value: theme, children: children });
};

exports.ThemeProvider = ThemeProvider;
exports.useChartTheme = useChartTheme;
