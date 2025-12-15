"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }








var _chunkFI5B6KSHcjs = require('./chunk-FI5B6KSH.cjs');

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
      if (_chunkFI5B6KSHcjs.getColorDistance.call(void 0, candidateHsl, existingHsl) < MIN_COLOR_DISTANCE) {
        isSufficientlyDifferent = false;
        break;
      }
    }
    if (isSufficientlyDifferent) {
      return `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`;
    }
  }
  const fallbackHue = (index - colors.length) * GOLDEN_RATIO * FULL_HUE_ROTATION_DEGREES % FULL_HUE_ROTATION_DEGREES;
  const fallbackSaturation = BASE_SATURATION + index % SATURATION_VARIATION_STEPS * SATURATION_INCREMENT;
  const fallbackLightness = BASE_LIGHTNESS + index % LIGHTNESS_VARIATION_STEPS * LIGHTNESS_INCREMENT;
  return `hsl(${Math.round(fallbackHue)}, ${fallbackSaturation}%, ${fallbackLightness}%)`;
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
    return theme ? _chunkFI5B6KSHcjs.mergeThemes.call(void 0, defaultTheme, theme) : defaultTheme;
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
          if (color.startsWith("--")) {
            const resolved = _chunkFI5B6KSHcjs.resolveCssVariable.call(void 0, color, wrapperRef.current);
            if (resolved === null || resolved === "") {
              continue;
            }
            colorValue = resolved;
          }
          if (colorValue.startsWith("#")) {
            resolvedColors.push(colorValue);
            try {
              const hslColor = _chunkFI5B6KSHcjs.hexToHsl.call(void 0, colorValue);
              hues.push(hslColor[0]);
              existingHslColors.push(hslColor);
              minHue = Math.min(minHue, hslColor[0]);
              maxHue = Math.max(maxHue, hslColor[0]);
            } catch (e) {
              continue;
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
        return overrideColor;
      }
      if (group) {
        const existing = groupToColorMap.get(group);
        if (existing) {
          return existing;
        }
        const assignedCount = groupToColorMap.size;
        const color = colorCache.colors.length > 0 ? getChartColor(assignedCount, colorCache) : "#000000";
        groupToColorMap.set(group, color);
        return color;
      }
      return colorCache.colors.length > 0 ? getChartColor(index, colorCache) : "#000000";
    },
    [colorCache, groupToColorMap]
  );
  const getElementStyles = _react.useCallback.call(void 0, 
    ({ data, index, overrideColor, legendShape }) => {
      const isSeriesData = data && typeof data === "object" && "data" in data && "options" in data;
      const isPointPercentageData = data && typeof data === "object" && "percentage" in data;
      return {
        color: resolveColor({
          group: _optionalChain([data, 'optionalAccess', _ => _.group]),
          index,
          overrideColor: overrideColor || isSeriesData && _optionalChain([data, 'optionalAccess', _2 => _2.options, 'optionalAccess', _3 => _3.stroke]) || isPointPercentageData && _optionalChain([data, 'optionalAccess', _4 => _4.color])
        }),
        lineStyles: isSeriesData ? _chunkFI5B6KSHcjs.getSeriesLineStyles.call(void 0, data, index, providerTheme) : {},
        glyph: _optionalChain([providerTheme, 'access', _5 => _5.glyphs, 'optionalAccess', _6 => _6[index]]),
        shapeStyles: isSeriesData ? _chunkFI5B6KSHcjs.getItemShapeStyles.call(void 0, data, index, providerTheme, legendShape) : {}
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
  const globalTheme = _optionalChain([context, 'optionalAccess', _7 => _7.theme]);
  return _nullishCoalesce(globalTheme, () => ( defaultTheme));
};

// src/hooks/use-xychart-theme.ts
var useXYChartTheme = (data) => {
  const theme = useGlobalChartsTheme();
  return _react.useMemo.call(void 0, () => {
    const seriesColors = (_nullishCoalesce(data, () => ( []))).map((series) => _optionalChain([series, 'access', _8 => _8.options, 'optionalAccess', _9 => _9.stroke])).filter((color) => Boolean(color));
    return _xychart.buildChartTheme.call(void 0, {
      ...theme,
      colors: [...seriesColors, ..._nullishCoalesce(theme.colors, () => ( []))]
    });
  }, [theme, data]);
};

// src/hooks/use-chart-data-transform.ts

var useChartDataTransform = (data) => {
  return _react.useMemo.call(void 0, () => {
    const firstPoint = _optionalChain([data, 'optionalAccess', _10 => _10[0], 'optionalAccess', _11 => _11.data, 'optionalAccess', _12 => _12[0]]);
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
          date = _chunkFI5B6KSHcjs.parseAsLocalDate.call(void 0, point.dateString);
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
        (d) => d.label || _optionalChain([options, 'access', _13 => _13.axis, 'optionalAccess', _14 => _14.y, 'optionalAccess', _15 => _15.tickFormat, 'call', _16 => _16(d.date.getTime(), 0, [])])
      );
    }
    const minY = Math.min(...allDataPoints.map((d) => d.value));
    const maxY = Math.max(...allDataPoints.map((d) => d.value));
    const yScale = _scale.createScale.call(void 0, {
      ...options.yScale,
      domain: [minY, maxY],
      range: [height, 0]
    });
    return _scale.getTicks.call(void 0, yScale, _optionalChain([options, 'access', _17 => _17.axis, 'optionalAccess', _18 => _18.y, 'optionalAccess', _19 => _19.numTicks]));
  }, [options, data, height, horizontal]);
  return _react.useMemo.call(void 0, () => {
    const defaultMargin = { top: 10, right: 20, bottom: 20, left: 20 };
    const defaultTickWidth = 40;
    const yAxisOrientation = _optionalChain([options, 'access', _20 => _20.axis, 'optionalAccess', _21 => _21.y, 'optionalAccess', _22 => _22.orientation]);
    const yAxisStyles = yAxisOrientation === "right" ? theme.axisStyles.y.right : theme.axisStyles.y.left;
    const yTickWidth = _chunkFI5B6KSHcjs.getLongestTickWidth.call(void 0, 
      yTicks,
      _optionalChain([options, 'access', _23 => _23.axis, 'optionalAccess', _24 => _24.y, 'optionalAccess', _25 => _25.tickFormat]),
      yAxisStyles.axisLabel
    );
    const yMarginValue = (_nullishCoalesce(yTickWidth, () => ( defaultTickWidth))) + (_nullishCoalesce(_optionalChain([yAxisStyles, 'optionalAccess', _26 => _26.tickLength]), () => ( 0)));
    if (yAxisOrientation === "right") {
      defaultMargin.right = yMarginValue;
    } else {
      defaultMargin.left = yMarginValue;
    }
    if (_optionalChain([options, 'access', _27 => _27.axis, 'optionalAccess', _28 => _28.x, 'optionalAccess', _29 => _29.orientation]) === "top") {
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



















exports.defaultTheme = defaultTheme; exports.GlobalChartsContext = GlobalChartsContext; exports.GlobalChartsProvider = GlobalChartsProvider; exports.useGlobalChartsContext = useGlobalChartsContext; exports.useChartId = useChartId; exports.useDeepMemo = useDeepMemo; exports.useChartMouseHandler = useChartMouseHandler; exports.useXYChartTheme = useXYChartTheme; exports.useChartDataTransform = useChartDataTransform; exports.useChartMargin = useChartMargin; exports.useElementHeight = useElementHeight; exports.useTextTruncation = useTextTruncation; exports.useZeroValueDisplay = useZeroValueDisplay; exports.useInteractiveLegendData = useInteractiveLegendData; exports.usePrefersReducedMotion = usePrefersReducedMotion; exports.useChartRegistration = useChartRegistration; exports.useGlobalChartsTheme = useGlobalChartsTheme;
//# sourceMappingURL=chunk-44EBMDFI.cjs.map