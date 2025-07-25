import { BaseLegendItem } from '../../components/legend/types.js';
import { ChartTheme } from '../../types.js';

declare const useChartId: (providedId?: string) => string;
declare const useChartRegistration: (chartId: string, legendItems: BaseLegendItem[], theme: ChartTheme, chartType: string, isDataValid: boolean, metadata?: Record<string, unknown>) => void;

export { useChartId, useChartRegistration };
