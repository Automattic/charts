import { O as Optional, B as BaseChartProps, d as DataPointPercentage } from '../../types-DdYRE7ga.js';
import { ReactNode } from 'react';
import { C as ChartComponentWithComposition } from '../../types-UkvpmJXU.js';
import { R as ResponsiveConfig } from '../../with-responsive-Cp2qnQPo.js';
import { PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/xychart';
import '../../legend-iXnk1-uq.js';
import '../../types-4lieC41v.js';
import '@visx/legend';

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

export { type ArcData, PieSemiCircleChartResponsive as PieSemiCircleChart, type PieSemiCircleChartProps };
