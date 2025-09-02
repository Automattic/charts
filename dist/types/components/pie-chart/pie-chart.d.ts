import { BaseChartProps, DataPointPercentage, Optional } from '../../types.js';
import { ReactNode } from 'react';
import { ChartComponentWithComposition } from '../private/chart-composition/types.js';
import { ResponsiveConfig } from '../private/with-responsive/with-responsive.js';

interface PieChartProps extends BaseChartProps<DataPointPercentage[]> {
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
     * Whether to show labels on pie segments. Defaults to true.
     */
    showLabels?: boolean;
    /**
     * Use the children prop to render additional elements on the chart.
     */
    children?: ReactNode;
}
type PieChartBaseProps = Optional<PieChartProps, 'size'>;
type PieChartComponent = ChartComponentWithComposition<PieChartBaseProps>;
type PieChartResponsiveComponent = ChartComponentWithComposition<PieChartBaseProps & ResponsiveConfig>;
declare const PieChart: PieChartComponent;
declare const PieChartResponsive: PieChartResponsiveComponent;

export { type PieChartProps, PieChart as PieChartUnresponsive, PieChartResponsive as default };
