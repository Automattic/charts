import * as react from 'react';
import { B as BaseLegendProps, a as BaseLegendItem } from './types-BW-sJNCQ.cjs';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend as L };
