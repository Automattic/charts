import { BaseChartProps, DataPointPercentage, Optional } from '../../types.js';
import { ReactNode } from 'react';
import { ChartComponentWithComposition } from '../private/chart-composition/types.js';
import { ResponsiveConfig } from '../private/with-responsive/with-responsive.js';
import { PieArcDatum } from '@visx/shape/lib/shapes/Pie';

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
type PieSemiCircleChartResponsiveComponent = ChartComponentWithComposition<PieSemiCircleChartBaseProps & ResponsiveConfig>;
type ArcData = PieArcDatum<DataPointPercentage>;
declare const PieSemiCircleChartResponsive: PieSemiCircleChartResponsiveComponent;

export { type ArcData, type PieSemiCircleChartProps, PieSemiCircleChartResponsive as default };
