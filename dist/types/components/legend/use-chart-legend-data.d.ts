import { LegendItemWithGlyph, LegendItemWithoutGlyph } from './types.js';
import { SeriesData, DataPointDate, DataPointPercentage } from '../../types.js';
import { LegendShape } from '@visx/legend/lib/types';

interface ChartLegendOptions {
    withGlyph?: boolean;
    glyphSize?: number;
    renderGlyph?: React.ComponentType<unknown>;
    showValues?: boolean;
}
/**
 * Hook to transform chart data into legend items
 * @param data        - The chart data to transform
 * @param options     - Configuration options for legend generation
 * @param legendShape - The shape type for legend items (string literal or React component)
 * @return Array of legend items ready for display
 */
declare function useChartLegendData<T extends SeriesData[] | DataPointDate[] | DataPointPercentage[]>(data: T, options?: ChartLegendOptions, legendShape?: LegendShape<SeriesData[], number>): LegendItemWithGlyph[] | LegendItemWithoutGlyph[];

export { type ChartLegendOptions, useChartLegendData };
