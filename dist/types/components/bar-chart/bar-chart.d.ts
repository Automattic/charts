import * as react_jsx_runtime from 'react/jsx-runtime';
import { ResponsiveConfig } from '../shared/with-responsive.js';
import { BaseChartProps, SeriesData, DataPointDate } from '../../types.js';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import { ReactNode } from 'react';

interface BarChartProps extends BaseChartProps<SeriesData[]> {
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    orientation?: 'horizontal' | 'vertical';
    withPatterns?: boolean;
    showZeroValues?: boolean;
}
declare const _default: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<BarChartProps>, "height" | "size" | "width"> & Omit<BarChartProps, "height" | "size" | "width"> & ResponsiveConfig) => react_jsx_runtime.JSX.Element;

export { type BarChartProps, _default as default };
