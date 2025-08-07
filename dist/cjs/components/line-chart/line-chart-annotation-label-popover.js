'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var i18n = require('@wordpress/i18n');
var clsx = require('clsx');
var Gridicon = require('gridicons');
var react = require('react');
var utils = require('../shared/utils.js');
var lineChart_module = require('./line-chart.module.scss.js');

const POPOVER_BUTTON_SIZE = 44;
const LineChartAnnotationLabelWithPopover = ({ title, subtitle, renderLabel, renderLabelPopover, }) => {
    const popoverId = react.useId();
    const buttonRef = react.useRef(null);
    const popoverRef = react.useRef(null);
    const [isPositioned, setIsPositioned] = react.useState(false);
    const isBrowserSafari = utils.isSafari();
    react.useEffect(() => {
        const button = buttonRef.current;
        const popover = popoverRef.current;
        if (!button || !popover)
            return;
        const positionPopover = () => {
            // Popover positioning in Safari is complicated due to issues with SVG foreign objects (https://bugs.webkit.org/show_bug.cgi?id=23113), so let it be positioned in the centre of the viewport.
            if (!isBrowserSafari) {
                const buttonRect = button.getBoundingClientRect();
                popover.style.left = `${buttonRect.right}px`;
                popover.style.top = `${buttonRect.top}px`;
            }
            setIsPositioned(true);
        };
        // Position when popover shows
        popover.addEventListener('toggle', (e) => {
            if (e.newState === 'open') {
                positionPopover();
            }
        });
        // Initial positioning if already open
        try {
            if (popover.matches(':popover-open')) {
                positionPopover();
            }
        }
        catch {
            // Ignore errors in test environments (e.g., JSDOM does not support :popover-open)
        }
    }, [isBrowserSafari]);
    return (jsxRuntime.jsxs("div", { className: lineChart_module.default['line-chart__annotation-label'], children: [jsxRuntime.jsx("button", { ref: buttonRef, ...{ popovertarget: popoverId }, className: lineChart_module.default['line-chart__annotation-label-trigger-button'], style: {
                    width: `${POPOVER_BUTTON_SIZE}px`,
                    height: `${POPOVER_BUTTON_SIZE}px`,
                    transform: `translate(${POPOVER_BUTTON_SIZE / 2}px, 0)`,
                }, "aria-label": title || i18n.__('View details', 'jetpack-charts'), children: renderLabel({ title, subtitle }) }), jsxRuntime.jsx("div", { ref: popoverRef, id: popoverId, ...{ popover: 'auto' }, className: clsx(lineChart_module.default['line-chart__annotation-label-popover'], isPositioned && lineChart_module.default['line-chart__annotation-label-popover--visible'], isBrowserSafari && lineChart_module.default['line-chart__annotation-label-popover--safari']), "data-testid": "line-chart-annotation-label-popover", children: jsxRuntime.jsxs("div", { className: lineChart_module.default['line-chart__annotation-label-popover-header'], children: [jsxRuntime.jsx("div", { className: lineChart_module.default['line-chart__annotation-label-popover-content'], children: renderLabelPopover({ title, subtitle }) }), jsxRuntime.jsx("button", { ...{
                                popovertarget: popoverId,
                                popovertargetaction: 'hide',
                            }, className: lineChart_module.default['line-chart__annotation-label-popover-close-button'], "aria-label": i18n.__('Close', 'jetpack-charts'), children: jsxRuntime.jsx(Gridicon, { icon: "cross", size: 16 }) })] }) })] }));
};

exports.POPOVER_BUTTON_SIZE = POPOVER_BUTTON_SIZE;
exports.default = LineChartAnnotationLabelWithPopover;
