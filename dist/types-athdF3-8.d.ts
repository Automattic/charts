import { LegendOrdinal } from '@visx/legend';
import { GlyphProps, LineStyles } from '@visx/xychart';
import { ComponentProps, ReactNode, CSSProperties } from 'react';

type LegendOrdinalProps = Omit<ComponentProps<typeof LegendOrdinal>, 'scale' | 'direction'>;
type BaseLegendProps = Omit<LegendOrdinalProps, 'shapeStyle'> & {
    items: BaseLegendItem[];
    orientation?: 'horizontal' | 'vertical';
    /**
     * TODO: Add 'left' | 'right' positioning support in future implementation
     */
    position?: 'top' | 'bottom';
    alignment?: 'start' | 'center' | 'end';
    /**
     * Maximum width for legend items. When set, text overflow behavior is controlled by textOverflow prop.
     * Should be a CSS value string (e.g. '200px', '50%', '10rem')
     */
    maxWidth?: string;
    /**
     * Controls how text behaves when it exceeds maxWidth.
     * - 'ellipsis': Truncate with ellipsis (ideal for widgets/small devices)
     * - 'wrap': Wrap text to multiple lines (default, ideal for larger displays)
     */
    textOverflow?: 'ellipsis' | 'wrap';
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
};

export type { BaseLegendProps as B, LegendProps as L, BaseLegendItem as a };
