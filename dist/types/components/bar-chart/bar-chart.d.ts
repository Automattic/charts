import type { BaseChartProps, SeriesData } from '../../types';
interface BarChartProps extends BaseChartProps<SeriesData[]> {
}
declare const _default: (props: Omit<BarChartProps, "width" | "height" | "size">) => import("react/jsx-runtime").JSX.Element;
export default _default;
