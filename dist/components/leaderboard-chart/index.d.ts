export { L as LeaderboardChart, a as LeaderboardChartProps, b as LeaderboardEntry } from '../../leaderboard-chart-D8KNIPOq.js';
import 'react';

/**
 * Types for formatMetricValue
 */
type MetricValueType = 'number' | 'average' | 'currency';
type FormatMetricValueOptions = {
    decimals?: number;
    useMultipliers?: boolean;
    signDisplay?: Intl.NumberFormatOptions['signDisplay'];
};
/**
 * Format a numeric metric value based on type, precision and scale.
 * Supports currency, number and percentage, using @automattic/number-formatters.
 *
 * @param value                  - The value to format
 * @param type                   - The type of formatting to apply
 * @param options                - Formatting options
 * @param options.decimals       - Number of decimal places to show
 * @param options.useMultipliers - Whether to use K, M, B suffixes for large numbers
 * @param options.signDisplay    - Controls when to display the sign (auto, always, never, exceptZero)
 * @return Formatted string
 */
declare const formatMetricValue: (value: string | number, type?: MetricValueType, { decimals, useMultipliers, signDisplay }?: FormatMetricValueOptions) => string;

export { type MetricValueType, formatMetricValue };
