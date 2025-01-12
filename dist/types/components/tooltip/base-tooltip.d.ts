import type { CSSProperties, ComponentType, ReactNode } from 'react';
type TooltipData = {
    label: string;
    value: number;
    valueDisplay?: string;
};
type TooltipComponentProps = {
    data: TooltipData;
    className?: string;
};
type TooltipCommonProps = {
    top: number;
    left: number;
    style?: CSSProperties;
    className?: string;
};
type DefaultDataTooltip = {
    data: TooltipData;
    component?: ComponentType<TooltipComponentProps>;
    children?: never;
};
type CustomTooltip = {
    children: ReactNode;
    data?: never;
    component?: never;
};
type BaseTooltipProps = TooltipCommonProps & (DefaultDataTooltip | CustomTooltip);
export declare const BaseTooltip: ({ data, top, left, component: Component, children, className, }: BaseTooltipProps) => import("react/jsx-runtime").JSX.Element;
export type { BaseTooltipProps, TooltipData };
