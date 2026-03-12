"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }




var _chunkWYK7EL5Rcjs = require('./chunk-WYK7EL5R.cjs');


var _chunkMXGLYWVPcjs = require('./chunk-MXGLYWVP.cjs');

// src/components/legend/legend.tsx
var _react = require('react');

// src/charts/private/single-chart-context/single-chart-context.tsx

var ChartInstanceContext = /* @__PURE__ */ _react.createContext.call(void 0, null);
var SingleChartContext = ChartInstanceContext;

// src/charts/private/single-chart-context/use-single-chart-context.ts

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
  "legend": "a8ccharts-89ApsU",
  "legend--horizontal": "a8ccharts-AELBvX",
  "legend--vertical": "a8ccharts-fX8uQe",
  "legend--alignment-start": "a8ccharts-DEe0wg",
  "legend--alignment-center": "a8ccharts-WBKF9I",
  "legend--alignment-end": "a8ccharts-JfwMng",
  "legend-item": "a8ccharts-Vflwq8",
  "legend-item--interactive": "a8ccharts-qGsavM",
  "legend-item--inactive": "a8ccharts-ZtDY-Q",
  "legend-item-label": "a8ccharts-2H65Kr",
  "legend-item-text--wrap": "a8ccharts-faSDBI",
  "legend-item-text--ellipsis": "a8ccharts-FISUIO",
  "legend-item-value": "a8ccharts-DTZlT-"
};

// src/components/legend/private/base-legend.tsx
var _jsxruntime = require('react/jsx-runtime');
var orientationToFlexDirection = {
  horizontal: "row",
  vertical: "column"
};
var LegendText = ({
  text,
  textOverflow,
  maxWidth
}) => {
  const isEllipsis = maxWidth != null && textOverflow === "ellipsis";
  const [textRef, isTruncated] = _chunkWYK7EL5Rcjs.useTextTruncation.call(void 0, Boolean(isEllipsis));
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", {
    ref: textRef,
    className: _clsx2.default.call(void 0, base_legend_module_default["legend-item-text"], maxWidth != null && base_legend_module_default[`legend-item-text--${textOverflow}`]),
    style: {
      ...maxWidth != null && {
        maxWidth,
        minWidth: 0
      }
    },
    title: isEllipsis && isTruncated ? text : void 0,
    children: text
  });
};
var BaseLegend = /* @__PURE__ */ _react.forwardRef.call(void 0, ({
  items,
  className,
  orientation = "horizontal",
  alignment = "center",
  shape = "rect",
  fill = valueOrIdentityString,
  size = valueOrIdentityString,
  labelFormat = valueOrIdentity,
  labelTransform = labelTransformFactory,
  itemStyles,
  itemClassName,
  labelStyles,
  labelClassName,
  shapeStyles,
  render,
  interactive = false,
  chartId
}, ref) => {
  const {
    margin: itemMargin = "0",
    flexDirection: itemDirection = "row"
  } = _nullishCoalesce(itemStyles, () => ( {}));
  const {
    justifyContent: labelJustifyContent = "flex-start",
    flex: labelFlex = "0 0 auto",
    margin: labelMargin = "0 4px",
    maxWidth,
    textOverflow = "wrap"
  } = _nullishCoalesce(labelStyles, () => ( {}));
  const {
    width: shapeWidth = 16,
    height: shapeHeight = 16,
    margin: shapeMargin = "2px 4px 2px 0"
  } = _nullishCoalesce(shapeStyles, () => ( {}));
  const theme = _chunkWYK7EL5Rcjs.useGlobalChartsTheme.call(void 0, );
  const context = _react.useContext.call(void 0, _chunkWYK7EL5Rcjs.GlobalChartsContext);
  const legendScale = _scale.scaleOrdinal.call(void 0, {
    domain: items.map((item) => item.label),
    range: items.map((item) => item.color)
  });
  const domain = legendScale.domain();
  const getShapeStyle = _react.useCallback.call(void 0, ({
    index
  }) => _optionalChain([items, 'access', _2 => _2[index], 'optionalAccess', _3 => _3.shapeStyle]), [items]);
  const handleLegendClick = _react.useCallback.call(void 0, (seriesLabel) => {
    if (interactive && chartId && context) {
      context.toggleSeriesVisibility(chartId, seriesLabel);
    }
  }, [interactive, chartId, context]);
  const isSeriesVisible = _react.useCallback.call(void 0, (seriesLabel) => {
    if (!interactive || !chartId || !context) {
      return true;
    }
    return context.isSeriesVisible(chartId, seriesLabel);
  }, [interactive, chartId, context]);
  const createClickHandler = _react.useCallback.call(void 0, (labelText) => {
    if (!interactive) {
      return void 0;
    }
    return () => handleLegendClick(labelText);
  }, [interactive, handleLegendClick]);
  const createKeyDownHandler = _react.useCallback.call(void 0, (labelText) => {
    if (!interactive) {
      return void 0;
    }
    return (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleLegendClick(labelText);
      }
    };
  }, [interactive, handleLegendClick]);
  return render ? render(items) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _legend.LegendOrdinal, {
    scale: legendScale,
    labelFormat,
    labelTransform,
    children: (labels) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
      ref,
      role: "list",
      className: _clsx2.default.call(void 0, base_legend_module_default.legend, base_legend_module_default[`legend--${orientation}`], base_legend_module_default[`legend--alignment-${alignment}`], className),
      style: {
        flexDirection: orientationToFlexDirection[orientation],
        ..._optionalChain([theme, 'access', _4 => _4.legend, 'optionalAccess', _5 => _5.containerStyles])
      },
      children: labels.map((label, i) => {
        const visible = isSeriesVisible(label.text);
        const handleClick = createClickHandler(label.text);
        const handleKeyDown = createKeyDownHandler(label.text);
        const matchedItem = items[i];
        return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _legend.LegendItem, {
          className: _clsx2.default.call(void 0, "visx-legend-item", base_legend_module_default["legend-item"], interactive && base_legend_module_default["legend-item--interactive"], !visible && base_legend_module_default["legend-item--inactive"], itemClassName),
          margin: itemMargin,
          flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          role: interactive ? "button" : void 0,
          tabIndex: interactive ? 0 : void 0,
          "aria-pressed": interactive ? visible : void 0,
          "aria-label": interactive ? `${label.text}: ${visible ? "visible" : "hidden"}. Toggle visibility.` : void 0,
          children: [_optionalChain([items, 'access', _6 => _6[i], 'optionalAccess', _7 => _7.renderGlyph]) ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", {
            width: _optionalChain([items, 'access', _8 => _8[i], 'optionalAccess', _9 => _9.glyphSize]) * 2,
            height: _optionalChain([items, 'access', _10 => _10[i], 'optionalAccess', _11 => _11.glyphSize]) * 2,
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _group.Group, {
              children: _optionalChain([items, 'access', _12 => _12[i], 'optionalAccess', _13 => _13.renderGlyph, 'call', _14 => _14({
                key: `legend-glyph-${label.text}`,
                datum: {},
                index: i,
                color: fill(label),
                size: _optionalChain([items, 'access', _15 => _15[i], 'optionalAccess', _16 => _16.glyphSize]),
                x: _optionalChain([items, 'access', _17 => _17[i], 'optionalAccess', _18 => _18.glyphSize]),
                y: _optionalChain([items, 'access', _19 => _19[i], 'optionalAccess', _20 => _20.glyphSize])
              })])
            })
          }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _legend.LegendShape, {
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
          }), /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _legend.LegendLabel, {
            className: _clsx2.default.call(void 0, "visx-legend-label", base_legend_module_default["legend-item-label"], labelClassName),
            style: {
              justifyContent: labelJustifyContent,
              flex: labelFlex,
              margin: labelMargin,
              ..._optionalChain([theme, 'access', _21 => _21.legend, 'optionalAccess', _22 => _22.labelStyles])
            },
            children: [/* @__PURE__ */ _jsxruntime.jsx.call(void 0, LegendText, {
              text: label.text,
              textOverflow,
              maxWidth
            }), _optionalChain([matchedItem, 'optionalAccess', _23 => _23.value]) != null && matchedItem.value !== "" && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", {
              className: base_legend_module_default["legend-item-value"],
              children: ["\xA0", matchedItem.value]
            })]
          })]
        }, `legend-${label.text}-${i}`);
      })
    })
  });
});

// src/components/legend/legend.tsx

var Legend = /* @__PURE__ */ _react.forwardRef.call(void 0, ({
  chartId,
  items,
  ...props
}, ref) => {
  const context = _react.useContext.call(void 0, _chunkWYK7EL5Rcjs.GlobalChartsContext);
  const singleChartContext = _react.useContext.call(void 0, SingleChartContext);
  const contextChartId = _nullishCoalesce(chartId, () => ( _optionalChain([singleChartContext, 'optionalAccess', _24 => _24.chartId])));
  const contextItems = _react.useMemo.call(void 0, () => {
    return contextChartId && context ? _optionalChain([context, 'access', _25 => _25.getChartData, 'call', _26 => _26(contextChartId), 'optionalAccess', _27 => _27.legendItems]) : void 0;
  }, [contextChartId, context]);
  const legendItems = items || contextItems;
  if (!legendItems) {
    return null;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BaseLegend, {
    ref,
    items: legendItems,
    ...props,
    chartId: contextChartId
  });
});

// src/components/legend/hooks/use-chart-legend-items.ts
var _numberformatters = require('@automattic/number-formatters');

function formatPointValue(point, showValues, legendValueDisplay = "percentage") {
  if (!showValues || legendValueDisplay === "none") {
    return "";
  }
  if ("percentage" in point) {
    const percentagePoint = point;
    switch (legendValueDisplay) {
      case "percentage":
        return _chunkMXGLYWVPcjs.formatPercentage.call(void 0, percentagePoint.percentage);
      case "value":
        return _numberformatters.formatNumber.call(void 0, percentagePoint.value);
      case "valueDisplay":
        return percentagePoint.valueDisplay || _numberformatters.formatNumber.call(void 0, percentagePoint.value);
      default:
        return "";
    }
  }
  if ("value" in point) {
    return point.value !== null ? _numberformatters.formatNumber.call(void 0, point.value) : "";
  }
  return "";
}
function applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize) {
  if (withGlyph) {
    const glyphToUse = glyph || renderGlyph;
    if (glyphToUse) {
      return {
        ...baseItem,
        glyphSize,
        renderGlyph: glyphToUse
      };
    }
  }
  return baseItem;
}
function processSeriesData(seriesData, getElementStyles, showValues, withGlyph, glyphSize, renderGlyph, legendShape) {
  const mapper = (series, index) => {
    const { color, glyph, shapeStyles } = getElementStyles({
      data: series,
      index,
      legendShape
    });
    const baseItem = {
      label: series.label,
      value: showValues ? _optionalChain([series, 'access', _28 => _28.data, 'optionalAccess', _29 => _29.length, 'optionalAccess', _30 => _30.toString, 'call', _31 => _31()]) || "0" : "",
      color,
      shapeStyle: shapeStyles
    };
    return applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize);
  };
  return seriesData.map(mapper);
}
function processPointData(pointData, getElementStyles, showValues, legendValueDisplay, withGlyph, glyphSize, renderGlyph, legendShape) {
  const mapper = (point, index) => {
    const { color, glyph, shapeStyles } = getElementStyles({
      data: point,
      index,
      legendShape
    });
    const baseItem = {
      label: point.label,
      value: formatPointValue(point, showValues, legendValueDisplay),
      color,
      shapeStyle: shapeStyles
    };
    return applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize);
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
  const { getElementStyles } = _chunkWYK7EL5Rcjs.useGlobalChartsContext.call(void 0, );
  return _react.useMemo.call(void 0, () => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    if ("data" in data[0]) {
      return processSeriesData(
        data,
        getElementStyles,
        showValues,
        withGlyph,
        glyphSize,
        renderGlyph,
        legendShape
      );
    }
    return processPointData(
      data,
      getElementStyles,
      showValues,
      legendValueDisplay,
      withGlyph,
      glyphSize,
      renderGlyph,
      legendShape
    );
  }, [
    data,
    getElementStyles,
    showValues,
    legendValueDisplay,
    withGlyph,
    glyphSize,
    renderGlyph,
    legendShape
  ]);
}






exports.SingleChartContext = SingleChartContext; exports.useSingleChartContext = useSingleChartContext; exports.Legend = Legend; exports.useChartLegendItems = useChartLegendItems;
//# sourceMappingURL=chunk-XVBH5XHE.cjs.map