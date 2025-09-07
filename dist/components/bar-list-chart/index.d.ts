import * as react_jsx_runtime from 'react/jsx-runtime';
import { R as ResponsiveConfig } from '../../with-responsive-Cp2qnQPo.js';
import { TextProps } from '@visx/text';
import { BarChartProps } from '../bar-chart/index.js';
import { ComponentType } from 'react';
import { f as ScaleOptions, c as SeriesData } from '../../types-DdYRE7ga.js';
import '../../legend-iXnk1-uq.js';
import '../../types-4lieC41v.js';
import '@visx/legend';
import '@visx/xychart';
import '@visx/xychart/lib/components/Tooltip';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';

interface BarListChartProps extends Exclude<BarChartProps, 'orientation' | 'size' | 'gridVisibility'> {
    options?: {
        /**
         * Scale for the y axis. Exclude the type property.
         */
        yScale: Omit<ScaleOptions, 'type'>;
        /**
         * Scale for the x axis. Exclude the type property.
         */
        xScale: Omit<ScaleOptions, 'type'>;
        /**
         * Formatter for the label.
         */
        labelFormatter?: (value: string) => string;
        /**
         * Formatter for the value.
         */
        valueFormatter?: (value: number) => string;
        /**
         * y offset of the label and value. Default is based on the number of series, automatically computed.
         */
        yOffset?: number;
        /**
         * x position of the label.
         */
        labelPosition?: number;
        /**
         * x position of the value.
         */
        valuePosition?: number;
        /**
         * Custom render function for the label.
         */
        labelComponent?: ComponentType<RenderLabelProps>;
        /**
         * Custom render function for the value.
         */
        valueComponent?: ComponentType<RenderValueProps>;
    };
}
interface RenderLabelProps {
    textProps: TextProps;
    x: number;
    y: number;
    label: string;
    formatter: (value: string) => string;
}
interface RenderValueProps {
    textProps: TextProps;
    x: number;
    y: number;
    value: number;
    /**
     * Original data
     */
    data: SeriesData[];
    /**
     * Index of the data point
     */
    index: number;
    formatter: (value: number) => string;
}
declare const BarListChartResponsive: ({ resizeDebounceTime, maxWidth, aspectRatio, ...chartProps }: Pick<Partial<BarListChartProps>, "width" | "height" | "size"> & Omit<BarListChartProps, "width" | "height" | "size"> & ResponsiveConfig) => react_jsx_runtime.JSX.Element;

export { BarListChartResponsive as BarListChart, type BarListChartProps, type RenderLabelProps, type RenderValueProps };
