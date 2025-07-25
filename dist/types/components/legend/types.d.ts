import { LegendOrdinal } from '@visx/legend';
import { GlyphProps } from '@visx/xychart';
import { ComponentProps, ReactNode, CSSProperties } from 'react';

type LegendOrdinalProps = Omit<ComponentProps<typeof LegendOrdinal>, 'scale' | 'direction'>;
type BaseLegendItem = {
    label: string;
    value: number | string;
    color: string;
    glyphSize?: number;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    shapeStyle?: CSSProperties;
};
type LegendItemWithGlyph = BaseLegendItem & {
    renderGlyph: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    glyphSize: number;
};
type LegendItemWithoutGlyph = BaseLegendItem & {
    renderGlyph?: never;
    glyphSize?: number;
};
type LegendProps = Omit<LegendOrdinalProps, 'shapeStyle'> & {
    items: LegendItemWithGlyph[] | LegendItemWithoutGlyph[];
    orientation?: 'horizontal' | 'vertical';
    alignmentHorizontal?: 'left' | 'center' | 'right';
    alignmentVertical?: 'top' | 'bottom';
};

export type { BaseLegendItem, LegendItemWithGlyph, LegendItemWithoutGlyph, LegendProps };
