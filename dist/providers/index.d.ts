export { C as ChartRegistration, E as ElementStyles, e as GetElementStylesParams, b as GlobalChartsContext, c as GlobalChartsContextValue, G as GlobalChartsProvider, d as defaultTheme, u as useGlobalChartsContext, a as useGlobalChartsTheme } from '../themes-GEPvLhum.js';
import { B as BaseLegendItem } from '../types-C05PdDJa.js';
import 'react';
import '../types-B1_Q_Lhh.js';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@visx/xychart';
import 'react-google-charts';
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
