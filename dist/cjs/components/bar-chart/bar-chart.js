'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var pattern = require('@visx/pattern');
var xychart = require('@visx/xychart');
var i18n = require('@wordpress/i18n');
var clsx = require('clsx');
var react = require('react');
var globalChartsProvider = require('../../providers/chart-context/global-charts-provider.js');
var utils = require('../../providers/chart-context/utils.js');
var themeProvider = require('../../providers/theme/theme-provider.js');
var legend = require('../legend/legend.js');
require('../legend/base-legend.js');
var useChartLegendData = require('../legend/use-chart-legend-data.js');
var useChartDataTransform = require('../shared/use-chart-data-transform.js');
var useChartMargin = require('../shared/use-chart-margin.js');
var useElementHeight = require('../shared/use-element-height.js');
var useZeroValueDisplay = require('../shared/use-zero-value-display.js');
var withResponsive = require('../shared/with-responsive.js');
var accessibleTooltip = require('../tooltip/accessible-tooltip.js');
var barChart_module = require('./bar-chart.module.scss.js');
var useBarChartOptions = require('./use-bar-chart-options.js');

// Validation function similar to LineChart
const validateData = (data) => {
    if (!data?.length)
        return 'No data available';
    const hasInvalidData = data.some(series => series.data.some(point => isNaN(point.value) ||
        point.value === null ||
        point.value === undefined ||
        (!point.label &&
            (!('date' in point && point.date) || isNaN(point.date.getTime())))));
    if (hasInvalidData)
        return 'Invalid data';
    return null;
};
const getPatternId = (chartId, index) => `bar-pattern-${chartId}-${index}`;
const BarChartInternal = ({ data, chartId: providedChartId, width, height = 400, className, margin, withTooltips = false, showLegend = false, legendOrientation = 'horizontal', legendAlignmentHorizontal = 'center', legendAlignmentVertical = 'bottom', legendShape = 'rect', gridVisibility: gridVisibilityProp, renderTooltip, options = {}, orientation = 'vertical', withPatterns = false, showZeroValues = false, }) => {
    const horizontal = orientation === 'horizontal';
    const chartId = utils.useChartId(providedChartId);
    const providerTheme = themeProvider.useChartTheme();
    const theme = themeProvider.useXYChartTheme(data);
    const dataSorted = useChartDataTransform.useChartDataTransform(data);
    // Transform data to add a small value for zero bars to make them visible
    const dataWithVisibleZeros = useZeroValueDisplay.useZeroValueDisplay(dataSorted, {
        enabled: showZeroValues,
    });
    // Create legend items using the reusable hook
    const legendItems = useChartLegendData.useChartLegendData(dataSorted, providerTheme);
    const chartOptions = useBarChartOptions.useBarChartOptions(dataWithVisibleZeros, horizontal, options);
    const defaultMargin = useChartMargin.useChartMargin(height, chartOptions, dataSorted, theme, horizontal);
    const [legendRef, legendHeight] = useElementHeight.useElementHeight();
    const chartRef = react.useRef(null);
    const [selectedIndex, setSelectedIndex] = react.useState(undefined);
    const [isNavigating, setIsNavigating] = react.useState(false);
    const totalPoints = Math.max(0, ...data.map(series => series.data?.length || 0)) * data.length;
    // Use the keyboard navigation hook
    const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = accessibleTooltip.useKeyboardNavigation({
        selectedIndex,
        setSelectedIndex,
        isNavigating,
        setIsNavigating,
        chartRef,
        totalPoints,
    });
    const getColor = react.useCallback((seriesData, index) => seriesData?.options?.stroke || theme.colors[index % theme.colors.length], [theme]);
    const getBarBackground = react.useCallback((index) => () => withPatterns
        ? `url(#${getPatternId(chartId, index)})`
        : getColor(dataSorted[index], index), [withPatterns, getColor, dataSorted, chartId]);
    const renderDefaultTooltip = react.useCallback(({ tooltipData }) => {
        const nearestDatum = tooltipData?.nearestDatum?.datum;
        if (!nearestDatum)
            return null;
        return (jsxRuntime.jsxs("div", { className: barChart_module.default['bar-chart__tooltip'], children: [jsxRuntime.jsx("div", { className: barChart_module.default['bar-chart__tooltip-header'], children: tooltipData?.nearestDatum?.key }), jsxRuntime.jsxs("div", { className: barChart_module.default['bar-chart__tooltip-row'], children: [jsxRuntime.jsxs("span", { className: barChart_module.default['bar-chart__tooltip-label'], children: [chartOptions.tooltip.labelFormatter(nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0), 0, []), ":"] }), jsxRuntime.jsx("span", { className: barChart_module.default['bar-chart__tooltip-value'], children: nearestDatum.value })] })] }));
    }, [chartOptions.tooltip]);
    const renderPattern = react.useCallback((index, color) => {
        const patternType = index % 4;
        const id = getPatternId(chartId, index);
        const commonProps = {
            id,
            stroke: 'white',
            strokeWidth: 1,
            background: color,
        };
        switch (patternType) {
            case 0:
            default:
                return (jsxRuntime.jsx(pattern.PatternLines, { ...commonProps, width: 5, height: 5, orientation: ['diagonal'] }, id));
            case 1:
                return (jsxRuntime.jsx(pattern.PatternCircles, { ...commonProps, width: 6, height: 6, fill: "white" }, id));
            case 2:
                return jsxRuntime.jsx(pattern.PatternWaves, { ...commonProps, width: 4, height: 4 }, id);
            case 3:
                return jsxRuntime.jsx(pattern.PatternHexagons, { ...commonProps, size: 8, height: 3 }, id);
        }
    }, [chartId]);
    const createPatternBorderStyle = react.useCallback((index, color) => {
        const patternId = getPatternId(chartId, index);
        return `
			.visx-bar[fill="url(#${patternId})"] {
				stroke: ${color};
				stroke-width: 1;
				}
			`;
    }, [chartId]);
    const createKeyboardHighlightStyle = react.useCallback(() => {
        if (selectedIndex === undefined)
            return '';
        // Calculate which bar should be highlighted based on selectedIndex
        // Pattern: [series1[0], series2[0], series3[0], series1[1], series2[1], series3[1], ...]
        const maxDataPoints = Math.max(...data.map(s => s.data.length));
        const dataPointIndex = Math.floor(selectedIndex / data.length);
        const seriesIndex = selectedIndex % data.length;
        // Only highlight if we're within valid bounds
        if (dataPointIndex >= maxDataPoints || seriesIndex >= data.length) {
            return '';
        }
        const seriesData = data[seriesIndex];
        if (dataPointIndex >= seriesData.data.length) {
            return '';
        }
        // Based on the DOM structure analysis:
        // - All bars are in a single .visx-bar-group
        // - Bars are ordered as: [series1[0], series1[1], series2[0], series2[1], ...]
        // - So we need to calculate the actual bar index in the DOM
        const actualBarIndex = seriesIndex * maxDataPoints + dataPointIndex;
        // Use a CSS class selector instead of ID since useId() generates invalid CSS ID characters
        const generatedStyles = `
			.bar-chart[data-chart-id="bar-chart-${chartId}"] .visx-bar-group .visx-bar:nth-child(${actualBarIndex + 1}) {
				stroke: #005fcc;
				stroke-width: 2px;
			}
		`;
        return generatedStyles;
    }, [selectedIndex, data, chartId]);
    // Validate data first
    const error = validateData(dataSorted);
    const isDataValid = !error;
    // Memoize metadata to prevent unnecessary re-registration
    const chartMetadata = react.useMemo(() => ({
        orientation,
        withPatterns,
    }), [orientation, withPatterns]);
    // Register chart with context only if data is valid
    utils.useChartRegistration(chartId, legendItems, providerTheme, 'bar', isDataValid, chartMetadata);
    if (error) {
        return jsxRuntime.jsx("div", { className: clsx('bar-chart', barChart_module.default['bar-chart']), children: error });
    }
    const gridVisibility = gridVisibilityProp ?? chartOptions.gridVisibility;
    const highlightedBarStyle = createKeyboardHighlightStyle();
    return (jsxRuntime.jsxs("div", { className: clsx('bar-chart', barChart_module.default['bar-chart'], className), "data-testid": "bar-chart", role: "grid", "aria-label": i18n.__('Bar chart', 'jetpack-charts'), style: {
            width,
            height,
            display: 'flex',
            flexDirection: showLegend && legendAlignmentVertical === 'top' ? 'column-reverse' : 'column',
        }, tabIndex: 0, onKeyDown: onChartKeyDown, onFocus: onChartFocus, onBlur: onChartBlur, ref: chartRef, "data-chart-id": `bar-chart-${chartId}`, children: [jsxRuntime.jsxs(xychart.XYChart, { theme: theme, width: width, height: height - (showLegend ? legendHeight : 0), margin: {
                    ...defaultMargin,
                    ...margin,
                    ...(showLegend && legendAlignmentVertical === 'top'
                        ? { top: (defaultMargin.top || 0) + legendHeight }
                        : {}),
                }, xScale: chartOptions.xScale, yScale: chartOptions.yScale, horizontal: horizontal, pointerEventsDataKey: "nearest", children: [jsxRuntime.jsx(xychart.Grid, { columns: gridVisibility.includes('y'), rows: gridVisibility.includes('x'), numTicks: 4 }), withPatterns && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("defs", { "data-testid": "bar-chart-patterns", children: dataSorted.map((seriesData, index) => renderPattern(index, getColor(seriesData, index))) }), jsxRuntime.jsx("style", { children: dataSorted.map((seriesData, index) => createPatternBorderStyle(index, getColor(seriesData, index))) })] })), highlightedBarStyle && jsxRuntime.jsx("style", { children: highlightedBarStyle }), jsxRuntime.jsx(xychart.BarGroup, { padding: chartOptions.barGroup.padding, children: dataWithVisibleZeros.map((seriesData, index) => (jsxRuntime.jsx(xychart.BarSeries, { dataKey: seriesData?.label, data: seriesData.data, yAccessor: chartOptions.accessors.yAccessor, xAccessor: chartOptions.accessors.xAccessor, colorAccessor: getBarBackground(index) }, seriesData?.label))) }), jsxRuntime.jsx(xychart.Axis, { ...chartOptions.axis.x }), jsxRuntime.jsx(xychart.Axis, { ...chartOptions.axis.y }), withTooltips && (jsxRuntime.jsx(accessibleTooltip.AccessibleTooltip, { detectBounds: true, snapTooltipToDatumX: true, snapTooltipToDatumY: true, renderTooltip: renderTooltip || renderDefaultTooltip, selectedIndex: selectedIndex, tooltipRef: tooltipRef, keyboardFocusedClassName: barChart_module.default['bar-chart__tooltip--keyboard-focused'], series: data, mode: "individual" }))] }), showLegend && (jsxRuntime.jsx(legend.Legend, { items: legendItems, orientation: legendOrientation, alignmentHorizontal: legendAlignmentHorizontal, alignmentVertical: legendAlignmentVertical, className: barChart_module.default['bar-chart__legend'], shape: legendShape, ref: legendRef, chartId: chartId }))] }));
};
const BarChart = props => {
    const existingContext = react.useContext(globalChartsProvider.GlobalChartsContext);
    // If we're already in a GlobalChartsProvider context, don't create a new one
    if (existingContext) {
        return jsxRuntime.jsx(BarChartInternal, { ...props });
    }
    // Otherwise, create our own GlobalChartsProvider
    return (jsxRuntime.jsx(globalChartsProvider.GlobalChartsProvider, { children: jsxRuntime.jsx(BarChartInternal, { ...props }) }));
};
BarChart.displayName = 'BarChart';
var BarChart$1 = withResponsive.withResponsive(BarChart);

exports.default = BarChart$1;
