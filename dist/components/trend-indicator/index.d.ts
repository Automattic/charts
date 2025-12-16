import * as react_jsx_runtime from 'react/jsx-runtime';
import { CSSProperties } from 'react';

/**
 * The direction of the trend
 */
type TrendDirection = 'up' | 'down' | 'neutral';
/**
 * Props for the TrendIndicator component
 */
type TrendIndicatorProps = {
    /**
     * The direction of the trend (up, down, or neutral)
     */
    direction: TrendDirection;
    /**
     * The value to display (e.g., "14%", "+$500", "2.5k")
     */
    value: string | number;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Inline styles
     */
    style?: CSSProperties;
    /**
     * Whether to show the directional icon
     * @default true
     */
    showIcon?: boolean;
};

/**
 * TrendIndicator displays a directional trend with a value.
 * Used to show percentage changes or growth metrics.
 *
 * @param {TrendIndicatorProps} props - Component props
 * @return {JSX.Element} The rendered trend indicator
 */
declare function TrendIndicator({ direction, value, className, style, showIcon, }: TrendIndicatorProps): react_jsx_runtime.JSX.Element;

export { type TrendDirection, TrendIndicator, type TrendIndicatorProps };
