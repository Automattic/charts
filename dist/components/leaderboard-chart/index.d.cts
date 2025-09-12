export { L as LeaderboardChart, b as LeaderboardChartProps, a as LeaderboardChartUnresponsive } from '../../leaderboard-chart-BaDEGN6O.cjs';
import { L as LeaderboardEntry } from '../../types-Bz4cK2h9.cjs';
import { a as BaseLegendItem } from '../../types-xTFOajzt.cjs';
import 'react/jsx-runtime';
import '../../with-responsive-Cp2qnQPo.cjs';
import 'react';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/xychart';
import '@visx/legend';

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

/**
 * Hook to create legend items from leaderboard data
 * @param root0                         - Configuration object
 * @param root0.data                    - Array of leaderboard entries
 * @param root0.primaryColor            - Primary color override
 * @param root0.secondaryColor          - Secondary color override
 * @param root0.withComparison          - Whether comparison data is shown
 * @param root0.withOverlayLabel        - Whether to overlay the label on top of the bar
 * @param root0.legendLabels            - Custom labels for legend items
 * @param root0.legendLabels.primary    - Label for primary period data
 * @param root0.legendLabels.comparison - Label for comparison period data
 * @return Array of legend items for the leaderboard chart
 */
declare function useLeaderboardLegendItems({ data, primaryColor, secondaryColor, withComparison, withOverlayLabel, legendLabels, }: {
    data: LeaderboardEntry[];
    primaryColor?: string;
    secondaryColor?: string;
    withComparison: boolean;
    withOverlayLabel: boolean;
    legendLabels?: {
        primary?: string;
        comparison?: string;
    };
}): BaseLegendItem[];

export { LeaderboardEntry, type MetricValueType, formatMetricValue, useLeaderboardLegendItems };
