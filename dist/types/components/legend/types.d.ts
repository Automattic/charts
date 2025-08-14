import { LegendOrdinal } from '@visx/legend';
import { GlyphProps, LineStyles } from '@visx/xychart';
import { ComponentProps, ReactNode, CSSProperties } from 'react';

type LegendOrdinalProps = Omit<ComponentProps<typeof LegendOrdinal>, 'scale' | 'direction'>;
type BaseLegendItem = {
    label: string;
    value: number | string;
    color: string;
    glyphSize?: number;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    shapeStyle?: CSSProperties & LineStyles;
};
type LegendItemWithGlyph = BaseLegendItem & {
    renderGlyph: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    glyphSize: number;
};
type LegendItemWithoutGlyph = BaseLegendItem & {
    renderGlyph?: never;
    glyphSize?: number;
};
type BaseLegendProps = Omit<LegendOrdinalProps, 'shapeStyle'> & {
    items: LegendItemWithGlyph[] | LegendItemWithoutGlyph[];
    orientation?: 'horizontal' | 'vertical';
    /**
     * TODO: Add 'left' | 'right' positioning support in future implementation
     */
    position?: 'top' | 'bottom';
    alignment?: 'start' | 'center' | 'end';
};
type LegendProps = Omit<BaseLegendProps, 'items'> & {
    items?: LegendItemWithGlyph[] | LegendItemWithoutGlyph[];
    chartId?: string;
};

export type { BaseLegendItem, BaseLegendProps, LegendItemWithGlyph, LegendItemWithoutGlyph, LegendProps };
