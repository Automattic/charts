import { jsx, jsxs } from 'react/jsx-runtime';
import { Group } from '@visx/group';
import { LegendOrdinal, LegendItem, LegendShape, LegendLabel } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import clsx from 'clsx';
import { forwardRef, useContext, useMemo, useCallback } from 'react';
import { GlobalChartsContext } from '../../../providers/chart-context/global-charts-provider.js';
import 'fast-deep-equal';
import '@visx/event';
import '@visx/tooltip';
import '@visx/xychart';
import 'date-fns';
import '@automattic/number-formatters';
import '@visx/text';
import 'deepmerge';
import { useGlobalChartsTheme } from '../../../providers/chart-context/hooks/use-global-charts-theme.js';
import { valueOrIdentityString, valueOrIdentity } from '../utils/value-or-identity.js';
import { labelTransformFactory } from '../utils/label-transform-factory.js';
import styles from './base-legend.module.scss.js';

const orientationToFlexDirection = {
    horizontal: 'row',
    vertical: 'column',
};
/*
 * Base legend component that displays color-coded items with labels based on visx LegendOrdinal.
 * We avoid using LegendOrdinal directly to enable support for advanced features such as interactivity.
 */
const BaseLegend = forwardRef(({ items, className, orientation = 'horizontal', position = 'bottom', alignment = 'center', shape = 'rect', fill = valueOrIdentityString, size = valueOrIdentityString, labelFormat = valueOrIdentity, labelTransform = labelTransformFactory, shapeWidth = 16, shapeHeight = 16, shapeMargin = '2px 4px 2px 0', labelAlign = 'left', labelFlex = '0 0 auto', // Use natural width instead of expanding to fill space
labelMargin = '0 4px', itemMargin = '0', itemDirection = 'row', legendLabelProps, ...legendItemProps }, ref) => {
    const theme = useGlobalChartsTheme();
    const context = useContext(GlobalChartsContext);
    const resolveGroupColor = context?.resolveGroupColor;
    // Resolve colors dynamically for items that have group info
    const itemsWithResolvedColors = useMemo(() => {
        return items.map(item => {
            // If item has group info and we have a context, resolve color dynamically
            if (item.group !== undefined && item.index !== undefined && resolveGroupColor) {
                const resolvedColor = resolveGroupColor({
                    group: item.group,
                    index: item.index,
                    overrideColor: item.overrideColor,
                });
                return { ...item, color: resolvedColor };
            }
            // Otherwise use the static color
            return item;
        });
    }, [items, resolveGroupColor]);
    const legendScale = scaleOrdinal({
        domain: itemsWithResolvedColors.map(item => item.label),
        range: itemsWithResolvedColors.map(item => item.color),
    });
    const domain = legendScale.domain();
    // For right-aligned vertical legends, use row-reverse to align text consistently
    const getShapeStyle = useCallback(({ index }) => itemsWithResolvedColors[index]?.shapeStyle, [itemsWithResolvedColors]);
    return (jsx(LegendOrdinal, { scale: legendScale, labelFormat: labelFormat, labelTransform: labelTransform, children: labels => (jsx("div", { ref: ref, role: "list", "data-testid": `legend-${orientation}`, className: clsx(styles.legend, styles[`legend--${orientation}`], styles[`legend--alignment-${alignment}`], styles[`legend--position-${position}`], className), style: {
                flexDirection: orientationToFlexDirection[orientation],
                ...theme.legendContainerStyles,
            }, children: labels.map((label, i) => (jsxs(LegendItem, { className: styles['legend-item'], "data-testid": "legend-item", margin: itemMargin, flexDirection: orientation === 'vertical' && alignment === 'end' ? 'row-reverse' : itemDirection, ...legendItemProps, children: [items[i]?.renderGlyph ? (jsx("svg", { width: items[i]?.glyphSize * 2, height: items[i]?.glyphSize * 2, "data-testid": "legend-glyph", children: jsx(Group, { children: items[i]?.renderGlyph({
                                key: `legend-glyph-${label.text}`,
                                datum: {},
                                index: i,
                                color: fill(label),
                                size: items[i]?.glyphSize,
                                x: items[i]?.glyphSize,
                                y: items[i]?.glyphSize,
                            }) }) })) : (jsx(LegendShape, { shape: shape, height: shapeHeight, width: shapeWidth, margin: shapeMargin, item: domain[i], itemIndex: i, label: label, fill: fill, size: size, shapeStyle: getShapeStyle })), jsxs(LegendLabel, { style: {
                            justifyContent: labelAlign,
                            flex: labelFlex,
                            margin: labelMargin,
                            ...theme.legendLabelStyles,
                        }, ...legendLabelProps, children: [label.text, items.find(item => item.label === label.text)?.value && (jsxs("span", { className: styles['legend-item-value'], children: ['\u00A0', items.find(item => item.label === label.text)?.value] }))] })] }, `legend-${label.text}-${i}`))) })) }));
});

export { BaseLegend };
