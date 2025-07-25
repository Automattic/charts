import { jsx } from 'react/jsx-runtime';
import { TooltipContext, Tooltip } from '@visx/xychart';
export { Tooltip } from '@visx/xychart';
import { useContext, useMemo, useEffect, useCallback } from 'react';

const AccessibleTooltip = ({ renderTooltip, selectedIndex, tooltipRef, keyboardFocusedClassName, series = [], mode = 'group', ...props }) => {
    const tooltipContext = useContext(TooltipContext);
    const tooltipData = useMemo(() => {
        if (mode !== 'individual')
            return [];
        if (series.length === 0)
            return [];
        const maxDataPoints = Math.max(...series.map(s => s.data.length));
        const flattened = [];
        // Pattern: [series1[0], series2[0], series3[0], series1[1], series2[1], series3[1], ...]
        for (let dataPointIndex = 0; dataPointIndex < maxDataPoints; dataPointIndex++) {
            for (let seriesIndex = 0; seriesIndex < series.length; seriesIndex++) {
                const seriesData = series[seriesIndex];
                if (dataPointIndex < seriesData.data.length) {
                    flattened.push({
                        datum: seriesData.data[dataPointIndex],
                        seriesLabel: seriesData.label,
                        seriesIndex,
                        dataPointIndex,
                    });
                }
            }
        }
        return flattened;
    }, [series, mode]);
    // Handle tooltip highlighting for keyboard navigation
    useEffect(() => {
        if (selectedIndex === undefined) {
            tooltipContext?.hideTooltip();
            return;
        }
        if (mode === 'group') {
            // Show all series at the selected data point index in single tooltip.
            series.forEach((s, index) => {
                if (selectedIndex < s.data.length) {
                    const datum = s.data[selectedIndex];
                    tooltipContext?.showTooltip({
                        datum,
                        key: s.label,
                        index,
                    });
                }
            });
        }
        else if (mode === 'individual') {
            // Show individual tooltips for each datapoint from each series.
            if (selectedIndex < tooltipData.length) {
                const tooltipItem = tooltipData[selectedIndex];
                tooltipContext?.showTooltip({
                    datum: tooltipItem.datum,
                    key: tooltipItem.seriesLabel,
                    index: tooltipItem.seriesIndex,
                });
            }
        }
        // Don't include tooltipContext in the dependency array to avoid loop.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex, tooltipData, series]);
    // Create a focusable renderTooltip that includes accessibility features
    const focusableRenderTooltip = useMemo(() => {
        if (!renderTooltip)
            return undefined;
        return (params) => {
            const tooltipContent = renderTooltip(params);
            if (selectedIndex !== undefined) {
                return (jsx("div", { ref: tooltipRef, tabIndex: -1, role: "tooltip", "aria-atomic": "true", className: keyboardFocusedClassName, "data-testid": `chart-tooltip-${selectedIndex}`, children: tooltipContent }, `chart-tooltip-${selectedIndex}`));
            }
            return (jsx("div", { role: "tooltip", "aria-live": "polite", children: tooltipContent }));
        };
    }, [renderTooltip, selectedIndex, tooltipRef, keyboardFocusedClassName]);
    return jsx(Tooltip, { ...props, renderTooltip: focusableRenderTooltip });
};
const useKeyboardNavigation = ({ selectedIndex, setSelectedIndex, isNavigating, setIsNavigating, chartRef, totalPoints, }) => {
    // Focus the tooltip as soon as it is rendered
    const tooltipRef = useCallback((element) => {
        if (element && selectedIndex !== undefined) {
            element.focus();
        }
    }, [selectedIndex]);
    // On each focus of chart, reset the selectedIndex to 0, if keyboard navigation is not already active
    const onChartFocus = useCallback(() => {
        if (!isNavigating && selectedIndex !== undefined) {
            setSelectedIndex(0);
        }
    }, [isNavigating, selectedIndex, setSelectedIndex]);
    // On each blur of chart, keyboard navigation should restart from first tooltip
    const onChartBlur = useCallback(() => {
        setIsNavigating(false);
    }, [setIsNavigating]);
    const onChartKeyDown = useCallback((event) => {
        if (totalPoints === 0)
            return;
        // Keep focus on the chart if tab is pressed
        if (event.key === 'Tab') {
            chartRef.current?.focus();
            setSelectedIndex(undefined);
            setIsNavigating(false);
            return;
        }
        const currentSelectedIndex = selectedIndex === undefined ? -1 : selectedIndex;
        if (currentSelectedIndex + 1 >= totalPoints && ['ArrowRight'].includes(event.key)) {
            chartRef.current?.focus();
            setSelectedIndex(undefined);
            setIsNavigating(false);
            return;
        }
        event.preventDefault();
        if (['ArrowRight'].includes(event.key)) {
            setIsNavigating(true);
            setSelectedIndex((currentSelectedIndex + 1) % totalPoints);
        }
        else if (['ArrowLeft'].includes(event.key)) {
            setIsNavigating(true);
            setSelectedIndex((currentSelectedIndex - 1 + totalPoints) % totalPoints);
        }
        else if (event.key === 'Escape') {
            setSelectedIndex(undefined);
            setIsNavigating(false);
            chartRef.current?.focus();
        }
    }, [totalPoints, selectedIndex, setSelectedIndex, setIsNavigating, chartRef]);
    return {
        tooltipRef,
        onChartFocus,
        onChartBlur,
        onChartKeyDown,
    };
};

export { AccessibleTooltip, useKeyboardNavigation };
