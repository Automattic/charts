'use strict';

var jsxRuntime = require('react/jsx-runtime');
var group = require('@visx/group');
var legend = require('@visx/legend');
var scale = require('@visx/scale');
var clsx = require('clsx');
var react = require('react');
require('fast-deep-equal');
var useGlobalChartTheme = require('../../hooks/use-global-chart-theme.js');
require('@visx/event');
require('@visx/tooltip');
require('@visx/xychart');
var globalChartsProvider = require('../../providers/chart-context/global-charts-provider.js');
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
const BaseLegend = react.forwardRef(({ items, className, orientation = 'horizontal', position = 'bottom', alignment = 'center', shape = 'rect', fill = utils.valueOrIdentityString, size = utils.valueOrIdentityString, labelFormat = utils.valueOrIdentity, labelTransform = utils.labelTransformFactory, shapeWidth = 16, shapeHeight = 16, shapeMargin = '2px 4px 2px 0', labelAlign = 'left', labelFlex = '0 0 auto', // Use natural width instead of expanding to fill space
labelMargin = '0 4px', itemMargin = '0', itemDirection = 'row', legendLabelProps, ...legendItemProps }, ref) => {
    const theme = useGlobalChartTheme.useGlobalChartTheme();
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
    return (jsxRuntime.jsx(legend.LegendOrdinal, { scale: legendScale, labelFormat: labelFormat, labelTransform: labelTransform, children: labels => (jsxRuntime.jsx("div", { ref: ref, role: "list", "data-testid": `legend-${orientation}`, className: clsx(legend_module.default.legend, legend_module.default[`legend--${orientation}`], legend_module.default[`legend--alignment-${alignment}`], legend_module.default[`legend--position-${position}`], className), style: {
                flexDirection: orientationToFlexDirection[orientation],
                ...theme.legendContainerStyles,
            }, children: labels.map((label, i) => (jsxRuntime.jsxs(legend.LegendItem, { className: legend_module.default['legend-item'], "data-testid": "legend-item", margin: itemMargin, flexDirection: orientation === 'vertical' && alignment === 'end' ? 'row-reverse' : itemDirection, ...legendItemProps, children: [items[i]?.renderGlyph ? (jsxRuntime.jsx("svg", { width: items[i]?.glyphSize * 2, height: items[i]?.glyphSize * 2, "data-testid": "legend-glyph", children: jsxRuntime.jsx(group.Group, { children: items[i]?.renderGlyph({
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
