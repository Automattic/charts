import { MouseEvent } from 'react';
import { D as DataPoint, c as SeriesData, S as SeriesDataOptions, B as BaseChartProps, b as DataPointDate } from '../types-Bz4cK2h9.js';
import * as _visx_xychart from '@visx/xychart';
import { XYChartTheme } from '@visx/xychart';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';

/**
 * Custom hook to memoize a value using deep equality comparison.
 * Prevents unnecessary re-renders when objects have the same content but different references.
 *
 * @param value - The value to memoize with deep equality comparison
 * @return The memoized value that only changes when deeply different
 */
declare const useDeepMemo: <T>(value: T) => T;

type UseChartMouseHandlerProps = {
    /**
     * Whether tooltips are enabled
     */
    withTooltips: boolean;
};
type UseChartMouseHandlerReturn = {
    /**
     * Handler for mouse move events
     */
    onMouseMove: (event: MouseEvent<SVGElement>, data: DataPoint) => void;
    /**
     * Handler for mouse leave events
     */
    onMouseLeave: () => void;
    /**
     * Whether the tooltip is currently open
     */
    tooltipOpen: boolean;
    /**
     * The current tooltip data
     */
    tooltipData: DataPoint | null;
    /**
     * The current tooltip left position
     */
    tooltipLeft: number | undefined;
    /**
     * The current tooltip top position
     */
    tooltipTop: number | undefined;
};
/**
 * Hook to handle mouse interactions for chart components
 *
 * @param {UseChartMouseHandlerProps} props - Hook configuration
 * @return {UseChartMouseHandlerReturn} Object containing handlers and tooltip state
 */
declare const useChartMouseHandler: ({ withTooltips, }: UseChartMouseHandlerProps) => UseChartMouseHandlerReturn;

declare const useXYChartTheme: (data: SeriesData[]) => _visx_xychart.XYChartTheme;

/**
 * Hook that transforms and sorts chart data, handling date parsing and sorting
 *
 * This hook extracts the common data transformation logic used in both line-chart
 * and bar-chart components. It:
 * 1. Parses date strings into Date objects using parseAsLocalDate
 * 2. Sorts data points by date when date properties are present
 * 3. Returns the original data unchanged when no date properties are found
 *
 * @param {SeriesData[]} data - The raw chart data to transform
 * @return {SeriesData[]} The transformed and sorted data
 */
declare const useChartDataTransform: (data: SeriesData[]) => {
    data: any[];
    group?: string;
    label: string;
    options?: SeriesDataOptions;
}[];

declare const useChartMargin: (height: number, options: BaseChartProps["options"], data: SeriesData[], theme: XYChartTheme, horizontal?: boolean) => {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

/**
 * Hook to measure the height of a DOM element.
 * Returns a ref to attach to the element and the current height in pixels.
 *
 * @param {object} props               - Optional props.
 * @param {number} props.initialHeight - The initial height to use.
 *
 * @return {[Function, number]} A tuple containing a ref to attach to the element and the current height in pixels
 */
declare function useElementHeight<T extends HTMLElement = HTMLDivElement>({ initialHeight, }?: {
    initialHeight?: number;
}): [(node: T | null) => void, number];

/**
 * Hook to detect if text content is truncated within its container.
 * Uses ResizeObserver to dynamically track changes in element size.
 *
 * @param enabled - Whether truncation detection should be active. Defaults to true.
 * @return A tuple containing:
 * - [0] refCallback: Function to attach to the text element as a ref
 * - [1] isTruncated: Boolean indicating if the text is currently truncated
 *
 * @example
 * ```tsx
 * const [textRef, isTruncated] = useTextTruncation(true);
 *
 * return (
 *   <span ref={textRef} title={isTruncated ? fullText : undefined}>
 *     {text}
 *   </span>
 * );
 * ```
 */
declare function useTextTruncation(enabled?: boolean): [(node: HTMLElement | null) => void, boolean];

type EnhancedDataPoint = DataPointDate & {
    visualValue?: number;
};
interface EnhancedSeriesData extends Omit<SeriesData, 'data'> {
    data: EnhancedDataPoint[];
}
interface UseZeroValueDisplayOptions {
    enabled: boolean;
    minValueRatio?: number;
    maxValueRatio?: number;
}
declare const useZeroValueDisplay: (data: SeriesData[], options?: UseZeroValueDisplayOptions) => SeriesData[] | EnhancedSeriesData[];

export { useChartDataTransform, useChartMargin, useChartMouseHandler, useDeepMemo, useElementHeight, useTextTruncation, useXYChartTheme, useZeroValueDisplay };
