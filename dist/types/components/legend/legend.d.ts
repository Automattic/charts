import * as react from 'react';
import { BaseLegendProps, BaseLegendItem } from './types.js';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend };
