import * as react from 'react';
import { ReactNode, CSSProperties, FC } from 'react';
import { b as CompleteChartTheme, j as SeriesData, d as DataPointPercentage, C as ChartTheme } from './types-BCFQlzTM.cjs';
import { B as BaseLegendItem } from './types-C05PdDJa.cjs';
import { LegendShape } from '@visx/legend/lib/types';
import { LineStyles, GlyphProps } from '@visx/xychart';

interface ChartRegistration {
    legendItems: BaseLegendItem[];
    chartType: string;
    metadata?: Record<string, unknown>;
}
type GetElementStylesParams = {
    index: number;
    data?: SeriesData | DataPointPercentage;
    overrideColor?: string;
    legendShape?: LegendShape<SeriesData[], number>;
};
type ElementStyles = {
    color: string;
    lineStyles: LineStyles;
    glyph: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    shapeStyles: CSSProperties & LineStyles;
};
interface GlobalChartsContextValue {
    charts: Map<string, ChartRegistration>;
    registerChart: (id: string, data: ChartRegistration) => void;
    unregisterChart: (id: string) => void;
    getChartData: (id: string) => ChartRegistration | undefined;
    theme: CompleteChartTheme;
    getElementStyles: (params: GetElementStylesParams) => ElementStyles;
    toggleSeriesVisibility: (chartId: string, seriesLabel: string) => void;
    isSeriesVisible: (chartId: string, seriesLabel: string) => boolean;
    getHiddenSeries: (chartId: string) => Set<string>;
}

declare const GlobalChartsContext: react.Context<GlobalChartsContextValue>;
interface GlobalChartsProviderProps {
    children: ReactNode;
    theme?: Partial<ChartTheme>;
}
declare const GlobalChartsProvider: FC<GlobalChartsProviderProps>;

declare const useGlobalChartsContext: () => GlobalChartsContextValue;

/**
 * Hook to get the global chart theme from GlobalChartsProvider
 *
 * @return The global chart theme
 */
declare const useGlobalChartsTheme: () => CompleteChartTheme;

/**
 * Default theme configuration
 */
declare const defaultTheme: CompleteChartTheme;

export { type ChartRegistration as C, type ElementStyles as E, GlobalChartsContext as G, GlobalChartsProvider as a, useGlobalChartsTheme as b, type GetElementStylesParams as c, defaultTheme as d, type GlobalChartsContextValue as e, useGlobalChartsContext as u };
