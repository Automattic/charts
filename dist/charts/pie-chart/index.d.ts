import { R as ResponsiveConfig } from '../../with-responsive-CNfhzAUu.js';
import { ReactNode } from 'react';
import { O as Optional, B as BaseChartProps, e as DataPointPercentage } from '../../types-ChOUI9-N.js';
import { LegendValueDisplay } from '../../components/legend/index.js';
import { C as ChartComponentWithComposition } from '../../types-BsHooDbM.js';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@visx/xychart';
import '@wordpress/theme';
import 'react-google-charts';
import '../../legend-DLswHhOk.js';
import '../../types-BuSrRM4p.js';
import '@visx/legend';

/**
 * Parameters passed to the renderTooltip function for pie charts.
 */
type PieChartRenderTooltipParams = {
    /**
     * The data point being hovered, including label, value, and percentage.
     */
    tooltipData: DataPointPercentage;
};
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
    /**
     * Custom render function for tooltip content.
     * When provided, replaces the default BaseTooltip with custom content.
     */
    renderTooltip?: (params: PieChartRenderTooltipParams) => ReactNode;
}
type PieChartBaseProps = Optional<PieChartProps, 'size'>;
type PieChartComponent = ChartComponentWithComposition<PieChartBaseProps>;
type PieChartResponsiveComponent = ChartComponentWithComposition<PieChartBaseProps & ResponsiveConfig>;
declare const PieChart: PieChartComponent;
declare const PieChartResponsive: PieChartResponsiveComponent;

export { PieChartResponsive as PieChart, type PieChartProps, type PieChartRenderTooltipParams, PieChart as PieChartUnresponsive };
