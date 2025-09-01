import { LegendOrdinal } from '@visx/legend';
import { GlyphProps, LineStyles } from '@visx/xychart';
import { ReactNode, CSSProperties, ComponentProps } from 'react';

type LegendOrdinalProps = Omit<ComponentProps<typeof LegendOrdinal>, 'scale' | 'direction'>;
type BaseLegendProps = Omit<LegendOrdinalProps, 'shapeStyle'> & {
    items: BaseLegendItem[];
    orientation?: 'horizontal' | 'vertical';
    /**
     * TODO: Add 'left' | 'right' positioning support in future implementation
     */
    position?: 'top' | 'bottom';
    alignment?: 'start' | 'center' | 'end';
};
type LegendProps = Omit<BaseLegendProps, 'items'> & {
    items?: BaseLegendItem[];
    chartId?: string;
};
type BaseLegendItem = {
    label: string;
    value: number | string;
    color: string;
    glyphSize?: number;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    shapeStyle?: CSSProperties & LineStyles;
    group?: string;
    index?: number;
    overrideColor?: string;
};

export type { BaseLegendItem, BaseLegendProps, LegendProps };
