export { C as ChartRegistration, E as ElementStyles, c as GetElementStylesParams, G as GlobalChartsContext, e as GlobalChartsContextValue, a as GlobalChartsProvider, d as defaultTheme, u as useGlobalChartsContext, b as useGlobalChartsTheme } from '../themes-itO4Ht5g.js';
import { B as BaseLegendItem } from '../types-BuSrRM4p.js';
import 'react';
import '../types-ChOUI9-N.js';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@visx/xychart';
import '@wordpress/theme';
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
