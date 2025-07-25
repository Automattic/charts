import { LegendItemWithGlyph, LegendItemWithoutGlyph } from './types.js';
import { SeriesData, DataPointDate, DataPointPercentage, ChartTheme } from '../../types.js';

interface ChartLegendOptions {
    withGlyph?: boolean;
    glyphSize?: number;
    renderGlyph?: React.ComponentType<unknown>;
    showValues?: boolean;
}
/**
 * Hook to transform chart data into legend items
 * @param data    - The chart data to transform
 * @param theme   - The chart theme for colors
 * @param options - Configuration options for legend generation
 * @return Array of legend items ready for display
 */
declare function useChartLegendData<T extends SeriesData[] | DataPointDate[] | DataPointPercentage[]>(data: T, theme: ChartTheme, options?: ChartLegendOptions): LegendItemWithGlyph[] | LegendItemWithoutGlyph[];

export { type ChartLegendOptions, useChartLegendData };
