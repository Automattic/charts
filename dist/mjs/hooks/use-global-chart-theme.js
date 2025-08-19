import { useContext, useMemo } from 'react';
import { GlobalChartsContext } from '../providers/chart-context/global-charts-provider.js';
import { useChartTheme } from '../providers/theme/theme-provider.js';
import { defaultTheme } from '../providers/theme/themes.js';
import { mergeThemes } from '../utils/merge-themes.js';

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
    const context = useContext(GlobalChartsContext);
    const globalTheme = context?.theme;
    const localTheme = useChartTheme();
    // Memoize the theme to prevent unnecessary re-renders
    const effectiveTheme = useMemo(() => mergeThemes(globalTheme ?? defaultTheme, localTheme), [globalTheme, localTheme]);
    return effectiveTheme;
};

export { useGlobalChartTheme };
