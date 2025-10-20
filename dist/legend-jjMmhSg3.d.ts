import * as react from 'react';
import { a as BaseLegendProps, B as BaseLegendItem } from './types-C05PdDJa.js';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend as L };
