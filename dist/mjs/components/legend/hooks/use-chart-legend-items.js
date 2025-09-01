import { useMemo } from 'react';
import '../../../providers/chart-context/global-charts-provider.js';
import 'fast-deep-equal';
import '@visx/event';
import '@visx/tooltip';
import '@visx/xychart';
import 'date-fns';
import '@automattic/number-formatters';
import '@visx/text';
import { getItemShapeStyles, getSeriesStroke } from '../../../utils/get-styles.js';
import 'deepmerge';
import '@visx/scale';
import { useGlobalChartsTheme } from '../../../providers/chart-context/hooks/use-global-charts-theme.js';

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
        const { shapeStyles } = getItemShapeStyles(series, index, theme, legendShape);
        const baseItem = {
            label: series.label,
            value: showValues ? series.data?.length?.toString() || '0' : '',
            color: getSeriesStroke(series, index, theme.colors),
            shapeStyle: shapeStyles,
            group: series.group,
            index,
            overrideColor: series.options?.stroke,
        };
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
        const baseItem = {
            label: point.label,
            value: formatPointValue(point, showValues),
            color: point.color ?? theme.colors[index % theme.colors.length],
            group: point.group,
            index,
            overrideColor: point.color,
        };
        if (withGlyph && renderGlyph) {
            const itemWithGlyph = {
                ...baseItem,
                glyphSize,
                renderGlyph,
            };
            return itemWithGlyph;
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
function useChartLegendItems(data, options = {}, legendShape) {
    const { showValues = false, withGlyph = false, glyphSize = 8, renderGlyph } = options;
    const theme = useGlobalChartsTheme();
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

export { useChartLegendItems };
