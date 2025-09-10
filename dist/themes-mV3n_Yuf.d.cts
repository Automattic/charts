import * as react from 'react';
import { FC, ReactNode } from 'react';
import { e as CompleteChartTheme, C as ChartTheme } from './types-pVkkGIaQ.cjs';
import { a as BaseLegendItem } from './types-4lieC41v.cjs';

interface ChartRegistration {
    legendItems: BaseLegendItem[];
    chartType: string;
    metadata?: Record<string, unknown>;
}
interface GlobalChartsContextValue {
    charts: Map<string, ChartRegistration>;
    registerChart: (id: string, data: ChartRegistration) => void;
    unregisterChart: (id: string) => void;
    getChartData: (id: string) => ChartRegistration | undefined;
    /** Theme provided by the GlobalChartsProvider (merged with defaults) */
    theme: CompleteChartTheme;
    /**
     * Resolve a stable color for a series.
     * - If an override color is passed, it wins.
     * - If a group is provided, returns a stable color per group across charts.
     * - If no group, falls back to index-based color from the theme palette.
     */
    resolveGroupColor: (params: {
        group?: string;
        index: number;
        overrideColor?: string;
    }) => string;
}

declare const GlobalChartsContext: react.Context<GlobalChartsContextValue>;
interface GlobalChartsProviderProps {
    children: ReactNode;
    /** Optional theme override. Considered static for provider lifecycle. */
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

export { type ChartRegistration as C, GlobalChartsProvider as G, useGlobalChartsTheme as a, GlobalChartsContext as b, type GlobalChartsContextValue as c, defaultTheme as d, jetpackTheme as j, useGlobalChartsContext as u, wooTheme as w };
