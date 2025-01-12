import { ComponentType } from 'react';
import type { BaseChartProps } from '../../types';
type ResponsiveConfig = {
    maxWidth?: number;
    aspectRatio?: number;
    debounceTime?: number;
};
/**
 * A higher-order component that provides responsive width and height
 * to the wrapped chart component using useParentSize from @visx/responsive.
 *
 * @param WrappedComponent - The chart component to be wrapped.
 * @param config           - Optional configuration for responsive behavior
 * @return A functional component that renders the wrapped component with responsive dimensions.
 */
export declare function withResponsive<T extends BaseChartProps<unknown>>(WrappedComponent: ComponentType<T>, config?: ResponsiveConfig): (props: Omit<T, "width" | "height">) => import("react/jsx-runtime").JSX.Element;
export {};
