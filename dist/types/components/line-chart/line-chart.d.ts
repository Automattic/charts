import { FC } from 'react';
import type { BaseChartProps, SeriesData } from '../../types';
interface LineChartProps extends BaseChartProps<SeriesData[]> {
}
declare const LineChart: FC<LineChartProps>;
export default LineChart;
