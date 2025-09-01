'use strict';

var jsxRuntime = require('react/jsx-runtime');
var group = require('@visx/group');
var legend = require('@visx/legend');
var scale = require('@visx/scale');
var clsx = require('clsx');
var react = require('react');
var globalChartsProvider = require('../../../providers/chart-context/global-charts-provider.js');
require('fast-deep-equal');
require('@visx/event');
require('@visx/tooltip');
require('@visx/xychart');
require('date-fns');
require('@automattic/number-formatters');
require('@visx/text');
require('deepmerge');
var useGlobalChartsTheme = require('../../../providers/chart-context/hooks/use-global-charts-theme.js');
var valueOrIdentity = require('../utils/value-or-identity.js');
var labelTransformFactory = require('../utils/label-transform-factory.js');
var baseLegend_module = require('./base-legend.module.scss.js');

const orientationToFlexDirection = {
    horizontal: 'row',
    vertical: 'column',
};
/*
 * Base legend component that displays color-coded items with labels based on visx LegendOrdinal.
 * We avoid using LegendOrdinal directly to enable support for advanced features such as interactivity.
 */
const BaseLegend = react.forwardRef(({ items, className, orientation = 'horizontal', position = 'bottom', alignment = 'center', shape = 'rect', fill = valueOrIdentity.valueOrIdentityString, size = valueOrIdentity.valueOrIdentityString, labelFormat = valueOrIdentity.valueOrIdentity, labelTransform = labelTransformFactory.labelTransformFactory, shapeWidth = 16, shapeHeight = 16, shapeMargin = '2px 4px 2px 0', labelAlign = 'left', labelFlex = '0 0 auto', // Use natural width instead of expanding to fill space
labelMargin = '0 4px', itemMargin = '0', itemDirection = 'row', legendLabelProps, ...legendItemProps }, ref) => {
    const theme = useGlobalChartsTheme.useGlobalChartsTheme();
    const context = react.useContext(globalChartsProvider.GlobalChartsContext);
    const resolveGroupColor = context?.resolveGroupColor;
    // Resolve colors dynamically for items that have group info
    const itemsWithResolvedColors = react.useMemo(() => {
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
    const legendScale = scale.scaleOrdinal({
        domain: itemsWithResolvedColors.map(item => item.label),
        range: itemsWithResolvedColors.map(item => item.color),
    });
    const domain = legendScale.domain();
    // For right-aligned vertical legends, use row-reverse to align text consistently
    const getShapeStyle = react.useCallback(({ index }) => itemsWithResolvedColors[index]?.shapeStyle, [itemsWithResolvedColors]);
    return (jsxRuntime.jsx(legend.LegendOrdinal, { scale: legendScale, labelFormat: labelFormat, labelTransform: labelTransform, children: labels => (jsxRuntime.jsx("div", { ref: ref, role: "list", "data-testid": `legend-${orientation}`, className: clsx(baseLegend_module.default.legend, baseLegend_module.default[`legend--${orientation}`], baseLegend_module.default[`legend--alignment-${alignment}`], baseLegend_module.default[`legend--position-${position}`], className), style: {
                flexDirection: orientationToFlexDirection[orientation],
                ...theme.legendContainerStyles,
            }, children: labels.map((label, i) => (jsxRuntime.jsxs(legend.LegendItem, { className: baseLegend_module.default['legend-item'], "data-testid": "legend-item", margin: itemMargin, flexDirection: orientation === 'vertical' && alignment === 'end' ? 'row-reverse' : itemDirection, ...legendItemProps, children: [items[i]?.renderGlyph ? (jsxRuntime.jsx("svg", { width: items[i]?.glyphSize * 2, height: items[i]?.glyphSize * 2, "data-testid": "legend-glyph", children: jsxRuntime.jsx(group.Group, { children: items[i]?.renderGlyph({
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
                        }, ...legendLabelProps, children: [label.text, items.find(item => item.label === label.text)?.value && (jsxRuntime.jsxs("span", { className: baseLegend_module.default['legend-item-value'], children: ['\u00A0', items.find(item => item.label === label.text)?.value] }))] })] }, `legend-${label.text}-${i}`))) })) }));
});

exports.BaseLegend = BaseLegend;
