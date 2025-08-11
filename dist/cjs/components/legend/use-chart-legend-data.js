'use strict';

var react = require('react');

/**
 * Formats the value for a data point based on its type
 * @param point      - The data point to format
 * @param showValues - Whether to show values or return empty string
 * @return Formatted value string
 */
function formatPointValue(point, showValues) {
    if (!showValues) {
        return '';
    }
    if ('percentage' in point) {
        return `${point.percentage}%`;
    }
    else if ('value' in point) {
        return point.value.toString();
    }
    return '';
}
/**
 * Creates a base legend item with common properties
 * @param label - The label for the legend item
 * @param value - The value for the legend item
 * @param color - The color for the legend item
 * @return Base legend item object
 */
function createBaseLegendItem(label, value, color) {
    return {
        label,
        value,
        color,
    };
}
/**
 * Processes SeriesData into legend items
 * @param seriesData  - The series data to process
 * @param theme       - The chart theme for colors
 * @param showValues  - Whether to show values in legend
 * @param withGlyph   - Whether to include glyph rendering
 * @param glyphSize   - Size of the glyph
 * @param renderGlyph - Component to render the glyph
 * @return Array of processed legend items
 */
function processSeriesData(seriesData, theme, showValues, withGlyph, glyphSize, renderGlyph) {
    const mapper = (series, index) => {
        const baseItem = createBaseLegendItem(series.label, showValues ? series.data?.length?.toString() || '0' : '', series?.options?.stroke ?? theme.colors[index % theme.colors.length]);
        if (withGlyph && renderGlyph) {
            return {
                ...baseItem,
                glyphSize,
                renderGlyph,
            };
        }
        return baseItem;
    };
    return seriesData.map(mapper);
}
/**
 * Processes point data into legend items
 * @param pointData   - The point data to process
 * @param theme       - The chart theme for colors
 * @param showValues  - Whether to show values in legend
 * @param withGlyph   - Whether to include glyph rendering
 * @param glyphSize   - Size of the glyph
 * @param renderGlyph - Component to render the glyph
 * @return Array of processed legend items
 */
function processPointData(pointData, theme, showValues, withGlyph, glyphSize, renderGlyph) {
    const mapper = (point, index) => {
        const baseItem = createBaseLegendItem(point.label, formatPointValue(point, showValues), theme.colors[index % theme.colors.length]);
        if (withGlyph && renderGlyph) {
            return {
                ...baseItem,
                glyphSize,
                renderGlyph,
            };
        }
        return baseItem;
    };
    return pointData.map(mapper);
}
/**
 * Hook to transform chart data into legend items
 * @param data    - The chart data to transform
 * @param theme   - The chart theme for colors
 * @param options - Configuration options for legend generation
 * @return Array of legend items ready for display
 */
function useChartLegendData(data, theme, options = {}) {
    const { showValues = false, withGlyph = false, glyphSize = 8, renderGlyph } = options;
    return react.useMemo(() => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return [];
        }
        // Handle SeriesData (multiple series with data points)
        if ('data' in data[0]) {
            return processSeriesData(data, theme, showValues, withGlyph, glyphSize, renderGlyph);
        }
        // Handle DataPointDate or DataPointPercentage (single data points)
        return processPointData(data, theme, showValues, withGlyph, glyphSize, renderGlyph);
    }, [data, theme, showValues, withGlyph, glyphSize, renderGlyph]);
}

exports.useChartLegendData = useChartLegendData;
