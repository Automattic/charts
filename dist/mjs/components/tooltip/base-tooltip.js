import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import styles from './base-tooltip.module.scss.js';

const DefaultTooltipContent = ({ data }) => (jsxs(Fragment, { children: [data?.label, ": ", data?.valueDisplay || data?.value] }));
const BaseTooltip = ({ data, top, left, component: Component = DefaultTooltipContent, children, className, }) => {
    return (jsx("div", { className: styles.tooltip, style: { top, left }, role: "tooltip", children: children || (data && jsx(Component, { data: data, className: className })) }));
};

export { BaseTooltip };
