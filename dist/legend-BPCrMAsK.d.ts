import * as react from 'react';
import { a as BaseLegendProps, B as BaseLegendItem } from './types-BSQVn7e9.js';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend as L };
