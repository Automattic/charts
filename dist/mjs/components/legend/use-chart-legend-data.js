import '@visx/xychart';
import { useMemo } from 'react';
import 'fast-deep-equal';
import { useGlobalChartTheme } from '../../hooks/use-global-chart-theme.js';
import '@visx/event';
import '@visx/tooltip';
import { getSeriesStyles, getItemShapeStyles } from '../../utils/get-styles.js';

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
 * @param label      - The label for the legend item
 * @param value      - The value for the legend item
 * @param color      - The color for the legend item
 * @param shapeStyle - The shape style for the legend item
 * @return Base legend item object
 */
function createBaseLegendItem(label, value, color, shapeStyle) {
    return {
        label,
        value,
        color,
        shapeStyle,
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
 * @param legendShape - The shape to use for the legend
 * @return Array of processed legend items
 */
function processSeriesData(seriesData, theme, showValues, withGlyph, glyphSize, renderGlyph, legendShape) {
    const mapper = (series, index) => {
        const { stroke } = getSeriesStyles(series, index, theme);
        const { shapeStyles } = getItemShapeStyles(series, index, theme, legendShape);
        const baseItem = createBaseLegendItem(series.label, showValues ? series.data?.length?.toString() || '0' : '', stroke, shapeStyles);
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
 * @param data        - The chart data to transform
 * @param options     - Configuration options for legend generation
 * @param legendShape - The shape type for legend items (string literal or React component)
 * @return Array of legend items ready for display
 */
function useChartLegendData(data, options = {}, legendShape) {
    const { showValues = false, withGlyph = false, glyphSize = 8, renderGlyph } = options;
    const theme = useGlobalChartTheme();
    return useMemo(() => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return [];
        }
        // Handle SeriesData (multiple series with data points)
        if ('data' in data[0]) {
            return processSeriesData(data, theme, showValues, withGlyph, glyphSize, renderGlyph, legendShape);
        }
        // Handle DataPointDate or DataPointPercentage (single data points)
        return processPointData(data, theme, showValues, withGlyph, glyphSize, renderGlyph);
    }, [data, theme, showValues, withGlyph, glyphSize, renderGlyph, legendShape]);
}

export { useChartLegendData };
