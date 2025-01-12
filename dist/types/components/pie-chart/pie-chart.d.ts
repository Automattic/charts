import type { BaseChartProps, DataPointPercentage } from '../../types';
interface PieChartProps extends BaseChartProps<DataPointPercentage[]> {
    /**
     * Inner radius in pixels. If > 0, creates a donut chart. Defaults to 0.
     */
    innerRadius?: number;
}
declare const _default: (props: Omit<PieChartProps, "width" | "height">) => import("react/jsx-runtime").JSX.Element;
export default _default;
