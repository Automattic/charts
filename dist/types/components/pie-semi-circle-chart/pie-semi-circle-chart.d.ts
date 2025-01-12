import { FC } from 'react';
import type { BaseChartProps, DataPointPercentage } from '../../types';
interface PieSemiCircleChartProps extends BaseChartProps<DataPointPercentage[]> {
    /**
     * Label text to display above the chart
     */
    label: string;
    /**
     * Note text to display below the label
     */
    note: string;
    /**
     * Direction of chart rendering
     * true for clockwise, false for counter-clockwise
     */
    clockwise?: boolean;
    /**
     * Thickness of the pie chart. A value between 0 and 1
     */
    thickness?: number;
}
declare const PieSemiCircleChart: FC<PieSemiCircleChartProps>;
export default PieSemiCircleChart;
