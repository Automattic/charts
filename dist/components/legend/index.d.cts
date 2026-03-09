export { L as Legend } from '../../legend-BC_6yOtq.cjs';
import { o as SeriesData, d as DataPointDate, e as DataPointPercentage, a as BaseLegendItem } from '../../types-DJVOwGz-.cjs';
export { q as BaseLegendProps, h as LegendItemStyles, i as LegendLabelStyles, j as LegendPosition, r as LegendProps, k as LegendShapeStyles } from '../../types-DJVOwGz-.cjs';
import { LegendShape } from '@visx/legend/lib/types';
import { GlyphProps } from '@visx/xychart';
import { ReactNode } from 'react';
import '@visx/legend';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@wordpress/theme';
import 'react-google-charts';

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
