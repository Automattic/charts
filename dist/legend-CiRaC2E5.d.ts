import * as react from 'react';
import { a as BaseLegendProps, B as BaseLegendItem } from './types-DK1CMp9i.js';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend as L };
