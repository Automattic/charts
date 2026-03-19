import * as react_jsx_runtime from 'react/jsx-runtime';
import { R as ResponsiveConfig } from './with-responsive-CNfhzAUu.js';
import * as react from 'react';
import { ReactNode, FC } from 'react';
import { a as BaseLegendProps, B as BaseLegendItem } from './types-BSQVn7e9.js';
import { B as BaseChartProps, L as LeaderboardEntry } from './types-rXqh76Ut.js';

interface LeaderboardChartProps extends Pick<BaseChartProps<LeaderboardEntry>, 'className' | 'data' | 'showLegend' | 'legend' | 'chartId' | 'width' | 'height' | 'size' | 'gap' | 'animation'> {
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
     * Custom styling for the chart container
     */
    style?: React.CSSProperties & {
        '--a8c--charts--leaderboard--bar--border-radius'?: string;
    };
    /**
     * Custom labels for legend items
     */
    legendLabels?: {
        /**
         * Label for primary period data
         */
        primary?: string;
        /**
         * Label for comparison period data (only used when withComparison is true)
         */
        comparison?: string;
    };
    /**
     * Child components for composition API
     */
    children?: ReactNode;
}

declare const LeaderboardChart: FC<LeaderboardChartProps> & {
    Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
        items?: BaseLegendItem[];
        chartId?: string;
    } & react.RefAttributes<HTMLDivElement>>;
};
declare const LeaderboardChartResponsive: (({ resizeDebounceTime, maxWidth, aspectRatio, size, width, height, ...chartProps }: Omit<LeaderboardChartProps, "width" | "height" | "size"> & {
    width?: number;
    height?: number;
    size?: number;
} & ResponsiveConfig) => react_jsx_runtime.JSX.Element) & {
    Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
        items?: BaseLegendItem[];
        chartId?: string;
    } & react.RefAttributes<HTMLDivElement>>;
};

export { LeaderboardChartResponsive as L, LeaderboardChart as a, type LeaderboardChartProps as b };
