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
     * Thickness of the pie chart.
     * A value between 0 and 1, where 0 means no thickness
     * and 1 means the maximum thickness.
     */
    thickness?: number;
    /**
     * Scale of the gap between groups in the pie chart
     * A value between 0 and 1, where 0 means no gap.
     */
    gapScale?: number;
    /**
     * Scale of the corner radius for the pie chart segments.
     * A value between 0 and 1, where 0 means no corner radius.
     */
    cornerScale?: number;
}
declare const _default: (props: Omit<PieChartProps, "width" | "height">) => import("react/jsx-runtime").JSX.Element;
export default _default;
