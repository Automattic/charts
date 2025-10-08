import { O as Optional, B as BaseChartProps, d as DataPointPercentage } from '../../types-DekewUVa.js';
import { ReactNode } from 'react';
import { LegendValueDisplay } from '../legend/index.js';
import { C as ChartComponentWithComposition } from '../../types-DQv1GcN4.js';
import { R as ResponsiveConfig } from '../../with-responsive-Cp2qnQPo.js';
import { PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@visx/xychart';
import '../../legend-CiRaC2E5.js';
import '../../types-DK1CMp9i.js';
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
    /**
     * What type of value to display in the legend when showValues is true.
     * - 'percentage': Shows percentage values (e.g., "23%") [default]
     * - 'value': Shows raw numeric values (e.g., "30000")
     * - 'valueDisplay': Shows formatted values (e.g., "30K")
     * - 'none': Shows no values, only labels
     */
    legendValueDisplay?: LegendValueDisplay;
    /**
     * Horizontal offset for tooltip positioning in pixels (default: 0)
     */
    tooltipOffsetX?: number;
    /**
     * Vertical offset for tooltip positioning in pixels (default: -15)
     */
    tooltipOffsetY?: number;
}
type PieSemiCircleChartBaseProps = Optional<PieSemiCircleChartProps, 'width'>;
type PieSemiCircleChartComponent = ChartComponentWithComposition<PieSemiCircleChartBaseProps>;
type PieSemiCircleChartResponsiveComponent = ChartComponentWithComposition<PieSemiCircleChartBaseProps & ResponsiveConfig>;
type ArcData = PieArcDatum<DataPointPercentage>;
declare const PieSemiCircleChart: PieSemiCircleChartComponent;
declare const PieSemiCircleChartResponsive: PieSemiCircleChartResponsiveComponent;

export { type ArcData, PieSemiCircleChartResponsive as PieSemiCircleChart, type PieSemiCircleChartProps, PieSemiCircleChart as PieSemiCircleChartUnresponsive };
