import * as react_jsx_runtime from 'react/jsx-runtime';
import { ResponsiveConfig } from '../shared/with-responsive.js';
import { BaseChartProps, DataPointPercentage } from '../../types.js';
import { ReactNode } from 'react';

type OmitBaseChartProps = Omit<BaseChartProps<DataPointPercentage[]>, 'width' | 'height'>;
interface PieChartProps extends OmitBaseChartProps {
    /**
     * Inner radius in pixels. If > 0, creates a donut chart. Defaults to 0.
     */
    innerRadius?: number;
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
    /**
     * Use the children prop to render additional elements on the chart.
     */
    children?: ReactNode;
}
declare const _default: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<PieChartProps>, "height" | "size" | "width"> & Omit<PieChartProps, "height" | "size" | "width"> & ResponsiveConfig) => react_jsx_runtime.JSX.Element;

export { _default as default };
