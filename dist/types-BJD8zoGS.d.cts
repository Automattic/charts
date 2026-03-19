import { LegendOrdinal } from '@visx/legend';
import { k as LegendPosition, i as LegendItemStyles, j as LegendLabelStyles, l as LegendShapeStyles } from './types-rXqh76Ut.cjs';
import { GlyphProps, LineStyles } from '@visx/xychart';
import { ComponentProps, ReactNode, CSSProperties } from 'react';

type VisxLegendProps = Pick<ComponentProps<typeof LegendOrdinal>, 'className' | 'shape' | 'fill' | 'size' | 'labelFormat' | 'labelTransform'>;
type BaseLegendProps = VisxLegendProps & {
    items: BaseLegendItem[];
    orientation?: 'horizontal' | 'vertical';
    position?: LegendPosition;
    alignment?: 'start' | 'center' | 'end';
    /** Additional CSS class name for legend items. */
    itemClassName?: string;
    /** CSS styles for each legend item (margin, flexDirection). */
    itemStyles?: LegendItemStyles;
    /** Additional CSS class name for legend labels. */
    labelClassName?: string;
    /** CSS styles for legend labels (justifyContent, flex, margin). */
    labelStyles?: LegendLabelStyles;
    /** Styles for legend shapes (width, height, margin). */
    shapeStyles?: LegendShapeStyles;
    /**
     * Function for rendering a custom legend layout.
     */
    render?: (items: BaseLegendItem[]) => ReactNode;
    /**
     * Enable interactive legend items that can toggle series visibility.
     * Requires GlobalChartsProvider and chartId to be set.
     */
    interactive?: boolean;
    /**
     * Chart ID for series visibility tracking when interactive mode is enabled.
     */
    chartId?: string;
};
type LegendProps = Omit<BaseLegendProps, 'items'> & {
    items?: BaseLegendItem[];
    chartId?: string;
};
type BaseLegendItem = {
    label: string;
    value?: number | string;
    color: string;
    glyphSize?: number;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    shapeStyle?: CSSProperties & LineStyles;
};

export type { BaseLegendItem as B, LegendProps as L, BaseLegendProps as a };
