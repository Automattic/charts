export { L as LeaderboardChart, b as LeaderboardChartProps, a as LeaderboardChartUnresponsive } from '../../leaderboard-chart-CN80sJmQ.cjs';
import { L as LeaderboardEntry } from '../../types-D1lTxRyg.cjs';
export { M as MetricValueType, f as formatMetricValue } from '../../format-metric-value-MXm5DtQ_.cjs';
import { B as BaseLegendItem } from '../../types-C05PdDJa.cjs';
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
import '@visx/text/lib/Text';
import '@visx/xychart';
import 'react-google-charts';
import '@visx/legend';

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

export { LeaderboardEntry, useLeaderboardLegendItems };
