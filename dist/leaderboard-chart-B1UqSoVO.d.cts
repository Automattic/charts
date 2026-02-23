import * as react_jsx_runtime from 'react/jsx-runtime';
import { R as ResponsiveConfig } from './with-responsive-CNfhzAUu.cjs';
import * as react from 'react';
import { ReactNode, FC } from 'react';
import { a as BaseLegendProps, B as BaseLegendItem } from './types-C05PdDJa.cjs';
import { B as BaseChartProps, L as LeaderboardEntry } from './types-DOQK1ctx.cjs';

interface LeaderboardChartProps extends Pick<BaseChartProps<LeaderboardEntry>, 'className' | 'data' | 'showLegend' | 'legendOrientation' | 'legendPosition' | 'legendAlignment' | 'legendShape' | 'chartId' | 'width' | 'height' | 'size' | 'legendInteractive' | 'animation'> {
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
     * Width of legend shapes in pixels
     */
    legendShapeWidth?: number;
    /**
     * Height of legend shapes in pixels
     */
    legendShapeHeight?: number;
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
