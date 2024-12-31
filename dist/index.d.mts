import { CSSProperties, FC, ComponentType, ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { scaleOrdinal } from '@visx/scale';

type DataPoint = {
	label: string;
	value: number;
};

type DataPointDate = {
	date: Date;
	label?: string;
	value: number;
};

type SeriesData = {
	group?: string;
	label: string;
	data: DataPointDate[] | DataPoint[];
};

type MultipleDataPointsDate = {
	label: string;
	data: DataPointDate[];
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
};

/**
 * Base properties shared across all chart components
 */
type BaseChartProps< T = DataPoint | DataPointDate > = {
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
	width: number;
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
};

/**
 * Properties for grid components
 */
type GridProps = {
	/**
	 * Width of the grid in pixels
	 */
	width: number;
	/**
	 * Height of the grid in pixels
	 */
	height: number;
	/**
	 * Grid visibility. x is default.
	 */
	gridVisibility?: 'x' | 'y' | 'xy' | 'none';
	/**
	 * X-axis scale for the grid
	 * TODO: Fix any type after resolving visx scale type issues
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	xScale: any;
	/**
	 * Y-axis scale for the grid
	 * TODO: Fix any type after resolving visx scale type issues
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	yScale: any;
	/**
	 * Top offset for the grid
	 */
	top?: number;
};

interface BarChartProps extends BaseChartProps<SeriesData[]> {
}
declare const BarChart: FC<BarChartProps>;

interface LineChartProps extends BaseChartProps<SeriesData[]> {
}
declare const LineChart: FC<LineChartProps>;

interface PieChartProps extends BaseChartProps<DataPoint[]> {
    /**
     * Inner radius in pixels. If > 0, creates a donut chart. Defaults to 0.
     */
    innerRadius?: number;
}
/**
 * Renders a pie or donut chart using the provided data.
 *
 * @param {PieChartProps} props - Component props
 * @return {JSX.Element} The rendered chart component
 */
declare const PieChart: ({ data, width, height, withTooltips, innerRadius, className, showLegend, legendOrientation, }: PieChartProps) => react_jsx_runtime.JSX.Element;

interface PieSemiCircleChartProps extends BaseChartProps<DataPointPercentage[]> {
    /**
     * Label text to display above the chart
     */
    label: string;
    /**
     * Note text to display below the label
     */
    note: string;
    /**
     * Direction of chart rendering
     * true for clockwise, false for counter-clockwise
     */
    clockwise?: boolean;
    /**
     * Thickness of the pie chart. A value between 0 and 1
     */
    thickness?: number;
}
declare const PieSemiCircleChart: FC<PieSemiCircleChartProps>;

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

export { BarChart, type BaseChartProps, BaseTooltip, type BaseTooltipProps, type ChartTheme, type DataPoint, type DataPointDate, type DataPointPercentage, type GridProps, BaseLegend as Legend, LineChart, type MultipleDataPointsDate, PieChart, PieSemiCircleChart, type SeriesData, ThemeProvider, useChartMouseHandler };
