import * as react from 'react';
import { a as BaseLegendProps, B as BaseLegendItem } from './types-BJD8zoGS.cjs';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend as L };
