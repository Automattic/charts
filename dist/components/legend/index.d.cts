export { L as Legend } from '../../legend-CGLLcxnk.cjs';
import { c as SeriesData, b as DataPointDate, d as DataPointPercentage } from '../../types-B0lF6x8l.cjs';
import { a as BaseLegendItem } from '../../types-4lieC41v.cjs';
export { B as BaseLegendProps, L as LegendProps } from '../../types-4lieC41v.cjs';
import { LegendShape } from '@visx/legend/lib/types';
import { GlyphProps } from '@visx/xychart';
import { ReactNode } from 'react';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/scale';
import '@visx/legend';

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
declare function useChartLegendItems<T extends SeriesData[] | DataPointDate[] | DataPointPercentage[]>(data: T, options?: ChartLegendOptions, legendShape?: LegendShape<SeriesData[], number>): BaseLegendItem[];

export { BaseLegendItem, type ChartLegendOptions, useChartLegendItems };
