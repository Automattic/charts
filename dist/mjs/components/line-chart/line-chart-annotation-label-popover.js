import { jsxs, jsx } from 'react/jsx-runtime';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import Gridicon from 'gridicons';
import { useId, useRef, useState, useEffect } from 'react';
import { isSafari } from '../shared/utils.js';
import styles from './line-chart.module.scss.js';

const POPOVER_BUTTON_SIZE = 44;
const LineChartAnnotationLabelWithPopover = ({ title, subtitle, renderLabel, renderLabelPopover, }) => {
    const popoverId = useId();
    const buttonRef = useRef(null);
    const popoverRef = useRef(null);
    const [isPositioned, setIsPositioned] = useState(false);
    const isBrowserSafari = isSafari();
    useEffect(() => {
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
    return (jsxs("div", { className: styles['line-chart__annotation-label'], children: [jsx("button", { ref: buttonRef, ...{ popovertarget: popoverId }, className: styles['line-chart__annotation-label-trigger-button'], style: {
                    width: `${POPOVER_BUTTON_SIZE}px`,
                    height: `${POPOVER_BUTTON_SIZE}px`,
                    transform: `translate(${POPOVER_BUTTON_SIZE / 2}px, 0)`,
                }, "aria-label": title || __('View details', 'jetpack-charts'), children: renderLabel({ title, subtitle }) }), jsx("div", { ref: popoverRef, id: popoverId, ...{ popover: 'auto' }, className: clsx(styles['line-chart__annotation-label-popover'], isPositioned && styles['line-chart__annotation-label-popover--visible'], isBrowserSafari && styles['line-chart__annotation-label-popover--safari']), "data-testid": "line-chart-annotation-label-popover", children: jsxs("div", { className: styles['line-chart__annotation-label-popover-header'], children: [jsx("div", { className: styles['line-chart__annotation-label-popover-content'], children: renderLabelPopover({ title, subtitle }) }), jsx("button", { ...{
                                popovertarget: popoverId,
                                popovertargetaction: 'hide',
                            }, className: styles['line-chart__annotation-label-popover-close-button'], "aria-label": __('Close', 'jetpack-charts'), children: jsx(Gridicon, { icon: "cross", size: 16 }) })] }) })] }));
};

export { POPOVER_BUTTON_SIZE, LineChartAnnotationLabelWithPopover as default };
