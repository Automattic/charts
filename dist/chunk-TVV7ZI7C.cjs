"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }









var _chunkZVGEDXDPcjs = require('./chunk-ZVGEDXDP.cjs');

// src/hooks/use-deep-memo.ts
var _fastdeepequal = require('fast-deep-equal'); var _fastdeepequal2 = _interopRequireDefault(_fastdeepequal);
var _react = require('react');
var useDeepMemo = (value) => {
  const ref = _react.useRef.call(void 0, value);
  if (!_fastdeepequal2.default.call(void 0, ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
};

// src/hooks/use-chart-mouse-handler.ts
var _event = require('@visx/event');
var _tooltip = require('@visx/tooltip');

var useChartMouseHandler = ({
  withTooltips,
  offsetX = 0,
  offsetY = -10
}) => {
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = _tooltip.useTooltip.call(void 0, );
  const onMouseMove = _react.useCallback.call(void 0, 
    (event, data) => {
      if (!withTooltips) {
        return;
      }
      const coords = _event.localPoint.call(void 0, event);
      if (!coords) {
        return;
      }
      showTooltip({
        tooltipData: data,
        tooltipLeft: coords.x + offsetX,
        tooltipTop: coords.y + offsetY
      });
    },
    [withTooltips, showTooltip, offsetX, offsetY]
  );
  const onMouseLeave = _react.useCallback.call(void 0, () => {
    if (!withTooltips) {
      return;
    }
    hideTooltip();
  }, [withTooltips, hideTooltip]);
  return {
    onMouseMove,
    onMouseLeave,
    tooltipOpen,
    tooltipData: tooltipData || null,
    tooltipLeft,
    tooltipTop
  };
};

// src/hooks/use-xychart-theme.ts
var _xychart = require('@visx/xychart');


// src/providers/chart-context/global-charts-provider.tsx
var _d3color = require('@visx/vendor/d3-color');










// src/providers/chart-context/private/get-chart-color.ts

var GOLDEN_RATIO = 0.618033988749;
var MIN_COLOR_DISTANCE = 25;
var MAX_COLOR_GENERATION_ATTEMPTS = 50;
var VARIATION_ATTEMPT_OFFSET = 0.1;
var BASE_SATURATION = 45;
var SATURATION_VARIATION_STEPS = 3;
var SATURATION_INCREMENT = 10;
var BASE_LIGHTNESS = 35;
var LIGHTNESS_VARIATION_STEPS = 4;
var LIGHTNESS_INCREMENT = 8;
var MIN_HUE_RANGE_DEGREES = 60;
var HUE_RANGE_EXPANSION_FACTOR = 1.3;
var HUE_WRAP_THRESHOLD_DEGREES = 180;
var FULL_HUE_ROTATION_DEGREES = 360;
var SINGLE_COLOR_HUE_RANGE_FACTOR = 0.33;
var getChartColor = (index, colorCache) => {
  const {
    colors,
    hues,
    existingHslColors,
    minHue: cachedMinHue,
    maxHue: cachedMaxHue
  } = colorCache;
  if (index < colors.length) {
    return colors[index];
  }
  let minHue = cachedMinHue;
  let maxHue = cachedMaxHue;
  for (let attempt = 0; attempt < MAX_COLOR_GENERATION_ATTEMPTS; attempt++) {
    let hue = (index - colors.length + attempt * VARIATION_ATTEMPT_OFFSET) * GOLDEN_RATIO * FULL_HUE_ROTATION_DEGREES % FULL_HUE_ROTATION_DEGREES;
    if (hues.length > 0) {
      let hueRange = maxHue - minHue;
      if (hues.length === 1) {
        hueRange = FULL_HUE_ROTATION_DEGREES * SINGLE_COLOR_HUE_RANGE_FACTOR;
      } else if (hueRange > HUE_WRAP_THRESHOLD_DEGREES) {
        const altMinHue = Math.min(...hues.filter((h) => h > HUE_WRAP_THRESHOLD_DEGREES));
        const altMaxHue = Math.max(...hues.filter((h) => h < HUE_WRAP_THRESHOLD_DEGREES)) + FULL_HUE_ROTATION_DEGREES;
        const altRange = altMaxHue - altMinHue;
        if (altRange < hueRange) {
          minHue = altMinHue;
          maxHue = altMaxHue;
          hueRange = altRange;
        }
      }
      const expandedRange = Math.max(
        hueRange * HUE_RANGE_EXPANSION_FACTOR,
        MIN_HUE_RANGE_DEGREES
      );
      const rangeCenter = (minHue + maxHue) / 2;
      const expandedMin = rangeCenter - expandedRange / 2;
      hue = expandedMin + hue / FULL_HUE_ROTATION_DEGREES * expandedRange;
      hue = (hue % FULL_HUE_ROTATION_DEGREES + FULL_HUE_ROTATION_DEGREES) % FULL_HUE_ROTATION_DEGREES;
    }
    const saturation = BASE_SATURATION + (index + attempt) % SATURATION_VARIATION_STEPS * SATURATION_INCREMENT;
    const lightness = BASE_LIGHTNESS + (index + attempt) % LIGHTNESS_VARIATION_STEPS * LIGHTNESS_INCREMENT;
    const candidateHsl = [hue, saturation, lightness];
    let isSufficientlyDifferent = true;
    for (const existingHsl of existingHslColors) {
      if (_chunkZVGEDXDPcjs.getColorDistance.call(void 0, candidateHsl, existingHsl) < MIN_COLOR_DISTANCE) {
        isSufficientlyDifferent = false;
        break;
      }
    }
    if (isSufficientlyDifferent) {
      return _d3color.hsl.call(void 0, Math.round(hue), saturation / 100, lightness / 100).formatHex();
    }
  }
  const fallbackHue = (index - colors.length) * GOLDEN_RATIO * FULL_HUE_ROTATION_DEGREES % FULL_HUE_ROTATION_DEGREES;
  const fallbackSaturation = BASE_SATURATION + index % SATURATION_VARIATION_STEPS * SATURATION_INCREMENT;
  const fallbackLightness = BASE_LIGHTNESS + index % LIGHTNESS_VARIATION_STEPS * LIGHTNESS_INCREMENT;
  return _d3color.hsl.call(void 0, 
    Math.round(fallbackHue),
    fallbackSaturation / 100,
    fallbackLightness / 100
  ).formatHex();
};

// src/providers/chart-context/themes.ts
var defaultTheme = {
  backgroundColor: "#FFFFFF",
  // chart background color
  labelBackgroundColor: "transparent",
  // label background color (transparent by default)
  labelTextColor: "#FFFFFF",
  // label text color (white to match original behavior)
  colors: ["#98C8DF", "#006DAB", "#A6DC80", "#1F9828", "#FF8C8F"],
  gridStyles: {
    stroke: "#DCDCDE",
    strokeWidth: 1
  },
  tickLength: 4,
  gridColor: "",
  gridColorDark: "",
  xTickLineStyles: { stroke: "black" },
  xAxisLineStyles: { stroke: "#DCDCDE", strokeWidth: 1 },
  legendLabelStyles: {
    color: "var(--jp-gray-80, #2c3338)"
  },
  legendContainerStyles: {},
  seriesLineStyles: [],
  legendShapeStyles: [],
  glyphs: [],
  svgLabelSmall: { fill: "var(--jp-gray-80, #2c3338)" },
  annotationStyles: {
    label: {
      anchorLineStroke: "var(--jp-gray-80, #2c3338)",
      backgroundFill: "#fff"
    },
    connector: {
      stroke: "var(--jp-gray-80, #2c3338)"
    },
    circleSubject: {
      stroke: "transparent",
      fill: "var(--jp-gray-80, #2c3338)",
      radius: 5
    }
  },
  geoChart: {
    featureFillColor: "var(--jp-gray-0, #f6f7f7)"
  },
  leaderboardChart: {
    rowGap: 12,
    columnGap: 4,
    labelSpacing: 1.5,
    deltaColors: ["#FF8C8F", "#757575", "#1F9828"]
    // [negative, neutral, positive]
  },
  conversionFunnelChart: {
    backgroundColor: "#F3F4F6",
    positiveChangeColor: "#1F9828",
    negativeChangeColor: "#FF8C8F"
  },
  lineChart: {
    lineStyles: {
      comparison: {
        strokeDasharray: "4 4",
        strokeLinecap: "square"
      }
    }
  },
  sparkline: {
    margin: { top: 2, right: 2, bottom: 2, left: 2 },
    strokeWidth: 1.5
  }
};

// src/providers/chart-context/global-charts-provider.tsx
var _jsxruntime = require('react/jsx-runtime');
var GlobalChartsContext = _react.createContext.call(void 0, null);
var GlobalChartsProvider = ({ children, theme }) => {
  const [charts, setCharts] = _react.useState.call(void 0, () => /* @__PURE__ */ new Map());
  const [hiddenSeries, setHiddenSeries] = _react.useState.call(void 0, 
    () => /* @__PURE__ */ new Map()
  );
  const wrapperRef = _react.useRef.call(void 0, null);
  const providerTheme = _react.useMemo.call(void 0, () => {
    return theme ? _chunkZVGEDXDPcjs.mergeThemes.call(void 0, defaultTheme, theme) : defaultTheme;
  }, [theme]);
  const [colorCache, setColorCache] = _react.useState.call(void 0, () => ({
    colors: [],
    hues: [],
    existingHslColors: [],
    minHue: 360,
    maxHue: 0
  }));
  _react.useLayoutEffect.call(void 0, () => {
    const { colors } = providerTheme;
    const resolvedColors = [];
    const hues = [];
    const existingHslColors = [];
    let minHue = 360;
    let maxHue = 0;
    if (Array.isArray(colors)) {
      for (const color of colors) {
        if (color && typeof color === "string") {
          let colorValue = color;
          if (color.startsWith("--") || color.startsWith("var(")) {
            const resolved = _chunkZVGEDXDPcjs.resolveCssVariable.call(void 0, color, wrapperRef.current);
            if (resolved === null || resolved === "") {
              continue;
            }
            colorValue = resolved;
          }
          if (colorValue.startsWith("#")) {
            resolvedColors.push(colorValue);
            const hslColor = _d3color.hsl.call(void 0, colorValue);
            if (!isNaN(hslColor.h)) {
              const hslTuple = [
                hslColor.h,
                hslColor.s * 100,
                hslColor.l * 100
              ];
              hues.push(hslTuple[0]);
              existingHslColors.push(hslTuple);
              minHue = Math.min(minHue, hslTuple[0]);
              maxHue = Math.max(maxHue, hslTuple[0]);
            }
          }
        }
      }
    }
    setColorCache({
      colors: resolvedColors,
      hues,
      existingHslColors,
      minHue,
      maxHue
    });
  }, [providerTheme]);
  const [groupToColorMap, setGroupToColorMap] = _react.useState.call(void 0, 
    () => /* @__PURE__ */ new Map()
  );
  _react.useEffect.call(void 0, () => {
    setGroupToColorMap(/* @__PURE__ */ new Map());
  }, [providerTheme.colors]);
  const registerChart = _react.useCallback.call(void 0, (id, data) => {
    setCharts((prev) => new Map(prev).set(id, data));
  }, []);
  const unregisterChart = _react.useCallback.call(void 0, (id) => {
    setCharts((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);
  const getChartData = _react.useCallback.call(void 0, 
    (id) => {
      return charts.get(id);
    },
    [charts]
  );
  const resolveColor = _react.useCallback.call(void 0, 
    ({
      group,
      index,
      overrideColor
    }) => {
      if (overrideColor) {
        return _chunkZVGEDXDPcjs.normalizeColorToHex.call(void 0, overrideColor, wrapperRef.current, _chunkZVGEDXDPcjs.resolveCssVariable);
      }
      if (group) {
        const existing = groupToColorMap.get(group);
        if (existing) {
          return existing;
        }
        const assignedCount = groupToColorMap.size;
        const color = getChartColor(assignedCount, colorCache);
        groupToColorMap.set(group, color);
        return color;
      }
      return getChartColor(index, colorCache);
    },
    [colorCache, groupToColorMap]
  );
  const getElementStyles = _react.useCallback.call(void 0, 
    ({ data, index, overrideColor, legendShape }) => {
      const isSeriesData = data && typeof data === "object" && "data" in data && "options" in data;
      const isPointPercentageData = data && typeof data === "object" && "percentage" in data;
      return {
        color: resolveColor({
          group: _optionalChain([data, 'optionalAccess', _2 => _2.group]),
          index,
          overrideColor: overrideColor || isSeriesData && _optionalChain([data, 'optionalAccess', _3 => _3.options, 'optionalAccess', _4 => _4.stroke]) || isPointPercentageData && _optionalChain([data, 'optionalAccess', _5 => _5.color])
        }),
        lineStyles: isSeriesData ? _chunkZVGEDXDPcjs.getSeriesLineStyles.call(void 0, data, index, providerTheme) : {},
        glyph: _optionalChain([providerTheme, 'access', _6 => _6.glyphs, 'optionalAccess', _7 => _7[index]]),
        shapeStyles: isSeriesData ? _chunkZVGEDXDPcjs.getItemShapeStyles.call(void 0, data, index, providerTheme, legendShape) : {}
      };
    },
    [providerTheme, resolveColor]
  );
  const toggleSeriesVisibility = _react.useCallback.call(void 0, (chartId, seriesLabel) => {
    setHiddenSeries((prev) => {
      const newMap = new Map(prev);
      const chartHidden = newMap.get(chartId) || /* @__PURE__ */ new Set();
      const newSet = new Set(chartHidden);
      if (newSet.has(seriesLabel)) {
        newSet.delete(seriesLabel);
      } else {
        newSet.add(seriesLabel);
      }
      if (newSet.size === 0) {
        newMap.delete(chartId);
      } else {
        newMap.set(chartId, newSet);
      }
      return newMap;
    });
  }, []);
  const isSeriesVisible = _react.useCallback.call(void 0, 
    (chartId, seriesLabel) => {
      const chartHidden = hiddenSeries.get(chartId);
      return !chartHidden || !chartHidden.has(seriesLabel);
    },
    [hiddenSeries]
  );
  const getHiddenSeries = _react.useCallback.call(void 0, 
    (chartId) => {
      const set = hiddenSeries.get(chartId);
      return set ? new Set(set) : /* @__PURE__ */ new Set();
    },
    [hiddenSeries]
  );
  const value = _react.useMemo.call(void 0, 
    () => ({
      charts,
      registerChart,
      unregisterChart,
      getChartData,
      theme: providerTheme,
      getElementStyles,
      toggleSeriesVisibility,
      isSeriesVisible,
      getHiddenSeries
    }),
    [
      charts,
      registerChart,
      unregisterChart,
      getChartData,
      providerTheme,
      getElementStyles,
      toggleSeriesVisibility,
      isSeriesVisible,
      getHiddenSeries
    ]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, GlobalChartsContext.Provider, { value, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ref: wrapperRef, style: { display: "contents" }, children }) });
};

// src/providers/chart-context/hooks/use-global-charts-context.ts

var useGlobalChartsContext = () => {
  const context = _react.useContext.call(void 0, GlobalChartsContext);
  if (!context) {
    throw new Error("useGlobalChartsContext must be used within a GlobalChartsProvider");
  }
  return context;
};

// src/providers/chart-context/hooks/use-chart-id.ts

var useChartId = (providedId) => {
  const generatedId = _react.useId.call(void 0, );
  return providedId || generatedId;
};

// src/providers/chart-context/hooks/use-chart-registration.ts

var useChartRegistration = ({
  chartId,
  legendItems,
  chartType,
  isDataValid,
  metadata
}) => {
  const { registerChart, unregisterChart } = useGlobalChartsContext();
  const stableLegendItems = useDeepMemo(legendItems);
  const memoizedMetadata = _react.useMemo.call(void 0, () => metadata, [metadata]);
  _react.useEffect.call(void 0, () => {
    if (isDataValid) {
      registerChart(chartId, {
        legendItems: stableLegendItems,
        chartType,
        metadata: memoizedMetadata
      });
    }
    return () => {
      unregisterChart(chartId);
    };
  }, [
    chartId,
    stableLegendItems,
    chartType,
    memoizedMetadata,
    isDataValid
    // Removed registerChart and unregisterChart from dependencies
    // They are stable functions created with useCallback and empty deps
  ]);
};

// src/providers/chart-context/hooks/use-global-charts-theme.ts

var useGlobalChartsTheme = () => {
  const context = _react.useContext.call(void 0, GlobalChartsContext);
  const globalTheme = _optionalChain([context, 'optionalAccess', _8 => _8.theme]);
  return _nullishCoalesce(globalTheme, () => ( defaultTheme));
};

// src/hooks/use-xychart-theme.ts
var useXYChartTheme = (data) => {
  const theme = useGlobalChartsTheme();
  return _react.useMemo.call(void 0, () => {
    const seriesColors = (_nullishCoalesce(data, () => ( []))).map((series) => _optionalChain([series, 'access', _9 => _9.options, 'optionalAccess', _10 => _10.stroke])).filter((color) => Boolean(color));
    return _xychart.buildChartTheme.call(void 0, {
      ...theme,
      colors: [...seriesColors, ..._nullishCoalesce(theme.colors, () => ( []))]
    });
  }, [theme, data]);
};

// src/hooks/use-chart-data-transform.ts

var useChartDataTransform = (data) => {
  return _react.useMemo.call(void 0, () => {
    const firstPoint = _optionalChain([data, 'optionalAccess', _11 => _11[0], 'optionalAccess', _12 => _12.data, 'optionalAccess', _13 => _13[0]]);
    const hasDateProperties = firstPoint && ("date" in firstPoint || "dateString" in firstPoint);
    if (!hasDateProperties) {
      return data;
    }
    return data.map((series) => ({
      ...series,
      data: series.data.map((point) => {
        let date;
        if ("date" in point && point.date) {
          date = point.date;
        } else if ("dateString" in point && point.dateString) {
          date = _chunkZVGEDXDPcjs.parseAsLocalDate.call(void 0, point.dateString);
        }
        return {
          ...point,
          date
        };
      }).sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return a.date.getTime() - b.date.getTime();
      })
    }));
  }, [data]);
};

// src/hooks/use-chart-margin.tsx
var _scale = require('@visx/scale');

var useChartMargin = (height, options, data, theme, horizontal = false) => {
  const yTicks = _react.useMemo.call(void 0, () => {
    const allDataPoints = data.flatMap((series) => series.data);
    if (horizontal) {
      return allDataPoints.map(
        (d) => d.label || _optionalChain([options, 'access', _14 => _14.axis, 'optionalAccess', _15 => _15.y, 'optionalAccess', _16 => _16.tickFormat, 'call', _17 => _17(d.date.getTime(), 0, [])])
      );
    }
    const minY = Math.min(...allDataPoints.map((d) => d.value));
    const maxY = Math.max(...allDataPoints.map((d) => d.value));
    const yScale = _scale.createScale.call(void 0, {
      ...options.yScale,
      domain: [minY, maxY],
      range: [height, 0]
    });
    return _scale.getTicks.call(void 0, yScale, _optionalChain([options, 'access', _18 => _18.axis, 'optionalAccess', _19 => _19.y, 'optionalAccess', _20 => _20.numTicks]));
  }, [options, data, height, horizontal]);
  return _react.useMemo.call(void 0, () => {
    const defaultMargin = { top: 10, right: 20, bottom: 20, left: 20 };
    const defaultTickWidth = 40;
    const yAxisOrientation = _optionalChain([options, 'access', _21 => _21.axis, 'optionalAccess', _22 => _22.y, 'optionalAccess', _23 => _23.orientation]);
    const yAxisStyles = yAxisOrientation === "right" ? theme.axisStyles.y.right : theme.axisStyles.y.left;
    const yTickWidth = _chunkZVGEDXDPcjs.getLongestTickWidth.call(void 0, 
      yTicks,
      _optionalChain([options, 'access', _24 => _24.axis, 'optionalAccess', _25 => _25.y, 'optionalAccess', _26 => _26.tickFormat]),
      yAxisStyles.axisLabel
    );
    const yMarginValue = (_nullishCoalesce(yTickWidth, () => ( defaultTickWidth))) + (_nullishCoalesce(_optionalChain([yAxisStyles, 'optionalAccess', _27 => _27.tickLength]), () => ( 0)));
    if (yAxisOrientation === "right") {
      defaultMargin.right = yMarginValue;
    } else {
      defaultMargin.left = yMarginValue;
    }
    if (_optionalChain([options, 'access', _28 => _28.axis, 'optionalAccess', _29 => _29.x, 'optionalAccess', _30 => _30.orientation]) === "top") {
      defaultMargin.top = 20;
      defaultMargin.bottom = 10;
    }
    return defaultMargin;
  }, [options, theme, yTicks]);
};

// src/hooks/use-element-height.ts

function useElementHeight({
  initialHeight = 0
} = {}) {
  const [height, setHeight] = _react.useState.call(void 0, initialHeight);
  const observerRef = _react.useRef.call(void 0, null);
  const refCallback = _react.useCallback.call(void 0, (node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (node) {
      const handleResize = () => {
        setHeight(node.getBoundingClientRect().height || 0);
      };
      handleResize();
      const resizeObserver = new window.ResizeObserver(handleResize);
      resizeObserver.observe(node);
      observerRef.current = resizeObserver;
    }
  }, []);
  return [refCallback, height];
}

// src/hooks/use-has-legend-child.ts


// src/components/legend/legend.tsx


// src/charts/private/single-chart-context/single-chart-context.tsx

var ChartInstanceContext = _react.createContext.call(void 0, null);
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
  "legend-item--interactive": "a8ccharts-qGsavM",
  "legend-item--inactive": "a8ccharts-ZtDY-Q",
  "legend-item-label": "a8ccharts-2H65Kr",
  "legend-item-text--wrap": "a8ccharts-faSDBI",
  "legend-item-text--ellipsis": "a8ccharts-FISUIO",
  "legend-item-value": "a8ccharts-DTZlT-"
};

// src/components/legend/private/base-legend.tsx

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
  const [textRef, isTruncated] = useTextTruncation(Boolean(isEllipsis));
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "span",
    {
      ref: textRef,
      className: _clsx2.default.call(void 0, 
        base_legend_module_default["legend-item-text"],
        maxWidth != null && base_legend_module_default[`legend-item-text--${textOverflow}`]
      ),
      style: {
        ...maxWidth != null && {
          maxWidth,
          minWidth: 0
        }
      },
      title: isEllipsis && isTruncated ? text : void 0,
      children: text
    }
  );
};
var BaseLegend = _react.forwardRef.call(void 0, 
  ({
    items,
    className,
    orientation = "horizontal",
    position = "bottom",
    alignment = "center",
    maxWidth,
    textOverflow = "wrap",
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
    legendItemClassName,
    render,
    interactive = false,
    chartId,
    ...legendItemProps
  }, ref) => {
    const theme = useGlobalChartsTheme();
    const context = _react.useContext.call(void 0, GlobalChartsContext);
    const legendScale = _scale.scaleOrdinal.call(void 0, {
      domain: items.map((item) => item.label),
      range: items.map((item) => item.color)
    });
    const domain = legendScale.domain();
    const getShapeStyle = _react.useCallback.call(void 0, 
      ({ index }) => _optionalChain([items, 'access', _31 => _31[index], 'optionalAccess', _32 => _32.shapeStyle]),
      [items]
    );
    const handleLegendClick = _react.useCallback.call(void 0, 
      (seriesLabel) => {
        if (interactive && chartId && context) {
          context.toggleSeriesVisibility(chartId, seriesLabel);
        }
      },
      [interactive, chartId, context]
    );
    const isSeriesVisible = _react.useCallback.call(void 0, 
      (seriesLabel) => {
        if (!interactive || !chartId || !context) {
          return true;
        }
        return context.isSeriesVisible(chartId, seriesLabel);
      },
      [interactive, chartId, context]
    );
    const createClickHandler = _react.useCallback.call(void 0, 
      (labelText) => {
        if (!interactive) {
          return void 0;
        }
        return () => handleLegendClick(labelText);
      },
      [interactive, handleLegendClick]
    );
    const createKeyDownHandler = _react.useCallback.call(void 0, 
      (labelText) => {
        if (!interactive) {
          return void 0;
        }
        return (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleLegendClick(labelText);
          }
        };
      },
      [interactive, handleLegendClick]
    );
    return render ? render(items) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
            children: labels.map((label, i) => {
              const visible = isSeriesVisible(label.text);
              const handleClick = createClickHandler(label.text);
              const handleKeyDown = createKeyDownHandler(label.text);
              return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
                _legend.LegendItem,
                {
                  className: _clsx2.default.call(void 0, 
                    "visx-legend-item",
                    base_legend_module_default["legend-item"],
                    interactive && base_legend_module_default["legend-item--interactive"],
                    !visible && base_legend_module_default["legend-item--inactive"],
                    legendItemClassName
                  ),
                  "data-testid": "legend-item",
                  margin: itemMargin,
                  flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
                  onClick: handleClick,
                  onKeyDown: handleKeyDown,
                  role: interactive ? "button" : void 0,
                  tabIndex: interactive ? 0 : void 0,
                  "aria-pressed": interactive ? visible : void 0,
                  "aria-label": interactive ? `${label.text}: ${visible ? "visible" : "hidden"}. Toggle visibility.` : void 0,
                  ...legendItemProps,
                  children: [
                    _optionalChain([items, 'access', _33 => _33[i], 'optionalAccess', _34 => _34.renderGlyph]) ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                      "svg",
                      {
                        width: _optionalChain([items, 'access', _35 => _35[i], 'optionalAccess', _36 => _36.glyphSize]) * 2,
                        height: _optionalChain([items, 'access', _37 => _37[i], 'optionalAccess', _38 => _38.glyphSize]) * 2,
                        "data-testid": "legend-glyph",
                        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _group.Group, { children: _optionalChain([items, 'access', _39 => _39[i], 'optionalAccess', _40 => _40.renderGlyph, 'call', _41 => _41({
                          key: `legend-glyph-${label.text}`,
                          datum: {},
                          index: i,
                          color: fill(label),
                          size: _optionalChain([items, 'access', _42 => _42[i], 'optionalAccess', _43 => _43.glyphSize]),
                          x: _optionalChain([items, 'access', _44 => _44[i], 'optionalAccess', _45 => _45.glyphSize]),
                          y: _optionalChain([items, 'access', _46 => _46[i], 'optionalAccess', _47 => _47.glyphSize])
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
                        className: _clsx2.default.call(void 0, "visx-legend-label", base_legend_module_default["legend-item-label"]),
                        style: {
                          justifyContent: labelAlign,
                          flex: labelFlex,
                          margin: labelMargin,
                          ...theme.legendLabelStyles
                        },
                        ...legendLabelProps,
                        children: [
                          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                            LegendText,
                            {
                              text: label.text,
                              textOverflow,
                              maxWidth
                            }
                          ),
                          _optionalChain([items, 'access', _48 => _48.find, 'call', _49 => _49((item) => item.label === label.text), 'optionalAccess', _50 => _50.value]) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: base_legend_module_default["legend-item-value"], children: [
                            "\xA0",
                            _optionalChain([items, 'access', _51 => _51.find, 'call', _52 => _52((item) => item.label === label.text), 'optionalAccess', _53 => _53.value])
                          ] })
                        ]
                      }
                    )
                  ]
                },
                `legend-${label.text}-${i}`
              );
            })
          }
        )
      }
    );
  }
);

// src/components/legend/legend.tsx

var Legend = _react.forwardRef.call(void 0, 
  ({ chartId, items, ...props }, ref) => {
    const context = _react.useContext.call(void 0, GlobalChartsContext);
    const singleChartContext = _react.useContext.call(void 0, SingleChartContext);
    const contextChartId = _nullishCoalesce(chartId, () => ( _optionalChain([singleChartContext, 'optionalAccess', _54 => _54.chartId])));
    const contextItems = _react.useMemo.call(void 0, () => {
      return contextChartId && context ? _optionalChain([context, 'access', _55 => _55.getChartData, 'call', _56 => _56(contextChartId), 'optionalAccess', _57 => _57.legendItems]) : void 0;
    }, [contextChartId, context]);
    const legendItems = items || contextItems;
    if (!legendItems) {
      return null;
    }
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BaseLegend, { ref, items: legendItems, ...props, chartId: contextChartId });
  }
);

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
        return _chunkZVGEDXDPcjs.formatPercentage.call(void 0, percentagePoint.percentage);
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
      value: showValues ? _optionalChain([series, 'access', _58 => _58.data, 'optionalAccess', _59 => _59.length, 'optionalAccess', _60 => _60.toString, 'call', _61 => _61()]) || "0" : "",
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
  const { getElementStyles } = useGlobalChartsContext();
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

// src/hooks/use-has-legend-child.ts
function useHasLegendChild(children) {
  return _react.useMemo.call(void 0, () => {
    let found = false;
    _react.Children.forEach(children, (child) => {
      if (_react.isValidElement.call(void 0, child) && child.type === Legend) {
        found = true;
      }
    });
    return found;
  }, [children]);
}

// src/hooks/use-text-truncation.ts

function useTextTruncation(enabled = true) {
  const [isTruncated, setIsTruncated] = _react.useState.call(void 0, false);
  const observerRef = _react.useRef.call(void 0, null);
  const refCallback = _react.useCallback.call(void 0, 
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (node && enabled) {
        const checkTruncation = () => {
          const truncated = node.scrollWidth > node.clientWidth;
          setIsTruncated(truncated);
        };
        checkTruncation();
        const resizeObserver = new ResizeObserver(checkTruncation);
        resizeObserver.observe(node);
        observerRef.current = resizeObserver;
      } else {
        setIsTruncated(false);
      }
    },
    [enabled]
  );
  return [refCallback, isTruncated];
}

// src/hooks/use-zero-value-display.ts

var useZeroValueDisplay = (data, options = { enabled: false }) => {
  const { enabled, minValueRatio = 0.6, maxValueRatio = 8e-3 } = options;
  return _react.useMemo.call(void 0, () => {
    if (!enabled) return data;
    const nonZeroValues = [];
    for (const series of data) {
      for (const point of series.data) {
        if (point.value !== null && point.value !== 0) {
          nonZeroValues.push(point.value);
        }
      }
    }
    if (nonZeroValues.length === 0) return data;
    const absoluteValues = nonZeroValues.map(Math.abs);
    const minAbsoluteValue = Math.min(...absoluteValues);
    const maxAbsoluteValue = Math.max(...absoluteValues);
    const minVisibleValue = Math.min(
      minAbsoluteValue * minValueRatio,
      maxAbsoluteValue * maxValueRatio
    );
    return data.map((series) => ({
      ...series,
      data: series.data.map((point) => {
        if (point.value === 0) {
          return {
            ...point,
            visualValue: minVisibleValue
          };
        }
        return point;
      })
    }));
  }, [data, enabled, minValueRatio, maxValueRatio]);
};

// src/hooks/use-interactive-legend-data.ts

var useInteractiveLegendData = ({
  data,
  chartId,
  legendInteractive,
  isSeriesVisible
}) => {
  const visibleData = _react.useMemo.call(void 0, () => {
    if (!chartId || !legendInteractive) {
      return data;
    }
    const filtered = data.filter((segment) => isSeriesVisible(chartId, segment.label));
    if (filtered.length === 0) {
      return [];
    }
    const totalValue = filtered.reduce((sum, segment) => sum + segment.value, 0);
    return filtered.map((segment) => ({
      ...segment,
      percentage: totalValue > 0 ? segment.value / totalValue * 100 : 0
    }));
  }, [data, chartId, isSeriesVisible, legendInteractive]);
  const allSegmentsHidden = _react.useMemo.call(void 0, () => {
    return legendInteractive && visibleData.length === 0;
  }, [legendInteractive, visibleData]);
  const legendData = _react.useMemo.call(void 0, () => {
    if (!legendInteractive || !chartId) {
      return data;
    }
    return data.map((segment) => {
      const isVisible = isSeriesVisible(chartId, segment.label);
      if (!isVisible) {
        return segment;
      }
      const recalculated = visibleData.find((d) => d.label === segment.label);
      return recalculated || segment;
    });
  }, [data, visibleData, legendInteractive, chartId, isSeriesVisible]);
  return { visibleData, allSegmentsHidden, legendData };
};

// src/hooks/use-prefers-reduced-motion.ts

var QUERY = "(prefers-reduced-motion: no-preference)";
var getInitialState = () => !window.matchMedia(QUERY).matches;
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = _react.useState.call(void 0, getInitialState);
  _react.useEffect.call(void 0, () => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);
  return prefersReducedMotion;
}
























exports.SingleChartContext = SingleChartContext; exports.useSingleChartContext = useSingleChartContext; exports.defaultTheme = defaultTheme; exports.GlobalChartsContext = GlobalChartsContext; exports.GlobalChartsProvider = GlobalChartsProvider; exports.useGlobalChartsContext = useGlobalChartsContext; exports.useChartId = useChartId; exports.useDeepMemo = useDeepMemo; exports.useChartMouseHandler = useChartMouseHandler; exports.useXYChartTheme = useXYChartTheme; exports.useChartDataTransform = useChartDataTransform; exports.useChartMargin = useChartMargin; exports.useElementHeight = useElementHeight; exports.useHasLegendChild = useHasLegendChild; exports.useTextTruncation = useTextTruncation; exports.useZeroValueDisplay = useZeroValueDisplay; exports.useInteractiveLegendData = useInteractiveLegendData; exports.usePrefersReducedMotion = usePrefersReducedMotion; exports.useChartRegistration = useChartRegistration; exports.useGlobalChartsTheme = useGlobalChartsTheme; exports.Legend = Legend; exports.useChartLegendItems = useChartLegendItems;
//# sourceMappingURL=chunk-TVV7ZI7C.cjs.map