export { BarChart, BarChartUnresponsive } from './charts/bar-chart/index.cjs';
export { LineChart, LineChartUnresponsive } from './charts/line-chart/index.cjs';
export { A as AnnotationStyles, B as BaseChartProps, i as ButtonWithPopover, C as ChartTheme, e as CompleteChartTheme, D as DataPoint, b as DataPointDate, d as DataPointPercentage, G as GradientStop, g as GridProps, L as LeaderboardEntry, M as MultipleDataPointsDate, O as Optional, a as OrientationType, P as PopoverButtonAttributes, j as PopoverElement, h as PopoverElementAttributes, f as ScaleOptions, c as SeriesData, S as SeriesDataOptions, T as ToggleEvent } from './types-BtYG-Fdk.cjs';
export { EventHandlerParams, GridStyles, LineStyles } from '@visx/xychart';
export { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
export { PieChart, PieChartProps, PieChartUnresponsive } from './charts/pie-chart/index.cjs';
export { PieSemiCircleChart, PieSemiCircleChartUnresponsive } from './charts/pie-semi-circle-chart/index.cjs';
export { BarListChart, BarListChartUnresponsive } from './charts/bar-list-chart/index.cjs';
export { L as LeaderboardChart, a as LeaderboardChartUnresponsive } from './leaderboard-chart-Bf7z7SoM.cjs';
export { L as Legend } from './legend-C9ahiwOt.cjs';
export { LegendValueDisplay, useChartLegendItems } from './components/legend/index.cjs';
export { B as BaseLegendItem } from './types-C05PdDJa.cjs';
export { ConversionFunnelChart } from './charts/conversion-funnel-chart/index.cjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { R as ResponsiveConfig } from './with-responsive-Cp2qnQPo.cjs';
import * as react from 'react';
export { B as BaseTooltip } from './base-tooltip-DOq93wjU.cjs';
export { TrendDirection, TrendIndicator, TrendIndicatorProps } from './components/trend-indicator/index.cjs';
export { b as GlobalChartsContext, G as GlobalChartsProvider, G as ThemeProvider, d as defaultTheme, u as useGlobalChartsContext, a as useGlobalChartsTheme } from './themes-DYhtyXtJ.cjs';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';
import './types-BBwg4Evw.cjs';
import '@visx/shape/lib/shapes/Pie';
import '@visx/text';
import '@visx/legend';

type SparklineDataPoint = number;
type GradientConfig = {
    /**
     * Start color for gradient (defaults to color prop)
     */
    from?: string;
    /**
     * End color for gradient (defaults to theme backgroundColor)
     */
    to?: string;
    /**
     * Start opacity (0-1)
     * @default 0.5
     */
    fromOpacity?: number;
    /**
     * End opacity (0-1)
     * @default 0.0
     */
    toOpacity?: number;
};
interface SparklineProps {
    /**
     * Array of numeric values to plot
     * @example [10, 25, 15, 30, 22, 35]
     */
    data: SparklineDataPoint[];
    /**
     * Width of the sparkline in pixels
     * @default 100
     */
    width?: number;
    /**
     * Height of the sparkline in pixels
     * @default 40
     */
    height?: number;
    /**
     * Size (used by responsive variant, equivalent to width for square charts)
     */
    size?: number;
    /**
     * Color for the line stroke (hex or CSS color)
     * @default Theme color (first color in theme.colors array)
     */
    color?: string;
    /**
     * Line stroke width in pixels
     * @default 1
     */
    strokeWidth?: number;
    /**
     * Whether to render the gradient fill beneath the line
     * @default true
     */
    withGradientFill?: boolean;
    /**
     * Gradient configuration for area fill
     * If not provided, uses color prop with default opacity values
     */
    gradient?: GradientConfig;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Chart ID for unique gradient/element identification
     */
    chartId?: string;
    /**
     * Margin around the chart
     * @default { top: 2, right: 2, bottom: 2, left: 2 }
     */
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
}

/**
 * Sparkline - A minimal line chart for inline data visualization.
 *
 * Sparklines are compact charts designed to be embedded inline with text or
 * displayed in small spaces like table cells or dashboards. They show trends
 * without axes, labels, or other chart chrome.
 *
 * This component is built on top of LineChart with preconfigured settings
 * for minimal display (no axes, grid, tooltips, or legend).
 */
declare const SparklineUnresponsive: react.ForwardRefExoticComponent<SparklineProps & react.RefAttributes<HTMLDivElement>>;
/**
 * Responsive Sparkline chart component
 */
declare const Sparkline: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<SparklineProps>, "width" | "height" | "size"> & Omit<SparklineProps, "width" | "height" | "size"> & ResponsiveConfig) => react_jsx_runtime.JSX.Element;

export { Sparkline, SparklineUnresponsive };
