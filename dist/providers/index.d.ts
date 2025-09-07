export { C as ChartRegistration, b as GlobalChartsContext, c as GlobalChartsContextValue, G as GlobalChartsProvider, T as ThemeProvider, d as defaultTheme, j as jetpackTheme, e as useChartTheme, u as useGlobalChartsContext, a as useGlobalChartsTheme, w as wooTheme } from '../use-global-charts-theme-D3LjTUGh.js';
import { a as BaseLegendItem } from '../types-4lieC41v.js';
import '../types-DdYRE7ga.js';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/xychart';
import 'react';
import '@visx/legend';

declare const useChartId: (providedId?: string) => string;

declare const useChartRegistration: ({ chartId, legendItems, chartType, isDataValid, metadata, }: {
    chartId: string;
    legendItems: BaseLegendItem[];
    chartType: string;
    isDataValid: boolean;
    metadata?: Record<string, unknown>;
}) => void;

export { useChartId, useChartRegistration };
