export { C as ChartRegistration, E as ElementStyles, e as GetElementStylesParams, b as GlobalChartsContext, c as GlobalChartsContextValue, G as GlobalChartsProvider, d as defaultTheme, j as jetpackTheme, u as useGlobalChartsContext, a as useGlobalChartsTheme, w as wooTheme } from '../themes-BQl0lAdj.cjs';
import { a as BaseLegendItem } from '../types-athdF3-8.cjs';
import 'react';
import '../types-oNXkzU5p.cjs';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/xychart';
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
