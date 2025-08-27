import { FC } from 'react';

/**
 * Represents a single step in the conversion funnel
 */
interface FunnelStep {
    /** Step identifier */
    id: string;
    /** Display label for the step */
    label: string;
    /** Conversion rate as percentage (0-100) */
    rate: number;
    /** Absolute count (optional, for tooltip/details) */
    count?: number;
}
/**
 * Props for the ConversionFunnelChart component
 */
interface ConversionFunnelChartProps {
    /** Main conversion rate to highlight */
    mainRate: number;
    /** Change indicator (e.g., +2%, -1.5%) */
    changeIndicator?: string;
    /** Array of funnel steps */
    steps: FunnelStep[];
    /** Whether the chart is in loading state */
    loading?: boolean;
    /** Additional CSS class name */
    className?: string;
    /** Custom styling */
    style?: React.CSSProperties;
}
/**
 * ConversionFunnelChart component displays a conversion funnel with main metric and visualization
 *
 * @param props                 - Component props
 * @param props.mainRate        - Main conversion rate to highlight
 * @param props.changeIndicator - Change indicator (e.g., +2%, -1.5%)
 * @param props.steps           - Array of funnel steps
 * @param props.loading         - Whether the chart is in loading state
 * @param props.className       - Additional CSS class name
 * @param props.style           - Custom styling
 * @return JSX element representing the conversion funnel chart
 */
declare const ConversionFunnelChart: FC<ConversionFunnelChartProps>;

export { ConversionFunnelChart, type ConversionFunnelChartProps, type FunnelStep, ConversionFunnelChart as default };
