"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkFX2PTUFCcjs = require('./chunk-FX2PTUFC.cjs');



var _chunkH43FBWWZcjs = require('./chunk-H43FBWWZ.cjs');





var _chunkSEPMBOVDcjs = require('./chunk-SEPMBOVD.cjs');













var _chunkM4OSG2EScjs = require('./chunk-M4OSG2ES.cjs');

// src/components/line-chart/line-chart.tsx
var _numberformatters = require('@automattic/number-formatters');
var _curve = require('@visx/curve');
var _gradient = require('@visx/gradient');
var _xychart = require('@visx/xychart');
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/components/private/default-glyph/default-glyph.tsx


var _jsxruntime = require('react/jsx-runtime');
var DefaultGlyph = (props) => {
  const { theme } = _react.useContext.call(void 0, _xychart.DataContext) || {};
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "circle",
    {
      cx: props.x,
      cy: props.y,
      r: props.size,
      fill: props.color,
      stroke: _optionalChain([theme, 'optionalAccess', _ => _.backgroundColor]),
      strokeWidth: 1.5,
      paintOrder: "fill",
      "data-testid": `start-glyph-${props.index}`,
      ...props.glyphStyle
    }
  );
};

// src/components/line-chart/line-chart.module.scss
var line_chart_module_default = {
  "line-chart": "a8ccharts-ITM3dm",
  "line-chart__tooltip": "a8ccharts-aqcmeq",
  "line-chart__annotation-label-popover": "a8ccharts-TqNZkh",
  "line-chart__tooltip-date": "a8ccharts-4Dzab-",
  "line-chart__tooltip-row": "a8ccharts-6A37Gb",
  "line-chart__tooltip-label": "a8ccharts-IvnFFF",
  "line-chart__annotations-overlay": "a8ccharts-4nR2pv",
  "line-chart__annotation-label": "a8ccharts-OmgiTA",
  "line-chart__annotation-label-trigger-button": "a8ccharts-mcIb3E",
  "line-chart__annotation-label-popover--visible": "a8ccharts-dE0cVP",
  "line-chart__annotation-label-popover--safari": "a8ccharts-i3NHTh",
  "line-chart__annotation-label-popover-header": "a8ccharts-OwypoS",
  "line-chart__annotation-label-popover-content": "a8ccharts-vtgQtP",
  "line-chart__annotation-label-popover-close-button": "a8ccharts-i8KUcG"
};

// src/components/line-chart/private/line-chart-annotation-label-popover.tsx


var _gridicons = require('gridicons'); var _gridicons2 = _interopRequireDefault(_gridicons);


var POPOVER_BUTTON_SIZE = 44;
var LineChartAnnotationLabelWithPopover = ({
  title,
  subtitle,
  renderLabel,
  renderLabelPopover
}) => {
  const popoverId = _react.useId.call(void 0, );
  const buttonRef = _react.useRef.call(void 0, null);
  const popoverRef = _react.useRef.call(void 0, null);
  const [isPositioned, setIsPositioned] = _react.useState.call(void 0, false);
  const isBrowserSafari = _chunkM4OSG2EScjs.isSafari.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const button = buttonRef.current;
    const popover = popoverRef.current;
    if (!button || !popover) return;
    const positionPopover = () => {
      if (!isBrowserSafari) {
        const buttonRect = button.getBoundingClientRect();
        popover.style.left = `${buttonRect.right}px`;
        popover.style.top = `${buttonRect.top}px`;
      }
      setIsPositioned(true);
    };
    popover.addEventListener("toggle", (e) => {
      if (e.newState === "open") {
        positionPopover();
      }
    });
    try {
      if (popover.matches(":popover-open")) {
        positionPopover();
      }
    } catch (e2) {
    }
  }, [isBrowserSafari]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: line_chart_module_default["line-chart__annotation-label"], children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        ref: buttonRef,
        ...{ popovertarget: popoverId },
        className: line_chart_module_default["line-chart__annotation-label-trigger-button"],
        style: {
          width: `${POPOVER_BUTTON_SIZE}px`,
          height: `${POPOVER_BUTTON_SIZE}px`,
          transform: `translate(${POPOVER_BUTTON_SIZE / 2}px, 0)`
        },
        "aria-label": title || _i18n.__.call(void 0, "View details", "jetpack-charts"),
        children: renderLabel({ title, subtitle })
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        ref: popoverRef,
        id: popoverId,
        ...{ popover: "auto" },
        className: _clsx2.default.call(void 0, 
          line_chart_module_default["line-chart__annotation-label-popover"],
          isPositioned && line_chart_module_default["line-chart__annotation-label-popover--visible"],
          isBrowserSafari && line_chart_module_default["line-chart__annotation-label-popover--safari"]
        ),
        "data-testid": "line-chart-annotation-label-popover",
        children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: line_chart_module_default["line-chart__annotation-label-popover-header"], children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: line_chart_module_default["line-chart__annotation-label-popover-content"], children: renderLabelPopover({ title, subtitle }) }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            "button",
            {
              ...{
                popovertarget: popoverId,
                popovertargetaction: "hide"
              },
              className: line_chart_module_default["line-chart__annotation-label-popover-close-button"],
              "aria-label": _i18n.__.call(void 0, "Close", "jetpack-charts"),
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _gridicons2.default, { icon: "cross", size: 16 })
            }
          )
        ] })
      }
    )
  ] });
};
var line_chart_annotation_label_popover_default = LineChartAnnotationLabelWithPopover;

// src/components/line-chart/private/line-chart-annotations-overlay.tsx



var LineChartAnnotationsOverlay = ({ children }) => {
  const { chartRef, chartWidth, chartHeight } = _chunkSEPMBOVDcjs.useSingleChartContext.call(void 0, );
  const [scales, setScales] = _react.useState.call(void 0, null);
  const [scalesStable, setScalesStable] = _react.useState.call(void 0, false);
  const createScaleSignature = _react.useCallback.call(void 0, (scaleData) => {
    const xDomain = scaleData.xScale.domain();
    const yDomain = scaleData.yScale.domain();
    const xRange = scaleData.xScale.range();
    const yRange = scaleData.yScale.range();
    return `${xDomain.join(",")}-${yDomain.join(",")}-${xRange.join(
      ","
    )}-${yRange.join(",")}`;
  }, []);
  const getScalesData = _react.useCallback.call(void 0, () => {
    if (_optionalChain([chartRef, 'optionalAccess', _2 => _2.current])) {
      const scaleData = chartRef.current.getScales();
      if (scaleData) {
        const scaleInfo = {
          xScale: scaleData.xScale,
          yScale: scaleData.yScale
        };
        return {
          scales: scaleInfo,
          signature: createScaleSignature(scaleInfo)
        };
      }
    }
    return null;
  }, [chartRef, createScaleSignature]);
  _react.useEffect.call(void 0, () => {
    let timeoutId = null;
    let lastSignature = null;
    let retryCount = 0;
    const maxRetries = 20;
    const checkInterval = 50;
    setScalesStable(false);
    const monitorScales = () => {
      const currentScaleData = getScalesData();
      if (currentScaleData) {
        const scalesSettled = lastSignature && currentScaleData.signature === lastSignature;
        if (scalesSettled) {
          setScalesStable(true);
          return;
        }
        setScales(currentScaleData.scales);
        lastSignature = currentScaleData.signature;
      }
      if (retryCount < maxRetries) {
        retryCount++;
        timeoutId = setTimeout(monitorScales, checkInterval);
      }
    };
    monitorScales();
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [getScalesData, chartWidth, chartHeight]);
  if (!chartRef || !children) {
    return null;
  }
  if (!scales || !scalesStable) {
    return null;
  }
  const dataContextValue = {
    xScale: scales.xScale,
    yScale: scales.yScale,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    width: chartWidth,
    height: chartHeight
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.DataContext.Provider, { value: dataContextValue, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "svg",
    {
      width: chartWidth,
      height: chartHeight,
      className: line_chart_module_default["line-chart__annotations-overlay"],
      "data-testid": "line-chart-annotations-overlay",
      children
    }
  ) });
};
var line_chart_annotations_overlay_default = LineChartAnnotationsOverlay;

// src/components/line-chart/private/line-chart-annotation.tsx







var _annotation = require('@visx/annotation');

var _deepmerge = require('deepmerge'); var _deepmerge2 = _interopRequireDefault(_deepmerge);


var ANNOTATION_MAX_WIDTH = 125;
var ANNOTATION_INIT_HEIGHT = 100;
var getLabelPosition = ({
  subjectType,
  x,
  xMax,
  y,
  yMin,
  yMax,
  maxWidth,
  height
}) => {
  const annotationMaxWidth = _nullishCoalesce(maxWidth, () => ( ANNOTATION_MAX_WIDTH));
  const annotationHeight = _nullishCoalesce(height, () => ( ANNOTATION_INIT_HEIGHT));
  let dx = 15;
  let dy = 15;
  let isFlippedHorizontally = false;
  let isFlippedVertically = false;
  if (subjectType === "line-horizontal") {
    dx = 0;
    dy = 20;
  }
  if (subjectType === "line-vertical") {
    dx = 20;
    dy = 0;
  }
  const effectiveX = x + dx;
  if (effectiveX + annotationMaxWidth > xMax) {
    isFlippedHorizontally = true;
    if (subjectType === "circle") {
      dx = -dx;
    } else if (subjectType === "line-vertical") {
      dx = -20;
    }
  }
  if (subjectType === "circle") {
    if (y + dy + annotationHeight > yMin) {
      isFlippedVertically = true;
      dy = -Math.abs(dy);
    }
  } else if (y - annotationHeight < yMax) {
    if (subjectType === "line-horizontal") {
      isFlippedVertically = true;
      dy = Math.abs(dy);
    } else if (subjectType === "line-vertical") {
      isFlippedVertically = true;
    }
  } else if (y + annotationHeight > yMin) {
    if (subjectType === "line-horizontal") {
      isFlippedVertically = true;
      dy = -Math.abs(dy);
    } else if (subjectType === "line-vertical") {
      isFlippedVertically = true;
    }
  }
  return { dx, dy, isFlippedHorizontally, isFlippedVertically };
};
var getHorizontalAnchor = (subjectType, isFlippedHorizontally) => {
  if (subjectType === "line-horizontal") {
    return isFlippedHorizontally ? "end" : "start";
  }
  return void 0;
};
var getVerticalAnchor = (subjectType, isFlippedVertically, y, yMax, height) => {
  if (subjectType === "line-vertical") {
    if (isFlippedVertically) {
      return y - height < yMax ? "start" : "end";
    }
    return "start";
  }
  return void 0;
};
var LineChartAnnotation = ({
  datum,
  title,
  subtitle,
  subjectType = "circle",
  styles: datumStyles,
  testId,
  renderLabel,
  renderLabelPopover
}) => {
  const providerTheme = _chunkM4OSG2EScjs.useGlobalChartsTheme.call(void 0, );
  const { xScale, yScale } = _react.useContext.call(void 0, _xychart.DataContext) || {};
  const labelRef = _react.useRef.call(void 0, null);
  const [height, setHeight] = _react.useState.call(void 0, null);
  const styles = _deepmerge2.default.call(void 0, _nullishCoalesce(providerTheme.annotationStyles, () => ( {})), _nullishCoalesce(datumStyles, () => ( {})));
  _react.useEffect.call(void 0, () => {
    if (_optionalChain([labelRef, 'access', _3 => _3.current, 'optionalAccess', _4 => _4.getBBox])) {
      const bbox = labelRef.current.getBBox();
      setHeight(bbox.height);
    }
  }, []);
  const positionData = _react.useMemo.call(void 0, () => {
    if (!datum || !datum.date || datum.value == null || !xScale || !yScale) return null;
    const x2 = xScale(datum.date);
    const y2 = yScale(datum.value);
    if (typeof x2 !== "number" || typeof y2 !== "number") return null;
    const [yMin2, yMax2] = yScale.range().map(Number);
    const [xMin2, xMax2] = xScale.range().map(Number);
    if (renderLabel) {
      return {
        x: x2,
        dx: 0,
        y: y2,
        dy: 0,
        yMin: yMin2,
        yMax: yMax2,
        xMin: xMin2,
        xMax: xMax2,
        isFlippedHorizontally: false,
        isFlippedVertically: false
      };
    }
    const position = getLabelPosition({
      subjectType,
      x: x2,
      xMax: xMax2,
      y: y2,
      yMin: yMin2,
      yMax: yMax2,
      maxWidth: _optionalChain([styles, 'optionalAccess', _5 => _5.label, 'optionalAccess', _6 => _6.maxWidth]),
      height
    });
    return { x: x2, y: y2, yMin: yMin2, yMax: yMax2, xMin: xMin2, xMax: xMax2, ...position };
  }, [datum, xScale, yScale, subjectType, _optionalChain([styles, 'optionalAccess', _7 => _7.label, 'optionalAccess', _8 => _8.maxWidth]), height, renderLabel]);
  if (!positionData) return null;
  const { x, y, yMin, yMax, xMin, xMax, dx, dy, isFlippedHorizontally, isFlippedVertically } = positionData;
  const getLabelY = () => {
    const labelY = _optionalChain([styles, 'optionalAccess', _9 => _9.label, 'optionalAccess', _10 => _10.y]);
    if (labelY === "start") return yMax;
    if (labelY === "end") return yMin;
    return labelY;
  };
  const getLabelX = () => {
    const labelX = _optionalChain([styles, 'optionalAccess', _11 => _11.label, 'optionalAccess', _12 => _12.x]);
    if (labelX === "start") return xMin;
    if (labelX === "end") return xMax;
    return labelX;
  };
  const labelPosition = {
    x: getLabelX(),
    y: getLabelY()
  };
  const getSafariHTMLLabelPosition = () => {
    const labelWidth = POPOVER_BUTTON_SIZE;
    const labelHeight = POPOVER_BUTTON_SIZE;
    return _chunkM4OSG2EScjs.isSafari.call(void 0, ) ? {
      transform: `translate(${x + (dx || 0) + (typeof labelPosition.x === "number" ? labelPosition.x - x : 0) - labelWidth}px, ${y + (dy || 0) + (typeof labelPosition.y === "number" ? labelPosition.y - y : 0) - labelHeight}px)`,
      width: labelWidth,
      height: labelHeight
    } : void 0;
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "g", { "data-testid": testId, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _annotation.Annotation, { x, y, dx, dy, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _annotation.Connector, { ..._optionalChain([styles, 'optionalAccess', _13 => _13.connector]) }),
    subjectType === "circle" && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _annotation.CircleSubject, { ..._optionalChain([styles, 'optionalAccess', _14 => _14.circleSubject]) }),
    subjectType === "line-vertical" && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _annotation.LineSubject,
      {
        min: yMax,
        max: yMin,
        ...{ ..._optionalChain([styles, 'optionalAccess', _15 => _15.lineSubject]), orientation: "vertical" }
      }
    ),
    subjectType === "line-horizontal" && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _annotation.LineSubject,
      {
        min: xMin,
        max: xMax,
        ...{ ..._optionalChain([styles, 'optionalAccess', _16 => _16.lineSubject]), orientation: "horizontal" }
      }
    ),
    renderLabel ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _annotation.HtmlLabel, { ..._optionalChain([styles, 'optionalAccess', _17 => _17.label]), ...labelPosition, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { style: getSafariHTMLLabelPosition(), children: renderLabelPopover ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      line_chart_annotation_label_popover_default,
      {
        title,
        subtitle,
        renderLabel,
        renderLabelPopover
      }
    ) : renderLabel({ title, subtitle }) }) }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "g", { ref: labelRef, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _annotation.Label,
      {
        title,
        subtitle,
        ..._optionalChain([styles, 'optionalAccess', _18 => _18.label]),
        ...labelPosition,
        horizontalAnchor: getHorizontalAnchor(subjectType, isFlippedHorizontally),
        verticalAnchor: getVerticalAnchor(
          subjectType,
          isFlippedVertically,
          y,
          yMax,
          _nullishCoalesce(height, () => ( ANNOTATION_INIT_HEIGHT))
        )
      }
    ) })
  ] }) });
};
var line_chart_annotation_default = LineChartAnnotation;

// src/components/line-chart/line-chart.tsx


var X_TICK_WIDTH = 100;
var defaultRenderGlyph = (props) => {
  return /* @__PURE__ */ _react.createElement.call(void 0, DefaultGlyph, { ...props, key: props.key });
};
var toNumber = (val) => {
  const num = typeof val === "number" ? val : parseFloat(val);
  return isNaN(num) ? void 0 : num;
};
var StartGlyph = ({ data, index, color, glyphStyle, renderGlyph, accessors }) => {
  const { xScale, yScale } = _react.useContext.call(void 0, _xychart.DataContext) || {};
  if (!xScale || !yScale) return null;
  if (data.data.length === 0) return null;
  const firstPoint = data.data[0];
  const x = xScale(accessors.xAccessor(firstPoint));
  const y = yScale(accessors.yAccessor(firstPoint));
  if (typeof x !== "number" || typeof y !== "number") return null;
  const size = Math.max(0, _nullishCoalesce(toNumber(_optionalChain([glyphStyle, 'optionalAccess', _19 => _19.radius])), () => ( 4)));
  return renderGlyph({
    key: `start-glyph-${data.label}`,
    index,
    datum: firstPoint,
    color,
    size,
    x,
    y,
    glyphStyle
  });
};
var getCurveType = (type, smoothing) => {
  if (!type) {
    return smoothing ? _curve.curveCatmullRom : _curve.curveLinear;
  }
  switch (type) {
    case "smooth":
      return _curve.curveCatmullRom;
    case "monotone":
      return _curve.curveMonotoneX;
    case "linear":
      return _curve.curveLinear;
    default:
      return _curve.curveLinear;
  }
};
var renderDefaultTooltip = (params) => {
  const { tooltipData } = params;
  const nearestDatum = _optionalChain([tooltipData, 'optionalAccess', _20 => _20.nearestDatum, 'optionalAccess', _21 => _21.datum]);
  if (!nearestDatum) return null;
  const tooltipPoints = Object.entries(_optionalChain([tooltipData, 'optionalAccess', _22 => _22.datumByKey]) || {}).map(([key, { datum }]) => ({
    key,
    value: datum.value
  })).sort((a, b) => b.value - a.value);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: line_chart_module_default["line-chart__tooltip"], children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: line_chart_module_default["line-chart__tooltip-date"], children: _optionalChain([nearestDatum, 'access', _23 => _23.date, 'optionalAccess', _24 => _24.toLocaleDateString, 'call', _25 => _25()]) }),
    tooltipPoints.map((point) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: line_chart_module_default["line-chart__tooltip-row"], children: [
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: line_chart_module_default["line-chart__tooltip-label"], children: [
        point.key,
        ":"
      ] }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: line_chart_module_default["line-chart__tooltip-value"], children: point.value })
    ] }, point.key))
  ] });
};
var formatDateTick = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
};
var validateData = (data) => {
  if (!_optionalChain([data, 'optionalAccess', _26 => _26.length])) return "No data available";
  const hasInvalidData = data.some(
    (series) => series.data.some(
      (point) => isNaN(point.value) || point.value === null || point.value === void 0 || "date" in point && point.date && isNaN(point.date.getTime())
    )
  );
  if (hasInvalidData) return "Invalid data";
  return null;
};
var LineChartScalesRef = ({ chartRef, width, height, margin }) => {
  const context = _react.useContext.call(void 0, _xychart.DataContext);
  _react.useImperativeHandle.call(void 0, 
    chartRef,
    () => ({
      getScales: () => {
        if (!_optionalChain([context, 'optionalAccess', _27 => _27.xScale]) || !_optionalChain([context, 'optionalAccess', _28 => _28.yScale])) {
          return null;
        }
        return {
          xScale: context.xScale,
          yScale: context.yScale
        };
      },
      getChartDimensions: () => ({
        width,
        height,
        margin: margin || {}
      })
    }),
    [context, width, height, margin]
  );
  return null;
};
var LineChartInternal = _react.forwardRef.call(void 0, 
  ({
    data,
    chartId: providedChartId,
    width,
    height,
    className,
    margin,
    withTooltips = true,
    withTooltipCrosshairs,
    showLegend = false,
    legendOrientation = "horizontal",
    legendAlignment = "center",
    legendPosition = "bottom",
    legendMaxWidth,
    legendTextOverflow = "wrap",
    renderGlyph = defaultRenderGlyph,
    glyphStyle = {},
    legendShape = "line",
    withLegendGlyph = false,
    withGradientFill = false,
    smoothing = true,
    curveType,
    renderTooltip = renderDefaultTooltip,
    withStartGlyphs = false,
    options = {},
    onPointerDown = void 0,
    onPointerUp = void 0,
    onPointerMove = void 0,
    onPointerOut = void 0,
    children
  }, ref) => {
    const providerTheme = _chunkM4OSG2EScjs.useGlobalChartsTheme.call(void 0, );
    const theme = _chunkM4OSG2EScjs.useXYChartTheme.call(void 0, data);
    const chartId = _chunkM4OSG2EScjs.useChartId.call(void 0, providedChartId);
    const [legendRef, legendHeight] = _chunkM4OSG2EScjs.useElementHeight.call(void 0, );
    const chartRef = _react.useRef.call(void 0, null);
    const [selectedIndex, setSelectedIndex] = _react.useState.call(void 0, void 0);
    const [isNavigating, setIsNavigating] = _react.useState.call(void 0, false);
    const internalChartRef = _react.useRef.call(void 0, null);
    _react.useImperativeHandle.call(void 0, 
      ref,
      () => ({
        getScales: () => _optionalChain([internalChartRef, 'access', _29 => _29.current, 'optionalAccess', _30 => _30.getScales, 'call', _31 => _31()]) || null,
        getChartDimensions: () => _optionalChain([internalChartRef, 'access', _32 => _32.current, 'optionalAccess', _33 => _33.getChartDimensions, 'call', _34 => _34()]) || { width: 0, height: 0, margin: {} }
      }),
      [internalChartRef]
    );
    const dataSorted = _chunkM4OSG2EScjs.useChartDataTransform.call(void 0, data);
    const { getElementStyles } = _chunkM4OSG2EScjs.useGlobalChartsContext.call(void 0, );
    const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = _chunkH43FBWWZcjs.useKeyboardNavigation.call(void 0, {
      selectedIndex,
      setSelectedIndex,
      isNavigating,
      setIsNavigating,
      chartRef,
      totalPoints: _optionalChain([dataSorted, 'access', _35 => _35[0], 'optionalAccess', _36 => _36.data, 'access', _37 => _37.length]) || 0
    });
    const chartOptions = _react.useMemo.call(void 0, () => {
      const xNumTicks = Math.min(_optionalChain([dataSorted, 'access', _38 => _38[0], 'optionalAccess', _39 => _39.data, 'access', _40 => _40.length]), Math.ceil(width / X_TICK_WIDTH));
      return {
        axis: {
          x: {
            orientation: "bottom",
            numTicks: xNumTicks,
            tickFormat: formatDateTick,
            ..._optionalChain([options, 'optionalAccess', _41 => _41.axis, 'optionalAccess', _42 => _42.x])
          },
          y: {
            orientation: "left",
            numTicks: 4,
            tickFormat: _numberformatters.formatNumberCompact,
            ..._optionalChain([options, 'optionalAccess', _43 => _43.axis, 'optionalAccess', _44 => _44.y])
          }
        },
        xScale: {
          type: "time",
          ..._optionalChain([options, 'optionalAccess', _45 => _45.xScale])
        },
        yScale: {
          type: "linear",
          nice: true,
          zero: false,
          ..._optionalChain([options, 'optionalAccess', _46 => _46.yScale])
        }
      };
    }, [options, dataSorted, width]);
    const tooltipRenderGlyph = _react.useMemo.call(void 0, () => {
      return (props) => {
        const seriesIndex = dataSorted.findIndex(
          (series) => series.label === props.key || series.data.includes(props.datum)
        );
        const seriesData = dataSorted[seriesIndex];
        const { color, glyph: themeGlyph } = getElementStyles({
          data: seriesData,
          index: seriesIndex
        });
        const propsWithResolvedColor = { ...props, color };
        return themeGlyph ? themeGlyph(propsWithResolvedColor) : renderGlyph(propsWithResolvedColor);
      };
    }, [dataSorted, renderGlyph, getElementStyles]);
    const defaultMargin = _chunkM4OSG2EScjs.useChartMargin.call(void 0, height, chartOptions, dataSorted, theme);
    const error = validateData(dataSorted);
    const isDataValid = !error;
    const legendOptions = _react.useMemo.call(void 0, 
      () => ({
        withGlyph: withLegendGlyph,
        glyphSize: Math.max(0, _nullishCoalesce(toNumber(_optionalChain([glyphStyle, 'optionalAccess', _47 => _47.radius])), () => ( 4))),
        renderGlyph
      }),
      [withLegendGlyph, _optionalChain([glyphStyle, 'optionalAccess', _48 => _48.radius]), renderGlyph]
    );
    const legendItems = _chunkSEPMBOVDcjs.useChartLegendItems.call(void 0, dataSorted, legendOptions, legendShape);
    const chartMetadata = _react.useMemo.call(void 0, 
      () => ({
        withGradientFill,
        smoothing,
        curveType,
        withStartGlyphs,
        withLegendGlyph
      }),
      [withGradientFill, smoothing, curveType, withStartGlyphs, withLegendGlyph]
    );
    _chunkM4OSG2EScjs.useChartRegistration.call(void 0, {
      chartId,
      legendItems,
      chartType: "line",
      isDataValid,
      metadata: chartMetadata
    });
    const accessors = {
      xAccessor: (d) => _optionalChain([d, 'optionalAccess', _49 => _49.date]),
      yAccessor: (d) => _optionalChain([d, 'optionalAccess', _50 => _50.value])
    };
    if (error) {
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: _clsx2.default.call(void 0, "line-chart", line_chart_module_default["line-chart"]), children: error });
    }
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _chunkSEPMBOVDcjs.SingleChartContext.Provider,
      {
        value: {
          chartId,
          chartRef: internalChartRef,
          chartWidth: width,
          chartHeight: height - (showLegend ? legendHeight : 0)
        },
        children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "div",
          {
            className: _clsx2.default.call(void 0, "line-chart", line_chart_module_default["line-chart"], className),
            "data-testid": "line-chart",
            style: {
              width,
              height,
              display: "flex",
              flexDirection: showLegend && legendPosition === "top" ? "column-reverse" : "column",
              position: "relative"
            },
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                "div",
                {
                  role: "grid",
                  "aria-label": _i18n.__.call(void 0, "Line chart", "jetpack-charts"),
                  tabIndex: 0,
                  onKeyDown: onChartKeyDown,
                  onFocus: onChartFocus,
                  onBlur: onChartBlur,
                  ref: chartRef,
                  children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
                    _xychart.XYChart,
                    {
                      theme,
                      width,
                      height: height - (showLegend ? legendHeight : 0),
                      margin: {
                        ...defaultMargin,
                        ...margin,
                        ...showLegend && legendPosition === "top" ? { top: (defaultMargin.top || 0) + legendHeight } : {}
                      },
                      xScale: chartOptions.xScale,
                      yScale: chartOptions.yScale,
                      onPointerDown,
                      onPointerUp,
                      onPointerMove,
                      onPointerOut,
                      pointerEventsDataKey: "nearest",
                      children: [
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.Grid, { columns: false, numTicks: 4 }),
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.Axis, { ...chartOptions.axis.x }),
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.Axis, { ...chartOptions.axis.y }),
                        dataSorted.map((seriesData, index) => {
                          const { color, lineStyles, glyph } = getElementStyles({
                            data: seriesData,
                            index
                          });
                          const lineProps = {
                            stroke: color,
                            ...lineStyles
                          };
                          return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "g", { children: [
                            withStartGlyphs && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                              StartGlyph,
                              {
                                index,
                                data: seriesData,
                                color,
                                renderGlyph: _nullishCoalesce(glyph, () => ( renderGlyph)),
                                accessors,
                                glyphStyle
                              }
                            ),
                            withGradientFill && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                              _gradient.LinearGradient,
                              {
                                id: `area-gradient-${chartId}-${index + 1}`,
                                from: color,
                                fromOpacity: 0.4,
                                toOpacity: 0.1,
                                to: providerTheme.backgroundColor,
                                ..._optionalChain([seriesData, 'access', _51 => _51.options, 'optionalAccess', _52 => _52.gradient]),
                                "data-testid": "line-gradient"
                              }
                            ),
                            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                              _xychart.AreaSeries,
                              {
                                dataKey: _optionalChain([seriesData, 'optionalAccess', _53 => _53.label]),
                                data: seriesData.data,
                                ...accessors,
                                fill: withGradientFill ? `url(#area-gradient-${chartId}-${index + 1})` : "transparent",
                                renderLine: true,
                                curve: getCurveType(curveType, smoothing),
                                lineProps
                              },
                              _optionalChain([seriesData, 'optionalAccess', _54 => _54.label])
                            )
                          ] }, _optionalChain([seriesData, 'optionalAccess', _55 => _55.label]) || index);
                        }),
                        withTooltips && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                          _chunkH43FBWWZcjs.AccessibleTooltip,
                          {
                            detectBounds: true,
                            snapTooltipToDatumX: true,
                            snapTooltipToDatumY: true,
                            showSeriesGlyphs: true,
                            renderTooltip,
                            renderGlyph: tooltipRenderGlyph,
                            glyphStyle,
                            showVerticalCrosshair: _optionalChain([withTooltipCrosshairs, 'optionalAccess', _56 => _56.showVertical]),
                            showHorizontalCrosshair: _optionalChain([withTooltipCrosshairs, 'optionalAccess', _57 => _57.showHorizontal]),
                            selectedIndex,
                            tooltipRef,
                            keyboardFocusedClassName: line_chart_module_default["line-chart__tooltip--keyboard-focused"],
                            series: dataSorted
                          }
                        ),
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                          LineChartScalesRef,
                          {
                            chartRef: internalChartRef,
                            width,
                            height,
                            margin
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              showLegend && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                _chunkSEPMBOVDcjs.Legend,
                {
                  orientation: legendOrientation,
                  alignment: legendAlignment,
                  position: legendPosition,
                  maxWidth: legendMaxWidth,
                  textOverflow: legendTextOverflow,
                  className: line_chart_module_default["line-chart-legend"],
                  shape: legendShape,
                  chartId,
                  ref: legendRef
                }
              ),
              children
            ]
          }
        )
      }
    );
  }
);
var LineChartWithProvider = _react.forwardRef.call(void 0, (props, ref) => {
  const existingContext = _react.useContext.call(void 0, _chunkM4OSG2EScjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, LineChartInternal, { ...props, ref });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkM4OSG2EScjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, LineChartInternal, { ...props, ref }) });
});
LineChartWithProvider.displayName = "LineChart";
var LineChart = _chunkM4OSG2EScjs.attachSubComponents.call(void 0, LineChartWithProvider, {
  Legend: _chunkSEPMBOVDcjs.Legend,
  AnnotationsOverlay: line_chart_annotations_overlay_default,
  Annotation: line_chart_annotation_default
});
var LineChartResponsive = _chunkM4OSG2EScjs.attachSubComponents.call(void 0, 
  _chunkFX2PTUFCcjs.withResponsive.call(void 0, LineChartWithProvider),
  {
    Legend: _chunkSEPMBOVDcjs.Legend,
    AnnotationsOverlay: line_chart_annotations_overlay_default,
    Annotation: line_chart_annotation_default
  }
);




exports.LineChart = LineChart; exports.LineChartResponsive = LineChartResponsive;
//# sourceMappingURL=chunk-THHYAVHE.cjs.map