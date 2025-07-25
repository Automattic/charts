import { jsx, jsxs } from 'react/jsx-runtime';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { Text } from '@visx/text';
import { useTooltip } from '@visx/tooltip';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { ChartProvider } from '../../providers/chart-context/chart-context.js';
import { useChartId, useChartRegistration } from '../../providers/chart-context/utils.js';
import { useChartTheme } from '../../providers/theme/theme-provider.js';
import { BaseLegend } from '../legend/base-legend.js';
import { useElementHeight } from '../shared/use-element-height.js';
import { withResponsive } from '../shared/with-responsive.js';
import { BaseTooltip } from '../tooltip/base-tooltip.js';
import styles from './pie-semi-circle-chart.module.scss.js';

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
    const providerTheme = useChartTheme();
    const chartId = useChartId(providedChartId);
    const [legendRef, legendHeight] = useElementHeight();
    const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
    const handleMouseMove = useCallback((event, arc) => {
        const coords = localPoint(event);
        if (!coords)
            return;
        showTooltip({
            tooltipData: arc.data,
            tooltipLeft: coords.x,
            tooltipTop: coords.y - 10,
        });
    }, [showTooltip]);
    const handleMouseLeave = useCallback(() => {
        hideTooltip();
    }, [hideTooltip]);
    const handleArcMouseMove = useCallback((arc) => (event) => {
        handleMouseMove(event, arc);
    }, [handleMouseMove]);
    // Validate data first to get validation result
    const { isValid, message } = validateData(data);
    // Define accessors with useMemo to avoid changing dependencies
    const accessors = useMemo(() => ({
        value: (d) => d.value,
        sort: (a, b) => b.value - a.value,
        // Use the color property from the data object as a last resort. The theme provides colours by default.
        fill: (d) => d.color || providerTheme.colors[d.index % providerTheme.colors.length],
    }), [providerTheme.colors]);
    // Create legend items (hooks must be called in same order every render)
    const legendItems = useMemo(() => data.map((item, index) => ({
        label: item.label,
        value: item.valueDisplay || item.value.toString(),
        color: accessors.fill({ ...item, index }),
    })), [data, accessors]);
    // Register chart with context only if data is valid
    useChartRegistration(chartId, legendItems, providerTheme, 'pie-semi-circle', isValid, {
        thickness,
        clockwise,
    });
    if (!isValid) {
        return (jsx("div", { className: styles['pie-semi-circle-chart'], children: jsx("svg", { width: width, height: width / 2, "data-testid": "pie-chart-svg", children: jsx("text", { x: "50%", y: "50%", textAnchor: "middle", className: styles.error, children: message }) }) }));
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
    return (jsxs("div", { className: clsx('pie-semi-circle-chart', styles['pie-semi-circle-chart'], className), "data-testid": "pie-chart-container", style: {
            display: 'flex',
            flexDirection: showLegend && legendAlignmentVertical === 'top' ? 'column-reverse' : 'column',
        }, children: [jsx("svg", { width: width, height: height + (showLegend && legendAlignmentVertical === 'top' ? legendHeight + 20 : 0), viewBox: `0 0 ${width} ${height + (showLegend && legendAlignmentVertical === 'top' ? legendHeight + 20 : 0)}`, "data-testid": "pie-chart-svg", children: jsxs(Group, { top: radius + (showLegend && legendAlignmentVertical === 'top' ? legendHeight + 20 : 0), left: radius, children: [jsx(Pie, { data: dataWithIndex, pieValue: accessors.value, outerRadius: radius, innerRadius: innerRadius, cornerRadius: 3, padAngle: pad, startAngle: startAngle, endAngle: endAngle, pieSort: accessors.sort, children: pie => {
                                return pie.arcs.map(arc => (jsx("g", { onMouseMove: handleArcMouseMove(arc), onMouseLeave: handleMouseLeave, children: jsx("path", { d: pie.path(arc) || '', fill: accessors.fill(arc.data), "data-testid": "pie-segment" }) }, arc.data.label)));
                            } }), jsxs(Group, { children: [jsx(Text, { textAnchor: "middle", verticalAnchor: "start", y: -40, className: styles.label, children: label }), jsx(Text, { textAnchor: "middle", verticalAnchor: "start", y: -20, className: styles.note, children: note })] })] }) }), withTooltips && tooltipOpen && tooltipData && (jsx(BaseTooltip, { data: {
                    label: tooltipData.label,
                    value: tooltipData.value,
                    valueDisplay: tooltipData.valueDisplay,
                }, top: tooltipTop || 0, left: tooltipLeft || 0 })), showLegend && (jsx(BaseLegend, { items: legendItems, orientation: legendOrientation, alignmentHorizontal: legendAlignmentHorizontal, alignmentVertical: legendAlignmentVertical, className: styles['pie-semi-circle-chart-legend'], shape: legendShape, ref: legendRef }))] }));
};
const PieSemiCircleChart = props => (jsx(ChartProvider, { children: jsx(PieSemiCircleChartInternal, { ...props }) }));
PieSemiCircleChart.displayName = 'PieSemiCircleChart';
var pieSemiCircleChart = withResponsive(PieSemiCircleChart);

export { pieSemiCircleChart as default };
