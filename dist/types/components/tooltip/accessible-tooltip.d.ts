import { DataPointDate, SeriesData } from '../../types.js';
import { TooltipProps, RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
export { TooltipProps as BaseTooltipProps } from '@visx/xychart/lib/components/Tooltip';
import { ReactNode } from 'react';

type FlattenedTooltipData = {
    datum: DataPointDate;
    seriesLabel: string;
    seriesIndex: number;
    dataPointIndex: number;
};
interface AccessibleTooltipProps extends Omit<TooltipProps<DataPointDate>, 'renderTooltip'> {
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    selectedIndex?: number | undefined;
    tooltipRef?: (element: HTMLDivElement | null) => void;
    keyboardFocusedClassName?: string;
    /**
     * Flattened tooltip data prepared by parent component
     * Each index corresponds to one tooltip to show
     */
    tooltipData?: FlattenedTooltipData[];
    /**
     * For line charts: series data to show all series at selected data point
     * When provided, shows all series instead of individual tooltips
     */
    series?: SeriesData[];
    /**
     * Whether to combine tooltip information from multiple series into a single tooltip. This is useful for line charts.
     * Or to show individual tooltips for each series. This is useful for bar charts.
     */
    mode?: 'individual' | 'group';
}
declare const AccessibleTooltip: React.FC<AccessibleTooltipProps>;
interface UseKeyboardNavigationProps {
    selectedIndex: number | undefined;
    setSelectedIndex: (index: number | undefined) => void;
    isNavigating: boolean;
    setIsNavigating: (navigating: boolean) => void;
    chartRef: React.RefObject<HTMLDivElement>;
    /**
     * Total number of navigation points (length of tooltip data array)
     */
    totalPoints: number;
}
declare const useKeyboardNavigation: ({ selectedIndex, setSelectedIndex, isNavigating, setIsNavigating, chartRef, totalPoints, }: UseKeyboardNavigationProps) => {
    tooltipRef: (element: HTMLDivElement | null) => void;
    onChartFocus: () => void;
    onChartBlur: () => void;
    onChartKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export { AccessibleTooltip, type FlattenedTooltipData, useKeyboardNavigation };
