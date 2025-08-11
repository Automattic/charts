'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var numberFormatters = require('@automattic/number-formatters');
var curve = require('@visx/curve');
var gradient = require('@visx/gradient');
var xychart = require('@visx/xychart');
var i18n = require('@wordpress/i18n');
var clsx = require('clsx');
var chartContext = require('../../providers/chart-context/chart-context.js');
var utils = require('../../providers/chart-context/utils.js');
var themeProvider = require('../../providers/theme/theme-provider.js');
var legend = require('../legend/legend.js');
require('../legend/base-legend.js');
var useChartLegendData = require('../legend/use-chart-legend-data.js');
var defaultGlyph = require('../shared/default-glyph.js');
var useChartDataTransform = require('../shared/use-chart-data-transform.js');
var useChartMargin = require('../shared/use-chart-margin.js');
var useElementHeight = require('../shared/use-element-height.js');
var withResponsive = require('../shared/with-responsive.js');
var accessibleTooltip = require('../tooltip/accessible-tooltip.js');
var lineChartAnnotation = require('./line-chart-annotation.js');
var lineChartAnnotationsOverlay = require('./line-chart-annotations-overlay.js');
var lineChartContext = require('./line-chart-context.js');
var lineChart_module = require('./line-chart.module.scss.js');

const X_TICK_WIDTH = 100;
const defaultRenderGlyph = (props) => {
    return react.createElement(defaultGlyph.DefaultGlyph, { ...props, key: props.key });
};
const toNumber = (val) => {
    const num = typeof val === 'number' ? val : parseFloat(val);
    return isNaN(num) ? undefined : num;
};
const StartGlyph = ({ data, index, color, glyphStyle, renderGlyph, accessors }) => {
    const { xScale, yScale } = react.useContext(xychart.DataContext) || {};
    if (!xScale || !yScale)
        return null;
    if (data.data.length === 0)
        return null;
    const firstPoint = data.data[0];
    const x = xScale(accessors.xAccessor(firstPoint));
    const y = yScale(accessors.yAccessor(firstPoint));
    if (typeof x !== 'number' || typeof y !== 'number')
        return null;
    const size = Math.max(0, toNumber(glyphStyle?.radius) ?? 4);
    return renderGlyph({
        key: `start-glyph-${data.label}`,
        index,
        datum: firstPoint,
        color,
        size,
        x,
        y,
        glyphStyle,
    });
};
/**
 * Determines the curve type for the line chart based on the provided type and smoothing parameters
 *
 * @param {CurveType} type      - The explicit curve type to use
 * @param {boolean}   smoothing - Legacy smoothing parameter
 * @return The curve function to use for the line
 */
const getCurveType = (type, smoothing) => {
    // If no type specified, use legacy smoothing behavior
    if (!type) {
        return smoothing ? curve.curveCatmullRom : curve.curveLinear;
    }
    // Handle explicit curve types
    switch (type) {
        case 'smooth':
            return curve.curveCatmullRom;
        case 'monotone':
            return curve.curveMonotoneX;
        case 'linear':
            return curve.curveLinear;
        default:
            return curve.curveLinear;
    }
};
const renderDefaultTooltip = (params) => {
    const { tooltipData } = params;
    const nearestDatum = tooltipData?.nearestDatum?.datum;
    if (!nearestDatum)
        return null;
    const tooltipPoints = Object.entries(tooltipData?.datumByKey || {})
        .map(([key, { datum }]) => ({
        key,
        value: datum.value,
    }))
        .sort((a, b) => b.value - a.value);
    return (jsxRuntime.jsxs("div", { className: lineChart_module.default['line-chart__tooltip'], children: [jsxRuntime.jsx("div", { className: lineChart_module.default['line-chart__tooltip-date'], children: nearestDatum.date?.toLocaleDateString() }), tooltipPoints.map(point => (jsxRuntime.jsxs("div", { className: lineChart_module.default['line-chart__tooltip-row'], children: [jsxRuntime.jsxs("span", { className: lineChart_module.default['line-chart__tooltip-label'], children: [point.key, ":"] }), jsxRuntime.jsx("span", { className: lineChart_module.default['line-chart__tooltip-value'], children: point.value })] }, point.key)))] }));
};
const formatDateTick = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });
};
const validateData = (data) => {
    if (!data?.length)
        return 'No data available';
    const hasInvalidData = data.some(series => series.data.some((point) => isNaN(point.value) ||
        point.value === null ||
        point.value === undefined ||
        ('date' in point && point.date && isNaN(point.date.getTime()))));
    if (hasInvalidData)
        return 'Invalid data';
    return null;
};
// Inner component to access DataContext and provide scale data to ref
const LineChartScalesRef = ({ chartRef, width, height, margin }) => {
    const context = react.useContext(xychart.DataContext);
    react.useImperativeHandle(chartRef, () => ({
        getScales: () => {
            if (!context?.xScale || !context?.yScale) {
                return null;
            }
            return {
                xScale: context.xScale,
                yScale: context.yScale,
            };
        },
        getChartDimensions: () => ({
            width,
            height,
            margin: margin || {},
        }),
    }), [context, width, height, margin]);
    return null; // This component only provides the ref interface
};
const LineChartInternal = react.forwardRef(({ data, chartId: providedChartId, width, height, className, margin, withTooltips = true, withTooltipCrosshairs, showLegend = false, legendOrientation = 'horizontal', legendAlignmentHorizontal = 'center', legendAlignmentVertical = 'bottom', renderGlyph = defaultRenderGlyph, glyphStyle = {}, legendShape = 'line', withLegendGlyph = false, withGradientFill = false, smoothing = true, curveType, renderTooltip = renderDefaultTooltip, withStartGlyphs = false, options = {}, onPointerDown = undefined, onPointerUp = undefined, onPointerMove = undefined, onPointerOut = undefined, children, }, ref) => {
    const providerTheme = themeProvider.useChartTheme();
    const theme = themeProvider.useXYChartTheme(data);
    const chartId = utils.useChartId(providedChartId);
    const [legendRef, legendHeight] = useElementHeight.useElementHeight();
    const chartRef = react.useRef(null);
    const [selectedIndex, setSelectedIndex] = react.useState(undefined);
    const [isNavigating, setIsNavigating] = react.useState(false);
    const internalChartRef = react.useRef(null);
    // Forward the external ref to the internal ref
    react.useImperativeHandle(ref, () => ({
        getScales: () => internalChartRef.current?.getScales() || null,
        getChartDimensions: () => internalChartRef.current?.getChartDimensions() || { width: 0, height: 0, margin: {} },
    }), [internalChartRef]);
    const dataSorted = useChartDataTransform.useChartDataTransform(data);
    // Use the keyboard navigation hook
    const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = accessibleTooltip.useKeyboardNavigation({
        selectedIndex,
        setSelectedIndex,
        isNavigating,
        setIsNavigating,
        chartRef,
        totalPoints: dataSorted[0]?.data.length || 0,
    });
    const chartOptions = react.useMemo(() => {
        const xNumTicks = Math.min(dataSorted[0]?.data.length, Math.ceil(width / X_TICK_WIDTH));
        return {
            axis: {
                x: {
                    orientation: 'bottom',
                    numTicks: xNumTicks,
                    tickFormat: formatDateTick,
                    ...options?.axis?.x,
                },
                y: {
                    orientation: 'left',
                    numTicks: 4,
                    tickFormat: numberFormatters.formatNumberCompact,
                    ...options?.axis?.y,
                },
            },
            xScale: {
                type: 'time',
                ...options?.xScale,
            },
            yScale: {
                type: 'linear',
                nice: true,
                zero: false,
                ...options?.yScale,
            },
        };
    }, [options, dataSorted, width]);
    const tooltipRenderGlyph = react.useMemo(() => {
        return (props) => {
            const seriesIndex = dataSorted.findIndex(series => series.label === props.key || series.data.includes(props.datum));
            const themeGlyph = providerTheme.glyphs?.[seriesIndex];
            return themeGlyph ? themeGlyph(props) : renderGlyph(props);
        };
    }, [dataSorted, providerTheme.glyphs, renderGlyph]);
    const defaultMargin = useChartMargin.useChartMargin(height, chartOptions, dataSorted, theme);
    const error = validateData(dataSorted);
    const isDataValid = !error;
    // Memoize legend options to prevent unnecessary re-calculations
    const legendOptions = react.useMemo(() => ({
        withGlyph: withLegendGlyph,
        glyphSize: Math.max(0, toNumber(glyphStyle?.radius) ?? 4),
        renderGlyph,
    }), [withLegendGlyph, glyphStyle?.radius, renderGlyph]);
    // Create legend items using the reusable hook
    const legendItems = useChartLegendData.useChartLegendData(dataSorted, providerTheme, legendOptions);
    // Memoize metadata to prevent unnecessary re-registration
    const chartMetadata = react.useMemo(() => ({
        withGradientFill,
        smoothing,
        curveType,
        withStartGlyphs,
        withLegendGlyph,
    }), [withGradientFill, smoothing, curveType, withStartGlyphs, withLegendGlyph]);
    // Register chart with context only if data is valid
    utils.useChartRegistration(chartId, legendItems, providerTheme, 'line', isDataValid, chartMetadata);
    const accessors = {
        xAccessor: (d) => d?.date,
        yAccessor: (d) => d?.value,
    };
    // Create a custom renderTooltip that includes focus capability
    if (error) {
        return jsxRuntime.jsx("div", { className: clsx('line-chart', lineChart_module.default['line-chart']), children: error });
    }
    return (jsxRuntime.jsx(lineChartContext.LineChartContext.Provider, { value: {
            chartId,
            chartRef: internalChartRef,
            chartWidth: width,
            chartHeight: height - (showLegend ? legendHeight : 0),
        }, children: jsxRuntime.jsxs("div", { className: clsx('line-chart', lineChart_module.default['line-chart'], className), "data-testid": "line-chart", style: {
                width,
                height,
                display: 'flex',
                flexDirection: showLegend && legendAlignmentVertical === 'top' ? 'column-reverse' : 'column',
                position: 'relative',
            }, children: [jsxRuntime.jsx("div", { role: "grid", "aria-label": i18n.__('Line chart', 'jetpack-charts'), tabIndex: 0, onKeyDown: onChartKeyDown, onFocus: onChartFocus, onBlur: onChartBlur, ref: chartRef, children: jsxRuntime.jsxs(xychart.XYChart, { theme: theme, width: width, height: height - (showLegend ? legendHeight : 0), margin: {
                            ...defaultMargin,
                            ...margin,
                            ...(showLegend && legendAlignmentVertical === 'top'
                                ? { top: (defaultMargin.top || 0) + legendHeight }
                                : {}),
                        }, 
                        // xScale and yScale could be set in Axis as well, but they are `scale` props there.
                        xScale: chartOptions.xScale, yScale: chartOptions.yScale, onPointerDown: onPointerDown, onPointerUp: onPointerUp, onPointerMove: onPointerMove, onPointerOut: onPointerOut, pointerEventsDataKey: "nearest", children: [jsxRuntime.jsx(xychart.Grid, { columns: false, numTicks: 4 }), jsxRuntime.jsx(xychart.Axis, { ...chartOptions.axis.x }), jsxRuntime.jsx(xychart.Axis, { ...chartOptions.axis.y }), dataSorted.map((seriesData, index) => {
                                const stroke = seriesData.options?.stroke ?? theme.colors[index % theme.colors.length];
                                const lineProps = seriesData.options?.seriesLineStyle ??
                                    providerTheme?.seriesLineStyles?.[index % providerTheme.seriesLineStyles.length] ??
                                    {};
                                return (jsxRuntime.jsxs("g", { children: [withStartGlyphs && (jsxRuntime.jsx(StartGlyph, { index: index, data: seriesData, color: stroke, renderGlyph: providerTheme.glyphs?.[index] ?? renderGlyph, accessors: accessors, glyphStyle: glyphStyle })), withGradientFill && (jsxRuntime.jsx(gradient.LinearGradient, { id: `area-gradient-${chartId}-${index + 1}`, from: stroke, fromOpacity: 0.4, toOpacity: 0.1, to: theme.backgroundColor, ...seriesData.options?.gradient, "data-testid": "line-gradient" })), jsxRuntime.jsx(xychart.AreaSeries, { dataKey: seriesData?.label, data: seriesData.data, ...accessors, fill: withGradientFill
                                                ? `url(#area-gradient-${chartId}-${index + 1})`
                                                : 'transparent', renderLine: true, curve: getCurveType(curveType, smoothing), lineProps: lineProps }, seriesData?.label)] }, seriesData?.label || index));
                            }), withTooltips && (jsxRuntime.jsx(accessibleTooltip.AccessibleTooltip, { detectBounds: true, snapTooltipToDatumX: true, snapTooltipToDatumY: true, showSeriesGlyphs: true, renderTooltip: renderTooltip, renderGlyph: tooltipRenderGlyph, glyphStyle: glyphStyle, showVerticalCrosshair: withTooltipCrosshairs?.showVertical, showHorizontalCrosshair: withTooltipCrosshairs?.showHorizontal, selectedIndex: selectedIndex, tooltipRef: tooltipRef, keyboardFocusedClassName: lineChart_module.default['line-chart__tooltip--keyboard-focused'], series: dataSorted })), jsxRuntime.jsx(LineChartScalesRef, { chartRef: internalChartRef, width: width, height: height, margin: margin })] }) }), showLegend && (jsxRuntime.jsx(legend.Legend, { items: legendItems, orientation: legendOrientation, alignmentHorizontal: legendAlignmentHorizontal, alignmentVertical: legendAlignmentVertical, className: lineChart_module.default['line-chart-legend'], shape: legendShape, chartId: chartId, ref: legendRef })), children] }) }));
});
const LineChart = react.forwardRef((props, ref) => {
    const existingContext = react.useContext(chartContext.ChartContext);
    // If we're already in a ChartProvider context, don't create a new one
    if (existingContext) {
        return jsxRuntime.jsx(LineChartInternal, { ...props, ref: ref });
    }
    // Otherwise, create our own ChartProvider
    return (jsxRuntime.jsx(chartContext.ChartProvider, { children: jsxRuntime.jsx(LineChartInternal, { ...props, ref: ref }) }));
});
LineChart.displayName = 'LineChart';
LineChart.AnnotationsOverlay = lineChartAnnotationsOverlay.default;
LineChart.Annotation = lineChartAnnotation.default;
const ResponsiveLineChart = Object.assign(withResponsive.withResponsive(LineChart), {
    AnnotationsOverlay: lineChartAnnotationsOverlay.default,
    Annotation: lineChartAnnotation.default,
});

exports.LineChartUnresponsive = LineChart;
exports.default = ResponsiveLineChart;
