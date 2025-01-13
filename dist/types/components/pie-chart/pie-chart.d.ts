import type { BaseChartProps, DataPointPercentage } from '../../types';
type OmitBaseChartProps = Omit<BaseChartProps<DataPointPercentage[]>, 'width' | 'height'>;
interface PieChartProps extends OmitBaseChartProps {
    /**
     * Inner radius in pixels. If > 0, creates a donut chart. Defaults to 0.
     */
    innerRadius?: number;
    /**
     * Size of the chart in pixels
     */
    size?: number;
    /**
     * Add padding to the chart
     */
    padding?: number;
    /**
     * Thickness of the pie chart. A value between 0 and 1
     */
    thickness?: number;
}
declare const _default: (props: Omit<PieChartProps, "width" | "height">) => import("react/jsx-runtime").JSX.Element;
export default _default;
