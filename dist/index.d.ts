import * as react_jsx_runtime from 'react/jsx-runtime';
import { CircleSubjectProps } from '@visx/annotation/lib/components/CircleSubject';
import { ConnectorProps } from '@visx/annotation/lib/components/Connector';
import { LabelProps } from '@visx/annotation/lib/components/Label';
import { LineSubjectProps } from '@visx/annotation/lib/components/LineSubject';
import { Orientation, TickFormatter, AxisScale, AxisRendererProps } from '@visx/axis';
import * as _visx_legend_lib_types from '@visx/legend/lib/types';
import { LegendShape } from '@visx/legend/lib/types';
import { ScaleInput, ScaleType } from '@visx/scale';
import { LineStyles, GridStyles, GlyphProps, EventHandlerParams } from '@visx/xychart';
export { GridStyles, LineStyles } from '@visx/xychart';
import * as react from 'react';
import { CSSProperties, ReactNode, PointerEvent, SVGProps, ComponentType, FC, MouseEvent } from 'react';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import { TextProps } from '@visx/text';
import * as _visx_legend_lib_legends_Legend_LegendLabel from '@visx/legend/lib/legends/Legend/LegendLabel';

type AnnotationStyles = {
    circleSubject?: Omit<CircleSubjectProps, 'x' | 'y'> & {
        fill?: string;
    };
    lineSubject?: Omit<LineSubjectProps, 'x' | 'y'>;
    connector?: Omit<ConnectorProps, 'x' | 'y' | 'dx' | 'dy'>;
    label?: Omit<LabelProps, 'title' | 'subtitle'>;
};
type SubjectType = 'circle' | 'line-vertical' | 'line-horizontal';
type LineChartAnnotationProps = {
    datum: DataPointDate;
    title: string;
    subtitle?: string;
    subjectType?: SubjectType;
    styles?: AnnotationStyles;
    testId?: string;
};

type ValueOf<T> = T[keyof T];
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type OrientationType = ValueOf<typeof Orientation>;
type DataPoint = {
    label: string;
    value: number;
};
type DataPointDate = {
    date?: Date;
    /**
     * Supported Formats:
     * - YYYY-MM-DD (local)
     * - YYYY-MM-DD HH:mm:ss (local)
     * - YYYY-MM-DD HH:mm (local)
     * - YYYY-MM-DDTHH:mm:ss (local)
     * - YYYY-MM-DDTHH:mm:ss.SSS (local)
     * - YYYY-MM-DDTHH:mm (local)
     * - YYYY-MM-DDTHH:mm:ssZ (UTC → local)
     * - YYYY-MM-DDTHH:mm:ss±HH:mm (offset → local)
     */
    dateString?: string;
    value: number | null;
    label?: string;
};
type SeriesData = {
    group?: string;
    label: string;
    data: DataPointDate[] | DataPoint[];
    options?: {
        gradient?: {
            from: string;
            to: string;
            fromOpacity?: number;
            toOpacity?: number;
        };
        stroke?: string;
        seriesLineStyle?: LineStyles;
        legendShapeStyle?: CSSProperties;
    };
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
    gridStyles?: GridStyles;
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
    /** Styles for series lines */
    seriesLineStyles?: LineStyles[];
    /** Styles for legend shapes */
    legendShapeStyles?: CSSProperties[];
    /** Array of render functions for glyphs */
    glyphs?: Array<(<Datum extends object>(props: GlyphProps<Datum>) => ReactNode)>;
    /** Styles for legend labels */
    legendLabelStyles?: CSSProperties;
    /** Styles for legend container */
    legendContainerStyles?: CSSProperties;
    annotationStyles?: AnnotationStyles;
};
declare type AxisOptions = {
    orientation?: OrientationType;
    numTicks?: number;
    axisClassName?: string;
    axisLineClassName?: string;
    labelClassName?: string;
    tickClassName?: string;
    tickFormat?: TickFormatter<ScaleInput<AxisScale>>;
    /**
     * For more control over rendering or to add event handlers to datum, pass a function as children.
     */
    children?: (renderProps: AxisRendererProps<AxisScale>) => ReactNode;
};
type ScaleOptions = {
    type?: ScaleType;
    zero?: boolean;
    domain?: [number, number];
    range?: [number, number];
    /**
     * For band scale, shortcut for setting `paddingInner` and `paddingOuter` to the same value.
     *
     * For point scale, the outer padding (spacing) at the ends of the range.
     * This is similar to band scale's `paddingOuter`.
     *
     */
    padding?: number;
    /**
     * The inner padding (spacing) within each band step of band scales, as a fraction of the step size. This value must lie in the range [0,1].
     *
     */
    paddingInner?: number;
    /**
     * The outer padding (spacing) at the ends of the range of band and point scales,
     * as a fraction of the step size. This value must lie in the range [0,1].
     *
     */
    paddingOuter?: number;
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
     * Optional unique identifier for the chart (auto-generated if not provided)
     */
    chartId?: string;
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
     * Size of the chart in pixels for pie and donut charts
     */
    size?: number;
    /**
     * Chart margins
     */
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    /**
     * Callback function for pointer down event
     */
    onPointerDown?: (event: EventHandlerParams<object>) => void;
    /**
     * Callback function for pointer down event
     */
    onPointerUp?: (event: EventHandlerParams<object>) => void;
    /**
     * Callback function for pointer down event
     */
    onPointerMove?: (event: EventHandlerParams<object>) => void;
    /**
     * Callback function for pointer up event
     */
    onPointerOut?: (event: PointerEvent<Element>) => void;
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
     * Legend shape
     */
    legendShape?: LegendShape<T, number>;
    /**
     * Legend horizontal alignment
     */
    legendAlignmentHorizontal?: 'left' | 'center' | 'right';
    /**
     * Legend vertical alignment
     */
    legendAlignmentVertical?: 'top' | 'bottom';
    /**
     * Grid visibility. x is default when orientation is vertical. y is default when orientation is horizontal.
     */
    gridVisibility?: 'x' | 'y' | 'xy' | 'none';
    /**
     * More options for the chart.
     */
    options?: {
        yScale?: ScaleOptions;
        xScale?: ScaleOptions;
        axis?: {
            x?: AxisOptions;
            y?: AxisOptions;
        };
    };
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
    xScale: any;
    /**
     * Y-axis scale for the grid
     * TODO: Fix any type after resolving visx scale type issues
     */
    yScale: any;
    /**
     * Top offset for the grid
     */
    top?: number;
};

interface BarChartProps extends BaseChartProps<SeriesData[]> {
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    orientation?: 'horizontal' | 'vertical';
    withPatterns?: boolean;
}
declare const _default$4: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<BarChartProps>, "height" | "size" | "width"> & Omit<BarChartProps, "height" | "size" | "width"> & {
    maxWidth?: number;
    aspectRatio?: number;
    resizeDebounceTime?: number;
}) => react_jsx_runtime.JSX.Element;

type CurveType = 'smooth' | 'linear' | 'monotone';
type RenderLineStartGlyphProps<Datum extends object> = GlyphProps<Datum> & {
    glyphStyle?: SVGProps<SVGCircleElement>;
};
interface LineChartProps extends BaseChartProps<SeriesData[]> {
    withGradientFill: boolean;
    smoothing?: boolean;
    curveType?: CurveType;
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    withStartGlyphs?: boolean;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    glyphStyle?: SVGProps<SVGCircleElement>;
    withLegendGlyph: boolean;
    withTooltipCrosshairs?: {
        showVertical?: boolean;
        showHorizontal?: boolean;
    };
    annotations?: LineChartAnnotationProps[];
}
declare const _default$3: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<LineChartProps>, "height" | "size" | "width"> & Omit<LineChartProps, "height" | "size" | "width"> & {
    maxWidth?: number;
    aspectRatio?: number;
    resizeDebounceTime?: number;
}) => react_jsx_runtime.JSX.Element;

type OmitBaseChartProps = Omit<BaseChartProps<DataPointPercentage[]>, 'width' | 'height'>;
interface PieChartProps extends OmitBaseChartProps {
    /**
     * Inner radius in pixels. If > 0, creates a donut chart. Defaults to 0.
     */
    innerRadius?: number;
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
    children?: ReactNode;
}
declare const _default$2: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<PieChartProps>, "height" | "size" | "width"> & Omit<PieChartProps, "height" | "size" | "width"> & {
    maxWidth?: number;
    aspectRatio?: number;
    resizeDebounceTime?: number;
}) => react_jsx_runtime.JSX.Element;

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
declare const _default$1: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<PieSemiCircleChartProps>, "height" | "size" | "width"> & Omit<PieSemiCircleChartProps, "height" | "size" | "width"> & {
    maxWidth?: number;
    aspectRatio?: number;
    resizeDebounceTime?: number;
}) => react_jsx_runtime.JSX.Element;

interface BarListChartProps extends Exclude<BarChartProps, 'orientation' | 'size' | 'gridVisibility'> {
    options?: {
        /**
         * Scale for the y axis. Exclude the type property.
         */
        yScale: Omit<ScaleOptions, 'type'>;
        /**
         * Scale for the x axis. Exclude the type property.
         */
        xScale: Omit<ScaleOptions, 'type'>;
        /**
         * Formatter for the label.
         */
        labelFormatter?: (value: string) => string;
        /**
         * Formatter for the value.
         */
        valueFormatter?: (value: number) => string;
        /**
         * y offset of the label and value. Default is based on the number of series, automatically computed.
         */
        yOffset?: number;
        /**
         * x position of the label.
         */
        labelPosition?: number;
        /**
         * x position of the value.
         */
        valuePosition?: number;
        /**
         * Custom render function for the label.
         */
        labelComponent?: ComponentType<RenderLabelProps>;
        /**
         * Custom render function for the value.
         */
        valueComponent?: ComponentType<RenderValueProps>;
    };
}
interface RenderLabelProps {
    textProps: TextProps;
    x: number;
    y: number;
    label: string;
    formatter: (value: string) => string;
}
interface RenderValueProps {
    textProps: TextProps;
    x: number;
    y: number;
    value: number;
    /**
     * Original data
     */
    data: SeriesData[];
    /**
     * Index of the data point
     */
    index: number;
    formatter: (value: number) => string;
}
declare const _default: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<BarListChartProps>, "height" | "size" | "width"> & Omit<BarListChartProps, "height" | "size" | "width"> & {
    maxWidth?: number;
    aspectRatio?: number;
    resizeDebounceTime?: number;
}) => react_jsx_runtime.JSX.Element;

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

type BaseLegendItem = {
    label: string;
    value: number | string;
    color: string;
    glyphSize?: number;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    shapeStyle?: CSSProperties;
};
type LegendItemWithGlyph = BaseLegendItem & {
    renderGlyph: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    glyphSize: number;
};
type LegendItemWithoutGlyph = BaseLegendItem & {
    renderGlyph?: never;
    glyphSize?: number;
};

declare const BaseLegend: react.ForwardRefExoticComponent<Omit<{
    children?: (labels: {
        datum: unknown;
        index: number;
        text: string;
        value?: any;
    }[]) => React.ReactNode;
    shape?: _visx_legend_lib_types.LegendShape<unknown, any>;
    size?: (label: {
        datum: unknown;
        index: number;
        text: string;
        value?: any;
    }) => string | number | undefined;
    className?: string;
    style?: React.CSSProperties;
    domain?: unknown[];
    shapeWidth?: string | number;
    shapeHeight?: string | number;
    shapeMargin?: string | number;
    labelAlign?: string;
    labelFlex?: string | number;
    labelMargin?: string | number;
    itemMargin?: string | number;
    itemDirection?: _visx_legend_lib_types.FlexDirection;
    fill?: (label: {
        datum: unknown;
        index: number;
        text: string;
        value?: any;
    }) => string | undefined;
    shapeStyle?: (label: {
        datum: unknown;
        index: number;
        text: string;
        value?: any;
    }) => React.CSSProperties;
    labelFormat?: _visx_legend_lib_types.LabelFormatter<unknown>;
    labelTransform?: _visx_legend_lib_types.LabelFormatterFactory<ScaleOrdinal<DiscreteInput, Output>>;
    legendLabelProps?: Partial<_visx_legend_lib_legends_Legend_LegendLabel.LegendLabelProps>;
}, "shapeStyle"> & {
    items: LegendItemWithGlyph[] | LegendItemWithoutGlyph[];
    orientation?: "horizontal" | "vertical";
    alignmentHorizontal?: "left" | "center" | "right";
    alignmentVertical?: "top" | "bottom";
} & react.RefAttributes<HTMLDivElement>>;

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

/**
 * Default theme configuration
 */
declare const defaultTheme: ChartTheme;
/**
 * Jetpack theme configuration
 */
declare const jetpackTheme: ChartTheme;
/**
 * Woo theme configuration
 */
declare const wooTheme: ChartTheme;

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
    onMouseMove: (event: MouseEvent<SVGElement>, data: DataPoint) => void;
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

export { _default$4 as BarChart, _default as BarListChart, type BaseChartProps, BaseTooltip, type ChartTheme, type DataPoint, type DataPointDate, type DataPointPercentage, type GridProps, BaseLegend as Legend, _default$3 as LineChart, type MultipleDataPointsDate, type Optional, type OrientationType, _default$2 as PieChart, _default$1 as PieSemiCircleChart, type RenderLineStartGlyphProps, type SeriesData, ThemeProvider, defaultTheme, jetpackTheme, useChartMouseHandler, wooTheme };
