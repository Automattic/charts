import * as react from 'react';
import { c as BaseLegendProps, B as BaseLegendItem } from './types-I67mddpr.cjs';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend as L };
