export { B as BaseTooltip, a as BaseTooltipProps, T as TooltipData } from '../../base-tooltip-DOq93wjU.cjs';
import { d as DataPointDate, o as SeriesData } from '../../types-DJVOwGz-.cjs';
import { TooltipProps as TooltipProps$1, RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import { ReactNode } from 'react';
import 'react/jsx-runtime';
import '@visx/legend';
import '@visx/xychart';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@wordpress/theme';
import 'react-google-charts';

type FlattenedTooltipData = {
    datum: DataPointDate;
    seriesLabel: string;
    seriesIndex: number;
    dataPointIndex: number;
};
interface AccessibleTooltipProps extends Omit<TooltipProps$1<DataPointDate>, 'renderTooltip'> {
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

type TooltipProps = {
    data: {
        label: string;
        value: number;
    };
};

export { AccessibleTooltip, type TooltipProps, useKeyboardNavigation };
