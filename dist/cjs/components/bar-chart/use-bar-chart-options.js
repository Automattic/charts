'use strict';

var numberFormatters = require('@automattic/number-formatters');
var react = require('react');

const formatDateTick = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });
};
/**
 * Get the group padding of a scale.
 *
 * @param scale - The scale to get the group padding of.
 * @return The group padding of the scale.
 */
const getGroupPadding = (scale) => {
    return typeof scale.paddingInner === 'number' ? scale.paddingInner : 0;
};
/**
 * Returns the merged options for the bar chart, including axis and scale configuration based on the orientation.
 *
 * @param data       - The data to be displayed in the chart.
 * @param horizontal - Whether the chart is horizontal or vertical.
 * @param options    - The options for the chart.
 * @return The merged options for the chart.
 */
function useBarChartOptions(data, horizontal, options = {}) {
    const defaultOptions = react.useMemo(() => {
        const bandScale = {
            type: 'band',
            padding: 0.2,
            paddingInner: 0.1,
        };
        const linearScale = {
            type: 'linear',
            nice: true,
            zero: false,
        };
        const labelFormatter = data?.[0]?.data?.[0]?.label
            ? (label) => label
            : formatDateTick;
        const valueFormatter = numberFormatters.formatNumberCompact;
        const labelAccessor = (d) => d?.label || d?.date;
        const valueAccessor = (d) => {
            // Use visualValue for bar rendering if available (for zero values), otherwise use value
            const enhancedPoint = d;
            return enhancedPoint?.visualValue !== undefined ? enhancedPoint.visualValue : d?.value;
        };
        return {
            vertical: {
                xTickFormat: labelFormatter,
                yTickFormat: valueFormatter,
                tooltipLabelFormatter: labelFormatter,
                xAccessor: labelAccessor,
                yAccessor: valueAccessor,
                gridVisibility: 'x',
                xScale: bandScale,
                yScale: linearScale,
            },
            horizontal: {
                xTickFormat: valueFormatter,
                yTickFormat: labelFormatter,
                tooltipLabelFormatter: labelFormatter,
                xAccessor: valueAccessor,
                yAccessor: labelAccessor,
                gridVisibility: 'y',
                xScale: linearScale,
                yScale: bandScale,
            },
        };
    }, [data]);
    return react.useMemo(() => {
        const orientationKey = horizontal ? 'horizontal' : 'vertical';
        const { xTickFormat, yTickFormat, tooltipLabelFormatter: defaultTooltipLabelFormatter, xAccessor, yAccessor, gridVisibility, xScale: baseXScale, yScale: baseYScale, } = defaultOptions[orientationKey];
        const xScale = { ...baseXScale, ...(options.xScale || {}) };
        const yScale = { ...baseYScale, ...(options.yScale || {}) };
        const providedToolTipLabelFormatter = horizontal
            ? options.axis?.y?.tickFormat
            : options.axis?.x?.tickFormat;
        return {
            gridVisibility,
            xScale,
            yScale,
            accessors: {
                xAccessor,
                yAccessor,
            },
            axis: {
                x: {
                    orientation: 'bottom',
                    numTicks: 4,
                    tickFormat: xTickFormat,
                    ...(options.axis?.x || {}),
                },
                y: {
                    orientation: 'left',
                    numTicks: 4,
                    tickFormat: yTickFormat,
                    ...(options.axis?.y || {}),
                },
            },
            barGroup: {
                padding: getGroupPadding(horizontal ? yScale : xScale),
            },
            tooltip: {
                labelFormatter: providedToolTipLabelFormatter || defaultTooltipLabelFormatter,
            },
        };
    }, [defaultOptions, options, horizontal]);
}

exports.useBarChartOptions = useBarChartOptions;
