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
declare const _default: (props: Omit<PieSemiCircleChartProps, "width" | "height">) => import("react/jsx-runtime").JSX.Element;
export default _default;
