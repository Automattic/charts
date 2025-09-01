'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var group = require('@visx/group');
var shape = require('@visx/shape');
var clsx = require('clsx');
var react = require('react');
require('fast-deep-equal');
var useChartMouseHandler = require('../../hooks/use-chart-mouse-handler.js');
require('@visx/xychart');
var globalChartsProvider = require('../../providers/chart-context/global-charts-provider.js');
var useGlobalChartsContext = require('../../providers/chart-context/hooks/use-global-charts-context.js');
var useChartId = require('../../providers/chart-context/hooks/use-chart-id.js');
var useChartRegistration = require('../../providers/chart-context/hooks/use-chart-registration.js');
var useGlobalChartsTheme = require('../../providers/chart-context/hooks/use-global-charts-theme.js');
var createComposition = require('../../utils/create-composition.js');
require('date-fns');
require('@automattic/number-formatters');
var text = require('@visx/text');
require('deepmerge');
require('@visx/scale');
var useElementHeight = require('../../hooks/use-element-height.js');
var legend = require('../legend/legend.js');
var useChartLegendItems = require('../legend/hooks/use-chart-legend-items.js');
var chartSvg = require('../private/chart-composition/chart-svg.js');
var chartHtml = require('../private/chart-composition/chart-html.js');
var useChartChildren = require('../private/chart-composition/use-chart-children.js');
var singleChartContext = require('../private/single-chart-context/single-chart-context.js');
var withResponsive = require('../private/with-responsive/with-responsive.js');
var baseTooltip = require('../tooltip/base-tooltip.js');
var pieChart_module = require('./pie-chart.module.scss.js');

/**
 * Validates the pie chart data
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
    // Validate total percentage
    const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);
    if (Math.abs(totalPercentage - 100) > 0.01) {
        // Using small epsilon for floating point comparison
        return { isValid: false, message: 'Invalid percentage total: Must equal 100' };
    }
    return { isValid: true, message: '' };
};
/**
 * Renders a pie or donut chart using the provided data.
 *
 * @param {PieChartProps} props - Component props
 * @return {JSX.Element} The rendered chart component
 */
const PieChartInternal = ({ data, chartId: providedChartId, withTooltips = false, className, showLegend = false, legendOrientation = 'horizontal', legendPosition = 'bottom', legendAlignment = 'center', legendShape = 'circle', size, thickness = 1, padding = 20, gapScale = 0, cornerScale = 0, children = null, }) => {
    const providerTheme = useGlobalChartsTheme.useGlobalChartsTheme();
    const chartId = useChartId.useChartId(providedChartId);
    const [legendRef, legendHeight] = useElementHeight.useElementHeight();
    const { onMouseMove, onMouseLeave, tooltipOpen, tooltipData, tooltipLeft, tooltipTop } = useChartMouseHandler.useChartMouseHandler({
        withTooltips,
    });
    // Memoize legend options to prevent unnecessary re-calculations
    const legendOptions = react.useMemo(() => ({ showValues: true }), []);
    // Create legend items using the reusable hook
    const legendItems = useChartLegendItems.useChartLegendItems(data, legendOptions);
    const { isValid, message } = validateData(data);
    // Process children to extract compound components
    const { svgChildren, htmlChildren, otherChildren } = useChartChildren.useChartChildren(children, 'PieChart');
    // Memoize metadata to prevent unnecessary re-registration
    const chartMetadata = react.useMemo(() => ({
        thickness,
        gapScale,
        cornerScale,
    }), [thickness, gapScale, cornerScale]);
    // Register chart with context only if data is valid
    useChartRegistration.useChartRegistration({
        chartId,
        legendItems,
        chartType: 'pie',
        isDataValid: isValid,
        metadata: chartMetadata,
    });
    const { resolveGroupColor } = useGlobalChartsContext.useGlobalChartsContext();
    if (!isValid) {
        return (jsxRuntime.jsx("div", { className: clsx('pie-chart', pieChart_module.default['pie-chart'], className), children: jsxRuntime.jsx("div", { className: pieChart_module.default['error-message'], children: message }) }));
    }
    const width = size;
    const height = size;
    const adjustedHeight = showLegend && legendPosition === 'top' ? height - legendHeight : height;
    // Calculate radius based on width/height
    const radius = Math.min(width, adjustedHeight) / 2;
    // Center the chart in the available space
    const centerX = width / 2;
    const centerY = adjustedHeight / 2;
    // Calculate the angle between each
    const padAngle = gapScale * ((2 * Math.PI) / data.length);
    const outerRadius = radius - padding;
    const innerRadius = thickness === 0 ? 0 : outerRadius * (1 - thickness);
    const maxCornerRadius = (outerRadius - innerRadius) / 2;
    const cornerRadius = cornerScale ? Math.min(cornerScale * outerRadius, maxCornerRadius) : 0;
    // Map the data to include index for color assignment
    const dataWithIndex = data.map((d, index) => ({
        ...d,
        index,
    }));
    const accessors = {
        value: (d) => d.value,
        // Use the color property from the data object as a last resort. The theme provides colours by default.
        fill: ({ group, index, color: overrideColor }) => resolveGroupColor({ group, index, overrideColor }),
    };
    return (jsxRuntime.jsx(singleChartContext.SingleChartContext.Provider, { value: {
            chartId,
            chartWidth: width,
            chartHeight: adjustedHeight,
        }, children: jsxRuntime.jsxs("div", { className: clsx('pie-chart', pieChart_module.default['pie-chart'], className), style: {
                display: 'flex',
                flexDirection: showLegend && legendPosition === 'top' ? 'column-reverse' : 'column',
            }, children: [jsxRuntime.jsx("svg", { viewBox: `0 0 ${width} ${adjustedHeight}`, preserveAspectRatio: "xMidYMid meet", width: width, height: adjustedHeight, children: jsxRuntime.jsxs(group.Group, { top: centerY, left: centerX, children: [jsxRuntime.jsx(shape.Pie, { data: dataWithIndex, pieValue: accessors.value, outerRadius: outerRadius, innerRadius: innerRadius, padAngle: padAngle, cornerRadius: cornerRadius, children: pie => {
                                    return pie.arcs.map((arc, index) => {
                                        const [centroidX, centroidY] = pie.path.centroid(arc);
                                        const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.25;
                                        const handleMouseMove = (event) => onMouseMove(event, arc.data);
                                        const pathProps = {
                                            d: pie.path(arc) || '',
                                            fill: accessors.fill(arc.data),
                                        };
                                        if (withTooltips) {
                                            pathProps.onMouseMove = handleMouseMove;
                                            pathProps.onMouseLeave = onMouseLeave;
                                        }
                                        // Estimate text width more accurately for background sizing
                                        const fontSize = 12;
                                        const estimatedTextWidth = text.getStringWidth(arc.data.label, { fontSize });
                                        const labelPadding = 6;
                                        const backgroundWidth = estimatedTextWidth + labelPadding * 2;
                                        const backgroundHeight = fontSize + labelPadding * 2;
                                        return (jsxRuntime.jsxs("g", { children: [jsxRuntime.jsx("path", { ...pathProps }), hasSpaceForLabel && (jsxRuntime.jsxs("g", { children: [providerTheme.labelBackgroundColor && (jsxRuntime.jsx("rect", { x: centroidX - backgroundWidth / 2, y: centroidY - backgroundHeight / 2, width: backgroundWidth, height: backgroundHeight, fill: providerTheme.labelBackgroundColor, rx: 4, ry: 4, pointerEvents: "none" })), jsxRuntime.jsx("text", { x: centroidX, y: centroidY, dy: ".33em", fill: providerTheme.labelTextColor || '#333', fontSize: fontSize, textAnchor: "middle", pointerEvents: "none", children: arc.data.label })] }))] }, `arc-${index}`));
                                    });
                                } }), svgChildren] }) }), showLegend && (jsxRuntime.jsx(legend.Legend, { orientation: legendOrientation, position: legendPosition, alignment: legendAlignment, className: pieChart_module.default['pie-chart-legend'], shape: legendShape, ref: legendRef, chartId: chartId })), withTooltips && tooltipOpen && tooltipData && (jsxRuntime.jsx(baseTooltip.BaseTooltip, { data: tooltipData, top: tooltipTop || 0, left: tooltipLeft || 0, style: {
                        transform: 'translate(-50%, -100%)',
                    } })), htmlChildren, otherChildren] }) }));
};
const PieChartWithProvider = props => {
    const existingContext = react.useContext(globalChartsProvider.GlobalChartsContext);
    // If we're already in a GlobalChartsProvider context, don't create a new one
    if (existingContext) {
        return jsxRuntime.jsx(PieChartInternal, { ...props });
    }
    // Otherwise, create our own GlobalChartsProvider
    return (jsxRuntime.jsx(globalChartsProvider.GlobalChartsProvider, { children: jsxRuntime.jsx(PieChartInternal, { ...props }) }));
};
PieChartWithProvider.displayName = 'PieChart';
// Create PieChart with composition API
const PieChart = createComposition.attachSubComponents(PieChartWithProvider, {
    Legend: legend.Legend,
    SVG: chartSvg.ChartSVG,
    HTML: chartHtml.ChartHTML,
});
// Create responsive PieChart with composition API
const PieChartResponsive = createComposition.attachSubComponents(withResponsive.withResponsive(PieChartWithProvider), {
    Legend: legend.Legend,
    SVG: chartSvg.ChartSVG,
    HTML: chartHtml.ChartHTML,
});

exports.PieChartUnresponsive = PieChart;
exports.default = PieChartResponsive;
