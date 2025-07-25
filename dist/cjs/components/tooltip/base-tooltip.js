'use strict';

var jsxRuntime = require('react/jsx-runtime');
var baseTooltip_module = require('./base-tooltip.module.scss.js');

const DefaultTooltipContent = ({ data }) => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [data?.label, ": ", data?.valueDisplay || data?.value] }));
const BaseTooltip = ({ data, top, left, component: Component = DefaultTooltipContent, children, className, }) => {
    return (jsxRuntime.jsx("div", { className: baseTooltip_module.default.tooltip, style: { top, left }, role: "tooltip", children: children || (data && jsxRuntime.jsx(Component, { data: data, className: className })) }));
};

exports.BaseTooltip = BaseTooltip;
