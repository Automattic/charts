import * as react from 'react';
import { q as BaseLegendProps, a as BaseLegendItem } from './types-DJVOwGz-.js';

declare const Legend: react.ForwardRefExoticComponent<Omit<BaseLegendProps, "items"> & {
    items?: BaseLegendItem[];
    chartId?: string;
} & react.RefAttributes<HTMLDivElement>>;

export { Legend as L };
