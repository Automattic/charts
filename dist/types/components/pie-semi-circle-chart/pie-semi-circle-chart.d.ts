import { Legend } from '../legend/legend.js';
import { FC, ComponentType, PropsWithChildren, ReactNode } from 'react';
import { Optional, BaseChartProps, DataPointPercentage } from '../../types.js';
import { ResponsiveConfig } from '../shared/with-responsive.js';

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
    /**
     * Use the children prop to render additional elements on the chart.
     */
    children?: ReactNode;
}
type PieSemiCircleChartBaseProps = Optional<PieSemiCircleChartProps, 'width'>;
interface PieSemiCircleChartSubComponents {
    Legend: ComponentType<React.ComponentProps<typeof Legend>>;
    SVG: FC<PropsWithChildren>;
    HTML: FC<PropsWithChildren>;
}
type PieSemiCircleChartResponsiveComponent = FC<PieSemiCircleChartBaseProps & ResponsiveConfig> & PieSemiCircleChartSubComponents;
declare const PieSemiCircleChartResponsive: PieSemiCircleChartResponsiveComponent;

export { PieSemiCircleChartResponsive as default };
