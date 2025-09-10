"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }





var _chunkP6GF5KEQcjs = require('./chunk-P6GF5KEQ.cjs');

// src/components/legend/legend.tsx
var _react = require('react');

// src/components/private/single-chart-context/single-chart-context.tsx

var ChartInstanceContext = _react.createContext.call(void 0, null);
var SingleChartContext = ChartInstanceContext;

// src/components/private/single-chart-context/use-single-chart-context.ts

var useChartInstanceContext = () => {
  const context = _react.useContext.call(void 0, ChartInstanceContext);
  if (!context) {
    throw new Error("useChartInstanceContext must be used within a Chart component");
  }
  return context;
};
var useSingleChartContext = useChartInstanceContext;

// src/components/legend/private/base-legend.tsx
var _group = require('@visx/group');
var _legend = require('@visx/legend');
var _scale = require('@visx/scale');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);







// src/components/legend/utils/value-or-identity.ts
function valueOrIdentity(_) {
  if (_ && typeof _ === "object" && "value" in _ && typeof _.value !== "undefined")
    return _.value;
  return _;
}
function valueOrIdentityString(_) {
  return String(valueOrIdentity(_));
}

// src/components/legend/utils/label-transform-factory.ts
function labelTransformFactory({
  scale,
  labelFormat
}) {
  return (d, i) => ({
    datum: d,
    index: i,
    text: `${labelFormat(d, i)}`,
    value: scale(d)
  });
}

// src/components/legend/private/base-legend.module.scss
var base_legend_module_default = {
  "legend--horizontal": "a8ccharts-AELBvX",
  "legend--vertical": "a8ccharts-fX8uQe",
  "legend--alignment-start": "a8ccharts-DEe0wg",
  "legend--alignment-center": "a8ccharts-WBKF9I",
  "legend--alignment-end": "a8ccharts-JfwMng",
  "legend--position-top": "a8ccharts-8Y73Kh",
  "legend--position-bottom": "a8ccharts-TVM-IY",
  "legend-item": "a8ccharts-Vflwq8",
  "legend-item-label": "a8ccharts-2H65Kr",
  "legend-item-value": "a8ccharts-DTZlT-"
};

// src/components/legend/private/base-legend.tsx
var _jsxruntime = require('react/jsx-runtime');
var orientationToFlexDirection = {
  horizontal: "row",
  vertical: "column"
};
var BaseLegend = _react.forwardRef.call(void 0, 
  ({
    items,
    className,
    orientation = "horizontal",
    position = "bottom",
    alignment = "center",
    shape = "rect",
    fill = valueOrIdentityString,
    size = valueOrIdentityString,
    labelFormat = valueOrIdentity,
    labelTransform = labelTransformFactory,
    shapeWidth = 16,
    shapeHeight = 16,
    shapeMargin = "2px 4px 2px 0",
    labelAlign = "left",
    labelFlex = "0 0 auto",
    // Use natural width instead of expanding to fill space
    labelMargin = "0 4px",
    itemMargin = "0",
    itemDirection = "row",
    legendLabelProps,
    ...legendItemProps
  }, ref) => {
    const theme = _chunkP6GF5KEQcjs.useGlobalChartsTheme.call(void 0, );
    const context = _react.useContext.call(void 0, _chunkP6GF5KEQcjs.GlobalChartsContext);
    const resolveGroupColor = _optionalChain([context, 'optionalAccess', _2 => _2.resolveGroupColor]);
    const itemsWithResolvedColors = _react.useMemo.call(void 0, () => {
      return items.map((item) => {
        if (item.group !== void 0 && item.index !== void 0 && resolveGroupColor) {
          const resolvedColor = resolveGroupColor({
            group: item.group,
            index: item.index,
            overrideColor: item.overrideColor
          });
          return { ...item, color: resolvedColor };
        }
        return item;
      });
    }, [items, resolveGroupColor]);
    const legendScale = _scale.scaleOrdinal.call(void 0, {
      domain: itemsWithResolvedColors.map((item) => item.label),
      range: itemsWithResolvedColors.map((item) => item.color)
    });
    const domain = legendScale.domain();
    const getShapeStyle = _react.useCallback.call(void 0, 
      ({ index }) => _optionalChain([itemsWithResolvedColors, 'access', _3 => _3[index], 'optionalAccess', _4 => _4.shapeStyle]),
      [itemsWithResolvedColors]
    );
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _legend.LegendOrdinal,
      {
        scale: legendScale,
        labelFormat,
        labelTransform,
        children: (labels) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "div",
          {
            ref,
            role: "list",
            "data-testid": `legend-${orientation}`,
            className: _clsx2.default.call(void 0, 
              base_legend_module_default.legend,
              base_legend_module_default[`legend--${orientation}`],
              base_legend_module_default[`legend--alignment-${alignment}`],
              base_legend_module_default[`legend--position-${position}`],
              className
            ),
            style: {
              flexDirection: orientationToFlexDirection[orientation],
              ...theme.legendContainerStyles
            },
            children: labels.map((label, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
              _legend.LegendItem,
              {
                className: base_legend_module_default["legend-item"],
                "data-testid": "legend-item",
                margin: itemMargin,
                flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
                ...legendItemProps,
                children: [
                  _optionalChain([items, 'access', _5 => _5[i], 'optionalAccess', _6 => _6.renderGlyph]) ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    "svg",
                    {
                      width: _optionalChain([items, 'access', _7 => _7[i], 'optionalAccess', _8 => _8.glyphSize]) * 2,
                      height: _optionalChain([items, 'access', _9 => _9[i], 'optionalAccess', _10 => _10.glyphSize]) * 2,
                      "data-testid": "legend-glyph",
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _group.Group, { children: _optionalChain([items, 'access', _11 => _11[i], 'optionalAccess', _12 => _12.renderGlyph, 'call', _13 => _13({
                        key: `legend-glyph-${label.text}`,
                        datum: {},
                        index: i,
                        color: fill(label),
                        size: _optionalChain([items, 'access', _14 => _14[i], 'optionalAccess', _15 => _15.glyphSize]),
                        x: _optionalChain([items, 'access', _16 => _16[i], 'optionalAccess', _17 => _17.glyphSize]),
                        y: _optionalChain([items, 'access', _18 => _18[i], 'optionalAccess', _19 => _19.glyphSize])
                      })]) })
                    }
                  ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _legend.LegendShape,
                    {
                      shape,
                      height: shapeHeight,
                      width: shapeWidth,
                      margin: shapeMargin,
                      item: domain[i],
                      itemIndex: i,
                      label,
                      fill,
                      size,
                      shapeStyle: getShapeStyle
                    }
                  ),
                  /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
                    _legend.LegendLabel,
                    {
                      style: {
                        justifyContent: labelAlign,
                        flex: labelFlex,
                        margin: labelMargin,
                        ...theme.legendLabelStyles
                      },
                      ...legendLabelProps,
                      children: [
                        label.text,
                        _optionalChain([items, 'access', _20 => _20.find, 'call', _21 => _21((item) => item.label === label.text), 'optionalAccess', _22 => _22.value]) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: base_legend_module_default["legend-item-value"], children: [
                          "\xA0",
                          _optionalChain([items, 'access', _23 => _23.find, 'call', _24 => _24((item) => item.label === label.text), 'optionalAccess', _25 => _25.value])
                        ] })
                      ]
                    }
                  )
                ]
              },
              `legend-${label.text}-${i}`
            ))
          }
        )
      }
    );
  }
);

// src/components/legend/legend.tsx

var Legend = _react.forwardRef.call(void 0, 
  ({ chartId, items, ...props }, ref) => {
    const context = _react.useContext.call(void 0, _chunkP6GF5KEQcjs.GlobalChartsContext);
    const singleChartContext = _react.useContext.call(void 0, SingleChartContext);
    const contextChartId = _nullishCoalesce(chartId, () => ( _optionalChain([singleChartContext, 'optionalAccess', _26 => _26.chartId])));
    const contextItems = _react.useMemo.call(void 0, () => {
      return contextChartId && context ? _optionalChain([context, 'access', _27 => _27.getChartData, 'call', _28 => _28(contextChartId), 'optionalAccess', _29 => _29.legendItems]) : void 0;
    }, [contextChartId, context]);
    const legendItems = items || contextItems;
    if (!legendItems) {
      return null;
    }
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BaseLegend, { ref, items: legendItems, ...props });
  }
);

// src/components/legend/hooks/use-chart-legend-items.ts

function formatPointValue(point, showValues, legendValueDisplay = "percentage") {
  if (!showValues || legendValueDisplay === "none") {
    return "";
  }
  if ("percentage" in point) {
    const percentagePoint = point;
    switch (legendValueDisplay) {
      case "percentage":
        return _chunkP6GF5KEQcjs.formatPercentage.call(void 0, percentagePoint.percentage);
      case "value":
        return percentagePoint.value.toString();
      case "valueDisplay":
        return percentagePoint.valueDisplay || percentagePoint.value.toString();
      default:
        return "";
    }
  }
  if ("value" in point) {
    return point.value.toString();
  }
  return "";
}
function processSeriesData(seriesData, theme, showValues, withGlyph, glyphSize, renderGlyph, legendShape) {
  const mapper = (series, index) => {
    const { shapeStyles } = _chunkP6GF5KEQcjs.getItemShapeStyles.call(void 0, series, index, theme, legendShape);
    const baseItem = {
      label: series.label,
      value: showValues ? _optionalChain([series, 'access', _30 => _30.data, 'optionalAccess', _31 => _31.length, 'optionalAccess', _32 => _32.toString, 'call', _33 => _33()]) || "0" : "",
      color: _chunkP6GF5KEQcjs.getSeriesStroke.call(void 0, series, index, theme.colors),
      shapeStyle: shapeStyles,
      group: series.group,
      index,
      overrideColor: _optionalChain([series, 'access', _34 => _34.options, 'optionalAccess', _35 => _35.stroke])
    };
    if (withGlyph && renderGlyph) {
      return {
        ...baseItem,
        glyphSize,
        renderGlyph
      };
    }
    return baseItem;
  };
  return seriesData.map(mapper);
}
function processPointData(pointData, theme, showValues, legendValueDisplay, withGlyph, glyphSize, renderGlyph) {
  const mapper = (point, index) => {
    const baseItem = {
      label: point.label,
      value: formatPointValue(point, showValues, legendValueDisplay),
      color: _nullishCoalesce(point.color, () => ( theme.colors[index % theme.colors.length])),
      group: point.group,
      index,
      overrideColor: point.color
    };
    if (withGlyph && renderGlyph) {
      const itemWithGlyph = {
        ...baseItem,
        glyphSize,
        renderGlyph
      };
      return itemWithGlyph;
    }
    return baseItem;
  };
  return pointData.map(mapper);
}
function useChartLegendItems(data, options = {}, legendShape) {
  const {
    showValues = false,
    legendValueDisplay = "percentage",
    withGlyph = false,
    glyphSize = 8,
    renderGlyph
  } = options;
  const theme = _chunkP6GF5KEQcjs.useGlobalChartsTheme.call(void 0, );
  return _react.useMemo.call(void 0, () => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    if ("data" in data[0]) {
      return processSeriesData(
        data,
        theme,
        showValues,
        withGlyph,
        glyphSize,
        renderGlyph,
        legendShape
      );
    }
    return processPointData(
      data,
      theme,
      showValues,
      legendValueDisplay,
      withGlyph,
      glyphSize,
      renderGlyph
    );
  }, [
    data,
    theme,
    showValues,
    legendValueDisplay,
    withGlyph,
    glyphSize,
    renderGlyph,
    legendShape
  ]);
}






exports.SingleChartContext = SingleChartContext; exports.useSingleChartContext = useSingleChartContext; exports.Legend = Legend; exports.useChartLegendItems = useChartLegendItems;
//# sourceMappingURL=chunk-SLF2F4AO.cjs.map