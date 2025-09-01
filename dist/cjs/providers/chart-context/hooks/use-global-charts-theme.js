'use strict';

var react = require('react');
require('date-fns');
require('@automattic/number-formatters');
require('@visx/text');
var mergeThemes = require('../../../utils/merge-themes.js');
var themeProvider = require('../../theme/theme-provider.js');
var themes = require('../../theme/themes.js');
var globalChartsProvider = require('../global-charts-provider.js');

/**
 * Hook to get the effective chart theme, merging global and local themes.
 *
 * This hook combines the global theme from GlobalChartsProvider with the local theme
 * from ThemeProvider. The global theme provides the base, while the local theme
 * can override specific properties for fine-grained customization.
 *
 * @return The effective chart theme to use
 */
const useGlobalChartsTheme = () => {
    // Get context but don't throw if it doesn't exist (for testing or standalone usage)
    const context = react.useContext(globalChartsProvider.GlobalChartsContext);
    const globalTheme = context?.theme;
    const localTheme = themeProvider.useChartTheme();
    // Memoize the theme to prevent unnecessary re-renders
    const effectiveTheme = react.useMemo(() => mergeThemes.mergeThemes(globalTheme ?? themes.defaultTheme, localTheme), [globalTheme, localTheme]);
    return effectiveTheme;
};

exports.useGlobalChartsTheme = useGlobalChartsTheme;
