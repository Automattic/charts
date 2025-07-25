import * as react from 'react';
import { LegendItemWithGlyph, LegendItemWithoutGlyph } from './types.js';
import * as _visx_legend_lib_legends_Legend_LegendLabel from '@visx/legend/lib/legends/Legend/LegendLabel';
import * as _visx_legend_lib_types from '@visx/legend/lib/types';

declare const BaseLegend: react.ForwardRefExoticComponent<Omit<{
    children?: (labels: {
        datum: unknown;
        index: number;
        text: string;
        value?: any;
    }[]) => React.ReactNode;
    shape?: _visx_legend_lib_types.LegendShape<unknown, any>;
    size?: (label: {
        datum: unknown;
        index: number;
        text: string;
        value?: any;
    }) => string | number | undefined;
    className?: string;
    style?: React.CSSProperties;
    domain?: unknown[];
    shapeWidth?: string | number;
    shapeHeight?: string | number;
    shapeMargin?: string | number;
    labelAlign?: string;
    labelFlex?: string | number;
    labelMargin?: string | number;
    itemMargin?: string | number;
    itemDirection?: _visx_legend_lib_types.FlexDirection;
    fill?: (label: {
        datum: unknown;
        index: number;
        text: string;
        value?: any;
    }) => string | undefined;
    shapeStyle?: (label: {
        datum: unknown;
        index: number;
        text: string;
        value?: any;
    }) => React.CSSProperties;
    labelFormat?: _visx_legend_lib_types.LabelFormatter<unknown>;
    labelTransform?: _visx_legend_lib_types.LabelFormatterFactory<ScaleOrdinal<DiscreteInput, Output>>;
    legendLabelProps?: Partial<_visx_legend_lib_legends_Legend_LegendLabel.LegendLabelProps>;
}, "shapeStyle"> & {
    items: LegendItemWithGlyph[] | LegendItemWithoutGlyph[];
    orientation?: "horizontal" | "vertical";
    alignmentHorizontal?: "left" | "center" | "right";
    alignmentVertical?: "top" | "bottom";
} & react.RefAttributes<HTMLDivElement>>;

export { BaseLegend };
