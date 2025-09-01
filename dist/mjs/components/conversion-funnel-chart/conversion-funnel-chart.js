import { jsx, jsxs } from 'react/jsx-runtime';
import { __experimentalText } from '@wordpress/components';
import clsx from 'clsx';
import { useRef, useCallback, useMemo, useEffect } from 'react';
import '../../providers/chart-context/global-charts-provider.js';
import 'fast-deep-equal';
import '@visx/event';
import '@visx/tooltip';
import '@visx/xychart';
import 'date-fns';
import '@automattic/number-formatters';
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
    const theme = useGlobalChartsTheme();
    const chartRef = useRef(null);
    const selectedBarRef = useRef(null);
    // Use custom hook for selection management
    const { handleBarClick, handleBarKeyDown, clearSelection, getStepState } = useFunnelSelection();
    // Wrapper to clear selectedBarRef after clearing selection
    const clearSelectionAndRef = useCallback(() => {
        clearSelection();
        selectedBarRef.current = null;
    }, [clearSelection]);
    // Create handler factories to avoid arrow functions in JSX
    const stepHandlers = useMemo(() => {
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
        '--change-color': changeColor,
        ...style,
    };
    // Handle empty or undefined data
    if (!steps || steps.length === 0) {
        return (jsx("div", { className: clsx(styles.conversionFunnelChart, loading && styles.loading, className), style: chartStyle, children: jsx("div", { className: styles.emptyState, children: loading ? 'Loading...' : 'No data available' }) }));
    }
    // Calculate bar heights relative to the maximum (first step)
    const maxRate = Math.max(...steps.map(step => step.rate));
    return (jsxs("div", { ref: chartRef, className: clsx(styles.conversionFunnelChart, loading && styles.loading, className), style: chartStyle, children: [jsxs("div", { className: styles.mainMetric, children: [jsxs(__experimentalText, { className: styles.mainRate, children: [mainRate.toFixed(1), "%"] }), changeIndicator && (jsx(__experimentalText, { className: styles.changeIndicator, style: { color: changeColor }, children: changeIndicator }))] }), jsx("div", { className: styles.funnelContainer, children: steps.map(step => {
                    const barHeight = (step.rate / maxRate) * 100;
                    const { isClicked, isBlurred } = getStepState(step.id);
                    return (jsxs("div", { className: clsx(styles.funnelStep, isBlurred && styles.blurred), children: [jsxs("div", { className: styles.stepHeader, children: [jsx(__experimentalText, { className: styles.stepLabel, children: step.label }), jsxs(__experimentalText, { className: styles.stepRate, children: [step.rate.toFixed(1), "%"] })] }), jsxs("div", { className: clsx(styles.barContainer, isClicked && styles.selected, isBlurred && styles.disabled), onClick: stepHandlers.get(step.id)?.onClick, onKeyDown: stepHandlers.get(step.id)?.onKeyDown, role: "button", tabIndex: isBlurred ? -1 : 0, "aria-label": step.label, children: [jsx("div", { className: clsx(styles.funnelBar, isClicked && styles.selected), style: {
                                            height: `${barHeight}%`,
                                            backgroundColor: primaryColor,
                                        } }), isClicked && (jsx("div", { className: styles.tooltip, children: jsxs("div", { className: styles.tooltipContent, children: [jsx(__experimentalText, { className: styles.tooltipTitle, children: step.label }), jsxs(__experimentalText, { className: styles.tooltipRate, children: [step.rate.toFixed(1), "%", step.count && ` • ${step.count.toLocaleString()} items`] })] }) }))] })] }, step.id));
                }) })] }));
};

export { ConversionFunnelChart, ConversionFunnelChart as default };
