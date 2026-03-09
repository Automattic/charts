export { C as ChartRegistration, E as ElementStyles, c as GetElementStylesParams, G as GlobalChartsContext, e as GlobalChartsContextValue, a as GlobalChartsProvider, d as defaultTheme, u as useGlobalChartsContext, b as useGlobalChartsTheme } from '../themes-CKOifAWZ.cjs';
import { a as BaseLegendItem } from '../types-DJVOwGz-.cjs';
import 'react';
import '@visx/legend/lib/types';
import '@visx/xychart';
import '@visx/legend';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@wordpress/theme';
import 'react-google-charts';

declare const useChartId: (providedId?: string) => string;

declare const useChartRegistration: ({ chartId, legendItems, chartType, isDataValid, metadata, }: {
    chartId: string;
    legendItems: BaseLegendItem[];
    chartType: string;
    isDataValid: boolean;
    metadata?: Record<string, unknown>;
}) => void;

export { useChartId, useChartRegistration };
