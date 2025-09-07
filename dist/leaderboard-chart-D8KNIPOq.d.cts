import { FC } from 'react';

interface LeaderboardEntry {
    /**
     * Unique internal key (e.g., 'key-direct')
     */
    id: string;
    /**
     * Human-readable name (e.g., 'Direct') or a JSX element (e.g., <h4>Direct</h4>)
     */
    label: string | JSX.Element;
    /**
     * Value of the entry
     */
    currentValue: number;
    /**
     * Value of the entry in the previous period
     */
    previousValue: number;
    /**
     * Width of current bar, as % of the current value
     */
    currentShare: number;
    /**
     * Width of previous bar, as % of the current value
     */
    previousShare: number;
    /**
     * Delta of the entry
     */
    delta: number;
    /**
     * Optional color for the entry's image/icon
     */
    imageColor?: string;
}
interface LeaderboardChartProps {
    /**
     * Array of leaderboard entries to display
     */
    data: LeaderboardEntry[];
    /**
     * Whether to show comparison data
     */
    withComparison?: boolean;
    /**
     * Whether to overlay the label on top of bar
     */
    withOverlayLabel?: boolean;
    /**
     * Primary color for current period bars
     */
    primaryColor?: string;
    /**
     * Secondary color for comparison period bars
     */
    secondaryColor?: string;
    /**
     * Formatter for values
     */
    valueFormatter?: (value: number) => string;
    /**
     * Formatter for delta values
     */
    deltaFormatter?: (value: number) => string;
    /**
     * Whether the chart is in loading state
     */
    loading?: boolean;
    /**
     * Additional CSS class name for the chart container
     */
    className?: string;
    /**
     * Custom styling for the chart container
     */
    style?: React.CSSProperties & {
        '--a8c--charts--leaderboard--bar--border-radius'?: string;
    };
}
declare const LeaderboardChart: FC<LeaderboardChartProps>;

export { LeaderboardChart as L, type LeaderboardChartProps as a, type LeaderboardEntry as b };
