'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var event = require('@visx/event');
var group = require('@visx/group');
var shape = require('@visx/shape');
var text = require('@visx/text');
var tooltip = require('@visx/tooltip');
var clsx = require('clsx');
var react = require('react');
var chartContext = require('../../providers/chart-context/chart-context.js');
var utils = require('../../providers/chart-context/utils.js');
var themeProvider = require('../../providers/theme/theme-provider.js');
var legend = require('../legend/legend.js');
require('../legend/base-legend.js');
var useElementHeight = require('../shared/use-element-height.js');
var withResponsive = require('../shared/with-responsive.js');
var baseTooltip = require('../tooltip/base-tooltip.js');
var pieSemiCircleChart_module = require('./pie-semi-circle-chart.module.scss.js');

/**
 * Validates the semi-circle pie chart data
 * @param data - The data to validate
 * @return Object containing validation result and error message
 */
const validateData = (data) => {
    if (!data.length) {
        return { isValid: false, message: 'No data available' };
    }
    // Check for negative values
    const hasNegativeValues = data.some(item => item.percentage < 0 || item.value < 0);
    if (hasNegativeValues) {
        return { isValid: false, message: 'Invalid data: Negative values are not allowed' };
    }
    // Validate total percentage is greater than 0
    const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);
    if (totalPercentage <= 0) {
        return { isValid: false, message: 'Invalid percentage total: Must be greater than 0' };
    }
    return { isValid: true, message: '' };
};
const PieSemiCircleChartInternal = ({ data, chartId: providedChartId, width = 400, thickness = 0.4, clockwise = true, withTooltips = false, showLegend = false, legendOrientation = 'horizontal', legendAlignmentHorizontal = 'center', legendAlignmentVertical = 'bottom', legendShape = 'circle', label, note, className, }) => {
    const providerTheme = themeProvider.useChartTheme();
    const chartId = utils.useChartId(providedChartId);
    const [legendRef, legendHeight] = useElementHeight.useElementHeight();
    const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = tooltip.useTooltip();
    const handleMouseMove = react.useCallback((event$1, arc) => {
        const coords = event.localPoint(event$1);
        if (!coords)
            return;
        showTooltip({
            tooltipData: arc.data,
            tooltipLeft: coords.x,
            tooltipTop: coords.y - 10,
        });
    }, [showTooltip]);
    const handleMouseLeave = react.useCallback(() => {
        hideTooltip();
    }, [hideTooltip]);
    const handleArcMouseMove = react.useCallback((arc) => (event) => {
        handleMouseMove(event, arc);
    }, [handleMouseMove]);
    // Validate data first to get validation result
    const { isValid, message } = validateData(data);
    // Define accessors with useMemo to avoid changing dependencies
    const accessors = react.useMemo(() => ({
        value: (d) => d.value,
        sort: (a, b) => b.value - a.value,
        // Use the color property from the data object as a last resort. The theme provides colours by default.
        fill: (d) => d.color || providerTheme.colors[d.index % providerTheme.colors.length],
    }), [providerTheme.colors]);
    // Create legend items with color from accessors (which respects item.color)
    const legendItems = react.useMemo(() => data.map((item, index) => ({
        label: item.label,
        value: item.valueDisplay || item.value.toString(),
        color: accessors.fill({ ...item, index }),
    })), [data, accessors]);
    // Memoize metadata to prevent unnecessary re-registration
    const chartMetadata = react.useMemo(() => ({
        thickness,
        clockwise,
    }), [thickness, clockwise]);
    // Register chart with context only if data is valid
    utils.useChartRegistration(chartId, legendItems, providerTheme, 'pie-semi-circle', isValid, chartMetadata);
    if (!isValid) {
        return (jsxRuntime.jsx("div", { className: pieSemiCircleChart_module.default['pie-semi-circle-chart'], children: jsxRuntime.jsx("svg", { width: width, height: width / 2, "data-testid": "pie-chart-svg", children: jsxRuntime.jsx("text", { x: "50%", y: "50%", textAnchor: "middle", className: pieSemiCircleChart_module.default.error, children: message }) }) }));
    }
    const height = width / 2;
    const pad = 0.03;
    // Use padding for the overall chart dimensions
    const chartWidth = width - pad * 2;
    const chartHeight = height - pad;
    const radius = Math.min(chartWidth, chartHeight * 2) / 2;
    const innerRadius = radius * (1 - thickness + pad);
    // Map the data to include index for color assignment
    const dataWithIndex = data.map((d, index) => ({
        ...d,
        index,
    }));
    // Set the clockwise direction based on the prop
    const startAngle = clockwise ? -Math.PI / 2 : Math.PI / 2;
    const endAngle = clockwise ? Math.PI / 2 : -Math.PI / 2;
    return (jsxRuntime.jsxs("div", { className: clsx('pie-semi-circle-chart', pieSemiCircleChart_module.default['pie-semi-circle-chart'], className), "data-testid": "pie-chart-container", style: {
            display: 'flex',
            flexDirection: showLegend && legendAlignmentVertical === 'top' ? 'column-reverse' : 'column',
        }, children: [jsxRuntime.jsx("svg", { width: width, height: height + (showLegend && legendAlignmentVertical === 'top' ? legendHeight + 20 : 0), viewBox: `0 0 ${width} ${height + (showLegend && legendAlignmentVertical === 'top' ? legendHeight + 20 : 0)}`, "data-testid": "pie-chart-svg", children: jsxRuntime.jsxs(group.Group, { top: radius + (showLegend && legendAlignmentVertical === 'top' ? legendHeight + 20 : 0), left: radius, children: [jsxRuntime.jsx(shape.Pie, { data: dataWithIndex, pieValue: accessors.value, outerRadius: radius, innerRadius: innerRadius, cornerRadius: 3, padAngle: pad, startAngle: startAngle, endAngle: endAngle, pieSort: accessors.sort, children: pie => {
                                return pie.arcs.map(arc => (jsxRuntime.jsx("g", { onMouseMove: handleArcMouseMove(arc), onMouseLeave: handleMouseLeave, children: jsxRuntime.jsx("path", { d: pie.path(arc) || '', fill: accessors.fill(arc.data), "data-testid": "pie-segment" }) }, arc.data.label)));
                            } }), jsxRuntime.jsxs(group.Group, { children: [jsxRuntime.jsx(text.Text, { textAnchor: "middle", verticalAnchor: "start", y: -40, className: pieSemiCircleChart_module.default.label, children: label }), jsxRuntime.jsx(text.Text, { textAnchor: "middle", verticalAnchor: "start", y: -20, className: pieSemiCircleChart_module.default.note, children: note })] })] }) }), withTooltips && tooltipOpen && tooltipData && (jsxRuntime.jsx(baseTooltip.BaseTooltip, { data: {
                    label: tooltipData.label,
                    value: tooltipData.value,
                    valueDisplay: tooltipData.valueDisplay,
                }, top: tooltipTop || 0, left: tooltipLeft || 0 })), showLegend && (jsxRuntime.jsx(legend.Legend, { items: legendItems, orientation: legendOrientation, alignmentHorizontal: legendAlignmentHorizontal, alignmentVertical: legendAlignmentVertical, className: pieSemiCircleChart_module.default['pie-semi-circle-chart-legend'], shape: legendShape, ref: legendRef, chartId: chartId }))] }));
};
const PieSemiCircleChart = props => (jsxRuntime.jsx(chartContext.ChartProvider, { children: jsxRuntime.jsx(PieSemiCircleChartInternal, { ...props }) }));
PieSemiCircleChart.displayName = 'PieSemiCircleChart';
var pieSemiCircleChart = withResponsive.withResponsive(PieSemiCircleChart);

exports.default = pieSemiCircleChart;
