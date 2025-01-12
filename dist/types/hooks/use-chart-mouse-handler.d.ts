import type { DataPoint } from '../types';
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
    onMouseMove: (event: React.MouseEvent<SVGElement>, data: DataPoint) => void;
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
export default useChartMouseHandler;
