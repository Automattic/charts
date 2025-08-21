import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { Text } from '@visx/text';
import { useTooltip } from '@visx/tooltip';
import clsx from 'clsx';
import { useContext, useCallback, useMemo, Children, isValidElement } from 'react';
import 'fast-deep-equal';
import { useGlobalChartTheme } from '../../hooks/use-global-chart-theme.js';
import '@visx/xychart';
import { GlobalChartsContext, GlobalChartsProvider } from '../../providers/chart-context/global-charts-provider.js';
import { useChartId, useChartRegistration } from '../../providers/chart-context/utils.js';
import { attachSubComponents } from '../../utils/create-composition.js';
import { Legend } from '../legend/legend.js';
import '../legend/base-legend.js';
import { useChartLegendData } from '../legend/use-chart-legend-data.js';
import { SingleChartContext } from '../shared/single-chart-context.js';
import { useElementHeight } from '../shared/use-element-height.js';
import { withResponsive } from '../shared/with-responsive.js';
import { BaseTooltip } from '../tooltip/base-tooltip.js';
import styles from './pie-semi-circle-chart.module.scss.js';

const PAD_ANGLE = 0.03; // Padding between segments
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
/**
 * Compound component for SVG children in the PieSemiCircleChart
 * @param {PropsWithChildren} props          - Component props
 * @param {ReactNode}         props.children - Child elements to render
 * @return {JSX.Element} The children wrapped in a fragment
 */
const PieSemiCircleChartSVG = ({ children }) => {
    // This component doesn't render directly - its children are extracted by PieSemiCircleChart
    // We just return the children as-is
    return jsx(Fragment, { children: children });
};
// Set displayName for better debugging and type checking
PieSemiCircleChartSVG.displayName = 'PieSemiCircleChart.SVG';
/**
 * Compound component for HTML children in the PieSemiCircleChart
 * @param {PropsWithChildren} props          - Component props
 * @param {ReactNode}         props.children - Child elements to render
 * @return {JSX.Element} The children wrapped in a fragment
 */
const PieSemiCircleChartHTML = ({ children }) => {
    // This component doesn't render directly - its children are extracted by PieSemiCircleChart
    // We just return the children as-is
    return jsx(Fragment, { children: children });
};
// Set displayName for better debugging and type checking
PieSemiCircleChartHTML.displayName = 'PieSemiCircleChart.HTML';
const PieSemiCircleChartInternal = ({ data, chartId: providedChartId, width = 400, thickness = 0.4, clockwise = true, withTooltips = false, showLegend = false, legendOrientation = 'horizontal', legendPosition = 'bottom', legendAlignment = 'center', legendShape = 'circle', label, note, className, children, }) => {
    const providerTheme = useGlobalChartTheme();
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
    // Memoize legend options to prevent unnecessary re-calculations
    const legendOptions = useMemo(() => ({ showValues: true }), []);
    // Create legend items using the reusable hook
    const legendItems = useChartLegendData(data, legendOptions);
    // Process children to extract compound components
    const { svgChildren, htmlChildren, otherChildren } = useMemo(() => {
        const svg = [];
        const html = [];
        const other = [];
        Children.forEach(children, child => {
            if (isValidElement(child)) {
                // Check displayName for compound components
                const childType = child.type;
                const displayName = childType?.displayName;
                if (displayName === 'PieSemiCircleChart.SVG') {
                    // Extract children from PieSemiCircleChart.SVG
                    Children.forEach(child.props.children, svgChild => {
                        svg.push(svgChild);
                    });
                }
                else if (displayName === 'PieSemiCircleChart.HTML') {
                    // Extract children from PieSemiCircleChart.HTML
                    Children.forEach(child.props.children, htmlChild => {
                        html.push(htmlChild);
                    });
                }
                else if (child.type === Group) {
                    // Legacy support: still check for Group type for backward compatibility
                    svg.push(child);
                }
                else {
                    other.push(child);
                }
            }
        });
        return { svgChildren: svg, htmlChildren: html, otherChildren: other };
    }, [children]);
    // Memoize metadata to prevent unnecessary re-registration
    const chartMetadata = useMemo(() => ({
        thickness,
        clockwise,
    }), [thickness, clockwise]);
    // Register chart with context only if data is valid
    useChartRegistration({
        chartId,
        legendItems,
        chartType: 'pie-semi-circle',
        isDataValid: isValid,
        metadata: chartMetadata,
    });
    if (!isValid) {
        return (jsx("div", { className: styles['pie-semi-circle-chart'], children: jsx("svg", { width: width, height: width / 2, "data-testid": "pie-chart-svg", children: jsx("text", { x: "50%", y: "50%", textAnchor: "middle", className: styles.error, children: message }) }) }));
    }
    // Calculate chart dimensions
    // TODO: we might want to accept height as a prop in the future, because the height of container might not always be enough.
    const height = width / 2;
    // The chart only takes the height minus the legend height.
    const chartHeight = height - (showLegend && legendPosition === 'top' ? legendHeight : 0);
    const radius = Math.min(width / 2, chartHeight);
    const innerRadius = radius * (1 - thickness);
    // Map data with index for color assignment
    const dataWithIndex = data.map((d, index) => ({
        ...d,
        index,
    }));
    // Configure pie angles based on clockwise direction
    const startAngle = clockwise ? -Math.PI / 2 : Math.PI / 2;
    const endAngle = clockwise ? Math.PI / 2 : -Math.PI / 2;
    return (jsx(SingleChartContext.Provider, { value: {
            chartId,
            chartWidth: width,
            chartHeight: radius,
        }, children: jsxs("div", { className: clsx('pie-semi-circle-chart', styles['pie-semi-circle-chart'], className), "data-testid": "pie-chart-container", style: {
                display: 'flex',
                flexDirection: showLegend && legendPosition === 'top' ? 'column-reverse' : 'column',
            }, children: [jsx("svg", { width: width, height: radius, viewBox: `0 0 ${width} ${chartHeight}`, "data-testid": "pie-chart-svg", children: jsxs(Group, { top: chartHeight, left: width / 2, children: [jsx(Pie, { data: dataWithIndex, pieValue: accessors.value, outerRadius: radius, innerRadius: innerRadius, cornerRadius: 3, padAngle: PAD_ANGLE, startAngle: startAngle, endAngle: endAngle, pieSort: accessors.sort, children: pie => {
                                    return pie.arcs.map(arc => (jsx("g", { onMouseMove: handleArcMouseMove(arc), onMouseLeave: handleMouseLeave, children: jsx("path", { d: pie.path(arc) || '', fill: accessors.fill(arc.data), "data-testid": "pie-segment" }) }, arc.data.label)));
                                } }), jsxs(Group, { children: [jsx(Text, { textAnchor: "middle", verticalAnchor: "start", y: -40, className: styles.label, children: label }), jsx(Text, { textAnchor: "middle", verticalAnchor: "start", y: -20, className: styles.note, children: note })] }), svgChildren] }) }), withTooltips && tooltipOpen && tooltipData && (jsx(BaseTooltip, { data: {
                        label: tooltipData.label,
                        value: tooltipData.value,
                        valueDisplay: tooltipData.valueDisplay,
                    }, top: tooltipTop || 0, left: tooltipLeft || 0 })), showLegend && (jsx(Legend, { items: legendItems, orientation: legendOrientation, position: legendPosition, alignment: legendAlignment, shape: legendShape, ref: legendRef, chartId: chartId })), htmlChildren, otherChildren] }) }));
};
const PieSemiCircleChartWithProvider = props => {
    const existingContext = useContext(GlobalChartsContext);
    // If we're already in a GlobalChartsProvider context, don't create a new one
    if (existingContext) {
        return jsx(PieSemiCircleChartInternal, { ...props });
    }
    // Otherwise, create our own GlobalChartsProvider
    return (jsx(GlobalChartsProvider, { children: jsx(PieSemiCircleChartInternal, { ...props }) }));
};
PieSemiCircleChartWithProvider.displayName = 'PieSemiCircleChart';
// Create PieSemiCircleChart with composition API
attachSubComponents(PieSemiCircleChartWithProvider, {
    Legend: Legend,
    SVG: PieSemiCircleChartSVG,
    HTML: PieSemiCircleChartHTML,
});
// Create responsive PieSemiCircleChart with composition API
const PieSemiCircleChartResponsive = attachSubComponents(withResponsive(PieSemiCircleChartWithProvider), {
    Legend: Legend,
    SVG: PieSemiCircleChartSVG,
    HTML: PieSemiCircleChartHTML,
});

export { PieSemiCircleChartResponsive as default };
