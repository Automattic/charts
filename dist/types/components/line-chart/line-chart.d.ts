import type { BaseChartProps, SeriesData } from '../../types';
interface LineChartProps extends BaseChartProps<SeriesData[]> {
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    withGradientFill: boolean;
}
declare const _default: (props: Omit<LineChartProps, "width" | "height" | "size">) => import("react/jsx-runtime").JSX.Element;
export default _default;
