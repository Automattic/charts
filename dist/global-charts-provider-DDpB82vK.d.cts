import { C as ChartTheme } from './types-B0lF6x8l.cjs';
import * as react from 'react';
import { FC, ReactNode } from 'react';
import { a as BaseLegendItem } from './types-4lieC41v.cjs';

/**
 * Hook to access chart theme
 * @return {object} A built theme configuration compatible with visx charts
 */
declare const useChartTheme: () => Partial<ChartTheme>;
/**
 * Props for the ThemeProvider component
 */
type ThemeProviderProps = {
    /** Optional partial theme override */
    theme?: Partial<ChartTheme>;
    /** Child components that will have access to the theme */
    children: ReactNode;
};
declare const ThemeProvider: FC<ThemeProviderProps>;

/**
 * Default theme configuration
 */
declare const defaultTheme: ChartTheme;
/**
 * Jetpack theme configuration
 */
declare const jetpackTheme: ChartTheme;
/**
 * Woo theme configuration
 */
declare const wooTheme: ChartTheme;

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
    theme: ChartTheme;
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

export { type ChartRegistration as C, GlobalChartsProvider as G, ThemeProvider as T, type GlobalChartsContextValue as a, GlobalChartsContext as b, defaultTheme as d, jetpackTheme as j, useChartTheme as u, wooTheme as w };
