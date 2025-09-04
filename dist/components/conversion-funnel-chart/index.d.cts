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
 * Render prop for customizing step labels
 */
interface StepLabelRenderProps {
    step: FunnelStep;
    index: number;
    className?: string;
}
/**
 * Render prop for customizing step rates
 */
interface StepRateRenderProps {
    step: FunnelStep;
    index: number;
    className?: string;
}
/**
 * Render prop for customizing the entire main metric section
 */
interface MainMetricRenderProps {
    mainRate: number;
    changeIndicator?: string;
    className?: string;
    changeColor?: string;
}
/**
 * Render prop for customizing tooltip content
 */
interface TooltipRenderProps {
    step: FunnelStep;
    index: number;
    top: number;
    left: number;
    className?: string;
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
    /** Custom render function for step labels */
    renderStepLabel?: (props: StepLabelRenderProps) => React.ReactNode;
    /** Custom render function for step rates */
    renderStepRate?: (props: StepRateRenderProps) => React.ReactNode;
    /** Custom render function for the entire main metric section */
    renderMainMetric?: (props: MainMetricRenderProps) => React.ReactNode;
    /** Custom render function for tooltip content */
    renderTooltip?: (props: TooltipRenderProps) => React.ReactNode;
}
/**
 * ConversionFunnelChart component displays a conversion funnel with main metric and visualization
 *
 * @param props                  - Component props
 * @param props.mainRate         - Main conversion rate to highlight
 * @param props.changeIndicator  - Change indicator (e.g., +2%, -1.5%)
 * @param props.steps            - Array of funnel steps
 * @param props.loading          - Whether the chart is in loading state
 * @param props.className        - Additional CSS class name
 * @param props.style            - Custom styling
 * @param props.renderStepLabel  - Custom render function for step labels
 * @param props.renderStepRate   - Custom render function for step rates
 * @param props.renderMainMetric - Custom render function for the entire main metric section
 * @param props.renderTooltip    - Custom render function for tooltip content
 * @return JSX element representing the conversion funnel chart
 */
declare const ConversionFunnelChart: FC<ConversionFunnelChartProps>;

export { ConversionFunnelChart, type ConversionFunnelChartProps, type FunnelStep, type MainMetricRenderProps, type StepLabelRenderProps, type StepRateRenderProps, type TooltipRenderProps };
