import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { PatternHexagons, PatternWaves, PatternCircles, PatternLines } from '@visx/pattern';
import { XYChart, Grid, BarGroup, BarSeries, Axis } from '@visx/xychart';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { useContext, useRef, useState, useCallback, useMemo } from 'react';
import 'fast-deep-equal';
import { useGlobalChartTheme } from '../../hooks/use-global-chart-theme.js';
import '@visx/event';
import '@visx/tooltip';
import { useXYChartTheme } from '../../hooks/use-xychart-theme.js';
import { GlobalChartsContext, GlobalChartsProvider } from '../../providers/chart-context/global-charts-provider.js';
import { useChartId, useChartRegistration } from '../../providers/chart-context/utils.js';
import { attachSubComponents } from '../../utils/create-composition.js';
import { Legend } from '../legend/legend.js';
import '../legend/base-legend.js';
import { useChartLegendData } from '../legend/use-chart-legend-data.js';
import { SingleChartContext } from '../shared/single-chart-context.js';
import { useChartDataTransform } from '../shared/use-chart-data-transform.js';
import { useChartMargin } from '../shared/use-chart-margin.js';
import { useElementHeight } from '../shared/use-element-height.js';
import { useZeroValueDisplay } from '../shared/use-zero-value-display.js';
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
const BarChartInternal = ({ data, chartId: providedChartId, width, height = 400, className, margin, withTooltips = false, showLegend = false, legendOrientation = 'horizontal', legendPosition = 'bottom', legendAlignment = 'center', legendShape = 'rect', gridVisibility: gridVisibilityProp, renderTooltip, options = {}, orientation = 'vertical', withPatterns = false, showZeroValues = false, children, }) => {
    const horizontal = orientation === 'horizontal';
    const chartId = useChartId(providedChartId);
    const providerTheme = useGlobalChartTheme();
    const theme = useXYChartTheme(data);
    const dataSorted = useChartDataTransform(data);
    // Transform data to add a small value for zero bars to make them visible
    const dataWithVisibleZeros = useZeroValueDisplay(dataSorted, {
        enabled: showZeroValues,
    });
    // Create legend items using the reusable hook
    const legendItems = useChartLegendData(dataSorted);
    const chartOptions = useBarChartOptions(dataWithVisibleZeros, horizontal, options);
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
    const getColor = useCallback((seriesData, index) => seriesData?.options?.stroke || providerTheme.colors[index % providerTheme.colors.length], [providerTheme]);
    const getBarBackground = useCallback((index) => () => withPatterns
        ? `url(#${getPatternId(chartId, index)})`
        : getColor(dataSorted[index], index), [withPatterns, getColor, dataSorted, chartId]);
    const renderDefaultTooltip = useCallback(({ tooltipData }) => {
        const nearestDatum = tooltipData?.nearestDatum?.datum;
        if (!nearestDatum)
            return null;
        return (jsxs("div", { className: styles['bar-chart__tooltip'], children: [jsx("div", { className: styles['bar-chart__tooltip-header'], children: tooltipData?.nearestDatum?.key }), jsxs("div", { className: styles['bar-chart__tooltip-row'], children: [jsxs("span", { className: styles['bar-chart__tooltip-label'], children: [chartOptions.tooltip.labelFormatter(nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0), 0, []), ":"] }), jsx("span", { className: styles['bar-chart__tooltip-value'], children: nearestDatum.value })] })] }));
    }, [chartOptions.tooltip]);
    const renderPattern = useCallback((index, color) => {
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
                return (jsx(PatternLines, { ...commonProps, width: 5, height: 5, orientation: ['diagonal'] }, id));
            case 1:
                return (jsx(PatternCircles, { ...commonProps, width: 6, height: 6, fill: "white" }, id));
            case 2:
                return jsx(PatternWaves, { ...commonProps, width: 4, height: 4 }, id);
            case 3:
                return jsx(PatternHexagons, { ...commonProps, size: 8, height: 3 }, id);
        }
    }, [chartId]);
    const createPatternBorderStyle = useCallback((index, color) => {
        const patternId = getPatternId(chartId, index);
        return `
			.visx-bar[fill="url(#${patternId})"] {
				stroke: ${color};
				stroke-width: 1;
				}
			`;
    }, [chartId]);
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
    // Memoize metadata to prevent unnecessary re-registration
    const chartMetadata = useMemo(() => ({
        orientation,
        withPatterns,
    }), [orientation, withPatterns]);
    // Register chart with context only if data is valid
    useChartRegistration({
        chartId,
        legendItems,
        chartType: 'bar',
        isDataValid,
        metadata: chartMetadata,
    });
    if (error) {
        return jsx("div", { className: clsx('bar-chart', styles['bar-chart']), children: error });
    }
    const gridVisibility = gridVisibilityProp ?? chartOptions.gridVisibility;
    const highlightedBarStyle = createKeyboardHighlightStyle();
    return (jsx(SingleChartContext.Provider, { value: {
            chartId,
            chartWidth: width,
            chartHeight: height - (showLegend ? legendHeight : 0),
        }, children: jsxs("div", { className: clsx('bar-chart', styles['bar-chart'], className), "data-testid": "bar-chart", role: "grid", "aria-label": __('Bar chart', 'jetpack-charts'), style: {
                width,
                height,
                display: 'flex',
                flexDirection: showLegend && legendPosition === 'top' ? 'column-reverse' : 'column',
            }, tabIndex: 0, onKeyDown: onChartKeyDown, onFocus: onChartFocus, onBlur: onChartBlur, ref: chartRef, "data-chart-id": `bar-chart-${chartId}`, children: [jsxs(XYChart, { theme: theme, width: width, height: height - (showLegend ? legendHeight : 0), margin: {
                        ...defaultMargin,
                        ...margin,
                        ...(showLegend && legendPosition === 'top'
                            ? { top: (defaultMargin.top || 0) + legendHeight }
                            : {}),
                    }, xScale: chartOptions.xScale, yScale: chartOptions.yScale, horizontal: horizontal, pointerEventsDataKey: "nearest", children: [jsx(Grid, { columns: gridVisibility.includes('y'), rows: gridVisibility.includes('x'), numTicks: 4 }), withPatterns && (jsxs(Fragment, { children: [jsx("defs", { "data-testid": "bar-chart-patterns", children: dataSorted.map((seriesData, index) => renderPattern(index, getColor(seriesData, index))) }), jsx("style", { children: dataSorted.map((seriesData, index) => createPatternBorderStyle(index, getColor(seriesData, index))) })] })), highlightedBarStyle && jsx("style", { children: highlightedBarStyle }), jsx(BarGroup, { padding: chartOptions.barGroup.padding, children: dataWithVisibleZeros.map((seriesData, index) => (jsx(BarSeries, { dataKey: seriesData?.label, data: seriesData.data, yAccessor: chartOptions.accessors.yAccessor, xAccessor: chartOptions.accessors.xAccessor, colorAccessor: getBarBackground(index) }, seriesData?.label))) }), jsx(Axis, { ...chartOptions.axis.x }), jsx(Axis, { ...chartOptions.axis.y }), withTooltips && (jsx(AccessibleTooltip, { detectBounds: true, snapTooltipToDatumX: true, snapTooltipToDatumY: true, renderTooltip: renderTooltip || renderDefaultTooltip, selectedIndex: selectedIndex, tooltipRef: tooltipRef, keyboardFocusedClassName: styles['bar-chart__tooltip--keyboard-focused'], series: data, mode: "individual" }))] }), showLegend && (jsx(Legend, { items: legendItems, orientation: legendOrientation, position: legendPosition, alignment: legendAlignment, className: styles['bar-chart__legend'], shape: legendShape, ref: legendRef, chartId: chartId })), children] }) }));
};
const BarChartWithProvider = props => {
    const existingContext = useContext(GlobalChartsContext);
    // If we're already in a GlobalChartsProvider context, don't create a new one
    if (existingContext) {
        return jsx(BarChartInternal, { ...props });
    }
    // Otherwise, create our own GlobalChartsProvider
    return (jsx(GlobalChartsProvider, { children: jsx(BarChartInternal, { ...props }) }));
};
BarChartWithProvider.displayName = 'BarChart';
// Create BarChart with composition API
attachSubComponents(BarChartWithProvider, {
    Legend: Legend,
});
// Create responsive BarChart with composition API
const BarChartResponsive = attachSubComponents(withResponsive(BarChartWithProvider), {
    Legend: Legend,
});

export { BarChartResponsive as default };
