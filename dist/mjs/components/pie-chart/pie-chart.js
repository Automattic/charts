import { jsx, jsxs } from 'react/jsx-runtime';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import 'fast-deep-equal';
import { useChartMouseHandler } from '../../hooks/use-chart-mouse-handler.js';
import '@visx/xychart';
import { GlobalChartsContext, GlobalChartsProvider } from '../../providers/chart-context/global-charts-provider.js';
import { useGlobalChartsContext } from '../../providers/chart-context/hooks/use-global-charts-context.js';
import { useChartId } from '../../providers/chart-context/hooks/use-chart-id.js';
import { useChartRegistration } from '../../providers/chart-context/hooks/use-chart-registration.js';
import { useGlobalChartsTheme } from '../../providers/chart-context/hooks/use-global-charts-theme.js';
import { attachSubComponents } from '../../utils/create-composition.js';
import 'date-fns';
import '@automattic/number-formatters';
import { getStringWidth } from '@visx/text';
import 'deepmerge';
import '@visx/scale';
import { useElementHeight } from '../../hooks/use-element-height.js';
import { Legend } from '../legend/legend.js';
import { useChartLegendItems } from '../legend/hooks/use-chart-legend-items.js';
import { ChartSVG } from '../private/chart-composition/chart-svg.js';
import { ChartHTML } from '../private/chart-composition/chart-html.js';
import { useChartChildren } from '../private/chart-composition/use-chart-children.js';
import { SingleChartContext } from '../private/single-chart-context/single-chart-context.js';
import { withResponsive } from '../private/with-responsive/with-responsive.js';
import { BaseTooltip } from '../tooltip/base-tooltip.js';
import styles from './pie-chart.module.scss.js';

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
const PieChartInternal = ({ data, chartId: providedChartId, withTooltips = false, className, showLegend = false, legendOrientation = 'horizontal', legendPosition = 'bottom', legendAlignment = 'center', legendShape = 'circle', size, thickness = 1, padding = 20, gapScale = 0, cornerScale = 0, showLabels = true, children = null, }) => {
    const providerTheme = useGlobalChartsTheme();
    const chartId = useChartId(providedChartId);
    const [legendRef, legendHeight] = useElementHeight();
    const { onMouseMove, onMouseLeave, tooltipOpen, tooltipData, tooltipLeft, tooltipTop } = useChartMouseHandler({
        withTooltips,
    });
    // Memoize legend options to prevent unnecessary re-calculations
    const legendOptions = useMemo(() => ({ showValues: true }), []);
    // Create legend items using the reusable hook
    const legendItems = useChartLegendItems(data, legendOptions);
    const { isValid, message } = validateData(data);
    // Process children to extract compound components
    const { svgChildren, htmlChildren, otherChildren } = useChartChildren(children, 'PieChart');
    // Memoize metadata to prevent unnecessary re-registration
    const chartMetadata = useMemo(() => ({
        thickness,
        gapScale,
        cornerScale,
    }), [thickness, gapScale, cornerScale]);
    // Register chart with context only if data is valid
    useChartRegistration({
        chartId,
        legendItems,
        chartType: 'pie',
        isDataValid: isValid,
        metadata: chartMetadata,
    });
    const { resolveGroupColor } = useGlobalChartsContext();
    if (!isValid) {
        return (jsx("div", { className: clsx('pie-chart', styles['pie-chart'], className), children: jsx("div", { className: styles['error-message'], children: message }) }));
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
    return (jsx(SingleChartContext.Provider, { value: {
            chartId,
            chartWidth: width,
            chartHeight: adjustedHeight,
        }, children: jsxs("div", { className: clsx('pie-chart', styles['pie-chart'], className), style: {
                display: 'flex',
                flexDirection: showLegend && legendPosition === 'top' ? 'column-reverse' : 'column',
            }, children: [jsx("svg", { viewBox: `0 0 ${width} ${adjustedHeight}`, preserveAspectRatio: "xMidYMid meet", width: width, height: adjustedHeight, children: jsxs(Group, { top: centerY, left: centerX, children: [jsx(Pie, { data: dataWithIndex, pieValue: accessors.value, outerRadius: outerRadius, innerRadius: innerRadius, padAngle: padAngle, cornerRadius: cornerRadius, children: pie => {
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
                                        const estimatedTextWidth = getStringWidth(arc.data.label, { fontSize });
                                        const labelPadding = 6;
                                        const backgroundWidth = estimatedTextWidth + labelPadding * 2;
                                        const backgroundHeight = fontSize + labelPadding * 2;
                                        return (jsxs("g", { children: [jsx("path", { ...pathProps }), showLabels && hasSpaceForLabel && (jsxs("g", { children: [providerTheme.labelBackgroundColor && (jsx("rect", { x: centroidX - backgroundWidth / 2, y: centroidY - backgroundHeight / 2, width: backgroundWidth, height: backgroundHeight, fill: providerTheme.labelBackgroundColor, rx: 4, ry: 4, pointerEvents: "none" })), jsx("text", { x: centroidX, y: centroidY, dy: ".33em", fill: providerTheme.labelTextColor || '#333', fontSize: fontSize, textAnchor: "middle", pointerEvents: "none", children: arc.data.label })] }))] }, `arc-${index}`));
                                    });
                                } }), svgChildren] }) }), showLegend && (jsx(Legend, { orientation: legendOrientation, position: legendPosition, alignment: legendAlignment, className: styles['pie-chart-legend'], shape: legendShape, ref: legendRef, chartId: chartId })), withTooltips && tooltipOpen && tooltipData && (jsx(BaseTooltip, { data: tooltipData, top: tooltipTop || 0, left: tooltipLeft || 0, style: {
                        transform: 'translate(-50%, -100%)',
                    } })), htmlChildren, otherChildren] }) }));
};
const PieChartWithProvider = props => {
    const existingContext = useContext(GlobalChartsContext);
    // If we're already in a GlobalChartsProvider context, don't create a new one
    if (existingContext) {
        return jsx(PieChartInternal, { ...props });
    }
    // Otherwise, create our own GlobalChartsProvider
    return (jsx(GlobalChartsProvider, { children: jsx(PieChartInternal, { ...props }) }));
};
PieChartWithProvider.displayName = 'PieChart';
// Create PieChart with composition API
const PieChart = attachSubComponents(PieChartWithProvider, {
    Legend: Legend,
    SVG: ChartSVG,
    HTML: ChartHTML,
});
// Create responsive PieChart with composition API
const PieChartResponsive = attachSubComponents(withResponsive(PieChartWithProvider), {
    Legend: Legend,
    SVG: ChartSVG,
    HTML: ChartHTML,
});

export { PieChart as PieChartUnresponsive, PieChartResponsive as default };
