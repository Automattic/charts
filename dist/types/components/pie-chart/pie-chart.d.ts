import type { BaseChartProps, DataPointPercentage } from '../../types';
interface PieChartProps extends BaseChartProps<DataPointPercentage[]> {
    /**
     * Inner radius in pixels. If > 0, creates a donut chart. Defaults to 0.
     */
    innerRadius?: number;
}
/**
 * Renders a pie or donut chart using the provided data.
 *
 * @param {PieChartProps} props - Component props
 * @return {JSX.Element} The rendered chart component
 */
declare const PieChart: ({ data, width, height, withTooltips, innerRadius, className, showLegend, legendOrientation, }: PieChartProps) => import("react/jsx-runtime").JSX.Element;
export default PieChart;
