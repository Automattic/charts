import * as react from 'react';
import { ReactNode, CSSProperties, FC } from 'react';
import { e as CompleteChartTheme, c as SeriesData, d as DataPointPercentage, C as ChartTheme } from './types-D89-qczc.js';
import { a as BaseLegendItem } from './types-athdF3-8.js';
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
/**
 * Jetpack theme configuration
 */
declare const jetpackTheme: ChartTheme;
/**
 * Woo theme configuration
 */
declare const wooTheme: ChartTheme;

export { type ChartRegistration as C, type ElementStyles as E, GlobalChartsProvider as G, useGlobalChartsTheme as a, GlobalChartsContext as b, type GlobalChartsContextValue as c, defaultTheme as d, type GetElementStylesParams as e, jetpackTheme as j, useGlobalChartsContext as u, wooTheme as w };
