import { L as Legend } from '../../legend-jjMmhSg3.js';
import { O as Optional, B as BaseChartProps, c as SeriesData, b as DataPointDate } from '../../types-DU5eF3uf.js';
import { FC, ReactNode, ComponentType } from 'react';
import { R as ResponsiveConfig } from '../../with-responsive-Cp2qnQPo.js';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import '../../types-C05PdDJa.js';
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

interface BarChartProps extends BaseChartProps<SeriesData[]> {
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    orientation?: 'horizontal' | 'vertical';
    withPatterns?: boolean;
    showZeroValues?: boolean;
    legendInteractive?: boolean;
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
