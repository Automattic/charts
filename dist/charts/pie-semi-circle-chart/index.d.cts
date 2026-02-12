import { ReactNode } from 'react';
import { LegendValueDisplay } from '../../components/legend/index.cjs';
import { O as Optional, B as BaseChartProps, d as DataPointPercentage } from '../../types-BCFQlzTM.cjs';
import { C as ChartComponentWithComposition } from '../../types-BBwg4Evw.cjs';
import { R as ResponsiveConfig } from '../../with-responsive-CNfhzAUu.cjs';
import { PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import '../../legend-C9ahiwOt.cjs';
import '../../types-C05PdDJa.cjs';
import '@visx/legend';
import '@visx/xychart';
import '@visx/legend/lib/types';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/scale';
import '@visx/text/lib/Text';
import 'react-google-charts';

/**
 * Parameters passed to the renderTooltip function for semi-circle charts.
 */
type PieSemiCircleChartRenderTooltipParams = {
    /**
     * The data point being hovered, including label, value, and percentage.
     */
    tooltipData: DataPointPercentage;
};
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
     * Enable interactive legend items that can toggle segment visibility.
     * Requires chartId and GlobalChartsProvider.
     * When segments are hidden, percentages are recalculated so visible segments total 100%.
     */
    legendInteractive?: boolean;
    /**
     * Horizontal offset for tooltip positioning in pixels (default: 0)
     */
    tooltipOffsetX?: number;
    /**
     * Vertical offset for tooltip positioning in pixels (default: -15)
     */
    tooltipOffsetY?: number;
    /**
     * Custom render function for tooltip content.
     * When provided, replaces the default BaseTooltip with custom content.
     */
    renderTooltip?: (params: PieSemiCircleChartRenderTooltipParams) => ReactNode;
}
type PieSemiCircleChartBaseProps = Optional<PieSemiCircleChartProps, 'width'>;
type PieSemiCircleChartComponent = ChartComponentWithComposition<PieSemiCircleChartBaseProps>;
type PieSemiCircleChartResponsiveComponent = ChartComponentWithComposition<PieSemiCircleChartBaseProps & ResponsiveConfig>;
type ArcData = PieArcDatum<DataPointPercentage>;
declare const PieSemiCircleChart: PieSemiCircleChartComponent;
declare const PieSemiCircleChartResponsive: PieSemiCircleChartResponsiveComponent;

export { type ArcData, PieSemiCircleChartResponsive as PieSemiCircleChart, type PieSemiCircleChartProps, type PieSemiCircleChartRenderTooltipParams, PieSemiCircleChart as PieSemiCircleChartUnresponsive };
