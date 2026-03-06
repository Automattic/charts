import * as react from 'react';
import { ReactNode, CSSProperties, FC } from 'react';
import { b as CompleteChartTheme, j as SeriesData, d as DataPointPercentage, C as ChartTheme } from './types-DZordNiO.js';
import { B as BaseLegendItem } from './types-rG19BIbu.js';
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
    /**
     * Optional ref to an element that chart tooltip portals should be relocated into.
     * When provided, visx tooltip portals (normally appended to document.body) will be
     * moved into this container so they participate in the same effective CSS stacking context.
     * The element referenced here, or one of its ancestors, should establish the desired
     * stacking context (for example by using `position` and `z-index`) so that tooltips
     * appear above the relevant chart content.
     */
    portalContainer?: React.RefObject<HTMLElement | null>;
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
