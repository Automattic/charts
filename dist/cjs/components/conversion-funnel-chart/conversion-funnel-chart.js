'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var components = require('@wordpress/components');
var clsx = require('clsx');
var react = require('react');
require('../../providers/chart-context/global-charts-provider.js');
require('fast-deep-equal');
require('@visx/event');
require('@visx/tooltip');
require('@visx/xychart');
require('date-fns');
require('@automattic/number-formatters');
require('@visx/text');
require('deepmerge');
var colorUtils = require('../../utils/color-utils.js');
require('@visx/scale');
var useGlobalChartsTheme = require('../../providers/chart-context/hooks/use-global-charts-theme.js');
var conversionFunnelChart_module = require('./conversion-funnel-chart.module.scss.js');
var useFunnelSelection = require('./private/use-funnel-selection.js');

/**
 * Default settings for ConversionFunnelChart component
 */
const DEFAULT_FUNNEL_SETTINGS = {
    primaryColor: '#4F46E5',
    backgroundColor: '#F3F4F6',
    positiveChangeColor: '#10B981',
    negativeChangeColor: '#EF4444',
};
/**
 * ConversionFunnelChart component displays a conversion funnel with main metric and visualization
 *
 * @param props                 - Component props
 * @param props.mainRate        - Main conversion rate to highlight
 * @param props.changeIndicator - Change indicator (e.g., +2%, -1.5%)
 * @param props.steps           - Array of funnel steps
 * @param props.loading         - Whether the chart is in loading state
 * @param props.className       - Additional CSS class name
 * @param props.style           - Custom styling
 * @return JSX element representing the conversion funnel chart
 */
const ConversionFunnelChart = ({ mainRate, changeIndicator, steps, loading = false, className, style, }) => {
    const theme = useGlobalChartsTheme.useGlobalChartsTheme();
    const chartRef = react.useRef(null);
    const selectedBarRef = react.useRef(null);
    // Use custom hook for selection management
    const { handleBarClick, handleBarKeyDown, clearSelection, getStepState } = useFunnelSelection.useFunnelSelection();
    // Wrapper to clear selectedBarRef after clearing selection
    const clearSelectionAndRef = react.useCallback(() => {
        clearSelection();
        selectedBarRef.current = null;
    }, [clearSelection]);
    // Create handler factories to avoid arrow functions in JSX
    const stepHandlers = react.useMemo(() => {
        const handlers = new Map();
        steps.forEach(step => {
            const onClick = (event) => {
                event.stopPropagation();
                // Store reference to the clicked bar element
                selectedBarRef.current = event.currentTarget;
                handleBarClick(step.id);
            };
            const onKeyDown = (event) => {
                // Store reference to the focused bar element for keyboard interactions
                selectedBarRef.current = event.currentTarget;
                handleBarKeyDown(step.id, event);
            };
            handlers.set(step.id, { onClick, onKeyDown });
        });
        return handlers;
    }, [steps, handleBarClick, handleBarKeyDown]);
    // Handle document-level click to clear selection when clicking outside selected bar
    react.useEffect(() => {
        const handleDocumentClick = (event) => {
            // Only clear selection if there's an active selection and click is outside the selected bar
            if (selectedBarRef.current && !selectedBarRef.current.contains(event.target)) {
                clearSelectionAndRef();
            }
        };
        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, [clearSelectionAndRef]);
    // Get component settings from theme with fallbacks
    const funnelSettings = theme.conversionFunnelChart;
    const primaryColor = funnelSettings?.primaryColor || DEFAULT_FUNNEL_SETTINGS.primaryColor;
    const positiveChangeColor = funnelSettings?.positiveChangeColor || DEFAULT_FUNNEL_SETTINGS.positiveChangeColor;
    const negativeChangeColor = funnelSettings?.negativeChangeColor || DEFAULT_FUNNEL_SETTINGS.negativeChangeColor;
    // Determine change indicator color
    const isPositiveChange = changeIndicator?.startsWith('+');
    const changeColor = isPositiveChange ? positiveChangeColor : negativeChangeColor;
    // Create light background version of primary color
    const lightBackgroundColor = colorUtils.hexToRgba(primaryColor, 0.08);
    const chartStyle = {
        '--primary-color': primaryColor,
        '--light-background-color': lightBackgroundColor,
        '--change-color': changeColor,
        ...style,
    };
    // Handle empty or undefined data
    if (!steps || steps.length === 0) {
        return (jsxRuntime.jsx("div", { className: clsx(conversionFunnelChart_module.default.conversionFunnelChart, loading && conversionFunnelChart_module.default.loading, className), style: chartStyle, children: jsxRuntime.jsx("div", { className: conversionFunnelChart_module.default.emptyState, children: loading ? 'Loading...' : 'No data available' }) }));
    }
    // Calculate bar heights relative to the maximum (first step)
    const maxRate = Math.max(...steps.map(step => step.rate));
    return (jsxRuntime.jsxs("div", { ref: chartRef, className: clsx(conversionFunnelChart_module.default.conversionFunnelChart, loading && conversionFunnelChart_module.default.loading, className), style: chartStyle, children: [jsxRuntime.jsxs("div", { className: conversionFunnelChart_module.default.mainMetric, children: [jsxRuntime.jsxs(components.__experimentalText, { className: conversionFunnelChart_module.default.mainRate, children: [mainRate.toFixed(1), "%"] }), changeIndicator && (jsxRuntime.jsx(components.__experimentalText, { className: conversionFunnelChart_module.default.changeIndicator, style: { color: changeColor }, children: changeIndicator }))] }), jsxRuntime.jsx("div", { className: conversionFunnelChart_module.default.funnelContainer, children: steps.map(step => {
                    const barHeight = (step.rate / maxRate) * 100;
                    const { isClicked, isBlurred } = getStepState(step.id);
                    return (jsxRuntime.jsxs("div", { className: clsx(conversionFunnelChart_module.default.funnelStep, isBlurred && conversionFunnelChart_module.default.blurred), children: [jsxRuntime.jsxs("div", { className: conversionFunnelChart_module.default.stepHeader, children: [jsxRuntime.jsx(components.__experimentalText, { className: conversionFunnelChart_module.default.stepLabel, children: step.label }), jsxRuntime.jsxs(components.__experimentalText, { className: conversionFunnelChart_module.default.stepRate, children: [step.rate.toFixed(1), "%"] })] }), jsxRuntime.jsxs("div", { className: clsx(conversionFunnelChart_module.default.barContainer, isClicked && conversionFunnelChart_module.default.selected, isBlurred && conversionFunnelChart_module.default.disabled), onClick: stepHandlers.get(step.id)?.onClick, onKeyDown: stepHandlers.get(step.id)?.onKeyDown, role: "button", tabIndex: isBlurred ? -1 : 0, "aria-label": step.label, children: [jsxRuntime.jsx("div", { className: clsx(conversionFunnelChart_module.default.funnelBar, isClicked && conversionFunnelChart_module.default.selected), style: {
                                            height: `${barHeight}%`,
                                            backgroundColor: primaryColor,
                                        } }), isClicked && (jsxRuntime.jsx("div", { className: conversionFunnelChart_module.default.tooltip, children: jsxRuntime.jsxs("div", { className: conversionFunnelChart_module.default.tooltipContent, children: [jsxRuntime.jsx(components.__experimentalText, { className: conversionFunnelChart_module.default.tooltipTitle, children: step.label }), jsxRuntime.jsxs(components.__experimentalText, { className: conversionFunnelChart_module.default.tooltipRate, children: [step.rate.toFixed(1), "%", step.count && ` • ${step.count.toLocaleString()} items`] })] }) }))] })] }, step.id));
                }) })] }));
};

exports.ConversionFunnelChart = ConversionFunnelChart;
exports.default = ConversionFunnelChart;
