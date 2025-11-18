// src/providers/chart-context/global-charts-provider.tsx
import { createContext, useCallback, useMemo, useState, useEffect } from "react";

// src/utils/create-composition.ts
function attachSubComponents(Chart, subComponents) {
  return Object.assign(Chart, subComponents);
}

// src/utils/date-parsing.ts
import { parse, parseISO, isValid } from "date-fns";
var hasTimezone = (dateString) => {
  return /T.*[Z]$|T.*[+-]\d{2}:?\d{2}$/.test(dateString);
};
var parseAsLocalDate = (dateString) => {
  const trimmedString = dateString.trim();
  if (hasTimezone(trimmedString)) {
    const isoDate = parseISO(trimmedString);
    if (!isValid(isoDate)) {
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
    const result = parse(trimmedString, format, /* @__PURE__ */ new Date());
    if (isValid(result)) {
      return result;
    }
  }
  return /* @__PURE__ */ new Date(NaN);
};

// src/utils/format-metric-value.ts
import { formatNumberCompact, formatNumber } from "@automattic/number-formatters";
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
      const formatted = useMultipliers ? formatNumberCompact(numericValue, {
        decimals: decimals ?? 2,
        numberFormatOptions: {
          maximumFractionDigits: decimals ?? 2,
          signDisplay
        }
      }) : formatNumber(numericValue, {
        decimals: decimals ?? 2,
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
      return formatNumber(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          style: "percent",
          signDisplay: signDisplay ?? "exceptZero"
        }
      });
    }
    case "number":
    default: {
      return useMultipliers ? formatNumberCompact(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          maximumFractionDigits: decimals ?? 0,
          signDisplay
        }
      }) : formatNumber(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          signDisplay
        }
      });
    }
  }
};

// src/utils/format-percentage.ts
import { formatNumber as formatNumber2 } from "@automattic/number-formatters";
var formatPercentage = (value) => {
  return formatNumber2(value / 100, {
    numberFormatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
  });
};

// src/utils/get-longest-tick-width.ts
import { getStringWidth } from "@visx/text";
var getLongestTickWidth = (ticks, formatTick, labelStyle) => {
  const formattedTicks = ticks.map((tick) => formatTick(tick, 0, []));
  const longestTick = formattedTicks.reduce(
    (longest, current) => longest.length >= current.length ? longest : current,
    formattedTicks[0]
  );
  return getStringWidth(longestTick, labelStyle);
};

// src/utils/get-styles.ts
function getSeriesLineStyles(seriesData, index, providerTheme) {
  const themeSemanticLineStyle = providerTheme?.lineChart?.lineStyles?.[seriesData.options?.type];
  const themeSeriesLineStyle = providerTheme?.seriesLineStyles?.[index % providerTheme.seriesLineStyles.length];
  return seriesData.options?.seriesLineStyle ?? themeSemanticLineStyle ?? themeSeriesLineStyle ?? {};
}
function getItemShapeStyles(series, index, theme, legendShape) {
  const seriesShapeStyles = series.options?.legendShapeStyle ?? {};
  const lineStyles = legendShape === "line" ? getSeriesLineStyles(series, index, theme) : {};
  const themeShapeStyles = theme.legendShapeStyles?.[index];
  const itemShapeStyles = {
    ...seriesShapeStyles,
    ...lineStyles
  };
  if (Object.values(itemShapeStyles).some(
    (value) => value !== void 0 && value !== null && value !== ""
  )) {
    return itemShapeStyles;
  }
  return themeShapeStyles ?? {};
}

// src/utils/is-safari.ts
var isSafari = () => {
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  return false;
};

// src/utils/merge-themes.ts
import deepmerge from "deepmerge";
function mergeThemes(baseTheme, overrideTheme) {
  return deepmerge(baseTheme, overrideTheme, {
    // Ensure arrays are replaced rather than concatenated
    arrayMerge: (_destinationArray, sourceArray) => sourceArray
  });
}

// src/utils/color-utils.ts
var validateHexColor = (hex) => {
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
};
var hexToRgba = (hex, alpha) => {
  validateHexColor(hex);
  if (typeof alpha !== "number" || isNaN(alpha)) {
    throw new Error("Alpha must be a number");
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
var hexToHsl = (hex) => {
  validateHexColor(hex);
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
};
var getColorDistance = (hsl1, hsl2) => {
  const [h1, s1, l1] = hsl1;
  const [h2, s2, l2] = hsl2;
  let hueDiff = Math.abs(h1 - h2);
  hueDiff = Math.min(hueDiff, 360 - hueDiff);
  const hueWeight = 2;
  const lightnessWeight = 1;
  const saturationWeight = 0.5;
  return Math.sqrt(
    Math.pow(hueDiff * hueWeight, 2) + Math.pow((l1 - l2) * lightnessWeight, 2) + Math.pow((s1 - s2) * saturationWeight, 2)
  );
};

// src/providers/chart-context/private/get-chart-color.ts
var GOLDEN_RATIO = 0.618033988749;
var MIN_COLOR_DISTANCE = 25;
var MAX_COLOR_GENERATION_ATTEMPTS = 50;
var VARIATION_ATTEMPT_OFFSET = 0.1;
var BASE_SATURATION = 60;
var SATURATION_VARIATION_STEPS = 3;
var SATURATION_INCREMENT = 15;
var BASE_LIGHTNESS = 35;
var LIGHTNESS_VARIATION_STEPS = 4;
var LIGHTNESS_INCREMENT = 8;
var MIN_HUE_RANGE_DEGREES = 60;
var HUE_RANGE_EXPANSION_FACTOR = 1.3;
var HUE_WRAP_THRESHOLD_DEGREES = 180;
var FULL_HUE_ROTATION_DEGREES = 360;
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
      if (hueRange > HUE_WRAP_THRESHOLD_DEGREES) {
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
      if (getColorDistance(candidateHsl, existingHsl) < MIN_COLOR_DISTANCE) {
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
    "#66BDFF",
    // Light blue
    "#873EFF",
    // Purple
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
  svgLabelSmall: { fill: "#757575" },
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
import { jsx } from "react/jsx-runtime";
var GlobalChartsContext = createContext(null);
var GlobalChartsProvider = ({ children, theme }) => {
  const [charts, setCharts] = useState(() => /* @__PURE__ */ new Map());
  const [hiddenSeries, setHiddenSeries] = useState(
    () => /* @__PURE__ */ new Map()
  );
  const providerTheme = useMemo(() => {
    return theme ? mergeThemes(defaultTheme, theme) : defaultTheme;
  }, [theme]);
  const colorCache = useMemo(() => {
    const { colors } = providerTheme;
    const hues = [];
    const existingHslColors = [];
    let minHue = 360;
    let maxHue = 0;
    if (Array.isArray(colors)) {
      for (const color of colors) {
        if (color && typeof color === "string" && color.startsWith("#")) {
          const hslColor = hexToHsl(color);
          hues.push(hslColor[0]);
          existingHslColors.push(hslColor);
          minHue = Math.min(minHue, hslColor[0]);
          maxHue = Math.max(maxHue, hslColor[0]);
        }
      }
    }
    return {
      colors: colors || [],
      hues,
      existingHslColors,
      minHue,
      maxHue
    };
  }, [providerTheme]);
  const [groupToColorMap, setGroupToColorMap] = useState(
    () => /* @__PURE__ */ new Map()
  );
  useEffect(() => {
    setGroupToColorMap(/* @__PURE__ */ new Map());
  }, [providerTheme.colors]);
  const registerChart = useCallback((id, data) => {
    setCharts((prev) => new Map(prev).set(id, data));
  }, []);
  const unregisterChart = useCallback((id) => {
    setCharts((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);
  const getChartData = useCallback(
    (id) => {
      return charts.get(id);
    },
    [charts]
  );
  const resolveColor = useCallback(
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
  const getElementStyles = useCallback(
    ({ data, index, overrideColor, legendShape }) => {
      const isSeriesData = data && typeof data === "object" && "data" in data && "options" in data;
      const isPointPercentageData = data && typeof data === "object" && "percentage" in data;
      return {
        color: resolveColor({
          group: data?.group,
          index,
          overrideColor: overrideColor || isSeriesData && data?.options?.stroke || isPointPercentageData && data?.color
        }),
        lineStyles: isSeriesData ? getSeriesLineStyles(data, index, providerTheme) : {},
        glyph: providerTheme.glyphs?.[index],
        shapeStyles: isSeriesData ? getItemShapeStyles(data, index, providerTheme, legendShape) : {}
      };
    },
    [providerTheme, resolveColor]
  );
  const toggleSeriesVisibility = useCallback((chartId, seriesLabel) => {
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
  const isSeriesVisible = useCallback(
    (chartId, seriesLabel) => {
      const chartHidden = hiddenSeries.get(chartId);
      return !chartHidden || !chartHidden.has(seriesLabel);
    },
    [hiddenSeries]
  );
  const getHiddenSeries = useCallback(
    (chartId) => {
      const set = hiddenSeries.get(chartId);
      return set ? new Set(set) : /* @__PURE__ */ new Set();
    },
    [hiddenSeries]
  );
  const value = useMemo(
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
  return /* @__PURE__ */ jsx(GlobalChartsContext.Provider, { value, children });
};

// src/providers/chart-context/hooks/use-global-charts-context.ts
import { useContext } from "react";
var useGlobalChartsContext = () => {
  const context = useContext(GlobalChartsContext);
  if (!context) {
    throw new Error("useGlobalChartsContext must be used within a GlobalChartsProvider");
  }
  return context;
};

// src/providers/chart-context/hooks/use-chart-id.ts
import { useId } from "react";
var useChartId = (providedId) => {
  const generatedId = useId();
  return providedId || generatedId;
};

// src/providers/chart-context/hooks/use-chart-registration.ts
import { useEffect as useEffect3, useMemo as useMemo7 } from "react";

// src/hooks/use-deep-memo.ts
import isEqual from "fast-deep-equal";
import { useRef } from "react";
var useDeepMemo = (value) => {
  const ref = useRef(value);
  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
};

// src/hooks/use-chart-mouse-handler.ts
import { localPoint } from "@visx/event";
import { useTooltip } from "@visx/tooltip";
import { useCallback as useCallback2 } from "react";
var useChartMouseHandler = ({
  withTooltips,
  offsetX = 0,
  offsetY = -10
}) => {
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
  const onMouseMove = useCallback2(
    (event, data) => {
      if (!withTooltips) {
        return;
      }
      const coords = localPoint(event);
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
  const onMouseLeave = useCallback2(() => {
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
import { buildChartTheme } from "@visx/xychart";
import { useMemo as useMemo2 } from "react";
var useXYChartTheme = (data) => {
  const theme = useGlobalChartsTheme();
  return useMemo2(() => {
    const seriesColors = (data ?? []).map((series) => series.options?.stroke).filter((color) => Boolean(color));
    return buildChartTheme({
      ...theme,
      colors: [...seriesColors, ...theme.colors ?? []]
    });
  }, [theme, data]);
};

// src/hooks/use-chart-data-transform.ts
import { useMemo as useMemo3 } from "react";
var useChartDataTransform = (data) => {
  return useMemo3(() => {
    const firstPoint = data?.[0]?.data?.[0];
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
import { createScale, getTicks } from "@visx/scale";
import { useMemo as useMemo4 } from "react";
var useChartMargin = (height, options, data, theme, horizontal = false) => {
  const yTicks = useMemo4(() => {
    const allDataPoints = data.flatMap((series) => series.data);
    if (horizontal) {
      return allDataPoints.map(
        (d) => d.label || options.axis?.y?.tickFormat(d.date.getTime(), 0, [])
      );
    }
    const minY = Math.min(...allDataPoints.map((d) => d.value));
    const maxY = Math.max(...allDataPoints.map((d) => d.value));
    const yScale = createScale({
      ...options.yScale,
      domain: [minY, maxY],
      range: [height, 0]
    });
    return getTicks(yScale, options.axis?.y?.numTicks);
  }, [options, data, height, horizontal]);
  return useMemo4(() => {
    const defaultMargin = { top: 10, right: 20, bottom: 20, left: 20 };
    const defaultTickWidth = 40;
    const yAxisOrientation = options.axis?.y?.orientation;
    const yAxisStyles = yAxisOrientation === "right" ? theme.axisStyles.y.right : theme.axisStyles.y.left;
    const yTickWidth = getLongestTickWidth(
      yTicks,
      options.axis?.y?.tickFormat,
      yAxisStyles.axisLabel
    );
    const yMarginValue = (yTickWidth ?? defaultTickWidth) + (yAxisStyles?.tickLength ?? 0);
    if (yAxisOrientation === "right") {
      defaultMargin.right = yMarginValue;
    } else {
      defaultMargin.left = yMarginValue;
    }
    if (options.axis?.x?.orientation === "top") {
      defaultMargin.top = 20;
      defaultMargin.bottom = 10;
    }
    return defaultMargin;
  }, [options, theme, yTicks]);
};

// src/hooks/use-element-height.ts
import { useState as useState2, useCallback as useCallback3, useRef as useRef2 } from "react";
function useElementHeight({
  initialHeight = 0
} = {}) {
  const [height, setHeight] = useState2(initialHeight);
  const observerRef = useRef2(null);
  const refCallback = useCallback3((node) => {
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
import { useCallback as useCallback4, useRef as useRef3, useState as useState3 } from "react";
function useTextTruncation(enabled = true) {
  const [isTruncated, setIsTruncated] = useState3(false);
  const observerRef = useRef3(null);
  const refCallback = useCallback4(
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
import { useMemo as useMemo5 } from "react";
var useZeroValueDisplay = (data, options = { enabled: false }) => {
  const { enabled, minValueRatio = 0.6, maxValueRatio = 8e-3 } = options;
  return useMemo5(() => {
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
import { useMemo as useMemo6 } from "react";
var useInteractiveLegendData = ({
  data,
  chartId,
  legendInteractive,
  isSeriesVisible
}) => {
  const visibleData = useMemo6(() => {
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
  const allSegmentsHidden = useMemo6(() => {
    return legendInteractive && visibleData.length === 0;
  }, [legendInteractive, visibleData]);
  const legendData = useMemo6(() => {
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
import { useState as useState4, useEffect as useEffect2 } from "react";
var QUERY = "(prefers-reduced-motion: no-preference)";
var getInitialState = () => !window.matchMedia(QUERY).matches;
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState4(getInitialState);
  useEffect2(() => {
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
  const memoizedMetadata = useMemo7(() => metadata, [metadata]);
  useEffect3(() => {
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
import { useContext as useContext2 } from "react";
var useGlobalChartsTheme = () => {
  const context = useContext2(GlobalChartsContext);
  const globalTheme = context?.theme;
  return globalTheme ?? defaultTheme;
};

export {
  useDeepMemo,
  useChartMouseHandler,
  attachSubComponents,
  formatMetricValue,
  formatPercentage,
  isSafari,
  hexToRgba,
  defaultTheme,
  jetpackTheme,
  wooTheme,
  GlobalChartsContext,
  GlobalChartsProvider,
  useGlobalChartsContext,
  useChartId,
  useChartRegistration,
  useGlobalChartsTheme,
  useXYChartTheme,
  useChartDataTransform,
  useChartMargin,
  useElementHeight,
  useTextTruncation,
  useZeroValueDisplay,
  useInteractiveLegendData,
  usePrefersReducedMotion
};
//# sourceMappingURL=chunk-5OB3F7GC.js.map