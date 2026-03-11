import { L as Legend } from '../../legend-DLswHhOk.js';
import { O as Optional, B as BaseChartProps, o as SeriesData, d as DataPointDate } from '../../types-ChOUI9-N.js';
import { FC, ReactNode, ComponentType } from 'react';
import { R as ResponsiveConfig } from '../../with-responsive-CNfhzAUu.js';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import '../../types-BuSrRM4p.js';
import '@visx/legend';
import '@visx/xychart';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@wordpress/theme';
import 'react-google-charts';

interface BarChartProps extends BaseChartProps<SeriesData[]> {
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    orientation?: 'horizontal' | 'vertical';
    withPatterns?: boolean;
    showZeroValues?: boolean;
    children?: ReactNode;
}
type BarChartBaseProps = Optional<BarChartProps, 'width' | 'height' | 'size'>;
interface BarChartSubComponents {
    Legend: ComponentType<React.ComponentProps<typeof Legend>>;
}
type BarChartComponent = FC<BarChartBaseProps> & BarChartSubComponents;
type BarChartResponsiveComponent = FC<BarChartBaseProps & ResponsiveConfig> & BarChartSubComponents;
declare const BarChart: BarChartComponent;
declare const BarChartResponsive: BarChartResponsiveComponent;

export { BarChartResponsive as BarChart, type BarChartProps, BarChart as BarChartUnresponsive };
