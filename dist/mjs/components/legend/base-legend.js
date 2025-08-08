import { jsx, jsxs } from 'react/jsx-runtime';
import { Group } from '@visx/group';
import { LegendOrdinal, LegendItem, LegendShape, LegendLabel } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import clsx from 'clsx';
import { forwardRef, useCallback } from 'react';
import { useChartTheme } from '../../providers/theme/theme-provider.js';
import styles from './legend.module.scss.js';
import { valueOrIdentityString, valueOrIdentity, labelTransformFactory } from './utils.js';

const orientationToFlexDirection = {
    horizontal: 'row',
    vertical: 'column',
};
/*
 * Base legend component that displays color-coded items with labels based on visx LegendOrdinal.
 * We avoid using LegendOrdinal directly to enable support for advanced features such as interactivity.
 */
const BaseLegend = forwardRef(({ items, className, orientation = 'horizontal', alignmentHorizontal = 'center', alignmentVertical = 'bottom', shape = 'rect', fill = valueOrIdentityString, size = valueOrIdentityString, labelFormat = valueOrIdentity, labelTransform = labelTransformFactory, shapeWidth = 16, shapeHeight = 16, shapeMargin = '2px 4px 2px 0', labelAlign = 'left', labelFlex = '0 0 auto', // Use natural width instead of expanding to fill space
labelMargin = '0 4px', itemMargin = '0', itemDirection = 'row', legendLabelProps, ...legendItemProps }, ref) => {
    const theme = useChartTheme();
    const legendScale = scaleOrdinal({
        domain: items.map(item => item.label),
        range: items.map(item => item.color),
    });
    const domain = legendScale.domain();
    // For right-aligned vertical legends, use row-reverse to align text consistently
    const getShapeStyle = useCallback(({ index }) => {
        return items[index]?.shapeStyle ?? theme.legendShapeStyles?.[index] ?? {};
    }, [items, theme]);
    return (jsx(LegendOrdinal, { scale: legendScale, labelFormat: labelFormat, labelTransform: labelTransform, children: labels => (jsx("div", { ref: ref, role: "list", "data-testid": `legend-${orientation}`, className: clsx(styles.legend, styles[`legend--${orientation}`], styles[`legend--horizontal-align-${alignmentHorizontal}`], styles[`legend--vertical-align-${alignmentVertical}`], className), style: {
                flexDirection: orientationToFlexDirection[orientation],
                ...theme.legendContainerStyles,
            }, children: labels.map((label, i) => (jsxs(LegendItem, { className: styles['legend-item'], "data-testid": "legend-item", margin: itemMargin, flexDirection: orientation === 'vertical' && alignmentHorizontal === 'right'
                    ? 'row-reverse'
                    : itemDirection, ...legendItemProps, children: [items[i]?.renderGlyph ? (jsx("svg", { width: items[i]?.glyphSize * 2, height: items[i]?.glyphSize * 2, "data-testid": "legend-glyph", children: jsx(Group, { children: items[i]?.renderGlyph({
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
