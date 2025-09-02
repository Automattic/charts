import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { localPoint } from '@visx/event';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import clsx from 'clsx';
import { useRef, useCallback, useMemo, useEffect } from 'react';
import '../../providers/chart-context/global-charts-provider.js';
import 'fast-deep-equal';
import '@visx/xychart';
import 'date-fns';
import '@automattic/number-formatters';
import { formatPercentage } from '../../utils/format-percentage.js';
import '@visx/text';
import 'deepmerge';
import { hexToRgba } from '../../utils/color-utils.js';
import '@visx/scale';
import { useGlobalChartsTheme } from '../../providers/chart-context/hooks/use-global-charts-theme.js';
import styles from './conversion-funnel-chart.module.scss.js';
import { useFunnelSelection } from './private/use-funnel-selection.js';

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
    const theme = useGlobalChartsTheme();
    const chartRef = useRef(null);
    const selectedBarRef = useRef(null);
    // Use @visx/tooltip hooks for tooltip positioning
    const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip();
    // Use custom hook for selection management
    const { handleBarClick, handleBarKeyDown, clearSelection, getStepState } = useFunnelSelection(hideTooltip);
    const { containerRef: portalContainerRef, TooltipInPortal } = useTooltipInPortal({
        // use TooltipWithBounds for boundary detection
        detectBounds: true,
        // when tooltip containers are scrolled, this will correctly update the Tooltip position
        scroll: true,
    });
    // Wrapper to clear selectedBarRef after clearing selection
    const clearSelectionAndRef = useCallback(() => {
        clearSelection();
        selectedBarRef.current = null;
        hideTooltip();
    }, [clearSelection, hideTooltip]);
    // Helper function to show tooltip at specific coordinates
    const showTooltipAt = useCallback((step, x, y) => {
        showTooltip({
            tooltipData: step,
            tooltipLeft: x,
            tooltipTop: y - 10,
        });
    }, [showTooltip]);
    // Helper function to get tooltip coordinates for mouse events
    const getMouseTooltipCoords = useCallback((event) => {
        const containerElement = chartRef.current;
        if (containerElement) {
            const coords = localPoint(containerElement, event.nativeEvent);
            if (coords) {
                return { x: coords.x, y: coords.y };
            }
        }
        return null;
    }, []);
    // Helper function to get tooltip coordinates for keyboard events
    const getKeyboardTooltipCoords = useCallback((event) => {
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
    const handleStepInteraction = useCallback((step, event, interactionType) => {
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
    const stepHandlers = useMemo(() => {
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
    useEffect(() => {
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
    const lightBackgroundColor = hexToRgba(primaryColor, 0.08);
    const chartStyle = {
        '--primary-color': primaryColor,
        '--light-background-color': lightBackgroundColor,
        '--change-indicator-color': changeColor,
        ...style,
    };
    // Default main metric rendering function
    const renderDefaultMainMetric = () => (jsxs(Fragment, { children: [jsx("span", { className: styles['main-rate'], children: formatPercentage(mainRate) }), changeIndicator && (jsx("span", { className: styles['change-indicator'], children: changeIndicator }))] }));
    // Default tooltip rendering function
    const renderDefaultTooltip = (step) => (jsxs(Fragment, { children: [jsx("div", { className: styles['tooltip-title'], children: step.label }), jsxs("div", { className: styles['tooltip-content'], children: [formatPercentage(step.rate), step.count && ` • ${step.count.toLocaleString()} items`] })] }));
    // Handle empty or undefined data
    if (!steps || steps.length === 0) {
        return (jsx("div", { className: clsx(styles.conversionFunnelChart, loading && styles.loading, className), style: chartStyle, children: jsx("div", { className: styles['empty-state'], children: loading ? 'Loading...' : 'No data available' }) }));
    }
    // Calculate bar heights relative to the maximum (first step)
    const maxRate = Math.max(...steps.map(step => step.rate));
    return (jsxs(Fragment, { children: [jsxs("div", { ref: node => {
                    // Set containerRef for @visx coordinate system
                    portalContainerRef(node);
                    chartRef.current = node;
                }, className: clsx(styles.conversionFunnelChart, loading && styles.loading, className), style: chartStyle, children: [renderMainMetric ? (renderMainMetric({
                        mainRate,
                        changeIndicator,
                        className: styles['main-metric'],
                        changeColor,
                    })) : (jsx("div", { className: styles['main-metric'], children: renderDefaultMainMetric() })), jsx("div", { className: styles['funnel-container'], children: steps.map((step, index) => {
                            const barHeight = (step.rate / maxRate) * 100;
                            const { isClicked, isBlurred } = getStepState(step.id);
                            return (jsxs("div", { className: clsx(styles['funnel-step'], isBlurred && styles.blurred), children: [jsxs("div", { className: styles['step-header'], children: [renderStepLabel ? (renderStepLabel({
                                                step,
                                                index,
                                                className: styles['step-label'],
                                            })) : (jsx("span", { className: styles['step-label'], children: step.label })), renderStepRate ? (renderStepRate({
                                                step,
                                                index,
                                                className: styles['step-rate'],
                                            })) : (jsx("span", { className: styles['step-rate'], children: formatPercentage(step.rate) }))] }), jsx("div", { className: clsx(styles['bar-container'], isClicked && styles.selected, isBlurred && styles.disabled), onClick: stepHandlers.get(step.id)?.onClick, onKeyDown: stepHandlers.get(step.id)?.onKeyDown, role: "button", tabIndex: isBlurred ? -1 : 0, "aria-label": step.label, children: jsx("div", { className: clsx(styles['funnel-bar'], isClicked && styles.selected), style: {
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
                            className: styles['tooltip-wrapper'],
                        })
                        : renderDefaultTooltip(tooltipData);
                    // Don't render tooltip if renderTooltip returns falsy
                    if (!tooltipContent)
                        return null;
                    return (jsx(TooltipInPortal
                    // set this to random so it correctly updates with parent bounds
                    , { top: tooltipTop, left: tooltipLeft, className: styles['tooltip-wrapper'], children: tooltipContent }, Math.random()));
                })()] }));
};

export { ConversionFunnelChart, ConversionFunnelChart as default };
