import { Legend } from '../legend/legend.js';
import { FC, ComponentType, PropsWithChildren, ReactNode } from 'react';
import { Optional, BaseChartProps, DataPointPercentage } from '../../types.js';
import { ResponsiveConfig } from '../shared/with-responsive.js';

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
     * Use the children prop to render additional elements on the chart.
     */
    children?: ReactNode;
}
type PieChartBaseProps = Optional<PieChartProps, 'size'>;
interface PieChartSubComponents {
    Legend: ComponentType<React.ComponentProps<typeof Legend>>;
    SVG: FC<PropsWithChildren>;
    HTML: FC<PropsWithChildren>;
}
type PieChartComponent = FC<PieChartBaseProps> & PieChartSubComponents;
type PieChartResponsiveComponent = FC<PieChartBaseProps & ResponsiveConfig> & PieChartSubComponents;
declare const PieChart: PieChartComponent;
declare const PieChartResponsive: PieChartResponsiveComponent;

export { PieChart as PieChartUnresponsive, PieChartResponsive as default };
