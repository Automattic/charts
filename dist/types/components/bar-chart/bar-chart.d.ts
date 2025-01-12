import { FC } from 'react';
import type { BaseChartProps, SeriesData } from '../../types';
interface BarChartProps extends BaseChartProps<SeriesData[]> {
}
declare const BarChart: FC<BarChartProps>;
export default BarChart;
