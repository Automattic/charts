import { jsx } from 'react/jsx-runtime';
import { DataContext } from '@visx/xychart';
import { useState, useCallback, useEffect } from 'react';
import '../../private/single-chart-context/single-chart-context.js';
import { useSingleChartContext } from '../../private/single-chart-context/use-single-chart-context.js';
import styles from '../line-chart.module.scss.js';

const LineChartAnnotationsOverlay = ({ children }) => {
    const { chartRef, chartWidth, chartHeight } = useSingleChartContext();
    const [scales, setScales] = useState(null);
    const [scalesStable, setScalesStable] = useState(false);
    // Create a signature for scale data to enable easy comparison
    const createScaleSignature = useCallback((scaleData) => {
        const xDomain = scaleData.xScale.domain();
        const yDomain = scaleData.yScale.domain();
        const xRange = scaleData.xScale.range();
        const yRange = scaleData.yScale.range();
        return `${xDomain.join(',')}-${yDomain.join(',')}-${xRange.join(',')}-${yRange.join(',')}`;
    }, []);
    // Get scales from chart ref and return them with signature for comparison
    const getScalesData = useCallback(() => {
        if (chartRef?.current) {
            const scaleData = chartRef.current.getScales();
            if (scaleData) {
                const scaleInfo = {
                    xScale: scaleData.xScale,
                    yScale: scaleData.yScale,
                };
                return {
                    scales: scaleInfo,
                    signature: createScaleSignature(scaleInfo),
                };
            }
        }
        return null;
    }, [chartRef, createScaleSignature]);
    // The chart resizes on render so we need to monitor the scales until they stabilize
    useEffect(() => {
        let timeoutId = null;
        let lastSignature = null;
        let retryCount = 0;
        const maxRetries = 20; // 20 * 50ms = 1 second max
        const checkInterval = 50; // Check every 50ms
        // Reset stability state when monitoring starts
        setScalesStable(false);
        const monitorScales = () => {
            const currentScaleData = getScalesData();
            // If we got scales, compare signatures
            if (currentScaleData) {
                // Check if scales have settled by comparing signatures
                const scalesSettled = lastSignature && currentScaleData.signature === lastSignature;
                if (scalesSettled) {
                    // Scales have stabilized, mark as stable
                    setScalesStable(true);
                    return;
                }
                // Update scales and remember signature for next comparison
                setScales(currentScaleData.scales);
                lastSignature = currentScaleData.signature;
            }
            // Continue monitoring if we haven't exceeded max retries
            if (retryCount < maxRetries) {
                retryCount++;
                timeoutId = setTimeout(monitorScales, checkInterval);
            }
        };
        monitorScales();
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [getScalesData, chartWidth, chartHeight]);
    // Early return if no chart data available
    if (!chartRef || !children) {
        return null;
    }
    if (!scales || !scalesStable) {
        return null;
    }
    // Create a DataContext value that mimics what visx provides
    // We're intentionally providing minimal context for annotations to work
    const dataContextValue = {
        xScale: scales.xScale,
        yScale: scales.yScale,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        width: chartWidth,
        height: chartHeight,
    };
    return (jsx(DataContext.Provider, { value: dataContextValue, children: jsx("svg", { width: chartWidth, height: chartHeight, className: styles['line-chart__annotations-overlay'], "data-testid": "line-chart-annotations-overlay", children: children }) }));
};

export { LineChartAnnotationsOverlay as default };
