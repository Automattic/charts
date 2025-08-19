import { jsx } from 'react/jsx-runtime';
import { createContext, useContext } from 'react';

/**
 * Context for sharing theme configuration across components
 */
const ThemeContext = createContext({});
/**
 * Hook to access chart theme
 * @return {object} A built theme configuration compatible with visx charts
 */
const useChartTheme = () => {
    const theme = useContext(ThemeContext);
    return theme;
};
// Provider component for chart theming
// Allows theme customization through props while maintaining default values
const ThemeProvider = ({ theme = {}, children }) => {
    return jsx(ThemeContext.Provider, { value: theme, children: children });
};

export { ThemeProvider, useChartTheme };
