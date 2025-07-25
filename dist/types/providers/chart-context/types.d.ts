import { BaseLegendItem } from '../../components/legend/types.js';
import { ChartTheme } from '../../types.js';

interface ChartRegistration {
    legendItems: BaseLegendItem[];
    theme: ChartTheme;
    chartType: string;
    metadata?: Record<string, unknown>;
}
interface ChartContextValue {
    charts: Map<string, ChartRegistration>;
    registerChart: (id: string, data: ChartRegistration) => void;
    unregisterChart: (id: string) => void;
    getChartData: (id: string) => ChartRegistration | undefined;
}

export type { ChartContextValue, ChartRegistration };
