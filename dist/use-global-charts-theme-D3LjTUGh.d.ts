import { C as ChartTheme, e as CompleteChartTheme } from './types-DdYRE7ga.js';
import * as react from 'react';
import { FC, ReactNode } from 'react';
import { a as BaseLegendItem } from './types-4lieC41v.js';

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
declare const defaultTheme: CompleteChartTheme;
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
 * Hook to get the effective chart theme, merging global and local themes.
 *
 * This hook combines the global theme from GlobalChartsProvider with the local theme
 * from ThemeProvider. The global theme provides the base, while the local theme
 * can override specific properties for fine-grained customization.
 *
 * @return The effective chart theme to use
 */
declare const useGlobalChartsTheme: () => CompleteChartTheme;

export { type ChartRegistration as C, GlobalChartsProvider as G, ThemeProvider as T, useGlobalChartsTheme as a, GlobalChartsContext as b, type GlobalChartsContextValue as c, defaultTheme as d, useChartTheme as e, jetpackTheme as j, useGlobalChartsContext as u, wooTheme as w };
