import * as react_jsx_runtime from 'react/jsx-runtime';
import { ResponsiveConfig } from '../shared/with-responsive.js';
import { BaseChartProps, DataPointPercentage } from '../../types.js';

interface PieSemiCircleChartProps extends BaseChartProps<DataPointPercentage[]> {
    /**
     * Width of the chart in pixels; height would be half of this value calculated automatically.
     */
    width?: number;
    /**
     * Thickness of the pie chart. A value between 0 and 1
     */
    thickness?: number;
    /**
     * Direction of chart rendering
     * true for clockwise, false for counter-clockwise
     */
    clockwise?: boolean;
    /**
     * Label text to display above the chart
     */
    label?: string;
    /**
     * Note text to display below the label
     */
    note?: string;
}
declare const PieSemiCircleChartResponsive: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<PieSemiCircleChartProps>, "width" | "height" | "size"> & Omit<PieSemiCircleChartProps, "width" | "height" | "size"> & ResponsiveConfig) => react_jsx_runtime.JSX.Element;

export { PieSemiCircleChartResponsive as default };
