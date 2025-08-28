import { BaseLegendItem } from './types.js';
import { SeriesData, DataPointDate, DataPointPercentage } from '../../types.js';
import { LegendShape } from '@visx/legend/lib/types';
import { GlyphProps } from '@visx/xychart';
import { ReactNode } from 'react';

interface ChartLegendOptions {
    withGlyph?: boolean;
    glyphSize?: number;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    showValues?: boolean;
}
/**
 * Hook to transform chart data into legend items
 * @param data        - The chart data to transform
 * @param options     - Configuration options for legend generation
 * @param legendShape - The shape type for legend items (string literal or React component)
 * @return Array of legend items ready for display
 */
declare function useChartLegendData<T extends SeriesData[] | DataPointDate[] | DataPointPercentage[]>(data: T, options?: ChartLegendOptions, legendShape?: LegendShape<SeriesData[], number>): BaseLegendItem[];

export { type ChartLegendOptions, useChartLegendData };
