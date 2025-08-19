'use strict';

var react = require('react');
var globalChartsProvider = require('../providers/chart-context/global-charts-provider.js');
var themeProvider = require('../providers/theme/theme-provider.js');
var themes = require('../providers/theme/themes.js');
var mergeThemes = require('../utils/merge-themes.js');

/**
 * Hook to get the effective chart theme, merging global and local themes.
 *
 * This hook combines the global theme from GlobalChartsProvider with the local theme
 * from ThemeProvider. The global theme provides the base, while the local theme
 * can override specific properties for fine-grained customization.
 *
 * @return The effective chart theme to use
 */
const useGlobalChartTheme = () => {
    // Get context but don't throw if it doesn't exist (for testing or standalone usage)
    const context = react.useContext(globalChartsProvider.GlobalChartsContext);
    const globalTheme = context?.theme;
    const localTheme = themeProvider.useChartTheme();
    // Memoize the theme to prevent unnecessary re-renders
    const effectiveTheme = react.useMemo(() => mergeThemes.mergeThemes(globalTheme ?? themes.defaultTheme, localTheme), [globalTheme, localTheme]);
    return effectiveTheme;
};

exports.useGlobalChartTheme = useGlobalChartTheme;
