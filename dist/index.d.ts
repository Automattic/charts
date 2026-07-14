import { EventHandlerParams, EventHandlerParams as EventHandlerParams$1, GlyphProps, GridStyles, GridStyles as GridStyles$1, LineStyles, LineStyles as LineStyles$1, TooltipContextType } from "@visx/xychart";
import { CSSProperties, ComponentClass, ComponentProps, ComponentType, FC, MouseEvent, PointerEvent, PropsWithChildren, ReactElement, ReactNode, SVGProps } from "react";
import { TextProps } from "@visx/text";
import { TooltipProps as TooltipProps$1, UseTooltipPortalOptions } from "@visx/tooltip";
import { PickD3Scale, ScaleInput, ScaleType } from "@visx/scale";
import { LegendOrdinal } from "@visx/legend";
import { CircleSubjectProps, ConnectorProps, LabelProps, LineSubjectProps } from "@visx/annotation";
import { PieProvidedProps } from "@visx/shape";
import { AxisRendererProps, AxisScale, Orientation, TickFormatter } from "@visx/axis";

//#region src/types.d.ts
type ValueOf<T> = T[keyof T];
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
/**
 * Mirrors the WordPress Design System gap token scale used by the WordPress UI Stack.
 */
type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type LegendShapeLabel<Data, Output, ExtraAttributes = object> = {
  datum: Data;
  index: number;
  text: string;
  value?: Output;
} & ExtraAttributes;
type LegendShapeRenderProps<Data, Output> = {
  width?: string | number;
  height?: string | number;
  label: LegendShapeLabel<Data, Output>;
  item: Data;
  itemIndex: number;
  fill?: string;
  size?: string | number;
  style?: CSSProperties;
};
type LegendShape<Data, Output> = 'rect' | 'circle' | 'line' | FC<LegendShapeRenderProps<Data, Output>> | ComponentClass<LegendShapeRenderProps<Data, Output>>;
type GoogleDataTableColumnType = 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'timeofday';
declare enum GoogleDataTableColumnRoleType {
  annotation = "annotation",
  annotationText = "annotationText",
  certainty = "certainty",
  emphasis = "emphasis",
  interval = "interval",
  scope = "scope",
  style = "style",
  tooltip = "tooltip",
  domain = "domain"
}
type GoogleDataTableColumn = {
  type: GoogleDataTableColumnType;
  label?: string;
  role?: GoogleDataTableColumnRoleType;
  pattern?: string;
  p?: Record<string, unknown>;
  id?: string;
} | string;
type GoogleDataTableCell = {
  v?: unknown;
  f?: string;
  p?: Record<string, unknown>;
} | string | number | boolean | Date | null;
type GoogleDataTableRow = GoogleDataTableCell[];
type ChartType = 'area' | 'bar' | 'conversion-funnel' | 'leaderboard' | 'line' | 'pie' | 'pie-semi-circle';
type OrientationType = ValueOf<typeof Orientation>;
type AnnotationStyles = {
  circleSubject?: Omit<CircleSubjectProps, 'x' | 'y'> & {
    fill?: string;
  };
  lineSubject?: Omit<LineSubjectProps, 'x' | 'y'>;
  connector?: Omit<ConnectorProps, 'x' | 'y' | 'dx' | 'dy'>;
  label?: Omit<LabelProps, 'title' | 'subtitle' | 'x' | 'y'> & {
    x?: number | 'start' | 'end';
    y?: number | 'start' | 'end';
  };
};
type DataPoint = {
  label: string;
  value: number;
};
/**
 * Data format for GeoChart - uses Google Charts native data format for maximum flexibility.
 * First element is the header row, subsequent elements are data rows.
 *
 * Country identifiers can be either full country names or ISO 3166-1 alpha-2 codes (e.g., 'United States' or 'US').
 * Full names are recommended for better readability in tooltips.
 *
 * @example Basic usage with country names:
 * [['Country', 'Value'], ['United States', 100], ['Canada', 50], ['United Kingdom', 75]]
 *
 * @example With custom HTML tooltips:
 * [
 *   ['Country', 'Value', { type: 'string', role: 'tooltip', p: { html: true } }],
 *   ['United States', 100, '<b>United States</b><br/>100 visitors'],
 *   ['Canada', 50, '<b>Canada</b><br/>50 visitors']
 * ]
 *
 * @example With formatted values (v = value, f = formatted):
 * [
 *   ['Country', 'Value'],
 *   ['United States', { v: 100, f: '100 visitors' }],
 *   ['Canada', { v: 50, f: '50 visitors' }]
 * ]
 *
 * @example With multiple columns:
 * [
 *   ['Country', 'Population', 'Area'],
 *   ['United States', 331000000, 9834000],
 *   ['Canada', 38000000, 9985000]
 * ]
 */
type GeoData = [GoogleDataTableColumn[], ...GoogleDataTableRow[]];
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
type LeaderboardEntry = {
  /**
   * Unique internal key (e.g., 'key-direct')
   */
  id: string;
  /**
   * Human-readable name (e.g., 'Direct') or a JSX element (e.g., <h4>Direct</h4>)
   */
  label: string | ReactElement;
  /**
   * Value of the entry
   */
  currentValue: number;
  /**
   * Value of the entry in the previous period. Omit when this row has no
   * matching comparison-period value.
   */
  previousValue?: number;
  /**
   * Width of current bar, as % of the current value
   */
  currentShare: number;
  /**
   * Width of previous bar, as % of the current value. Omit when this row has
   * no matching comparison-period value.
   */
  previousShare?: number;
  /**
   * Delta of the entry. Omit when this row has no matching comparison-period
   * value.
   */
  delta?: number;
  /**
   * Optional color for the entry's image/icon
   */
  imageColor?: string;
  /**
   * Optional click handler. When provided, the entire row becomes an
   * interactive `<button>`: clickable and keyboard-focusable (Enter/Space),
   * with a chevron affordance revealed on hover/focus. The consumer
   * decides what the action does (e.g. drill-down). Rows without onClick are
   * inert and render unchanged.
   *
   * For links or other interactive affordances (external-link icons, info
   * tooltips), put them in the `label` render prop instead of using onClick —
   * a row is either a button (onClick) or carries interactive label content,
   * never both, since interactive elements cannot be nested in HTML.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Optional accessible name for the interactive row's `<button>`. Only applies
   * when `onClick` is set — without it the row renders as a Fragment with no
   * element to receive `aria-label`. By default the button derives its name from
   * its rendered content (label text plus the formatted value), which is the
   * right outcome for plain-text labels. Set this when the `label` is JSX whose
   * text content does not yield a clean name on its own — e.g. an image-only
   * label — to give assistive tech a deterministic, human-readable name.
   */
  ariaLabel?: string;
};
type GradientStop = {
  offset: string;
  color?: string;
  opacity?: number;
};
type SeriesDataOptions = {
  gradient?: {
    from?: string;
    to?: string;
    fromOpacity?: number;
    toOpacity?: number;
    stops?: GradientStop[];
  };
  stroke?: string;
  seriesLineStyle?: LineStyles$1;
  legendShapeStyle?: CSSProperties;
  type?: 'comparison';
};
type SeriesData = {
  group?: string;
  label: string;
  data: DataPointDate[] | DataPoint[];
  options?: SeriesDataOptions;
};
/**
 * Visual styling for a bar series of a given semantic type (e.g. 'comparison').
 * `widthFactor` is the bar width relative to the primary bar slot (1.5 = 150%);
 * `opacity` sets the shadow translucency.
 */
type BarStyles = {
  widthFactor?: number;
  opacity?: number;
};
type MultipleDataPointsDate = {
  label: string;
  data: DataPointDate[];
};
/**
 * Input data point for percentage-based charts (pie, donut, semi-circle).
 * Provide values; percentages will be calculated automatically.
 */
type DataPointPercentage = {
  /**
   * Label for the data point
   */
  label: string;
  /**
   * Numerical value used for slice sizing.
   * Percentages are calculated automatically from values.
   */
  value: number;
  /**
   * Formatted value for display (e.g., "30K" instead of 30000)
   */
  valueDisplay?: string;
  /**
   * Color code for the segment, by default colours are taken from the theme but this property can overrides it
   */
  color?: string;
  /**
   * Group for the data point, used to match color with groups on other charts
   */
  group?: string;
};
/**
 * Internal type with calculated percentage.
 * Used internally after percentage calculation from values.
 */
type DataPointPercentageCalculated = DataPointPercentage & {
  /**
   * Calculated percentage (0-100) based on value relative to total
   */
  percentage: number;
};
/**
 * Base theme configuration for chart components with optional properties
 */
type ChartTheme = {
  /** Background color for chart components */backgroundColor: string; /** Background color for labels */
  labelBackgroundColor?: string; /** Text color for labels */
  labelTextColor?: string; /** Array of colors used for data visualization */
  colors: string[]; /** Optional CSS styles for grid lines */
  gridStyles?: GridStyles$1; /** Length of axis ticks in pixels */
  tickLength: number; /** Color of the grid lines */
  gridColor: string; /** Color of the grid lines in dark mode */
  gridColorDark: string; /** Styles for x-axis tick lines */
  xTickLineStyles?: LineStyles$1; /** Styles for x-axis line */
  xAxisLineStyles?: LineStyles$1; /** Styles for series lines */
  seriesLineStyles?: LineStyles$1[]; /** Array of render functions for glyphs */
  glyphs?: Array<(<Datum extends object>(props: GlyphProps<Datum>) => ReactNode)>; /** Legend specific settings */
  legend?: {
    /** Styles for legend shapes */shapeStyles?: Record<string, unknown>[]; /** Styles for legend labels */
    labelStyles?: CSSProperties; /** Styles for legend container */
    containerStyles?: CSSProperties;
  }; /** Styles for small SVG text (eg. axis tick labels), passed through to the XYChart theme. */
  svgLabelSmall?: TextProps; /** Styles for large SVG text (eg. axis titles), passed through to the XYChart theme. */
  svgLabelBig?: TextProps;
  annotationStyles?: AnnotationStyles; /** GeoChart specific settings */
  geoChart?: {
    /** Default fill color for a geo chart feature (e.g. country) with no data */featureFillColor?: string;
  }; /** LeaderboardChart specific settings */
  leaderboardChart?: {
    /** Gap between rows in the leaderboard grid */rowGap?: number; /** Gap between columns in the leaderboard grid */
    columnGap?: number; /** Spacing between label and progress bars */
    labelSpacing?: GapSize; /** Primary color for current period bars */
    primaryColor?: string; /** Secondary color for comparison period bars */
    secondaryColor?: string; /** Delta colors: [negative, neutral, positive] */
    deltaColors?: [string, string, string];
  }; /** ConversionFunnelChart specific settings */
  conversionFunnelChart?: {
    /** Primary color for funnel bars */primaryColor?: string; /** Background color for chart container */
    backgroundColor?: string; /** Color for positive change indicators */
    positiveChangeColor?: string; /** Color for negative change indicators */
    negativeChangeColor?: string;
  };
  lineChart?: {
    lineStyles?: Partial<Record<NonNullable<SeriesDataOptions['type']>, LineStyles$1>>;
  };
  barChart?: {
    barStyles?: Partial<Record<NonNullable<SeriesDataOptions['type']>, BarStyles>>;
  }; /** Sparkline specific settings */
  sparkline?: {
    /** Margin around the sparkline chart */margin?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }; /** Stroke width for the sparkline line */
    strokeWidth?: number;
  };
  /**
   * HeatmapChart settings. Cell gap, radius, value size and the selection ring come from
   * WPDS tokens in CSS, so only the scale color and the compact sizing live here.
   */
  heatmapChart?: {
    /**
     * Color the cell scale interpolates toward at the highest value (prop > this >
     * palette `colors[0]`), fed to CSS `color-mix`. Omit to use the palette color.
     */
    primaryColor?: string; /** Gap in px between cells in compact mode */
    compactCellGap?: number; /** Fixed square cell size in px for compact mode */
    compactCellSize?: number;
  };
};
/**
 * Theme configuration with all properties guaranteed to be defined.
 * Useful for merged themes where defaults are provided for all optional properties.
 */
type CompleteChartTheme = Required<ChartTheme> & {
  leaderboardChart: Omit<Required<NonNullable<ChartTheme['leaderboardChart']>>, 'primaryColor' | 'secondaryColor'> & Pick<NonNullable<ChartTheme['leaderboardChart']>, 'primaryColor' | 'secondaryColor'>;
  conversionFunnelChart: Omit<Required<NonNullable<ChartTheme['conversionFunnelChart']>>, 'primaryColor'> & Pick<NonNullable<ChartTheme['conversionFunnelChart']>, 'primaryColor'>;
  lineChart: {
    lineStyles: Record<NonNullable<SeriesDataOptions['type']>, LineStyles$1>;
  };
  barChart: {
    barStyles: Record<NonNullable<SeriesDataOptions['type']>, BarStyles>;
  };
  legend: Required<NonNullable<ChartTheme['legend']>>;
  sparkline: Required<NonNullable<ChartTheme['sparkline']>> & {
    margin: Required<NonNullable<ChartTheme['sparkline']>['margin']>;
  };
  heatmapChart: Omit<Required<NonNullable<ChartTheme['heatmapChart']>>, 'primaryColor'> & Pick<NonNullable<ChartTheme['heatmapChart']>, 'primaryColor'>;
};
type AxisOptions = {
  orientation?: OrientationType;
  numTicks?: number;
  /**
   * Explicit tick values for the axis. When set, takes precedence over `numTicks`
   * so callers can force a specific axis (e.g. integer-only steps on a sparse chart).
   */
  tickValues?: ScaleInput<AxisScale>[];
  axisClassName?: string;
  axisLineClassName?: string;
  labelClassName?: string;
  tickClassName?: string;
  tickFormat?: TickFormatter<ScaleInput<AxisScale>>;
  /**
   * Whether to display this axis. Defaults to true.
   */
  display?: boolean;
  /**
   * For more control over rendering or to add event handlers to datum, pass a function as children.
   */
  children?: (renderProps: AxisRendererProps<AxisScale>) => ReactNode;
  /**
   * Controls tick label overflow (bar charts only):
   *
   * - 'ellipsis': Truncate with ellipsis and fit to available space. Labels show full text
   * on hover via native tooltip. Note: A minimum width (20px) is enforced for readability.
   * On very dense charts (bandwidth < 20px), adjacent labels may overlap. To mitigate, use `numTicks`
   * to reduce labels or `tickFormat` to abbreviate text.
   * - undefined: No truncation; labels may overlap.
   *
   * Default: No truncation; labels may overlap.
   */
  labelOverflow?: 'ellipsis';
};
type ScaleOptions = {
  type?: ScaleType;
  zero?: boolean;
  /**
   * Extends the scale's domain to nice round values. Pass `false` together with
   * an explicit `domain` to keep the tick values you set exactly.
   */
  nice?: boolean;
  domain?: [number, number] | [Date, Date];
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
type LegendItemStyles = {
  /** Margin around each legend item. */margin?: CSSProperties['margin']; /** Flex direction for items within each legend entry. */
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
};
type LegendLabelStyles = Pick<CSSProperties, 'justifyContent' | 'flex' | 'margin'> & {
  /**
   * Maximum width for legend label text as a CSS value (e.g. '200px', '50%', '10rem').
   * When set, text overflow behavior is controlled by textOverflow.
   */
  maxWidth?: string;
  /**
   * Controls how text behaves when it exceeds maxWidth.
   * - 'ellipsis': Truncate with ellipsis (ideal for widgets/small devices)
   * - 'wrap': Wrap text to multiple lines (default, ideal for larger displays)
   */
  textOverflow?: 'ellipsis' | 'wrap';
};
type LegendShapeStyles = {
  /** Width of the legend shape in pixels. */width?: number; /** Height of the legend shape in pixels. */
  height?: number; /** Margin around the legend shape. */
  margin?: CSSProperties['margin'];
};
/** Position of the legend relative to chart content. */
type LegendPosition = 'top' | 'bottom';
/**
 * Configuration object for chart legend appearance and behavior.
 * Consolidates all legend styling and layout props into a single structured object.
 */
type ChartLegendConfig<T = DataPoint | DataPointDate | LeaderboardEntry> = {
  /**
   * Layout direction of legend items.
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Position of the legend relative to the chart.
   * TODO: Add 'left' | 'right' positioning support in future implementation
   */
  position?: LegendPosition;
  /**
   * Alignment of the legend within its position.
   */
  alignment?: 'start' | 'center' | 'end';
  /**
   * Shape of the legend marker icon.
   */
  shape?: LegendShape<T, number>;
  /**
   * Enable interactive legend items that can toggle series visibility.
   * Supported for all chart types that render series.
   * Requires chartId and GlobalChartsProvider.
   * For pie charts, percentages are recalculated so visible segments total 100%.
   */
  interactive?: boolean;
  /**
   * Additional CSS class name for individual legend items.
   */
  itemClassName?: string;
  /**
   * CSS styles for each legend item (margin, flexDirection).
   */
  itemStyles?: LegendItemStyles;
  /**
   * CSS styles for legend labels (maxWidth, textOverflow, justifyContent, flex, margin).
   */
  labelStyles?: LegendLabelStyles;
  /**
   * Styles for legend shapes (width, height, margin).
   */
  shapeStyles?: LegendShapeStyles;
};
/**
 * Base properties shared across all chart components
 */
type BaseChartProps<T = DataPoint | DataPointDate | LeaderboardEntry> = {
  /**
   * Array of data points to display in the chart
   */
  data: T extends DataPoint | DataPointDate | LeaderboardEntry ? T[] : T;
  /**
   * Optional unique identifier for the chart (auto-generated if not provided)
   */
  chartId?: string;
  /**
   * Additional CSS class name for the chart container
   */
  className?: string;
  /**
   * Width of the chart container in pixels. When omitted, the chart fills its parent's width.
   */
  width?: number;
  /**
   * Height of the chart container in pixels. When omitted, the chart fills its parent's height.
   */
  height?: number;
  /**
   * Maximum diameter of the pie in pixels (pie and donut charts only).
   * The pie will shrink if the container is smaller than this value.
   * When omitted, the pie fills the available space.
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
  onPointerDown?: (event: EventHandlerParams$1<DataPoint | DataPointDate>) => void;
  /**
   * Callback function for pointer up event
   */
  onPointerUp?: (event: EventHandlerParams$1<DataPoint | DataPointDate>) => void;
  /**
   * Callback function for pointer move event
   */
  onPointerMove?: (event: EventHandlerParams$1<DataPoint | DataPointDate>) => void;
  /**
   * Callback function for pointer out event
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
   * Legend configuration object for controlling legend appearance and behavior.
   * Includes orientation, position, alignment, shape, styling, and interactivity options.
   */
  legend?: ChartLegendConfig<T>;
  /**
   * Grid visibility. x is default when orientation is vertical. y is default when orientation is horizontal.
   */
  gridVisibility?: 'x' | 'y' | 'xy' | 'none';
  /**
   * Whether to show chart animation on initial render or not
   */
  animation?: boolean;
  /**
   * Gap between chart elements (SVG, legend, children).
   * Uses WordPress design system tokens.
   * @default 'md'
   */
  gap?: GapSize;
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
//#endregion
//#region src/components/legend/types.d.ts
type VisxLegendProps = Pick<ComponentProps<typeof LegendOrdinal>, 'className' | 'shape' | 'fill' | 'size' | 'labelFormat' | 'labelTransform'>;
type BaseLegendProps = VisxLegendProps & {
  items: BaseLegendItem[];
  orientation?: 'horizontal' | 'vertical';
  position?: LegendPosition;
  alignment?: 'start' | 'center' | 'end'; /** Additional CSS class name for legend items. */
  itemClassName?: string; /** CSS styles for each legend item (margin, flexDirection). */
  itemStyles?: LegendItemStyles; /** Additional CSS class name for legend labels. */
  labelClassName?: string; /** CSS styles for legend labels (justifyContent, flex, margin). */
  labelStyles?: LegendLabelStyles; /** Styles for legend shapes (width, height, margin). */
  shapeStyles?: LegendShapeStyles;
  /**
   * Function for rendering a custom legend layout.
   */
  render?: (items: BaseLegendItem[]) => ReactNode;
  /**
   * Enable interactive legend items that can toggle series visibility.
   * Requires GlobalChartsProvider and chartId to be set.
   */
  interactive?: boolean;
  /**
   * Chart ID for series visibility tracking when interactive mode is enabled.
   */
  chartId?: string;
};
type LegendProps = Omit<BaseLegendProps, 'items'> & {
  items?: BaseLegendItem[];
  chartId?: string;
};
type BaseLegendItem = {
  label: string;
  value?: number | string;
  color: string;
  glyphSize?: number;
  renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
  shapeStyle?: CSSProperties & LineStyles$1;
};
//#endregion
//#region src/components/legend/legend.d.ts
declare const Legend: import("react").ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
  items?: BaseLegendItem[];
  chartId?: string;
} & import("react").RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/legend/hooks/use-chart-legend-items.d.ts
type LegendValueDisplay = 'percentage' | 'value' | 'valueDisplay' | 'none';
interface ChartLegendOptions {
  withGlyph?: boolean;
  glyphSize?: number;
  renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
  showValues?: boolean;
  legendValueDisplay?: LegendValueDisplay;
  legendShape?: LegendShape<SeriesData[], number>;
}
/**
 * Hook to transform chart data into legend items
 * @param data        - The chart data to transform
 * @param options     - Configuration options for legend generation
 * @param legendShape - The shape type for legend items (string literal or React component)
 * @return Array of legend items ready for display
 */
declare function useChartLegendItems<T extends SeriesData[] | DataPointDate[] | DataPointPercentageCalculated[]>(data: T, options?: ChartLegendOptions, legendShape?: LegendShape<SeriesData[], number>): BaseLegendItem[];
//#endregion
//#region src/charts/private/single-chart-context/single-chart-context.d.ts
interface ChartInstanceRef {
  getScales: () => {
    xScale: unknown;
    yScale: unknown;
  } | null;
  getChartDimensions: () => {
    width: number;
    height: number;
    margin: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
  };
}
type SingleChartRef = ChartInstanceRef;
//#endregion
//#region src/visx/types.d.ts
type RenderTooltipParams<Datum extends object> = TooltipContextType<Datum> & {
  colorScale?: PickD3Scale<'ordinal', string, string>;
};
interface RenderTooltipGlyphProps<Datum extends object> extends GlyphProps<Datum> {
  glyphStyle?: SVGProps<SVGCircleElement>;
  isNearestDatum: boolean;
}
type XyChartTooltipProps<Datum extends object> = {
  renderTooltip: (params: RenderTooltipParams<Datum>) => ReactNode;
  renderGlyph?: (params: RenderTooltipGlyphProps<Datum>) => ReactNode;
  snapTooltipToDatumX?: boolean;
  snapTooltipToDatumY?: boolean;
  showVerticalCrosshair?: boolean;
  showHorizontalCrosshair?: boolean;
  showDatumGlyph?: boolean;
  showSeriesGlyphs?: boolean;
  verticalCrosshairStyle?: SVGProps<SVGLineElement>;
  horizontalCrosshairStyle?: SVGProps<SVGLineElement>;
  glyphStyle?: SVGProps<SVGCircleElement>;
  resizeObserverPolyfill?: UseTooltipPortalOptions['polyfill'];
} & Omit<TooltipProps$1, 'left' | 'top' | 'children'> & Pick<UseTooltipPortalOptions, 'debounce' | 'detectBounds' | 'scroll' | 'zIndex'>;
//#endregion
//#region src/charts/line-chart/types.d.ts
type LineChartAnnotationProps = {
  datum: DataPointDate;
  title: string;
  subtitle?: string;
  subjectType?: 'circle' | 'line-vertical' | 'line-horizontal';
  styles?: AnnotationStyles;
  testId?: string;
  renderLabel?: FC<{
    title: string;
    subtitle?: string;
  }>;
  renderLabelPopover?: FC<{
    title: string;
    subtitle?: string;
  }>;
};
type CurveType = 'smooth' | 'linear' | 'monotone';
type RenderLineGlyphProps<Datum extends object> = GlyphProps<Datum> & {
  glyphStyle?: SVGProps<SVGCircleElement>;
  position?: 'start' | 'end';
};
interface LineChartProps extends BaseChartProps<SeriesData[]> {
  withGradientFill: boolean;
  smoothing?: boolean;
  curveType?: CurveType;
  renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
  withStartGlyphs?: boolean;
  withEndGlyphs?: boolean;
  renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
  glyphStyle?: SVGProps<SVGCircleElement>;
  withLegendGlyph?: boolean;
  withTooltipCrosshairs?: {
    showVertical?: boolean;
    showHorizontal?: boolean;
  };
  /**
   * Enable drag-to-zoom on the X axis. The user drags horizontally to
   * select a range; the X axis rescales to that range. A small reset
   * button appears in the top-right of the chart while zoomed.
   */
  zoomable?: boolean;
  children?: ReactNode;
}
type TooltipDatum = {
  key: string;
  value: number;
};
//#endregion
//#region src/charts/area-chart/types.d.ts
interface AreaChartProps extends BaseChartProps<SeriesData[]> {
  /**
   * Whether series should be stacked on top of each other.
   * When false, series are rendered as overlapping filled areas.
   * @default true
   */
  stacked?: boolean;
  /**
   * Stack offset strategy when stacked is true. Mirrors d3-shape stack offsets.
   * - 'none' (default): values stack at their natural magnitude
   * - 'expand': values are normalized to the [0,1] range (percentage stacks)
   * - 'wiggle': used for streamgraphs
   * - 'silhouette': stack centered around zero
   */
  stackOffset?: 'none' | 'expand' | 'wiggle' | 'silhouette';
  /**
   * Smoothing using a Catmull-Rom curve. Ignored if `curveType` is set.
   */
  smoothing?: boolean;
  /**
   * Curve interpolation type. Takes precedence over `smoothing`.
   */
  curveType?: CurveType;
  /**
   * Custom tooltip renderer.
   */
  renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
  /**
   * Whether to show crosshair lines in the tooltip.
   */
  withTooltipCrosshairs?: {
    showVertical?: boolean;
    showHorizontal?: boolean;
  };
  /**
   * Fill opacity for the stacked areas. 0–1.
   * @default 0.85 when stacked, 0.4 when overlapping
   */
  fillOpacity?: number;
  /**
   * Whether to render a stroke (line) on top of each area.
   * @default false when stacked, true when overlapping
   */
  withStroke?: boolean;
  /**
   * Enable drag-to-zoom on the X axis. The user drags horizontally to
   * select a range; the X axis rescales to that range. A small reset
   * button appears in the top-right of the chart while zoomed.
   */
  zoomable?: boolean;
  /**
   * When using an interactive legend, controls whether the Y axis rescales
   * to fit only the visible series. Defaults to `true`, matching the
   * intuitive default for LineChart and BarChart. Set to `false` to pin
   * the Y axis to the full data extent so toggling legend items off does
   * not move the chart's baseline.
   * @default true
   */
  rescaleYOnLegendToggle?: boolean;
  children?: ReactNode;
}
//#endregion
//#region src/charts/private/with-responsive/with-responsive.d.ts
type ResponsiveConfig = {
  /**
   * The maximum width of the chart. Defaults to 1200.
   */
  maxWidth?: number;
  /**
   * The aspect ratio of the chart (height = width * aspectRatio).
   * When provided, height is calculated from width.
   * When omitted, the chart fills the parent container's height.
   */
  aspectRatio?: number;
  /**
   * Child render updates upon resize are delayed until debounceTime milliseconds after the last resize event is observed.
   */
  resizeDebounceTime?: number;
};
//#endregion
//#region src/charts/area-chart/area-chart.d.ts
type AreaChartSubComponents = {
  Legend: typeof Legend;
};
type AreaChartBaseProps = Optional<AreaChartProps, 'width' | 'height' | 'size'>;
type AreaChartComponent = React.ForwardRefExoticComponent<AreaChartBaseProps & React.RefAttributes<SingleChartRef>> & AreaChartSubComponents;
type AreaChartResponsiveComponent = React.ForwardRefExoticComponent<AreaChartBaseProps & ResponsiveConfig & React.RefAttributes<SingleChartRef>> & AreaChartSubComponents;
declare const AreaChart: AreaChartComponent;
declare const AreaChartResponsive: AreaChartResponsiveComponent;
//#endregion
//#region src/charts/bar-chart/bar-chart.d.ts
interface BarChartProps extends BaseChartProps<SeriesData[]> {
  renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
  orientation?: 'horizontal' | 'vertical';
  withPatterns?: boolean;
  showZeroValues?: boolean;
  children?: ReactNode;
}
type BarChartBaseProps = Optional<BarChartProps, 'width' | 'height' | 'size'>;
interface BarChartSubComponents {
  Legend: ComponentType<React.ComponentProps<typeof Legend>>;
}
type BarChartComponent = FC<BarChartBaseProps> & BarChartSubComponents;
type BarChartResponsiveComponent = FC<BarChartBaseProps & ResponsiveConfig> & BarChartSubComponents;
declare const BarChart: BarChartComponent;
declare const BarChartResponsive: BarChartResponsiveComponent;
//#endregion
//#region src/charts/bar-list-chart/bar-list-chart.d.ts
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
declare const BarListChart: FC<BarListChartProps>;
declare const BarListChartResponsive: ({
  resizeDebounceTime,
  maxWidth,
  aspectRatio,
  size,
  width,
  height,
  ...chartProps
}: Omit<BarListChartProps, "width" | "height" | "size"> & {
  width?: number;
  height?: number;
  size?: number;
} & ResponsiveConfig) => import("react/jsx-runtime").JSX.Element;
//#endregion
//#region src/charts/conversion-funnel-chart/types.d.ts
/**
 * Represents a single step in the conversion funnel
 */
interface FunnelStep {
  /** Step identifier */
  id: string;
  /** Display label for the step */
  label: string;
  /** Conversion rate as percentage (0-100) */
  rate: number;
  /** Absolute count (optional, for tooltip/details) */
  count?: number;
}
/**
 * Render prop for customizing step labels
 */
interface StepLabelRenderProps {
  step: FunnelStep;
  index: number;
  className?: string;
}
/**
 * Render prop for customizing step rates
 */
interface StepRateRenderProps {
  step: FunnelStep;
  index: number;
  className?: string;
}
/**
 * Render prop for customizing the entire main metric section
 */
interface MainMetricRenderProps {
  mainRate: number;
  changeIndicator?: string;
  className?: string;
  changeColor?: string;
}
/**
 * Render prop for customizing tooltip content
 */
interface TooltipRenderProps {
  step: FunnelStep;
  index: number;
  top: number;
  left: number;
  className?: string;
}
/**
 * Props for the ConversionFunnelChart component
 */
interface ConversionFunnelChartProps extends Pick<BaseChartProps, 'className' | 'chartId' | 'animation'> {
  /** Main conversion rate to highlight */
  mainRate: number;
  /** Change indicator (e.g., +2%, -1.5%) */
  changeIndicator?: string;
  /** Array of funnel steps */
  steps: FunnelStep[];
  /** Whether the chart is in loading state */
  loading?: boolean;
  /** Height of the chart container. Accepts a number (pixels) or CSS string (e.g., "400px", "100%"). Falls back to style.height if set, otherwise defaults to "100%". */
  height?: string | number;
  /** Custom styling */
  style?: React.CSSProperties;
  /** Custom render function for step labels */
  renderStepLabel?: (props: StepLabelRenderProps) => React.ReactNode;
  /** Custom render function for step rates */
  renderStepRate?: (props: StepRateRenderProps) => React.ReactNode;
  /** Custom render function for the entire main metric section */
  renderMainMetric?: (props: MainMetricRenderProps) => React.ReactNode;
  /** Custom render function for tooltip content */
  renderTooltip?: (props: TooltipRenderProps) => React.ReactNode;
}
//#endregion
//#region src/charts/conversion-funnel-chart/conversion-funnel-chart.d.ts
/**
 * ConversionFunnelChart component with provider wrapper
 *
 * @param props - Component props
 * @return JSX element representing the conversion funnel chart
 */
declare const ConversionFunnelChartWithProvider: FC<ConversionFunnelChartProps>;
//#endregion
//#region src/charts/geo-chart/types.d.ts
/**
 * Region to display on the map.
 * Use 'world' for global view or any ISO 3166-1 alpha-2 country code
 * (e.g., 'US' for United States, 'CA' for Canada).
 */
type GeoRegion = 'world' | (string & {});
/**
 * Resolution level for the map.
 * - 'countries': Country-level (default for 'world')
 * - 'provinces': State/province level (use with specific region like 'US')
 * - 'metros': Metropolitan areas (US only)
 */
type GeoResolution = 'countries' | 'provinces' | 'metros';
interface GeoChartError {
  id?: string;
  message?: string;
  detailedMessage?: string;
  options?: Record<string, unknown>;
}
interface GeoChartProps extends Pick<BaseChartProps, 'className' | 'chartId' | 'width' | 'height'> {
  /**
   * Data in Google Charts native format for maximum flexibility.
   * First row contains column headers, subsequent rows contain data.
   *
   * Country identifiers can be either full country names or ISO 3166-1 alpha-2 codes
   * (e.g., 'United States' or 'US').
   */
  data: GeoData;
  /**
   * Region to display. Use 'world' for global view, 'US' for United States,
   * or any ISO 3166-1 alpha-2 country code.
   * @default 'world'
   */
  region?: GeoRegion;
  /**
   * Resolution level for the map.
   * - 'countries': Country-level (default for 'world')
   * - 'provinces': State/province level (use with specific region like 'US')
   * - 'metros': Metropolitan areas (US only)
   * @default 'countries'
   */
  resolution?: GeoResolution;
  /**
   * Callback fired when Google Charts emits a chart error.
   */
  onError?: (error: GeoChartError) => void;
  /**
   * Optional render function for the loading placeholder.
   * Called while Google Charts is loading.
   */
  renderPlaceholder?: () => React.ReactNode;
}
//#endregion
//#region src/charts/geo-chart/geo-chart.d.ts
declare const GeoChartWithProvider: FC<GeoChartProps>;
declare const GeoChartResponsive: ({
  resizeDebounceTime,
  maxWidth,
  aspectRatio,
  size,
  width,
  height,
  ...chartProps
}: Omit<GeoChartProps, "width" | "height" | "size"> & {
  width?: number;
  height?: number;
  size?: number;
} & ResponsiveConfig) => import("react/jsx-runtime").JSX.Element;
//#endregion
//#region src/charts/heatmap-chart/types.d.ts
/** A single heatmap cell. `value: null` marks an empty cell. */
type HeatmapCell = {
  /** Per-cell label used in the tooltip / accessible name. */label?: string;
  value: number | null;
};
/** A heatmap column (rendered left→right); its cells render top→bottom. */
type HeatmapColumn = {
  /** x-axis label for this column. Empty/omitted renders blank. */label?: string;
  data: HeatmapCell[];
};
type HeatmapTooltipData = {
  value: number | null;
  rowLabel?: string;
  columnLabel?: string;
  cellLabel?: string;
  row: number;
  column: number;
};
interface HeatmapChartProps extends Omit<BaseChartProps<HeatmapColumn[]>, 'showLegend' | 'legend' | 'gridVisibility'> {
  /** y-axis labels by row index. Empty entries render blank. */
  rowLabels?: string[];
  /** Compact mode: hide in-cell values, tighten gap, thin axis labels. Default false. */
  compact?: boolean;
  /** Render the numeric value inside each cell. Default `! compact`. */
  showValues?: boolean;
  /**
   * Color the cell scale interpolates toward at the highest value
   * (this prop > theme `heatmapChart.primaryColor` > palette `colors[0]`).
   */
  primaryColor?: string;
  renderTooltip?: (data: HeatmapTooltipData) => ReactNode;
  children?: ReactNode;
}
//#endregion
//#region src/charts/heatmap-chart/private/build-calendar-data.d.ts
type CalendarHeatmapResult = {
  data: HeatmapColumn[];
  rowLabels: string[];
};
declare const buildCalendarHeatmapData: (series: DataPointDate[], options?: {
  weekStartsOn?: 0 | 1;
}) => CalendarHeatmapResult;
//#endregion
//#region src/charts/heatmap-chart/private/heatmap-legend.d.ts
interface HeatmapLegendProps {
  /** Number of swatches in the scale. Default 5. */
  steps?: number;
  lessLabel?: string;
  moreLabel?: string;
}
declare const HeatmapLegend: FC<HeatmapLegendProps>;
//#endregion
//#region src/charts/heatmap-chart/heatmap-chart.d.ts
interface HeatmapChartSubComponents {
  Legend: typeof HeatmapLegend;
}
declare const HeatmapChart: FC<HeatmapChartProps> & HeatmapChartSubComponents;
declare const HeatmapChartResponsive: FC<HeatmapChartProps & ResponsiveConfig> & HeatmapChartSubComponents;
//#endregion
//#region src/charts/leaderboard-chart/types.d.ts
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
//#endregion
//#region src/charts/leaderboard-chart/leaderboard-chart.d.ts
declare const LeaderboardChart: FC<LeaderboardChartProps> & {
  Legend: import("react").ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
  } & import("react").RefAttributes<HTMLDivElement>>;
};
declare const LeaderboardChartResponsive: (({
  resizeDebounceTime,
  maxWidth,
  aspectRatio,
  size,
  width,
  height,
  ...chartProps
}: Omit<LeaderboardChartProps, "width" | "height" | "size"> & {
  width?: number;
  height?: number;
  size?: number;
} & ResponsiveConfig) => import("react/jsx-runtime").JSX.Element) & {
  Legend: import("react").ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
  } & import("react").RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/utils/date-parsing.d.ts
/**
 * @file Date parsing utilities using date-fns for local timezone handling
 *
 * This module provides utilities for parsing various date string formats and converting
 * them to local timezone dates using the battle-tested date-fns library. For formats
 * without timezone info, they're treated as local. For formats with timezone info,
 * they're converted to the equivalent local time.
 *
 * Note: And specifically it prevents format `YYYY-MM-DD` being parsed as UTC date.
 *
 * Key Features:
 * - All parsed dates are in local timezone
 * - Converts timezone-aware strings to local equivalent
 * - Robust input validation and error handling using date-fns
 * - TypeScript type safety
 * - Much smaller codebase than custom parsing
 *
 * Supported Formats:
 * - YYYY-MM-DD (treated as local)
 * - YYYY-MM-DD HH:mm:ss (treated as local)
 * - YYYY-MM-DD HH:mm (treated as local)
 * - YYYY-MM-DDTHH:mm:ss (treated as local)
 * - YYYY-MM-DDTHH:mm:ss.SSS (treated as local)
 * - YYYY-MM-DDTHH:mm (treated as local)
 * - YYYY-MM-DDTHH:mm:ssZ (converted to local)
 * - YYYY-MM-DDTHH:mm:ss±HH:mm (converted to local)
 *
 * @example
 * ```typescript
 * parseAsLocalDate("2025-01-01");                     // Local timezone
 * parseAsLocalDate("2025-01-01 14:30:00");            // Local timezone
 * parseAsLocalDate("2025-01-01 14:30");               // Local timezone
 * parseAsLocalDate("2025-01-01T14:30:45.123");        // Local timezone
 * parseAsLocalDate("2025-01-01T14:30:00Z");           // UTC 14:30 → Local equivalent
 * parseAsLocalDate("2025-01-01T14:30:00+05:00");      // +05:00 14:30 → Local equivalent
 * ```
 */
/**
 * Parses any supported date string format and returns a local timezone date
 *
 * Uses date-fns for robust parsing and validation. For strings without timezone
 * info, treats as local timezone. For strings with timezone info, converts to
 * local timezone equivalent.
 *
 * Supports:
 * - YYYY-MM-DD (local)
 * - YYYY-MM-DD HH:mm:ss (local)
 * - YYYY-MM-DD HH:mm (local)
 * - YYYY-MM-DDTHH:mm:ss (local)
 * - YYYY-MM-DDTHH:mm:ss.SSS (local)
 * - YYYY-MM-DDTHH:mm (local)
 * - YYYY-MM-DDTHH:mm:ssZ (UTC → local)
 * - YYYY-MM-DDTHH:mm:ss±HH:mm (offset → local)
 * @param {string} dateString - The date string to parse into a local timezone date
 * @return {Date} A Date object representing the parsed date in local timezone, or an invalid Date if parsing fails
 */
declare const parseAsLocalDate: (dateString: string) => Date;
//#endregion
//#region src/utils/format-metric-value.d.ts
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
 * Supports currency, number and percentage, using `@automattic/number-formatters`.
 *
 * @param value                  - The value to format
 * @param type                   - The type of formatting to apply
 * @param options                - Formatting options
 * @param options.decimals       - Number of decimal places to show
 * @param options.useMultipliers - Whether to use K, M, B suffixes for large numbers
 * @param options.signDisplay    - Controls when to display the sign (auto, always, never, exceptZero)
 * @return Formatted string
 */
declare const formatMetricValue: (value: string | number, type?: MetricValueType, {
  decimals,
  useMultipliers,
  signDisplay
}?: FormatMetricValueOptions) => string;
//#endregion
//#region src/utils/format-percentage.d.ts
/**
 * Format a percentage value with smart decimal handling.
 * Uses `@automattic/number-formatters` for consistent formatting.
 * Removes unnecessary trailing zeros and caps at 2 decimal places.
 *
 * @param value - The percentage value (0-100 range)
 * @return Formatted percentage string (e.g., "30%", "30.1%", "30.25%")
 */
declare const formatPercentage: (value: number) => string;
//#endregion
//#region src/utils/merge-themes.d.ts
/**
 * Merges chart themes with proper precedence.
 * The second theme (override) takes precedence over the first theme (base).
 *
 * @param baseTheme     - Base theme object
 * @param overrideTheme - Theme to override base with (takes precedence)
 * @return Merged theme with overrideTheme values taking precedence
 */
declare function mergeThemes(baseTheme: CompleteChartTheme, overrideTheme: Partial<ChartTheme>): CompleteChartTheme;
declare function mergeThemes(baseTheme: ChartTheme, overrideTheme: Partial<ChartTheme>): ChartTheme;
//#endregion
//#region src/utils/color-utils.d.ts
/**
 * Check if a value is a valid 6-digit hex color
 * @param hex - The value to check
 * @return true if valid hex color format (e.g., '#ff0000')
 */
declare const isValidHexColor: (hex: unknown) => hex is string;
/**
 * Validate hex color format, throwing descriptive errors if invalid
 * @param  hex - The hex color string to validate
 * @throws {Error} if hex string is malformed
 */
declare const validateHexColor: (hex: unknown) => void;
/**
 * Convert hex color to rgba with specified opacity.
 * This is genuinely reusable across chart components.
 * @param  hex   - The hex color string (e.g., '#ff0000')
 * @param  alpha - The opacity value. Values outside the [0, 1] range will be clamped by the underlying d3 color library.
 * @return The rgba color string (e.g., 'rgba(255, 0, 0, 0.5)')
 * @throws {Error} if hex string is malformed or alpha is not a valid number
 */
declare const hexToRgba: (hex: string, alpha: number) => string;
/**
 * Calculate the perceptual distance between two HSL colors
 * @param hsl1 - first color in HSL format [h, s, l]
 * @param hsl2 - second color in HSL format [h, s, l]
 * @return distance value (0-100+, lower means more similar)
 */
declare const getColorDistance: (hsl1: [number, number, number], hsl2: [number, number, number]) => number;
/**
 * Parse an HSL string like 'hsl(120, 50%, 50%)' into an HSL tuple.
 *
 * @param hslString - HSL color string
 * @return HSL tuple [h, s, l] or null if invalid
 */
declare const parseHslString: (hslString: string) => [number, number, number] | null;
/**
 * Parse an RGB string like 'rgb(255, 0, 0)' into a hex color.
 *
 * @deprecated    Use normalizeColorToHex() instead, which handles all color formats including rgb() and rgba().
 * @param      rgbString - RGB color string (not RGBA)
 * @return        hex color string or null if invalid
 */
declare const parseRgbString: (rgbString: string) => string | null;
/**
 * Normalize any CSS color value to a hex color string.
 * Handles hex, HSL, HSLA, RGB, RGBA, named CSS colors, and CSS variables.
 *
 * @param color      - Any CSS color value
 * @param element    - Optional DOM element for resolving CSS variables
 * @param resolveCss - Function to resolve CSS variables (injected for testability)
 * @param _depth     - Internal recursion depth counter to prevent infinite loops
 * @return hex color string, or the original value if conversion fails
 */
declare const normalizeColorToHex: (color: string, element?: HTMLElement | null, resolveCss?: (value: string, el?: HTMLElement | null) => string | null, _depth?: number) => string;
/**
 * Lighten a hex color by blending it with white.
 * Useful for creating color gradients or lighter variants.
 *
 * @param  hex   - Hex color string (e.g., '#98C8DF')
 * @param  blend - Blend amount with white (0 = original color, 1 = white)
 * @return Lightened hex color string (e.g., '#cce4ef')
 * @throws {Error} if hex string is malformed
 */
declare const lightenHexColor: (hex: string, blend: number) => string;
/**
 * Blend one hex color toward another, per-channel in sRGB.
 *
 * @param  fromHex - Starting hex color, returned when blend is 0
 * @param  toHex   - Target hex color, returned when blend is 1
 * @param  blend   - Amount toward toHex, clamped to [0, 1]
 * @return Blended hex color string
 * @throws {Error} if either hex string is malformed
 */
declare const mixHexColors: (fromHex: string, toHex: string, blend: number) => string;
/**
 * WCAG relative luminance of a hex color (0 = black, 1 = white).
 *
 * @param  hex - Hex color string (e.g., '#98C8DF')
 * @return Relative luminance in the range [0, 1]
 * @throws {Error} if hex string is malformed
 */
declare const relativeLuminance: (hex: string) => number;
/**
 * Whether light text reads better than dark text on the given background, using the W3C
 * luminance threshold (0.179) that maximizes contrast against black vs white.
 *
 * @param backgroundHex - Hex background color
 * @return true if light text should be used; false (dark text) for malformed colors
 */
declare const prefersLightText: (backgroundHex: string) => boolean;
//#endregion
//#region src/charts/leaderboard-chart/hooks/use-leaderboard-legend-items.d.ts
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
declare function useLeaderboardLegendItems({
  data,
  primaryColor,
  secondaryColor,
  withComparison,
  withOverlayLabel,
  legendLabels
}: {
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
//#endregion
//#region src/charts/line-chart/private/line-chart-annotations-overlay.d.ts
interface LineChartAnnotationsProps {
  children?: ReactNode;
}
declare const LineChartAnnotationsOverlay: FC<LineChartAnnotationsProps>;
//#endregion
//#region src/charts/line-chart/private/line-chart-annotation.d.ts
declare const LineChartAnnotation: FC<LineChartAnnotationProps>;
//#endregion
//#region src/charts/line-chart/line-chart.d.ts
type LineChartAnnotationComponents = {
  AnnotationsOverlay: typeof LineChartAnnotationsOverlay;
  Annotation: typeof LineChartAnnotation;
  Legend: typeof Legend;
};
type LineChartBaseProps = Optional<LineChartProps, 'width' | 'height' | 'size'>;
type LineChartComponent = React.ForwardRefExoticComponent<LineChartBaseProps & React.RefAttributes<SingleChartRef>> & LineChartAnnotationComponents;
type LineChartResponsiveComponent = React.ForwardRefExoticComponent<LineChartBaseProps & ResponsiveConfig & React.RefAttributes<SingleChartRef>> & LineChartAnnotationComponents;
declare const LineChart: LineChartComponent;
declare const LineChartResponsive: LineChartResponsiveComponent;
//#endregion
//#region src/charts/private/chart-composition/types.d.ts
/**
 * Base interface for chart subcomponents in the composition API
 */
interface BaseChartSubComponents {
  Legend: ComponentType<React.ComponentProps<typeof Legend>>;
  SVG: FC<PropsWithChildren>;
  HTML: FC<PropsWithChildren>;
}
/**
 * Type helper for creating chart components with composition API
 * @template TProps - The props type for the chart component
 * @template TSubComponents - Additional subcomponents beyond the base ones
 */
type ChartComponentWithComposition<TProps, TSubComponents extends BaseChartSubComponents = BaseChartSubComponents> = FC<TProps> & TSubComponents;
//#endregion
//#region src/charts/pie-chart/pie-chart.d.ts
/**
 * Parameters passed to the renderTooltip function for pie charts.
 */
type PieChartRenderTooltipParams = {
  /**
   * The data point being hovered, including label, value, and calculated percentage.
   */
  tooltipData: DataPointPercentageCalculated;
};
interface PieChartProps extends BaseChartProps<DataPointPercentage[]> {
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
   * Whether to show labels on pie segments. Defaults to true.
   */
  showLabels?: boolean;
  /**
   * What type of value to display in the legend when showValues is true.
   * - 'percentage': Shows percentage values (e.g., "23%") [default]
   * - 'value': Shows raw numeric values (e.g., "30000")
   * - 'valueDisplay': Shows formatted values (e.g., "30K")
   * - 'none': Shows no values, only labels
   */
  legendValueDisplay?: LegendValueDisplay;
  /**
   * Use the children prop to render additional elements on the chart.
   */
  children?: ReactNode;
  /**
   * Horizontal offset for tooltip positioning in pixels (default: 0)
   */
  tooltipOffsetX?: number;
  /**
   * Vertical offset for tooltip positioning in pixels (default: -15)
   */
  tooltipOffsetY?: number;
  /**
   * Custom render function for tooltip content.
   * When provided, replaces the default BaseTooltip with custom content.
   */
  renderTooltip?: (params: PieChartRenderTooltipParams) => ReactNode;
}
type PieChartBaseProps = Optional<PieChartProps, 'size'>;
type PieChartComponent = ChartComponentWithComposition<PieChartBaseProps>;
type PieChartResponsiveComponent = ChartComponentWithComposition<PieChartBaseProps & ResponsiveConfig>;
declare const PieChart: PieChartComponent;
declare const PieChartResponsive: PieChartResponsiveComponent;
//#endregion
//#region src/charts/pie-semi-circle-chart/pie-semi-circle-chart.d.ts
/**
 * Parameters passed to the renderTooltip function for semi-circle charts.
 */
type PieSemiCircleChartRenderTooltipParams = {
  /**
   * The data point being hovered, including label, value, and calculated percentage.
   */
  tooltipData: DataPointPercentageCalculated;
};
interface PieSemiCircleChartProps extends BaseChartProps<DataPointPercentage[]> {
  /**
   * Explicit width of the chart container in pixels.
   * When omitted, the chart fills its parent container's width.
   * The chart always maintains a 2:1 width-to-height ratio, constrained by available space.
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
  /**
   * Use the children prop to render additional elements on the chart.
   */
  children?: ReactNode;
  /**
   * What type of value to display in the legend when showValues is true.
   * - 'percentage': Shows percentage values (e.g., "23%") [default]
   * - 'value': Shows raw numeric values (e.g., "30000")
   * - 'valueDisplay': Shows formatted values (e.g., "30K")
   * - 'none': Shows no values, only labels
   */
  legendValueDisplay?: LegendValueDisplay;
  /**
   * Horizontal offset for tooltip positioning in pixels (default: 0)
   */
  tooltipOffsetX?: number;
  /**
   * Vertical offset for tooltip positioning in pixels (default: -15)
   */
  tooltipOffsetY?: number;
  /**
   * Custom render function for tooltip content.
   * When provided, replaces the default BaseTooltip with custom content.
   */
  renderTooltip?: (params: PieSemiCircleChartRenderTooltipParams) => ReactNode;
}
type PieSemiCircleChartBaseProps = Optional<PieSemiCircleChartProps, 'width'>;
type PieSemiCircleChartComponent = ChartComponentWithComposition<PieSemiCircleChartBaseProps>;
type PieSemiCircleChartResponsiveComponent = ChartComponentWithComposition<PieSemiCircleChartBaseProps & ResponsiveConfig>;
type ArcData = PieProvidedProps<DataPointPercentageCalculated>['arcs'][number];
declare const PieSemiCircleChart: PieSemiCircleChartComponent;
declare const PieSemiCircleChartResponsive: PieSemiCircleChartResponsiveComponent;
//#endregion
//#region src/charts/sparkline/types.d.ts
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
  /**
   * Enable entry animation on initial render
   * Creates a rising effect where the line scales up from the bottom.
   * Automatically respects user's prefers-reduced-motion system setting.
   * @default false
   */
  animation?: boolean;
}
//#endregion
//#region src/charts/sparkline/sparkline.d.ts
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
declare const SparklineUnresponsive: import("react").ForwardRefExoticComponent<SparklineProps & import("react").RefAttributes<HTMLDivElement>>;
/**
 * Responsive Sparkline chart component
 */
declare const Sparkline: ({
  resizeDebounceTime,
  maxWidth,
  aspectRatio,
  size,
  width,
  height,
  ...chartProps
}: Omit<SparklineProps, "width" | "height" | "size"> & {
  width?: number;
  height?: number;
  size?: number;
} & ResponsiveConfig) => import("react/jsx-runtime").JSX.Element;
//#endregion
//#region src/components/tooltip/base-tooltip.d.ts
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
  /**
   * Whether to render the tooltip container div. When false, only renders the content.
   * Useful when the tooltip is rendered inside a portal or custom container.
   * @default true
   */
  renderContainer?: boolean;
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
declare const BaseTooltip: ({
  data,
  top,
  left,
  component: Component,
  children,
  className,
  style,
  renderContainer
}: BaseTooltipProps) => string | number | true | import("react/jsx-runtime").JSX.Element | Iterable<ReactNode>;
//#endregion
//#region src/components/tooltip/accessible-tooltip.d.ts
type FlattenedTooltipData = {
  datum: DataPointDate;
  seriesLabel: string;
  seriesIndex: number;
  dataPointIndex: number;
};
interface AccessibleTooltipProps extends Omit<XyChartTooltipProps<DataPointDate>, 'renderTooltip'> {
  renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
  selectedIndex?: number | undefined;
  tooltipRef?: (element: HTMLDivElement | null) => void;
  keyboardFocusedClassName?: string;
  /**
   * Flattened tooltip data prepared by parent component
   * Each index corresponds to one tooltip to show
   */
  tooltipData?: FlattenedTooltipData[];
  /**
   * For line charts: series data to show all series at selected data point
   * When provided, shows all series instead of individual tooltips
   */
  series?: SeriesData[];
  /**
   * Whether to combine tooltip information from multiple series into a single tooltip. This is useful for line charts.
   * Or to show individual tooltips for each series. This is useful for bar charts.
   */
  mode?: 'individual' | 'group';
}
declare const AccessibleTooltip: React.FC<AccessibleTooltipProps>;
//#endregion
//#region src/components/tooltip/types.d.ts
type TooltipProps = {
  data: {
    label: string;
    value: number;
  };
};
//#endregion
//#region src/components/trend-indicator/types.d.ts
/**
 * The direction of the trend
 */
type TrendDirection = 'up' | 'down' | 'neutral';
/**
 * Props for the TrendIndicator component
 */
type TrendIndicatorProps = {
  /**
   * The direction of the trend (up, down, or neutral)
   */
  direction: TrendDirection;
  /**
   * The value to display (e.g., "14%", "+$500", "2.5k")
   */
  value: string | number;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: CSSProperties;
  /**
   * Whether to show the directional icon
   * @default true
   */
  showIcon?: boolean;
};
//#endregion
//#region src/components/trend-indicator/trend-indicator.d.ts
/**
 * TrendIndicator displays a directional trend with a value.
 * Used to show percentage changes or growth metrics.
 *
 * @param {TrendIndicatorProps} props - Component props
 * @return {JSX.Element} The rendered trend indicator
 */
declare function TrendIndicator({
  direction,
  value,
  className,
  style,
  showIcon
}: TrendIndicatorProps): import("react/jsx-runtime").JSX.Element;
//#endregion
//#region src/providers/chart-context/types.d.ts
interface ChartRegistration {
  legendItems: BaseLegendItem[];
  chartType: ChartType;
  metadata?: Record<string, unknown>;
}
type GetElementStylesParams = {
  index: number;
  data?: SeriesData | DataPointPercentage;
  overrideColor?: string;
  legendShape?: LegendShape<SeriesData[], number>;
};
type ElementStyles = {
  color: string;
  lineStyles: LineStyles$1;
  barStyles: BarStyles;
  glyph: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
  shapeStyles: CSSProperties & LineStyles$1;
};
interface GlobalChartsContextValue {
  charts: Map<string, ChartRegistration>;
  registerChart: (id: string, data: ChartRegistration) => void;
  unregisterChart: (id: string) => void;
  getChartData: (id: string) => ChartRegistration | undefined;
  theme: CompleteChartTheme;
  getElementStyles: (params: GetElementStylesParams) => ElementStyles;
  resolveThemeColor: (value: string) => string;
  toggleSeriesVisibility: (chartId: string, seriesLabel: string) => void;
  isSeriesVisible: (chartId: string, seriesLabel: string) => boolean;
  getHiddenSeries: (chartId: string) => Set<string>;
  isColorPaletteResolved: boolean;
}
//#endregion
//#region src/providers/chart-context/global-charts-provider.d.ts
declare const GlobalChartsContext: import("react").Context<GlobalChartsContextValue>;
interface GlobalChartsProviderProps {
  children: ReactNode;
  theme?: Partial<ChartTheme>;
}
declare const GlobalChartsProvider: FC<GlobalChartsProviderProps>;
//#endregion
//#region src/providers/chart-context/hooks/use-global-charts-context.d.ts
declare const useGlobalChartsContext: () => GlobalChartsContextValue;
//#endregion
//#region src/providers/chart-context/hooks/use-global-charts-theme.d.ts
/**
 * Hook to get the global chart theme from GlobalChartsProvider
 *
 * @return The global chart theme
 */
declare const useGlobalChartsTheme: () => CompleteChartTheme;
//#endregion
//#region src/providers/chart-context/themes.d.ts
/**
 * Default theme configuration
 */
declare const defaultTheme: CompleteChartTheme;
//#endregion
export { AccessibleTooltip, type AnnotationStyles, type ArcData, AreaChartResponsive as AreaChart, type AreaChartProps, AreaChart as AreaChartUnresponsive, type AxisOptions, BarChartResponsive as BarChart, type BarChartProps, BarChart as BarChartUnresponsive, BarListChartResponsive as BarListChart, type BarListChartProps, BarListChart as BarListChartUnresponsive, type BaseChartProps, type BaseLegendItem, type BaseLegendProps, BaseTooltip, type BaseTooltipProps, type CalendarHeatmapResult, type ChartLegendConfig, type ChartLegendOptions, type ChartTheme, type CompleteChartTheme, ConversionFunnelChartWithProvider as ConversionFunnelChart, type ConversionFunnelChartProps, type CurveType, type DataPoint, type DataPointDate, type DataPointPercentage, type EventHandlerParams, type FunnelStep, GeoChartResponsive as GeoChart, type GeoChartError, type GeoChartProps, GeoChartWithProvider as GeoChartUnresponsive, type GeoData, type GeoRegion, type GeoResolution, GlobalChartsContext, GlobalChartsProvider, GlobalChartsProvider as ThemeProvider, type GoogleDataTableColumn, type GoogleDataTableColumnRoleType, type GoogleDataTableRow, type GradientConfig, type GradientStop, type GridProps, type GridStyles, type HeatmapCell, HeatmapChartResponsive as HeatmapChart, type HeatmapChartProps, HeatmapChart as HeatmapChartUnresponsive, type HeatmapColumn, type HeatmapTooltipData, LeaderboardChartResponsive as LeaderboardChart, type LeaderboardChartProps, LeaderboardChart as LeaderboardChartUnresponsive, type LeaderboardEntry, Legend, type LegendItemStyles, type LegendLabelStyles, type LegendPosition, type LegendProps, type LegendShape, type LegendShapeLabel, type LegendShapeRenderProps, type LegendShapeStyles, type LegendValueDisplay, LineChartResponsive as LineChart, type LineChartAnnotationProps, type LineChartProps, LineChart as LineChartUnresponsive, type LineStyles, type MainMetricRenderProps, type MetricValueType, type MultipleDataPointsDate, type Optional, type OrientationType, PieChartResponsive as PieChart, type PieChartProps, type PieChartRenderTooltipParams, PieChart as PieChartUnresponsive, PieSemiCircleChartResponsive as PieSemiCircleChart, type PieSemiCircleChartProps, type PieSemiCircleChartRenderTooltipParams, PieSemiCircleChart as PieSemiCircleChartUnresponsive, type RenderLabelProps, type RenderLineGlyphProps, type RenderTooltipGlyphProps, type RenderTooltipParams, type RenderValueProps, type ScaleOptions, type SeriesData, type SeriesDataOptions, Sparkline, type SparklineDataPoint, type SparklineProps, SparklineUnresponsive, type StepLabelRenderProps, type StepRateRenderProps, type TooltipData, type TooltipDatum, type TooltipProps, type TooltipRenderProps, type TrendDirection, TrendIndicator, type TrendIndicatorProps, type XyChartTooltipProps, buildCalendarHeatmapData, defaultTheme, formatMetricValue, formatPercentage, getColorDistance, hexToRgba, isValidHexColor, lightenHexColor, mergeThemes, mixHexColors, normalizeColorToHex, parseAsLocalDate, parseHslString, parseRgbString, prefersLightText, relativeLuminance, useChartLegendItems, useGlobalChartsContext, useGlobalChartsTheme, useLeaderboardLegendItems, validateHexColor };
//# sourceMappingURL=index.d.ts.map