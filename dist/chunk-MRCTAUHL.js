import {
  getColorDistance,
  getItemShapeStyles,
  getLongestTickWidth,
  getSeriesLineStyles,
  hexToHsl,
  mergeThemes,
  parseAsLocalDate,
  resolveCssVariable
} from "./chunk-7IZD3F7B.js";

// src/providers/chart-context/global-charts-provider.tsx
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
  useRef
} from "react";

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
    deltaColors: ["#D63638", "#757575", "#008A20"]
    // [negative, neutral, positive]
  },
  conversionFunnelChart: {
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
  const wrapperRef = useRef(null);
  const providerTheme = useMemo(() => {
    return theme ? mergeThemes(defaultTheme, theme) : defaultTheme;
  }, [theme]);
  const [colorCache, setColorCache] = useState(() => ({
    colors: [],
    hues: [],
    existingHslColors: [],
    minHue: 360,
    maxHue: 0
  }));
  useLayoutEffect(() => {
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
            const resolved = resolveCssVariable(color, wrapperRef.current);
            if (resolved === null || resolved === "") {
              continue;
            }
            colorValue = resolved;
          }
          if (colorValue.startsWith("#")) {
            resolvedColors.push(colorValue);
            try {
              const hslColor = hexToHsl(colorValue);
              hues.push(hslColor[0]);
              existingHslColors.push(hslColor);
              minHue = Math.min(minHue, hslColor[0]);
              maxHue = Math.max(maxHue, hslColor[0]);
            } catch {
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
  return /* @__PURE__ */ jsx(GlobalChartsContext.Provider, { value, children: /* @__PURE__ */ jsx("div", { ref: wrapperRef, style: { display: "contents" }, children }) });
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
import { useRef as useRef2 } from "react";
var useDeepMemo = (value) => {
  const ref = useRef2(value);
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
import { useState as useState2, useCallback as useCallback3, useRef as useRef3 } from "react";
function useElementHeight({
  initialHeight = 0
} = {}) {
  const [height, setHeight] = useState2(initialHeight);
  const observerRef = useRef3(null);
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
import { useCallback as useCallback4, useRef as useRef4, useState as useState3 } from "react";
function useTextTruncation(enabled = true) {
  const [isTruncated, setIsTruncated] = useState3(false);
  const observerRef = useRef4(null);
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
//# sourceMappingURL=chunk-MRCTAUHL.js.map