import { R as ResponsiveConfig } from '../../with-responsive-Cp2qnQPo.js';
import { ReactNode } from 'react';
import { LegendValueDisplay } from '../../components/legend/index.js';
import { O as Optional, B as BaseChartProps, e as DataPointPercentage } from '../../types-sQ20gAeB.js';
import { C as ChartComponentWithComposition } from '../../types-DQNnq5Fr.js';
import '../../legend-jjMmhSg3.js';
import '../../types-C05PdDJa.js';
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
     * Use the children prop to render additional elements on the chart.
     */
    children?: ReactNode;
    /**
     * Horizontal offset for tooltip positioning in pixels (default: 0)
     */
    tooltipOffsetX?: number;
    /**
     * Vertical offset for tooltip positioning in pixels (default: -15)
     */
    tooltipOffsetY?: number;
}
type PieChartBaseProps = Optional<PieChartProps, 'size'>;
type PieChartComponent = ChartComponentWithComposition<PieChartBaseProps>;
type PieChartResponsiveComponent = ChartComponentWithComposition<PieChartBaseProps & ResponsiveConfig>;
declare const PieChart: PieChartComponent;
declare const PieChartResponsive: PieChartResponsiveComponent;

export { PieChartResponsive as PieChart, type PieChartProps, PieChart as PieChartUnresponsive };
