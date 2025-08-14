import { Legend } from '../legend/legend.js';
import { FC, ReactNode, ComponentType } from 'react';
import { BaseChartProps, SeriesData, DataPointDate, Optional } from '../../types.js';
import { ResponsiveConfig } from '../shared/with-responsive.js';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';

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
type BarChartResponsiveComponent = FC<BarChartBaseProps & ResponsiveConfig> & BarChartSubComponents;
declare const BarChartResponsive: BarChartResponsiveComponent;

export { type BarChartProps, BarChartResponsive as default };
