import { useContext, useMemo } from 'react';
import 'date-fns';
import '@automattic/number-formatters';
import '@visx/text';
import { mergeThemes } from '../../../utils/merge-themes.js';
import { useChartTheme } from '../../theme/theme-provider.js';
import { defaultTheme } from '../../theme/themes.js';
import { GlobalChartsContext } from '../global-charts-provider.js';

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
    const context = useContext(GlobalChartsContext);
    const globalTheme = context?.theme;
    const localTheme = useChartTheme();
    // Memoize the theme to prevent unnecessary re-renders
    const effectiveTheme = useMemo(() => mergeThemes(globalTheme ?? defaultTheme, localTheme), [globalTheme, localTheme]);
    return effectiveTheme;
};

export { useGlobalChartsTheme };
