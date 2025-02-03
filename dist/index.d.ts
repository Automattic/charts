import * as react_jsx_runtime from 'react/jsx-runtime';
import { Orientation } from '@visx/axis';
import { ScaleType, scaleOrdinal } from '@visx/scale';
import { LineStyles } from '@visx/xychart';
import { CSSProperties, ComponentType, ReactNode, FC } from 'react';

type ValueOf<T> = T[keyof T];
declare type OrientationType = ValueOf<typeof Orientation>;
type DataPoint = {
    label: string;
    value: number;
};
type DataPointDate = {
    date: Date;
    value: number | null;
    label?: string;
};
type SeriesData = {
    group?: string;
    label: string;
    data: DataPointDate[] | DataPoint[];
    options: {
        gradient?: {
            from: string;
            to: string;
            toOpacity?: number;
        };
        stroke?: string;
    };
};
type DataPointPercentage = {
    /**
     * Label for the data point
     */
    label: string;
    /**
     * Numerical value
     */
    value: number;
    /**
     * Formatted value for display
     */
    valueDisplay?: string;
    /**
     * Percentage value
     */
    percentage: number;
    /**
     * Color code for the segment, by default colours are taken from the theme but this property can overrides it
     */
    color?: string;
};
/**
 * Theme configuration for chart components
 */
type ChartTheme = {
    /** Background color for chart components */
    backgroundColor: string;
    /** Background color for labels */
    labelBackgroundColor?: string;
    /** Array of colors used for data visualization */
    colors: string[];
    /** Optional CSS styles for grid lines */
    gridStyles?: CSSProperties;
    /** Length of axis ticks in pixels */
    tickLength: number;
    /** Color of the grid lines */
    gridColor: string;
    /** Color of the grid lines in dark mode */
    gridColorDark: string;
    /** Styles for x-axis tick lines */
    xTickLineStyles?: LineStyles;
    /** Styles for x-axis line */
    xAxisLineStyles?: LineStyles;
};
declare type AxisOptions = {
    orientation?: OrientationType;
    numTicks?: number;
    axisClassName?: string;
    axisLineClassName?: string;
    labelClassName?: string;
    tickClassName?: string;
};
/**
 * Base properties shared across all chart components
 */
type BaseChartProps<T = DataPoint | DataPointDate> = {
    /**
     * Array of data points to display in the chart
     */
    data: T extends DataPoint | DataPointDate ? T[] : T;
    /**
     * Additional CSS class name for the chart container
     */
    className?: string;
    /**
     * Width of the chart in pixels
     */
    width?: number;
    /**
     * Height of the chart in pixels
     */
    height?: number;
    /**
     * Chart margins
     */
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    /**
     * Whether to show tooltips on hover. False by default.
     */
    withTooltips?: boolean;
    /**
     * Whether to show legend
     */
    showLegend?: boolean;
    /**
     * Legend orientation
     */
    legendOrientation?: 'horizontal' | 'vertical';
    /**
     * Grid visibility. x is default.
     */
    gridVisibility?: 'x' | 'y' | 'xy' | 'none';
    /**
     * More options for the chart.
     */
    options?: {
        yScale?: {
            type?: ScaleType;
            zero?: boolean;
        };
        xScale?: {
            type?: ScaleType;
        };
        axis?: {
            x?: AxisOptions;
            y?: AxisOptions;
        };
    };
};

interface BarChartProps extends BaseChartProps<SeriesData[]> {
}
declare const _default$3: (props: Omit<BarChartProps, "height" | "width" | "size">) => react_jsx_runtime.JSX.Element;

interface LineChartProps extends BaseChartProps<SeriesData[]> {
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    withGradientFill: boolean;
    smoothing?: boolean;
}
declare const _default$2: (props: Omit<LineChartProps, "height" | "width" | "size">) => react_jsx_runtime.JSX.Element;

type OmitBaseChartProps = Omit<BaseChartProps<DataPointPercentage[]>, 'width' | 'height'>;
interface PieChartProps extends OmitBaseChartProps {
    /**
     * Inner radius in pixels. If > 0, creates a donut chart. Defaults to 0.
     */
    innerRadius?: number;
    /**
     * Size of the chart in pixels
     */
    size?: number;
    /**
     * Add padding to the chart
     */
    padding?: number;
    /**
     * Thickness of the pie chart.
     * A value between 0 and 1, where 0 means no thickness
     * and 1 means the maximum thickness.
     */
    thickness?: number;
    /**
     * Scale of the gap between groups in the pie chart
     * A value between 0 and 1, where 0 means no gap.
     */
    gapScale?: number;
    /**
     * Scale of the corner radius for the pie chart segments.
     * A value between 0 and 1, where 0 means no corner radius.
     */
    cornerScale?: number;
    /**
     * Use the children prop to render additional elements on the chart.
     */
    children?: React.ReactNode;
}
declare const _default$1: (props: Omit<PieChartProps, "height" | "width" | "size">) => react_jsx_runtime.JSX.Element;

interface PieSemiCircleChartProps extends BaseChartProps<DataPointPercentage[]> {
    /**
     * Width of the chart in pixels; height would be half of this value calculated automatically.
     */
    width?: number;
    /**
     * Thickness of the pie chart. A value between 0 and 1
     */
    thickness?: number;
    /**
     * Direction of chart rendering
     * true for clockwise, false for counter-clockwise
     */
    clockwise?: boolean;
    /**
     * Label text to display above the chart
     */
    label?: string;
    /**
     * Note text to display below the label
     */
    note?: string;
}
declare const _default: (props: Omit<PieSemiCircleChartProps, "height" | "width" | "size">) => react_jsx_runtime.JSX.Element;

type TooltipData = {
    label: string;
    value: number;
    valueDisplay?: string;
};
type TooltipComponentProps = {
    data: TooltipData;
    className?: string;
};
type TooltipCommonProps = {
    top: number;
    left: number;
    style?: CSSProperties;
    className?: string;
};
type DefaultDataTooltip = {
    data: TooltipData;
    component?: ComponentType<TooltipComponentProps>;
    children?: never;
};
type CustomTooltip = {
    children: ReactNode;
    data?: never;
    component?: never;
};
type BaseTooltipProps = TooltipCommonProps & (DefaultDataTooltip | CustomTooltip);
declare const BaseTooltip: ({ data, top, left, component: Component, children, className, }: BaseTooltipProps) => react_jsx_runtime.JSX.Element;

type LegendItem = {
    label: string;
    value: number | string;
    color: string;
};
type LegendProps = {
    items: LegendItem[];
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    scale?: ReturnType<typeof scaleOrdinal>;
};

declare const BaseLegend: FC<LegendProps>;

/**
 * Props for the ThemeProvider component
 */
type ThemeProviderProps = {
    /** Optional partial theme override */
    theme?: Partial<ChartTheme>;
    /** Child components that will have access to the theme */
    children: ReactNode;
};
declare const ThemeProvider: FC<ThemeProviderProps>;

type UseChartMouseHandlerProps = {
    /**
     * Whether tooltips are enabled
     */
    withTooltips: boolean;
};
type UseChartMouseHandlerReturn = {
    /**
     * Handler for mouse move events
     */
    onMouseMove: (event: React.MouseEvent<SVGElement>, data: DataPoint) => void;
    /**
     * Handler for mouse leave events
     */
    onMouseLeave: () => void;
    /**
     * Whether the tooltip is currently open
     */
    tooltipOpen: boolean;
    /**
     * The current tooltip data
     */
    tooltipData: DataPoint | null;
    /**
     * The current tooltip left position
     */
    tooltipLeft: number | undefined;
    /**
     * The current tooltip top position
     */
    tooltipTop: number | undefined;
};
/**
 * Hook to handle mouse interactions for chart components
 *
 * @param {UseChartMouseHandlerProps} props - Hook configuration
 * @return {UseChartMouseHandlerReturn} Object containing handlers and tooltip state
 */
declare const useChartMouseHandler: ({ withTooltips, }: UseChartMouseHandlerProps) => UseChartMouseHandlerReturn;

export { _default$3 as BarChart, BaseTooltip, BaseLegend as Legend, _default$2 as LineChart, _default$1 as PieChart, _default as PieSemiCircleChart, ThemeProvider, useChartMouseHandler };
