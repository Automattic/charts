export { M as MetricValueType, f as formatMetricValue } from '../format-metric-value-MXm5DtQ_.cjs';
import { TickFormatter } from '@visx/axis';
import { AnyD3Scale, ScaleInput } from '@visx/scale';
import { c as SeriesData, C as ChartTheme, e as CompleteChartTheme } from '../types-4wyyzjot.cjs';
import { LegendShape } from '@visx/legend/lib/types';
import { LineStyles } from '@visx/xychart';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/text/lib/Text';
import 'react';

/**
 * Utility function to create chart components with composition API.
 *
 * This function attaches subcomponents to a chart component to enable
 * dot notation access like <Chart.Legend />, <Chart.Tooltip />, etc.
 *
 * @param Chart         - The main chart component
 * @param subComponents - Object containing subcomponents to attach
 * @return Chart component with attached subcomponents
 */
declare function attachSubComponents<TChart, TSubComponents extends Record<string, unknown>>(Chart: TChart, subComponents: TSubComponents): TChart & TSubComponents;

/**
 * @file Date parsing utilities using date-fns for local timezone handling
 *
 * This module provides utilities for parsing various date string formats and converting
 * them to local timezone dates using the battle-tested date-fns library. For formats
 * without timezone info, they're treated as local. For formats with timezone info,
 * they're converted to the equivalent local time.
 *
 * Note: And specifically it prevents format `YYYY-MM-DD` being parsed as UTC date.
 *
 * Key Features:
 * - All parsed dates are in local timezone
 * - Converts timezone-aware strings to local equivalent
 * - Robust input validation and error handling using date-fns
 * - TypeScript type safety
 * - Much smaller codebase than custom parsing
 *
 * Supported Formats:
 * - YYYY-MM-DD (treated as local)
 * - YYYY-MM-DD HH:mm:ss (treated as local)
 * - YYYY-MM-DD HH:mm (treated as local)
 * - YYYY-MM-DDTHH:mm:ss (treated as local)
 * - YYYY-MM-DDTHH:mm:ss.SSS (treated as local)
 * - YYYY-MM-DDTHH:mm (treated as local)
 * - YYYY-MM-DDTHH:mm:ssZ (converted to local)
 * - YYYY-MM-DDTHH:mm:ss±HH:mm (converted to local)
 *
 * @example
 * ```typescript
 * parseAsLocalDate("2025-01-01");                     // Local timezone
 * parseAsLocalDate("2025-01-01 14:30:00");            // Local timezone
 * parseAsLocalDate("2025-01-01 14:30");               // Local timezone
 * parseAsLocalDate("2025-01-01T14:30:45.123");        // Local timezone
 * parseAsLocalDate("2025-01-01T14:30:00Z");           // UTC 14:30 → Local equivalent
 * parseAsLocalDate("2025-01-01T14:30:00+05:00");      // +05:00 14:30 → Local equivalent
 * ```
 */
/**
 * Parses any supported date string format and returns a local timezone date
 *
 * Uses date-fns for robust parsing and validation. For strings without timezone
 * info, treats as local timezone. For strings with timezone info, converts to
 * local timezone equivalent.
 *
 * Supports:
 * - YYYY-MM-DD (local)
 * - YYYY-MM-DD HH:mm:ss (local)
 * - YYYY-MM-DD HH:mm (local)
 * - YYYY-MM-DDTHH:mm:ss (local)
 * - YYYY-MM-DDTHH:mm:ss.SSS (local)
 * - YYYY-MM-DDTHH:mm (local)
 * - YYYY-MM-DDTHH:mm:ssZ (UTC → local)
 * - YYYY-MM-DDTHH:mm:ss±HH:mm (offset → local)
 * @param {string} dateString - The date string to parse into a local timezone date
 * @return {Date} A Date object representing the parsed date in local timezone, or an invalid Date if parsing fails
 */
declare const parseAsLocalDate: (dateString: string) => Date;

/**
 * Format a percentage value with smart decimal handling.
 * Uses `@automattic/number-formatters` for consistent formatting.
 * Removes unnecessary trailing zeros and caps at 2 decimal places.
 *
 * @param value - The percentage value (0-100 range)
 * @return Formatted percentage string (e.g., "30%", "30.1%", "30.25%")
 */
declare const formatPercentage: (value: number) => string;

/**
 * Returns the width of the longest tick.
 *
 * @param          ticks      - Ticks to get the width of.
 * @param          formatTick - Function to format the tick.
 * @param {object} labelStyle - Style object for the label.
 * @return {number} - Width of the longest tick.
 */
declare const getLongestTickWidth: <T extends AnyD3Scale>(ticks: ScaleInput<T>[], formatTick: TickFormatter<ScaleInput<T>>, labelStyle?: object) => number;

/**
 * Utility function to get consolidated line styles for a series
 * This consolidates the logic used by both LineChart and Legend components
 *
 * @param {SeriesData} seriesData    - The series data containing styling options
 * @param {number}     index         - The index of the series in the data array
 * @param {ChartTheme} providerTheme - The chart theme configuration
 * @return {LineStyles} The consolidated line styles for the series
 */
declare function getSeriesLineStyles(seriesData: SeriesData, index: number, providerTheme: ChartTheme): LineStyles;
/**
 * Utility function to get stroke color for a series
 *
 * @param {SeriesData} seriesData  - The series data containing styling options
 * @param {number}     index       - The index of the series in the data array
 * @param {string[]}   themeColors - Array of theme colors
 * @return {string} The stroke color for the series
 */
declare function getSeriesStroke(seriesData: SeriesData, index: number, themeColors: string[]): string;
/**
 * Utility function to get shape styles for a legend item
 *
 * @param {SeriesData}  series      - The series data containing styling options
 * @param {number}      index       - The index of the series in the data array
 * @param {ChartTheme}  theme       - The chart theme configuration
 * @param {LegendShape} legendShape - The shape to use for the item (optional)
 * @return {Record< string, unknown >} The shape styles for the item
 */
declare function getItemShapeStyles(series: SeriesData, index: number, theme: ChartTheme, legendShape?: LegendShape<SeriesData[], number>): Record<string, unknown>;

declare const isSafari: () => boolean;

/**
 * Merges chart themes with proper precedence.
 * The second theme (override) takes precedence over the first theme (base).
 *
 * @param baseTheme     - Base theme object
 * @param overrideTheme - Theme to override base with (takes precedence)
 * @return Merged theme with overrideTheme values taking precedence
 */
declare function mergeThemes(baseTheme: CompleteChartTheme, overrideTheme: Partial<ChartTheme>): CompleteChartTheme;
declare function mergeThemes(baseTheme: ChartTheme, overrideTheme: Partial<ChartTheme>): ChartTheme;

/**
 * Convert hex color to rgba with specified opacity
 * This is genuinely reusable across chart components
 * @param  hex   - The hex color string (e.g., '#ff0000')
 * @param  alpha - The opacity value between 0 and 1
 * @return The rgba color string (e.g., 'rgba(255, 0, 0, 0.5)')
 * @throws {Error} if hex string is malformed
 */
declare const hexToRgba: (hex: string, alpha: number) => string;
/**
 * Convert hex color to HSL
 * @param  hex - hex color string
 * @return HSL values as [h, s, l]
 * @throws {Error} if hex string is malformed
 */
declare const hexToHsl: (hex: string) => [number, number, number];
/**
 * Calculate the perceptual distance between two HSL colors
 * @param hsl1 - first color in HSL format [h, s, l]
 * @param hsl2 - second color in HSL format [h, s, l]
 * @return distance value (0-100+, lower means more similar)
 */
declare const getColorDistance: (hsl1: [number, number, number], hsl2: [number, number, number]) => number;

/**
 * Resolves a CSS custom property (variable) to its computed value
 *
 * @param varName - A CSS variable name like '--my-color'
 * @param element - Optional DOM element to resolve the variable from (defaults to document.documentElement)
 * @return The computed value or null if invalid/not found
 */
declare const resolveCssVariable: (varName: string, element?: HTMLElement | null) => string | null;

export { attachSubComponents, formatPercentage, getColorDistance, getItemShapeStyles, getLongestTickWidth, getSeriesLineStyles, getSeriesStroke, hexToHsl, hexToRgba, isSafari, mergeThemes, parseAsLocalDate, resolveCssVariable };
