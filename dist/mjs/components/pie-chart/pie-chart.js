import { jsx, jsxs } from 'react/jsx-runtime';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import clsx from 'clsx';
import { useMemo } from 'react';
import useChartMouseHandler from '../../hooks/use-chart-mouse-handler.js';
import { ChartProvider } from '../../providers/chart-context/chart-context.js';
import { useChartId, useChartRegistration } from '../../providers/chart-context/utils.js';
import { useChartTheme } from '../../providers/theme/theme-provider.js';
import { defaultTheme } from '../../providers/theme/themes.js';
import { BaseLegend } from '../legend/base-legend.js';
import { useElementHeight } from '../shared/use-element-height.js';
import { withResponsive } from '../shared/with-responsive.js';
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
const PieChartInternal = ({ data, chartId: providedChartId, withTooltips = false, className, showLegend, legendOrientation, legendAlignmentHorizontal = 'center', legendAlignmentVertical = 'bottom', legendShape = 'circle', size, thickness = 1, padding = 20, gapScale = 0, cornerScale = 0, children = null, }) => {
    const providerTheme = useChartTheme();
    const chartId = useChartId(providedChartId);
    const [legendRef, legendHeight] = useElementHeight();
    const { onMouseMove, onMouseLeave, tooltipOpen, tooltipData, tooltipLeft, tooltipTop } = useChartMouseHandler({
        withTooltips,
    });
    const { isValid, message } = validateData(data);
    // Create legend items (hooks must be called in same order every render)
    const legendItems = useMemo(() => data.map((item, index) => ({
        label: item.label,
        value: item.value.toString(),
        color: providerTheme.colors[index % providerTheme.colors.length],
    })), [data, providerTheme.colors]);
    // Register chart with context only if data is valid
    useChartRegistration(chartId, legendItems, providerTheme, 'pie', isValid, {
        thickness,
        gapScale,
        cornerScale,
    });
    if (!isValid) {
        return (jsx("div", { className: clsx('pie-chart', styles['pie-chart'], className), children: jsx("div", { className: styles['error-message'], children: message }) }));
    }
    const width = size;
    const height = size;
    // Calculate radius based on width/height
    const radius = Math.min(width, height) / 2;
    // Center the chart in the available space, adjusting for legend position
    const centerX = width / 2;
    const legendOffset = showLegend && legendAlignmentVertical === 'top' ? legendHeight / 2 : 0;
    const centerY = height / 2 + legendOffset;
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
        fill: (d) => d?.color || providerTheme.colors[d.index],
    };
    return (jsxs("div", { className: clsx('pie-chart', styles['pie-chart'], className), style: {
            display: 'flex',
            flexDirection: showLegend && legendAlignmentVertical === 'top' ? 'column-reverse' : 'column',
        }, children: [jsx("svg", { viewBox: `0 0 ${size} ${size}`, preserveAspectRatio: "xMidYMid meet", width: size, height: size, children: jsxs(Group, { top: centerY, left: centerX, children: [jsx(Pie, { data: dataWithIndex, pieValue: accessors.value, outerRadius: outerRadius, innerRadius: innerRadius, padAngle: padAngle, cornerRadius: cornerRadius, children: pie => {
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
                                    return (jsxs("g", { children: [jsx("path", { ...pathProps }), hasSpaceForLabel && (jsx("text", { x: centroidX, y: centroidY, dy: ".33em", fill: providerTheme.labelBackgroundColor || defaultTheme.labelBackgroundColor, fontSize: 12, textAnchor: "middle", pointerEvents: "none", children: arc.data.label }))] }, `arc-${index}`));
                                });
                            } }), children] }) }), showLegend && (jsx(BaseLegend, { items: legendItems, orientation: legendOrientation, alignmentHorizontal: legendAlignmentHorizontal, alignmentVertical: legendAlignmentVertical, className: styles['pie-chart-legend'], shape: legendShape, ref: legendRef })), withTooltips && tooltipOpen && tooltipData && (jsx(BaseTooltip, { data: tooltipData, top: tooltipTop || 0, left: tooltipLeft || 0, style: {
                    transform: 'translate(-50%, -100%)',
                } }))] }));
};
const PieChart = (props) => (jsx(ChartProvider, { children: jsx(PieChartInternal, { ...props }) }));
PieChart.displayName = 'PieChart';
var pieChart = withResponsive(PieChart);

export { pieChart as default };
