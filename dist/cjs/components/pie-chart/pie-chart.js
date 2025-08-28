'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var group = require('@visx/group');
var shape = require('@visx/shape');
var clsx = require('clsx');
var react = require('react');
require('fast-deep-equal');
var useGlobalChartTheme = require('../../hooks/use-global-chart-theme.js');
var useChartMouseHandler = require('../../hooks/use-chart-mouse-handler.js');
require('@visx/xychart');
var globalChartsProvider = require('../../providers/chart-context/global-charts-provider.js');
var utils = require('../../providers/chart-context/utils.js');
var createComposition = require('../../utils/create-composition.js');
var legend = require('../legend/legend.js');
require('../legend/base-legend.js');
var useChartLegendData = require('../legend/use-chart-legend-data.js');
var chartSvg = require('../shared/chart-composition/chart-svg.js');
var chartHtml = require('../shared/chart-composition/chart-html.js');
var useChartChildren = require('../shared/chart-composition/use-chart-children.js');
var singleChartContext = require('../shared/single-chart-context.js');
var useElementHeight = require('../shared/use-element-height.js');
var withResponsive = require('../shared/with-responsive.js');
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
    const providerTheme = useGlobalChartTheme.useGlobalChartTheme();
    const chartId = utils.useChartId(providedChartId);
    const [legendRef, legendHeight] = useElementHeight.useElementHeight();
    const { onMouseMove, onMouseLeave, tooltipOpen, tooltipData, tooltipLeft, tooltipTop } = useChartMouseHandler.useChartMouseHandler({
        withTooltips,
    });
    // Memoize legend options to prevent unnecessary re-calculations
    const legendOptions = react.useMemo(() => ({ showValues: true }), []);
    // Create legend items using the reusable hook
    const legendItems = useChartLegendData.useChartLegendData(data, legendOptions);
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
    utils.useChartRegistration({
        chartId,
        legendItems,
        chartType: 'pie',
        isDataValid: isValid,
        metadata: chartMetadata,
    });
    const { resolveGroupColor } = globalChartsProvider.useGlobalChartsContext();
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
                                        return (jsxRuntime.jsxs("g", { children: [jsxRuntime.jsx("path", { ...pathProps }), hasSpaceForLabel && (jsxRuntime.jsx("text", { x: centroidX, y: centroidY, dy: ".33em", fill: providerTheme.labelBackgroundColor || '#333', fontSize: 12, textAnchor: "middle", pointerEvents: "none", children: arc.data.label }))] }, `arc-${index}`));
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
