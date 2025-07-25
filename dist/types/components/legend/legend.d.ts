import * as react from 'react';
import { BaseLegendProps, LegendItemWithGlyph, LegendItemWithoutGlyph } from './types.js';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: LegendItemWithGlyph[] | LegendItemWithoutGlyph[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend };
