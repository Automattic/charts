import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { PatternHexagons, PatternWaves, PatternCircles, PatternLines } from '@visx/pattern';
import { XYChart, Grid, BarGroup, BarSeries, Axis } from '@visx/xychart';
import clsx from 'clsx';
import { useId, useRef, useState, useCallback, useMemo } from 'react';
import { ChartProvider } from '../../providers/chart-context/chart-context.js';
import { useChartId, useChartRegistration } from '../../providers/chart-context/utils.js';
import { useXYChartTheme, useChartTheme } from '../../providers/theme/theme-provider.js';
import { BaseLegend } from '../legend/base-legend.js';
import { useChartDataTransform } from '../shared/use-chart-data-transform.js';
import { useChartMargin } from '../shared/use-chart-margin.js';
import { useElementHeight } from '../shared/use-element-height.js';
import { withResponsive } from '../shared/with-responsive.js';
import { useKeyboardNavigation, AccessibleTooltip } from '../tooltip/accessible-tooltip.js';
import styles from './bar-chart.module.scss.js';
import { useBarChartOptions } from './use-bar-chart-options.js';

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
const BarChartInternal = ({ data, chartId: providedChartId, width, height = 400, className, margin, withTooltips = false, showLegend = false, legendOrientation = 'horizontal', legendAlignmentHorizontal = 'center', legendAlignmentVertical = 'bottom', legendShape = 'rect', gridVisibility: gridVisibilityProp, renderTooltip, options = {}, orientation = 'vertical', withPatterns = false, }) => {
    const horizontal = orientation === 'horizontal';
    // Generate a unique chart ID to avoid pattern conflicts with multiple charts
    const internalChartId = useId();
    const chartId = useChartId(providedChartId);
    const theme = useXYChartTheme(data);
    const dataSorted = useChartDataTransform(data);
    const chartOptions = useBarChartOptions(dataSorted, horizontal, options);
    const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme, horizontal);
    const [legendRef, legendHeight] = useElementHeight();
    const chartRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(undefined);
    const [isNavigating, setIsNavigating] = useState(false);
    const totalPoints = Math.max(0, ...data.map(series => series.data?.length || 0)) * data.length;
    // Use the keyboard navigation hook
    const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = useKeyboardNavigation({
        selectedIndex,
        setSelectedIndex,
        isNavigating,
        setIsNavigating,
        chartRef,
        totalPoints,
    });
    const getColor = useCallback((seriesData, index) => seriesData?.options?.stroke || theme.colors[index % theme.colors.length], [theme]);
    const getBarBackground = useCallback((index) => () => withPatterns
        ? `url(#${getPatternId(internalChartId, index)})`
        : getColor(dataSorted[index], index), [withPatterns, getColor, dataSorted, internalChartId]);
    const renderDefaultTooltip = useCallback(({ tooltipData }) => {
        const nearestDatum = tooltipData?.nearestDatum?.datum;
        if (!nearestDatum)
            return null;
        return (jsxs("div", { className: styles['bar-chart__tooltip'], children: [jsx("div", { className: styles['bar-chart__tooltip-header'], children: tooltipData?.nearestDatum?.key }), jsxs("div", { className: styles['bar-chart__tooltip-row'], children: [jsxs("span", { className: styles['bar-chart__tooltip-label'], children: [chartOptions.tooltip.labelFormatter(nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0), 0, []), ":"] }), jsx("span", { className: styles['bar-chart__tooltip-value'], children: nearestDatum.value })] })] }));
    }, [chartOptions.tooltip]);
    const renderPattern = useCallback((index, color) => {
        const patternType = index % 4;
        const id = getPatternId(internalChartId, index);
        const commonProps = {
            id,
            stroke: 'white',
            strokeWidth: 1,
            background: color,
        };
        switch (patternType) {
            case 0:
            default:
                return (jsx(PatternLines, { ...commonProps, width: 5, height: 5, orientation: ['diagonal'] }, id));
            case 1:
                return (jsx(PatternCircles, { ...commonProps, width: 6, height: 6, fill: "white" }, id));
            case 2:
                return jsx(PatternWaves, { ...commonProps, width: 4, height: 4 }, id);
            case 3:
                return jsx(PatternHexagons, { ...commonProps, size: 8, height: 3 }, id);
        }
    }, [internalChartId]);
    const createPatternBorderStyle = useCallback((index, color) => {
        const patternId = getPatternId(internalChartId, index);
        return `
			.visx-bar[fill="url(#${patternId})"] {
				stroke: ${color};
				stroke-width: 1;
				}
			`;
    }, [internalChartId]);
    const createKeyboardHighlightStyle = useCallback(() => {
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
    // Create legend items (hooks must be called in same order every render)
    const legendItems = useMemo(() => dataSorted.map((group, index) => ({
        label: group.label, // Label for each unique group
        value: '', // Empty string since we don't want to show a specific value
        color: getColor(group, index),
        shapeStyle: group?.options?.legendShapeStyle,
    })), [dataSorted, getColor]);
    // Register chart with context only if data is valid
    const providerTheme = useChartTheme();
    useChartRegistration(chartId, legendItems, providerTheme, 'bar', isDataValid, {
        orientation,
        withPatterns,
    });
    if (error) {
        return jsx("div", { className: clsx('bar-chart', styles['bar-chart']), children: error });
    }
    const gridVisibility = gridVisibilityProp ?? chartOptions.gridVisibility;
    const highlightedBarStyle = createKeyboardHighlightStyle();
    return (jsxs("div", { className: clsx('bar-chart', styles['bar-chart'], className), "data-testid": "bar-chart", role: "grid", "aria-label": "bar chart", style: {
            width,
            height,
            display: 'flex',
            flexDirection: showLegend && legendAlignmentVertical === 'top' ? 'column-reverse' : 'column',
        }, tabIndex: 0, onKeyDown: onChartKeyDown, onFocus: onChartFocus, onBlur: onChartBlur, ref: chartRef, "data-chart-id": `bar-chart-${chartId}`, children: [jsxs(XYChart, { theme: theme, width: width, height: height - (showLegend ? legendHeight : 0), margin: {
                    ...defaultMargin,
                    ...margin,
                    ...(showLegend && legendAlignmentVertical === 'top'
                        ? { top: (defaultMargin.top || 0) + legendHeight }
                        : {}),
                }, xScale: chartOptions.xScale, yScale: chartOptions.yScale, horizontal: horizontal, pointerEventsDataKey: "nearest", children: [jsx(Grid, { columns: gridVisibility.includes('y'), rows: gridVisibility.includes('x'), numTicks: 4 }), withPatterns && (jsxs(Fragment, { children: [jsx("defs", { "data-testid": "bar-chart-patterns", children: dataSorted.map((seriesData, index) => renderPattern(index, getColor(seriesData, index))) }), jsx("style", { children: dataSorted.map((seriesData, index) => createPatternBorderStyle(index, getColor(seriesData, index))) })] })), highlightedBarStyle && jsx("style", { children: highlightedBarStyle }), jsx(BarGroup, { padding: chartOptions.barGroup.padding, children: dataSorted.map((seriesData, index) => (jsx(BarSeries, { dataKey: seriesData?.label, data: seriesData.data, yAccessor: chartOptions.accessors.yAccessor, xAccessor: chartOptions.accessors.xAccessor, colorAccessor: getBarBackground(index) }, seriesData?.label))) }), jsx(Axis, { ...chartOptions.axis.x }), jsx(Axis, { ...chartOptions.axis.y }), withTooltips && (jsx(AccessibleTooltip, { detectBounds: true, snapTooltipToDatumX: true, snapTooltipToDatumY: true, renderTooltip: renderTooltip || renderDefaultTooltip, selectedIndex: selectedIndex, tooltipRef: tooltipRef, keyboardFocusedClassName: styles['bar-chart__tooltip--keyboard-focused'], series: data, mode: "individual" }))] }), showLegend && (jsx(BaseLegend, { items: legendItems, orientation: legendOrientation, alignmentHorizontal: legendAlignmentHorizontal, alignmentVertical: legendAlignmentVertical, className: styles['bar-chart__legend'], shape: legendShape, ref: legendRef }))] }));
};
const BarChart = props => (jsx(ChartProvider, { children: jsx(BarChartInternal, { ...props }) }));
BarChart.displayName = 'BarChart';
var BarChart$1 = withResponsive(BarChart);

export { BarChart$1 as default };
