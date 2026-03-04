export { L as Legend } from '../../legend-C9ahiwOt.cjs';
import { j as SeriesData, c as DataPointDate, d as DataPointPercentage } from '../../types-DZordNiO.cjs';
import { B as BaseLegendItem } from '../../types-C05PdDJa.cjs';
export { a as BaseLegendProps, L as LegendProps } from '../../types-C05PdDJa.cjs';
import { LegendShape } from '@visx/legend/lib/types';
import { GlyphProps } from '@visx/xychart';
import { ReactNode } from 'react';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@wordpress/theme';
import 'react-google-charts';
import '@visx/legend';

type LegendValueDisplay = 'percentage' | 'value' | 'valueDisplay' | 'none';
interface ChartLegendOptions {
    withGlyph?: boolean;
    glyphSize?: number;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    showValues?: boolean;
    legendValueDisplay?: LegendValueDisplay;
    legendShape?: LegendShape<SeriesData[], number>;
}
/**
 * Hook to transform chart data into legend items
 * @param data        - The chart data to transform
 * @param options     - Configuration options for legend generation
 * @param legendShape - The shape type for legend items (string literal or React component)
 * @return Array of legend items ready for display
 */
declare function useChartLegendItems<T extends SeriesData[] | DataPointDate[] | DataPointPercentage[]>(data: T, options?: ChartLegendOptions, legendShape?: LegendShape<SeriesData[], number>): BaseLegendItem[];

export { BaseLegendItem, type ChartLegendOptions, type LegendValueDisplay, useChartLegendItems };
