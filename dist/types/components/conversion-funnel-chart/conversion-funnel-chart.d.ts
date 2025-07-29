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

export type { ConversionFunnelChartProps, FunnelStep };
