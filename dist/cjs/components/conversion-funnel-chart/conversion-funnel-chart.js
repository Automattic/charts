'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var event = require('@visx/event');
var tooltip = require('@visx/tooltip');
var clsx = require('clsx');
var react = require('react');
require('../../providers/chart-context/global-charts-provider.js');
require('fast-deep-equal');
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
 * @param props                  - Component props
 * @param props.mainRate         - Main conversion rate to highlight
 * @param props.changeIndicator  - Change indicator (e.g., +2%, -1.5%)
 * @param props.steps            - Array of funnel steps
 * @param props.loading          - Whether the chart is in loading state
 * @param props.className        - Additional CSS class name
 * @param props.style            - Custom styling
 * @param props.renderStepLabel  - Custom render function for step labels
 * @param props.renderStepRate   - Custom render function for step rates
 * @param props.renderMainMetric - Custom render function for the entire main metric section
 * @param props.renderTooltip    - Custom render function for tooltip content
 * @return JSX element representing the conversion funnel chart
 */
const ConversionFunnelChart = ({ mainRate, changeIndicator, steps, loading = false, className, style, renderStepLabel, renderStepRate, renderMainMetric, renderTooltip, }) => {
    const theme = useGlobalChartsTheme.useGlobalChartsTheme();
    const chartRef = react.useRef(null);
    const selectedBarRef = react.useRef(null);
    // Use @visx/tooltip hooks for tooltip positioning
    const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = tooltip.useTooltip();
    // Use custom hook for selection management
    const { handleBarClick, handleBarKeyDown, clearSelection, getStepState } = useFunnelSelection.useFunnelSelection(hideTooltip);
    const { containerRef: portalContainerRef, TooltipInPortal } = tooltip.useTooltipInPortal({
        // use TooltipWithBounds for boundary detection
        detectBounds: true,
        // when tooltip containers are scrolled, this will correctly update the Tooltip position
        scroll: true,
    });
    // Wrapper to clear selectedBarRef after clearing selection
    const clearSelectionAndRef = react.useCallback(() => {
        clearSelection();
        selectedBarRef.current = null;
        hideTooltip();
    }, [clearSelection, hideTooltip]);
    // Helper function to show tooltip at specific coordinates
    const showTooltipAt = react.useCallback((step, x, y) => {
        showTooltip({
            tooltipData: step,
            tooltipLeft: x,
            tooltipTop: y - 10,
        });
    }, [showTooltip]);
    // Helper function to get tooltip coordinates for mouse events
    const getMouseTooltipCoords = react.useCallback((event$1) => {
        const containerElement = chartRef.current;
        if (containerElement) {
            const coords = event.localPoint(containerElement, event$1.nativeEvent);
            if (coords) {
                return { x: coords.x, y: coords.y };
            }
        }
        return null;
    }, []);
    // Helper function to get tooltip coordinates for keyboard events
    const getKeyboardTooltipCoords = react.useCallback((event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const containerElement = chartRef.current;
        if (containerElement) {
            const containerRect = containerElement.getBoundingClientRect();
            const x = rect.left + rect.width / 2 - containerRect.left;
            const y = rect.top - containerRect.top;
            return { x, y };
        }
        return null;
    }, []);
    // Helper function to handle step interaction (both click and keyboard)
    const handleStepInteraction = react.useCallback((step, event, interactionType) => {
        // Store reference to the interacted element
        selectedBarRef.current = event.currentTarget;
        // Check if deselecting the same step
        const { isClicked } = getStepState(step.id);
        if (isClicked) {
            // Deselecting - clear selection (tooltip will be hidden by hook)
            if (interactionType === 'click') {
                handleBarClick(step.id);
            }
            else {
                handleBarKeyDown(step.id, event);
            }
            return;
        }
        // Selecting - handle selection and show tooltip
        if (interactionType === 'click') {
            handleBarClick(step.id);
            const coords = getMouseTooltipCoords(event);
            if (coords) {
                showTooltipAt(step, coords.x, coords.y);
            }
        }
        else {
            handleBarKeyDown(step.id, event);
            const coords = getKeyboardTooltipCoords(event);
            if (coords) {
                showTooltipAt(step, coords.x, coords.y);
            }
        }
    }, [
        getStepState,
        handleBarClick,
        handleBarKeyDown,
        showTooltipAt,
        getMouseTooltipCoords,
        getKeyboardTooltipCoords,
    ]);
    // Create handler factories to avoid arrow functions in JSX
    const stepHandlers = react.useMemo(() => {
        const handlers = new Map();
        steps.forEach(step => {
            const onClick = (event) => {
                event.stopPropagation();
                handleStepInteraction(step, event, 'click');
            };
            const onKeyDown = (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleStepInteraction(step, event, 'keyboard');
                }
                else {
                    // For other keys (like Escape), just handle the selection
                    selectedBarRef.current = event.currentTarget;
                    handleBarKeyDown(step.id, event);
                }
            };
            handlers.set(step.id, { onClick, onKeyDown });
        });
        return handlers;
    }, [steps, handleStepInteraction, handleBarKeyDown]);
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
        '--change-indicator-color': changeColor,
        ...style,
    };
    // Default main metric rendering function
    const renderDefaultMainMetric = () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("span", { className: conversionFunnelChart_module.default['main-rate'], children: [mainRate.toFixed(1), "%"] }), changeIndicator && (jsxRuntime.jsx("span", { className: conversionFunnelChart_module.default['change-indicator'], children: changeIndicator }))] }));
    // Default tooltip rendering function
    const renderDefaultTooltip = (step) => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("div", { className: conversionFunnelChart_module.default['tooltip-title'], children: step.label }), jsxRuntime.jsxs("div", { className: conversionFunnelChart_module.default['tooltip-content'], children: [step.rate.toFixed(1), "%", step.count && ` • ${step.count.toLocaleString()} items`] })] }));
    // Handle empty or undefined data
    if (!steps || steps.length === 0) {
        return (jsxRuntime.jsx("div", { className: clsx(conversionFunnelChart_module.default.conversionFunnelChart, loading && conversionFunnelChart_module.default.loading, className), style: chartStyle, children: jsxRuntime.jsx("div", { className: conversionFunnelChart_module.default['empty-state'], children: loading ? 'Loading...' : 'No data available' }) }));
    }
    // Calculate bar heights relative to the maximum (first step)
    const maxRate = Math.max(...steps.map(step => step.rate));
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", { ref: node => {
                    // Set containerRef for @visx coordinate system
                    portalContainerRef(node);
                    chartRef.current = node;
                }, className: clsx(conversionFunnelChart_module.default.conversionFunnelChart, loading && conversionFunnelChart_module.default.loading, className), style: chartStyle, children: [renderMainMetric ? (renderMainMetric({
                        mainRate,
                        changeIndicator,
                        className: conversionFunnelChart_module.default['main-metric'],
                        changeColor,
                    })) : (jsxRuntime.jsx("div", { className: conversionFunnelChart_module.default['main-metric'], children: renderDefaultMainMetric() })), jsxRuntime.jsx("div", { className: conversionFunnelChart_module.default['funnel-container'], children: steps.map((step, index) => {
                            const barHeight = (step.rate / maxRate) * 100;
                            const { isClicked, isBlurred } = getStepState(step.id);
                            return (jsxRuntime.jsxs("div", { className: clsx(conversionFunnelChart_module.default['funnel-step'], isBlurred && conversionFunnelChart_module.default.blurred), children: [jsxRuntime.jsxs("div", { className: conversionFunnelChart_module.default['step-header'], children: [renderStepLabel ? (renderStepLabel({
                                                step,
                                                index,
                                                className: conversionFunnelChart_module.default['step-label'],
                                            })) : (jsxRuntime.jsx("span", { className: conversionFunnelChart_module.default['step-label'], children: step.label })), renderStepRate ? (renderStepRate({
                                                step,
                                                index,
                                                className: conversionFunnelChart_module.default['step-rate'],
                                            })) : (jsxRuntime.jsxs("span", { className: conversionFunnelChart_module.default['step-rate'], children: [step.rate.toFixed(1), "%"] }))] }), jsxRuntime.jsx("div", { className: clsx(conversionFunnelChart_module.default['bar-container'], isClicked && conversionFunnelChart_module.default.selected, isBlurred && conversionFunnelChart_module.default.disabled), onClick: stepHandlers.get(step.id)?.onClick, onKeyDown: stepHandlers.get(step.id)?.onKeyDown, role: "button", tabIndex: isBlurred ? -1 : 0, "aria-label": step.label, children: jsxRuntime.jsx("div", { className: clsx(conversionFunnelChart_module.default['funnel-bar'], isClicked && conversionFunnelChart_module.default.selected), style: {
                                                height: `${barHeight}%`,
                                                backgroundColor: primaryColor,
                                            } }) })] }, step.id));
                        }) })] }), tooltipOpen &&
                tooltipData &&
                (() => {
                    const tooltipContent = renderTooltip
                        ? renderTooltip({
                            step: tooltipData,
                            index: steps.findIndex(s => s.id === tooltipData.id),
                            top: tooltipTop,
                            left: tooltipLeft,
                            className: conversionFunnelChart_module.default['tooltip-wrapper'],
                        })
                        : renderDefaultTooltip(tooltipData);
                    // Don't render tooltip if renderTooltip returns falsy
                    if (!tooltipContent)
                        return null;
                    return (jsxRuntime.jsx(TooltipInPortal
                    // set this to random so it correctly updates with parent bounds
                    , { top: tooltipTop, left: tooltipLeft, className: conversionFunnelChart_module.default['tooltip-wrapper'], children: tooltipContent }, Math.random()));
                })()] }));
};

exports.ConversionFunnelChart = ConversionFunnelChart;
exports.default = ConversionFunnelChart;
