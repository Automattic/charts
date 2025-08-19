import { ChartTheme } from '../types.js';

/**
 * Merges chart themes with proper precedence.
 * The second theme (override) takes precedence over the first theme (base).
 *
 * @param baseTheme     - Base theme object
 * @param overrideTheme - Theme to override base with (takes precedence)
 * @return Merged theme with overrideTheme values taking precedence
 */
declare function mergeThemes(baseTheme: ChartTheme, overrideTheme: Partial<ChartTheme>): ChartTheme;

export { mergeThemes };
