"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/hooks/use-deep-memo.ts
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
  withTooltips
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
        tooltipLeft: coords.x,
        tooltipTop: coords.y - 10
      });
    },
    [withTooltips, showTooltip]
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


// src/utils/create-composition.ts
function attachSubComponents(Chart, subComponents) {
  return Object.assign(Chart, subComponents);
}

// src/utils/date-parsing.ts
var _datefns = require('date-fns');
var hasTimezone = (dateString) => {
  return /T.*[Z]$|T.*[+-]\d{2}:?\d{2}$/.test(dateString);
};
var parseAsLocalDate = (dateString) => {
  const trimmedString = dateString.trim();
  if (hasTimezone(trimmedString)) {
    const isoDate = _datefns.parseISO.call(void 0, trimmedString);
    if (!_datefns.isValid.call(void 0, isoDate)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return isoDate;
  }
  const formats = [
    "yyyy-MM-dd",
    // 2025-01-01
    "yyyy-MM-dd HH:mm:ss",
    // 2025-01-01 14:30:45
    "yyyy-MM-dd HH:mm",
    // 2025-01-01 14:30
    "yyyy-MM-dd'T'HH:mm:ss",
    // 2025-01-01T14:30:45
    "yyyy-MM-dd'T'HH:mm:ss.SSS",
    // 2025-01-01T14:30:45.123
    "yyyy-MM-dd'T'HH:mm"
    // 2025-01-01T14:30
  ];
  for (const format of formats) {
    const result = _datefns.parse.call(void 0, trimmedString, format, /* @__PURE__ */ new Date());
    if (_datefns.isValid.call(void 0, result)) {
      return result;
    }
  }
  return /* @__PURE__ */ new Date(NaN);
};

// src/utils/format-metric-value.ts
var _numberformatters = require('@automattic/number-formatters');
var formatMetricValue = (value, type = "number", { decimals, useMultipliers = false, signDisplay } = {}) => {
  if (value === null || value === void 0) {
    return "";
  }
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return "";
  }
  switch (type) {
    case "currency": {
      const formatted = useMultipliers ? _numberformatters.formatNumberCompact.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 2)),
        numberFormatOptions: {
          maximumFractionDigits: _nullishCoalesce(decimals, () => ( 2)),
          signDisplay
        }
      }) : _numberformatters.formatNumber.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 2)),
        numberFormatOptions: {
          signDisplay
        }
      });
      return `$${formatted}`;
    }
    case "average": {
      if (!Number.isFinite(numericValue)) {
        return "\u2014";
      }
      return _numberformatters.formatNumber.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 0)),
        numberFormatOptions: {
          style: "percent",
          signDisplay: _nullishCoalesce(signDisplay, () => ( "exceptZero"))
        }
      });
    }
    case "number":
    default: {
      return useMultipliers ? _numberformatters.formatNumberCompact.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 0)),
        numberFormatOptions: {
          maximumFractionDigits: _nullishCoalesce(decimals, () => ( 0)),
          signDisplay
        }
      }) : _numberformatters.formatNumber.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 0)),
        numberFormatOptions: {
          signDisplay
        }
      });
    }
  }
};

// src/utils/format-percentage.ts

var formatPercentage = (value) => {
  return _numberformatters.formatNumber.call(void 0, value / 100, {
    numberFormatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
  });
};

// src/utils/get-longest-tick-width.ts
var _text = require('@visx/text');
var getLongestTickWidth = (ticks, formatTick, labelStyle) => {
  const formattedTicks = ticks.map((tick) => formatTick(tick, 0, []));
  const longestTick = formattedTicks.reduce(
    (longest, current) => longest.length >= current.length ? longest : current,
    formattedTicks[0]
  );
  return _text.getStringWidth.call(void 0, longestTick, labelStyle);
};

// src/utils/get-styles.ts
function getSeriesLineStyles(seriesData, index, providerTheme) {
  const themeSemanticLineStyle = _optionalChain([providerTheme, 'optionalAccess', _ => _.lineChart, 'optionalAccess', _2 => _2.lineStyles, 'optionalAccess', _3 => _3[_optionalChain([seriesData, 'access', _4 => _4.options, 'optionalAccess', _5 => _5.type])]]);
  const themeSeriesLineStyle = _optionalChain([providerTheme, 'optionalAccess', _6 => _6.seriesLineStyles, 'optionalAccess', _7 => _7[index % providerTheme.seriesLineStyles.length]]);
  return _nullishCoalesce(_nullishCoalesce(_nullishCoalesce(_optionalChain([seriesData, 'access', _8 => _8.options, 'optionalAccess', _9 => _9.seriesLineStyle]), () => ( themeSemanticLineStyle)), () => ( themeSeriesLineStyle)), () => ( {}));
}
function getSeriesStroke(seriesData, index, themeColors) {
  return _nullishCoalesce(_optionalChain([seriesData, 'access', _10 => _10.options, 'optionalAccess', _11 => _11.stroke]), () => ( themeColors[index % themeColors.length]));
}
function getItemShapeStyles(series, index, theme, legendShape) {
  const seriesShapeStyles = _nullishCoalesce(_optionalChain([series, 'access', _12 => _12.options, 'optionalAccess', _13 => _13.legendShapeStyle]), () => ( {}));
  const lineStyles = legendShape === "line" ? getSeriesLineStyles(series, index, theme) : {};
  const themeShapeStyles = _optionalChain([theme, 'access', _14 => _14.legendShapeStyles, 'optionalAccess', _15 => _15[index]]);
  const itemShapeStyles = {
    ...seriesShapeStyles,
    ...lineStyles
  };
  if (Object.values(itemShapeStyles).some(
    (value) => value !== void 0 && value !== null && value !== ""
  )) {
    return { shapeStyles: itemShapeStyles };
  }
  return { shapeStyles: _nullishCoalesce(themeShapeStyles, () => ( {})) };
}

// src/utils/is-safari.ts
var isSafari = () => {
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  return false;
};

// src/utils/merge-themes.ts
var _deepmerge = require('deepmerge'); var _deepmerge2 = _interopRequireDefault(_deepmerge);
function mergeThemes(baseTheme, overrideTheme) {
  return _deepmerge2.default.call(void 0, baseTheme, overrideTheme, {
    // Ensure arrays are replaced rather than concatenated
    arrayMerge: (_destinationArray, sourceArray) => sourceArray
  });
}

// src/utils/color-utils.ts
var hexToRgba = (hex, alpha) => {
  if (typeof hex !== "string") {
    throw new Error("Hex color must be a string");
  }
  if (!hex.startsWith("#")) {
    throw new Error("Hex color must start with #");
  }
  if (hex.length !== 7) {
    throw new Error("Hex color must be 7 characters long (e.g., #ff0000)");
  }
  const hexDigits = hex.slice(1);
  if (!/^[0-9a-fA-F]{6}$/.test(hexDigits)) {
    throw new Error("Hex color contains invalid characters. Only 0-9, a-f, A-F are allowed");
  }
  if (typeof alpha !== "number" || isNaN(alpha)) {
    throw new Error("Alpha must be a number");
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// src/providers/theme/themes.ts
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
    primaryColor: "#006DAB",
    secondaryColor: "#98C8DF",
    deltaColors: ["#FF8C8F", "#757575", "#1F9828"]
    // [negative, neutral, positive]
  },
  conversionFunnelChart: {
    primaryColor: "#3858E9",
    backgroundColor: "#F3F4F6",
    positiveChangeColor: "#008A20",
    negativeChangeColor: "#D63638"
  },
  lineChart: {
    lineStyles: {
      comparison: {
        strokeDasharray: "4 4",
        strokeLinecap: "square"
      }
    }
  }
};
var jetpackTheme = {
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
    primaryColor: "#006DAB",
    secondaryColor: "#98C8DF",
    deltaColors: ["#FF8C8F", "#757575", "#1F9828"]
    // [negative, neutral, positive]
  },
  conversionFunnelChart: {
    primaryColor: "#006DAB",
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
  }
};
var wooTheme = {
  backgroundColor: "#FFFFFF",
  // chart background color
  labelBackgroundColor: "transparent",
  // label background color (transparent by default)
  labelTextColor: "#FFFFFF",
  // label text color (white to match original behavior)
  colors: [
    "#3858E9",
    // WooCommerce brand blue
    "#873EFF",
    // Purple
    "#66BDFF",
    // Light blue
    "#7B90FF",
    // Periwinkle blue
    "#EB6594"
    // Pink/rose
  ],
  gridStyles: {
    stroke: "#787C82",
    strokeWidth: 1
  },
  tickLength: 4,
  gridColor: "",
  gridColorDark: "",
  xTickLineStyles: { stroke: "black" },
  xAxisLineStyles: { stroke: "#DCDCDE", strokeWidth: 1 },
  legendLabelStyles: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#757575"
  },
  legendContainerStyles: {
    gap: "8px"
  },
  annotationStyles: {
    label: {
      anchorLineStroke: "black",
      backgroundFill: "#fff"
    },
    connector: {
      stroke: "black"
    },
    circleSubject: {
      stroke: "transparent",
      fill: "black",
      radius: 5
    }
  },
  leaderboardChart: {
    rowGap: 12,
    columnGap: 4,
    labelSpacing: 1.5,
    primaryColor: "#3858E9",
    secondaryColor: "#66BDFF",
    deltaColors: ["#D63638", "#757575", "#008A20"]
    // [negative, neutral, positive]
  },
  conversionFunnelChart: {
    primaryColor: "#3858E9",
    backgroundColor: "#F3F4F6",
    positiveChangeColor: "#008A20",
    negativeChangeColor: "#D63638"
  },
  lineChart: {
    lineStyles: {
      comparison: {
        strokeDasharray: "4 4",
        strokeWidth: 1.5,
        strokeLinecap: "square"
      }
    }
  }
};

// src/providers/chart-context/global-charts-provider.tsx
var _jsxruntime = require('react/jsx-runtime');
var GlobalChartsContext = _react.createContext.call(void 0, null);
var GlobalChartsProvider = ({
  children,
  theme = {}
}) => {
  const [charts, setCharts] = _react.useState.call(void 0, () => /* @__PURE__ */ new Map());
  const providerTheme = _react.useMemo.call(void 0, 
    () => mergeThemes(defaultTheme, theme),
    [theme]
  );
  const groupToColorMapRef = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  _react.useEffect.call(void 0, () => {
    groupToColorMapRef.current = /* @__PURE__ */ new Map();
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
  const resolveGroupColor = _react.useCallback.call(void 0, 
    ({ group, index, overrideColor }) => {
      if (overrideColor) {
        return overrideColor;
      }
      const palette = _nullishCoalesce(providerTheme.colors, () => ( []));
      if (group) {
        const existing = groupToColorMapRef.current.get(group);
        if (existing) {
          return existing;
        }
        const assignedCount = groupToColorMapRef.current.size;
        const color = palette.length > 0 ? palette[assignedCount % palette.length] : "#000000";
        groupToColorMapRef.current.set(group, color);
        return color;
      }
      return palette.length > 0 ? palette[(index || 0) % palette.length] : "#000000";
    },
    [providerTheme.colors]
  );
  const value = _react.useMemo.call(void 0, 
    () => ({
      charts,
      registerChart,
      unregisterChart,
      getChartData,
      theme: providerTheme,
      resolveGroupColor
    }),
    [charts, registerChart, unregisterChart, getChartData, providerTheme, resolveGroupColor]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, GlobalChartsContext.Provider, { value, children });
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


// src/providers/theme/theme-provider.tsx


var ThemeContext = _react.createContext.call(void 0, {});
var useChartTheme = () => {
  const theme = _react.useContext.call(void 0, ThemeContext);
  return theme;
};
var ThemeProvider = ({ theme = {}, children }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ThemeContext.Provider, { value: theme, children });
};

// src/providers/chart-context/hooks/use-global-charts-theme.ts
var useGlobalChartsTheme = () => {
  const context = _react.useContext.call(void 0, GlobalChartsContext);
  const globalTheme = _optionalChain([context, 'optionalAccess', _16 => _16.theme]);
  const localTheme = useChartTheme();
  const effectiveTheme = _react.useMemo.call(void 0, 
    () => mergeThemes(_nullishCoalesce(globalTheme, () => ( defaultTheme)), localTheme),
    [globalTheme, localTheme]
  );
  return effectiveTheme;
};

// src/hooks/use-xychart-theme.ts
var useXYChartTheme = (data) => {
  const theme = useGlobalChartsTheme();
  return _react.useMemo.call(void 0, () => {
    const seriesColors = (_nullishCoalesce(data, () => ( []))).map((series) => _optionalChain([series, 'access', _17 => _17.options, 'optionalAccess', _18 => _18.stroke])).filter((color) => Boolean(color));
    return _xychart.buildChartTheme.call(void 0, {
      ...theme,
      colors: [...seriesColors, ..._nullishCoalesce(theme.colors, () => ( []))]
    });
  }, [theme, data]);
};

// src/hooks/use-chart-data-transform.ts

var useChartDataTransform = (data) => {
  return _react.useMemo.call(void 0, () => {
    const firstPoint = _optionalChain([data, 'optionalAccess', _19 => _19[0], 'optionalAccess', _20 => _20.data, 'optionalAccess', _21 => _21[0]]);
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
          date = parseAsLocalDate(point.dateString);
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
        (d) => d.label || _optionalChain([options, 'access', _22 => _22.axis, 'optionalAccess', _23 => _23.y, 'optionalAccess', _24 => _24.tickFormat, 'call', _25 => _25(d.date.getTime(), 0, [])])
      );
    }
    const minY = Math.min(...allDataPoints.map((d) => d.value));
    const maxY = Math.max(...allDataPoints.map((d) => d.value));
    const yScale = _scale.createScale.call(void 0, {
      ...options.yScale,
      domain: [minY, maxY],
      range: [height, 0]
    });
    return _scale.getTicks.call(void 0, yScale, _optionalChain([options, 'access', _26 => _26.axis, 'optionalAccess', _27 => _27.y, 'optionalAccess', _28 => _28.numTicks]));
  }, [options, data, height, horizontal]);
  return _react.useMemo.call(void 0, () => {
    const defaultMargin = { top: 10, right: 20, bottom: 20, left: 20 };
    const defaultTickWidth = 40;
    const yAxisOrientation = _optionalChain([options, 'access', _29 => _29.axis, 'optionalAccess', _30 => _30.y, 'optionalAccess', _31 => _31.orientation]);
    const yAxisStyles = yAxisOrientation === "right" ? theme.axisStyles.y.right : theme.axisStyles.y.left;
    const yTickWidth = getLongestTickWidth(
      yTicks,
      _optionalChain([options, 'access', _32 => _32.axis, 'optionalAccess', _33 => _33.y, 'optionalAccess', _34 => _34.tickFormat]),
      yAxisStyles.axisLabel
    );
    const yMarginValue = (_nullishCoalesce(yTickWidth, () => ( defaultTickWidth))) + (_nullishCoalesce(_optionalChain([yAxisStyles, 'optionalAccess', _35 => _35.tickLength]), () => ( 0)));
    if (yAxisOrientation === "right") {
      defaultMargin.right = yMarginValue;
    } else {
      defaultMargin.left = yMarginValue;
    }
    if (_optionalChain([options, 'access', _36 => _36.axis, 'optionalAccess', _37 => _37.x, 'optionalAccess', _38 => _38.orientation]) === "top") {
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




























exports.useDeepMemo = useDeepMemo; exports.useChartMouseHandler = useChartMouseHandler; exports.attachSubComponents = attachSubComponents; exports.formatMetricValue = formatMetricValue; exports.formatPercentage = formatPercentage; exports.getSeriesLineStyles = getSeriesLineStyles; exports.getSeriesStroke = getSeriesStroke; exports.getItemShapeStyles = getItemShapeStyles; exports.isSafari = isSafari; exports.hexToRgba = hexToRgba; exports.defaultTheme = defaultTheme; exports.jetpackTheme = jetpackTheme; exports.wooTheme = wooTheme; exports.GlobalChartsContext = GlobalChartsContext; exports.GlobalChartsProvider = GlobalChartsProvider; exports.useGlobalChartsContext = useGlobalChartsContext; exports.useChartId = useChartId; exports.useChartRegistration = useChartRegistration; exports.useChartTheme = useChartTheme; exports.ThemeProvider = ThemeProvider; exports.useGlobalChartsTheme = useGlobalChartsTheme; exports.useXYChartTheme = useXYChartTheme; exports.useChartDataTransform = useChartDataTransform; exports.useChartMargin = useChartMargin; exports.useElementHeight = useElementHeight; exports.useZeroValueDisplay = useZeroValueDisplay;
//# sourceMappingURL=chunk-BS3VZTWU.cjs.map