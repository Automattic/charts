'use strict';

var jsxRuntime = require('react/jsx-runtime');
var group = require('@visx/group');
var legend = require('@visx/legend');
var scale = require('@visx/scale');
var clsx = require('clsx');
var react = require('react');
var themeProvider = require('../../providers/theme/theme-provider.js');
var legend_module = require('./legend.module.scss.js');
var utils = require('./utils.js');

const orientationToFlexDirection = {
    horizontal: 'row',
    vertical: 'column',
};
/*
 * Base legend component that displays color-coded items with labels based on visx LegendOrdinal.
 * We avoid using LegendOrdinal directly to enable support for advanced features such as interactivity.
 */
const BaseLegend = react.forwardRef(({ items, className, orientation = 'horizontal', alignmentHorizontal = 'center', alignmentVertical = 'bottom', shape = 'rect', fill = utils.valueOrIdentityString, size = utils.valueOrIdentityString, labelFormat = utils.valueOrIdentity, labelTransform = utils.labelTransformFactory, shapeWidth = 16, shapeHeight = 16, shapeMargin = '2px 4px 2px 0', labelAlign = 'left', labelFlex = '0 0 auto', // Use natural width instead of expanding to fill space
labelMargin = '0 4px', itemMargin = '0', itemDirection = 'row', legendLabelProps, ...legendItemProps }, ref) => {
    const theme = themeProvider.useChartTheme();
    const legendScale = scale.scaleOrdinal({
        domain: items.map(item => item.label),
        range: items.map(item => item.color),
    });
    const domain = legendScale.domain();
    const getShapeStyle = react.useCallback(({ index }) => {
        return items[index]?.shapeStyle ?? theme.legendShapeStyles?.[index] ?? {};
    }, [items, theme]);
    return (jsxRuntime.jsx(legend.LegendOrdinal, { scale: legendScale, labelFormat: labelFormat, labelTransform: labelTransform, children: labels => (jsxRuntime.jsx("div", { ref: ref, role: "list", "data-testid": `legend-${orientation}`, className: clsx(legend_module.default.legend, legend_module.default[`legend--${orientation}`], legend_module.default[`legend--horizontal-align-${alignmentHorizontal}`], legend_module.default[`legend--vertical-align-${alignmentVertical}`], className), style: {
                flexDirection: orientationToFlexDirection[orientation],
                ...theme.legendContainerStyles,
            }, children: labels.map((label, i) => (jsxRuntime.jsxs(legend.LegendItem, { className: legend_module.default['legend-item'], "data-testid": "legend-item", margin: itemMargin, flexDirection: itemDirection, ...legendItemProps, children: [items[i]?.renderGlyph ? (jsxRuntime.jsx("svg", { width: items[i]?.glyphSize * 2, height: items[i]?.glyphSize * 2, "data-testid": "legend-glyph", children: jsxRuntime.jsx(group.Group, { children: items[i]?.renderGlyph({
                                key: `legend-glyph-${label.text}`,
                                datum: {},
                                index: i,
                                color: fill(label),
                                size: items[i]?.glyphSize,
                                x: items[i]?.glyphSize,
                                y: items[i]?.glyphSize,
                            }) }) })) : (jsxRuntime.jsx(legend.LegendShape, { shape: shape, height: shapeHeight, width: shapeWidth, margin: shapeMargin, item: domain[i], itemIndex: i, label: label, fill: fill, size: size, shapeStyle: getShapeStyle })), jsxRuntime.jsxs(legend.LegendLabel, { style: {
                            justifyContent: labelAlign,
                            flex: labelFlex,
                            margin: labelMargin,
                            ...theme.legendLabelStyles,
                        }, ...legendLabelProps, children: [label.text, items.find(item => item.label === label.text)?.value && (jsxRuntime.jsxs("span", { className: legend_module.default['legend-item-value'], children: ['\u00A0', items.find(item => item.label === label.text)?.value] }))] })] }, `legend-${label.text}-${i}`))) })) }));
});

exports.BaseLegend = BaseLegend;
