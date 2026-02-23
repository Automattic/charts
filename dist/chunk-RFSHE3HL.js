import {
  formatPercentage,
  getColorDistance,
  getItemShapeStyles,
  getLongestTickWidth,
  getSeriesLineStyles,
  mergeThemes,
  normalizeColorToHex,
  parseAsLocalDate,
  resolveCssVariable
} from "./chunk-TE63Y5PX.js";

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
import { useCallback } from "react";
var useChartMouseHandler = ({
  withTooltips,
  offsetX = 0,
  offsetY = -10
}) => {
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
  const onMouseMove = useCallback(
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
  const onMouseLeave = useCallback(() => {
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
import { useMemo as useMemo3 } from "react";

// src/providers/chart-context/global-charts-provider.tsx
import { hsl as d3Hsl2 } from "@visx/vendor/d3-color";
import { createContext, useCallback as useCallback2, useMemo, useState, useEffect as useEffect2, useLayoutEffect, useRef as useRef2 } from "react";

// src/hooks/use-tooltip-portal-relocator.ts
import { useEffect } from "react";

// src/hooks/use-tooltip-portal-relocator.module.scss
var use_tooltip_portal_relocator_module_default = {
  "relocatedPortal": "a8ccharts-jCw5dQ"
};

// src/hooks/use-tooltip-portal-relocator.ts
function isVisxPortalNode(node) {
  return node instanceof HTMLDivElement && node.parentElement === document.body && !node.id && !node.className && node.querySelector(".visx-tooltip") !== null;
}
var patchRefCount = 0;
var origRemoveChild = null;
var patchedRemoveChild = null;
var relocatedNodes = /* @__PURE__ */ new WeakSet();
function installRemoveChildPatch() {
  if (patchRefCount++ > 0) {
    return;
  }
  origRemoveChild = document.body.removeChild;
  patchedRemoveChild = function(child) {
    if (relocatedNodes.has(child) && child.parentNode !== this) {
      relocatedNodes.delete(child);
      child.parentNode?.removeChild(child);
      return child;
    }
    return origRemoveChild.call(this, child);
  };
  document.body.removeChild = patchedRemoveChild;
}
function uninstallRemoveChildPatch() {
  if (--patchRefCount > 0) {
    return;
  }
  if (document.body.removeChild === patchedRemoveChild) {
    document.body.removeChild = origRemoveChild;
  }
  origRemoveChild = null;
  patchedRemoveChild = null;
}
function useTooltipPortalRelocator(containerRef) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) {
      return;
    }
    const instanceNodes = /* @__PURE__ */ new Set();
    const relocateNode = (node) => {
      if (!isVisxPortalNode(node)) {
        return;
      }
      node.style.opacity = "0";
      node.classList.add(use_tooltip_portal_relocator_module_default.relocatedPortal);
      const { activeElement } = node.ownerDocument;
      const focusedElement = activeElement instanceof HTMLElement && node.contains(activeElement) ? activeElement : null;
      container.insertBefore(node, container.firstChild);
      relocatedNodes.add(node);
      instanceNodes.add(node);
      if (focusedElement) {
        focusedElement.focus();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          node.style.opacity = "";
        });
      });
    };
    installRemoveChildPatch();
    for (const child of Array.from(document.body.children)) {
      relocateNode(child);
    }
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          relocateNode(node);
        }
      }
    });
    observer.observe(document.body, { childList: true });
    return () => {
      observer.disconnect();
      for (const node of instanceNodes) {
        if (node instanceof HTMLElement) {
          node.classList.remove(use_tooltip_portal_relocator_module_default.relocatedPortal);
        }
        if (node.parentNode === container) {
          document.body.appendChild(node);
        }
        relocatedNodes.delete(node);
      }
      instanceNodes.clear();
      uninstallRemoveChildPatch();
    };
  }, [containerRef]);
}

// src/providers/chart-context/private/get-chart-color.ts
import { hsl as d3Hsl } from "@visx/vendor/d3-color";
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
      return d3Hsl(Math.round(hue), saturation / 100, lightness / 100).formatHex();
    }
  }
  const fallbackHue = (index - colors.length) * GOLDEN_RATIO * FULL_HUE_ROTATION_DEGREES % FULL_HUE_ROTATION_DEGREES;
  const fallbackSaturation = BASE_SATURATION + index % SATURATION_VARIATION_STEPS * SATURATION_INCREMENT;
  const fallbackLightness = BASE_LIGHTNESS + index % LIGHTNESS_VARIATION_STEPS * LIGHTNESS_INCREMENT;
  return d3Hsl(
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
import { jsx as _jsx } from "react/jsx-runtime";
var GlobalChartsContext = /* @__PURE__ */ createContext(null);
var GlobalChartsProvider = ({
  children,
  theme,
  portalContainer
}) => {
  const [charts, setCharts] = useState(() => /* @__PURE__ */ new Map());
  const [hiddenSeries, setHiddenSeries] = useState(() => /* @__PURE__ */ new Map());
  const wrapperRef = useRef2(null);
  useTooltipPortalRelocator(portalContainer ?? wrapperRef);
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
    const {
      colors
    } = providerTheme;
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
            const resolved = resolveCssVariable(color, wrapperRef.current);
            if (resolved === null || resolved === "") {
              continue;
            }
            colorValue = resolved;
          }
          if (colorValue.startsWith("#")) {
            resolvedColors.push(colorValue);
            const hslColor = d3Hsl2(colorValue);
            if (!isNaN(hslColor.h)) {
              const hslTuple = [hslColor.h, hslColor.s * 100, hslColor.l * 100];
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
  const [groupToColorMap, setGroupToColorMap] = useState(() => /* @__PURE__ */ new Map());
  useEffect2(() => {
    setGroupToColorMap(/* @__PURE__ */ new Map());
  }, [providerTheme.colors]);
  const registerChart = useCallback2((id, data) => {
    setCharts((prev) => new Map(prev).set(id, data));
  }, []);
  const unregisterChart = useCallback2((id) => {
    setCharts((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);
  const getChartData = useCallback2((id) => {
    return charts.get(id);
  }, [charts]);
  const resolveColor = useCallback2(({
    group,
    index,
    overrideColor
  }) => {
    if (overrideColor) {
      return normalizeColorToHex(overrideColor, wrapperRef.current, resolveCssVariable);
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
  }, [colorCache, groupToColorMap]);
  const getElementStyles = useCallback2(({
    data,
    index,
    overrideColor,
    legendShape
  }) => {
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
  }, [providerTheme, resolveColor]);
  const toggleSeriesVisibility = useCallback2((chartId, seriesLabel) => {
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
  const isSeriesVisible = useCallback2((chartId, seriesLabel) => {
    const chartHidden = hiddenSeries.get(chartId);
    return !chartHidden || !chartHidden.has(seriesLabel);
  }, [hiddenSeries]);
  const getHiddenSeries = useCallback2((chartId) => {
    const set = hiddenSeries.get(chartId);
    return set ? new Set(set) : /* @__PURE__ */ new Set();
  }, [hiddenSeries]);
  const value = useMemo(() => ({
    charts,
    registerChart,
    unregisterChart,
    getChartData,
    theme: providerTheme,
    getElementStyles,
    toggleSeriesVisibility,
    isSeriesVisible,
    getHiddenSeries
  }), [charts, registerChart, unregisterChart, getChartData, providerTheme, getElementStyles, toggleSeriesVisibility, isSeriesVisible, getHiddenSeries]);
  return /* @__PURE__ */ _jsx(GlobalChartsContext.Provider, {
    value,
    children: /* @__PURE__ */ _jsx("div", {
      ref: wrapperRef,
      style: {
        display: "contents"
      },
      children
    })
  });
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
import { useEffect as useEffect3, useMemo as useMemo2 } from "react";
var useChartRegistration = ({
  chartId,
  legendItems,
  chartType,
  isDataValid,
  metadata
}) => {
  const { registerChart, unregisterChart } = useGlobalChartsContext();
  const stableLegendItems = useDeepMemo(legendItems);
  const memoizedMetadata = useMemo2(() => metadata, [metadata]);
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

// src/hooks/use-xychart-theme.ts
var useXYChartTheme = (data) => {
  const theme = useGlobalChartsTheme();
  return useMemo3(() => {
    const seriesColors = (data ?? []).map((series) => series.options?.stroke).filter((color) => Boolean(color));
    return buildChartTheme({
      ...theme,
      colors: [...seriesColors, ...theme.colors ?? []]
    });
  }, [theme, data]);
};

// src/hooks/use-chart-data-transform.ts
import { useMemo as useMemo4 } from "react";
var useChartDataTransform = (data) => {
  return useMemo4(() => {
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
import { useMemo as useMemo5 } from "react";
var DEFAULT_MARGIN_TOP = 10;
var DEFAULT_MARGIN_RIGHT = 20;
var DEFAULT_MARGIN_BOTTOM = 20;
var DEFAULT_MARGIN_LEFT = 20;
var DEFAULT_BOTTOM_FOR_TOP_AXIS = 10;
var DEFAULT_FONT_SIZE = 12;
var DEFAULT_TICK_LENGTH = 8;
var DEFAULT_Y_TICK_WIDTH = 40;
var resolveFontSize = (val) => {
  if (typeof val === "number" && !isNaN(val)) {
    return val;
  }
  if (typeof val === "string") {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? void 0 : parsed;
  }
  return void 0;
};
var getXAxisLabelMetrics = (theme, orientation) => {
  const xAxisStyles = orientation === "top" ? theme.axisStyles?.x?.top : theme.axisStyles?.x?.bottom;
  const fontSize = resolveFontSize(xAxisStyles?.axisLabel?.fontSize) || resolveFontSize(theme.svgLabelSmall?.fontSize) || DEFAULT_FONT_SIZE;
  const tickLength = xAxisStyles?.tickLength ?? DEFAULT_TICK_LENGTH;
  return {
    fontSize,
    tickLength
  };
};
var useChartMargin = (height, options, data, theme, horizontal = false) => {
  const yTicks = useMemo5(() => {
    const allDataPoints = data.flatMap((series) => series.data);
    if (horizontal) {
      return allDataPoints.map((d) => d.label || options.axis?.y?.tickFormat(d.date.getTime(), 0, []));
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
  return useMemo5(() => {
    const defaultMargin = {
      top: DEFAULT_MARGIN_TOP,
      right: DEFAULT_MARGIN_RIGHT,
      bottom: DEFAULT_MARGIN_BOTTOM,
      left: DEFAULT_MARGIN_LEFT
    };
    const yAxisOrientation = options.axis?.y?.orientation;
    const yAxisStyles = yAxisOrientation === "right" ? theme.axisStyles.y.right : theme.axisStyles.y.left;
    const yTickWidth = getLongestTickWidth(yTicks, options.axis?.y?.tickFormat, yAxisStyles.axisLabel);
    const yMarginValue = (yTickWidth ?? DEFAULT_Y_TICK_WIDTH) + (yAxisStyles?.tickLength ?? 0);
    if (yAxisOrientation === "right") {
      defaultMargin.right = yMarginValue;
    } else {
      defaultMargin.left = yMarginValue;
    }
    const xOrientation = options.axis?.x?.orientation === "top" ? "top" : "bottom";
    const {
      fontSize,
      tickLength
    } = getXAxisLabelMetrics(theme, xOrientation);
    const computedXMargin = fontSize + tickLength;
    if (xOrientation === "top") {
      defaultMargin.top = Math.max(defaultMargin.top, computedXMargin);
      defaultMargin.bottom = DEFAULT_BOTTOM_FOR_TOP_AXIS;
    } else {
      defaultMargin.bottom = Math.max(defaultMargin.bottom, computedXMargin);
    }
    return defaultMargin;
  }, [options, theme, yTicks]);
};

// src/hooks/use-element-size.ts
import { useState as useState2, useCallback as useCallback3, useRef as useRef3 } from "react";
function useElementSize({
  initialWidth = 0,
  initialHeight = 0
} = {}) {
  const [width, setWidth] = useState2(initialWidth);
  const [height, setHeight] = useState2(initialHeight);
  const observerRef = useRef3(null);
  const refCallback = useCallback3((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (node) {
      const handleResize = () => {
        const rect = node.getBoundingClientRect();
        setWidth(rect.width || 0);
        setHeight(rect.height || 0);
      };
      handleResize();
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(node);
      observerRef.current = resizeObserver;
    }
  }, []);
  return [refCallback, width, height];
}

// src/hooks/use-has-legend-child.ts
import { Children, isValidElement, useMemo as useMemo8 } from "react";

// src/components/legend/legend.tsx
import { useContext as useContext5, useMemo as useMemo6, forwardRef as forwardRef2 } from "react";

// src/charts/private/single-chart-context/single-chart-context.tsx
import { createContext as createContext2 } from "react";
var ChartInstanceContext = /* @__PURE__ */ createContext2(null);
var SingleChartContext = ChartInstanceContext;

// src/charts/private/single-chart-context/use-single-chart-context.ts
import { useContext as useContext3 } from "react";
var useChartInstanceContext = () => {
  const context = useContext3(ChartInstanceContext);
  if (!context) {
    throw new Error("useChartInstanceContext must be used within a Chart component");
  }
  return context;
};
var useSingleChartContext = useChartInstanceContext;

// src/components/legend/private/base-legend.tsx
import { Group } from "@visx/group";
import { LegendItem, LegendLabel, LegendOrdinal, LegendShape } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";
import clsx from "clsx";
import { forwardRef, useCallback as useCallback4, useContext as useContext4 } from "react";

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
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ _jsx2("span", {
    ref: textRef,
    className: clsx(base_legend_module_default["legend-item-text"], maxWidth != null && base_legend_module_default[`legend-item-text--${textOverflow}`]),
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
var BaseLegend = /* @__PURE__ */ forwardRef(({
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
  const context = useContext4(GlobalChartsContext);
  const legendScale = scaleOrdinal({
    domain: items.map((item) => item.label),
    range: items.map((item) => item.color)
  });
  const domain = legendScale.domain();
  const getShapeStyle = useCallback4(({
    index
  }) => items[index]?.shapeStyle, [items]);
  const handleLegendClick = useCallback4((seriesLabel) => {
    if (interactive && chartId && context) {
      context.toggleSeriesVisibility(chartId, seriesLabel);
    }
  }, [interactive, chartId, context]);
  const isSeriesVisible = useCallback4((seriesLabel) => {
    if (!interactive || !chartId || !context) {
      return true;
    }
    return context.isSeriesVisible(chartId, seriesLabel);
  }, [interactive, chartId, context]);
  const createClickHandler = useCallback4((labelText) => {
    if (!interactive) {
      return void 0;
    }
    return () => handleLegendClick(labelText);
  }, [interactive, handleLegendClick]);
  const createKeyDownHandler = useCallback4((labelText) => {
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
  return render ? render(items) : /* @__PURE__ */ _jsx2(LegendOrdinal, {
    scale: legendScale,
    labelFormat,
    labelTransform,
    children: (labels) => /* @__PURE__ */ _jsx2("div", {
      ref,
      role: "list",
      className: clsx(base_legend_module_default.legend, base_legend_module_default[`legend--${orientation}`], base_legend_module_default[`legend--alignment-${alignment}`], base_legend_module_default[`legend--position-${position}`], className),
      style: {
        flexDirection: orientationToFlexDirection[orientation],
        ...theme.legendContainerStyles
      },
      children: labels.map((label, i) => {
        const visible = isSeriesVisible(label.text);
        const handleClick = createClickHandler(label.text);
        const handleKeyDown = createKeyDownHandler(label.text);
        return /* @__PURE__ */ _jsxs(LegendItem, {
          className: clsx("visx-legend-item", base_legend_module_default["legend-item"], interactive && base_legend_module_default["legend-item--interactive"], !visible && base_legend_module_default["legend-item--inactive"], legendItemClassName),
          margin: itemMargin,
          flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          role: interactive ? "button" : void 0,
          tabIndex: interactive ? 0 : void 0,
          "aria-pressed": interactive ? visible : void 0,
          "aria-label": interactive ? `${label.text}: ${visible ? "visible" : "hidden"}. Toggle visibility.` : void 0,
          ...legendItemProps,
          children: [items[i]?.renderGlyph ? /* @__PURE__ */ _jsx2("svg", {
            width: items[i]?.glyphSize * 2,
            height: items[i]?.glyphSize * 2,
            children: /* @__PURE__ */ _jsx2(Group, {
              children: items[i]?.renderGlyph({
                key: `legend-glyph-${label.text}`,
                datum: {},
                index: i,
                color: fill(label),
                size: items[i]?.glyphSize,
                x: items[i]?.glyphSize,
                y: items[i]?.glyphSize
              })
            })
          }) : /* @__PURE__ */ _jsx2(LegendShape, {
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
          }), /* @__PURE__ */ _jsxs(LegendLabel, {
            className: clsx("visx-legend-label", base_legend_module_default["legend-item-label"]),
            style: {
              justifyContent: labelAlign,
              flex: labelFlex,
              margin: labelMargin,
              ...theme.legendLabelStyles
            },
            ...legendLabelProps,
            children: [/* @__PURE__ */ _jsx2(LegendText, {
              text: label.text,
              textOverflow,
              maxWidth
            }), items.find((item) => item.label === label.text)?.value && /* @__PURE__ */ _jsxs("span", {
              className: base_legend_module_default["legend-item-value"],
              children: ["\xA0", items.find((item) => item.label === label.text)?.value]
            })]
          })]
        }, `legend-${label.text}-${i}`);
      })
    })
  });
});

// src/components/legend/legend.tsx
import { jsx as _jsx3 } from "react/jsx-runtime";
var Legend = /* @__PURE__ */ forwardRef2(({
  chartId,
  items,
  ...props
}, ref) => {
  const context = useContext5(GlobalChartsContext);
  const singleChartContext = useContext5(SingleChartContext);
  const contextChartId = chartId ?? singleChartContext?.chartId;
  const contextItems = useMemo6(() => {
    return contextChartId && context ? context.getChartData(contextChartId)?.legendItems : void 0;
  }, [contextChartId, context]);
  const legendItems = items || contextItems;
  if (!legendItems) {
    return null;
  }
  return /* @__PURE__ */ _jsx3(BaseLegend, {
    ref,
    items: legendItems,
    ...props,
    chartId: contextChartId
  });
});

// src/components/legend/hooks/use-chart-legend-items.ts
import { formatNumber } from "@automattic/number-formatters";
import { useMemo as useMemo7 } from "react";
function formatPointValue(point, showValues, legendValueDisplay = "percentage") {
  if (!showValues || legendValueDisplay === "none") {
    return "";
  }
  if ("percentage" in point) {
    const percentagePoint = point;
    switch (legendValueDisplay) {
      case "percentage":
        return formatPercentage(percentagePoint.percentage);
      case "value":
        return formatNumber(percentagePoint.value);
      case "valueDisplay":
        return percentagePoint.valueDisplay || formatNumber(percentagePoint.value);
      default:
        return "";
    }
  }
  if ("value" in point) {
    return point.value !== null ? formatNumber(point.value) : "";
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
      value: showValues ? series.data?.length?.toString() || "0" : "",
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
  return useMemo7(() => {
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
  return useMemo8(() => {
    let found = false;
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === Legend) {
        found = true;
      }
    });
    return found;
  }, [children]);
}

// src/hooks/use-text-truncation.ts
import { useCallback as useCallback5, useRef as useRef4, useState as useState3 } from "react";
function useTextTruncation(enabled = true) {
  const [isTruncated, setIsTruncated] = useState3(false);
  const observerRef = useRef4(null);
  const refCallback = useCallback5(
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
import { useMemo as useMemo9 } from "react";
var useZeroValueDisplay = (data, options = { enabled: false }) => {
  const { enabled, minValueRatio = 0.6, maxValueRatio = 8e-3 } = options;
  return useMemo9(() => {
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
import { useMemo as useMemo10 } from "react";
var useInteractiveLegendData = ({
  data,
  chartId,
  legendInteractive,
  isSeriesVisible
}) => {
  const visibleData = useMemo10(() => {
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
  const allSegmentsHidden = useMemo10(() => {
    return legendInteractive && visibleData.length === 0;
  }, [legendInteractive, visibleData]);
  const legendData = useMemo10(() => {
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
import { useState as useState4, useEffect as useEffect4 } from "react";
var QUERY = "(prefers-reduced-motion: no-preference)";
var getInitialState = () => !window.matchMedia(QUERY).matches;
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState4(getInitialState);
  useEffect4(() => {
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

export {
  SingleChartContext,
  useSingleChartContext,
  useTooltipPortalRelocator,
  defaultTheme,
  GlobalChartsContext,
  GlobalChartsProvider,
  useGlobalChartsContext,
  useChartId,
  useDeepMemo,
  useChartMouseHandler,
  useXYChartTheme,
  useChartDataTransform,
  useChartMargin,
  useElementSize,
  useHasLegendChild,
  useTextTruncation,
  useZeroValueDisplay,
  useInteractiveLegendData,
  usePrefersReducedMotion,
  useChartRegistration,
  useGlobalChartsTheme,
  Legend,
  useChartLegendItems
};
//# sourceMappingURL=chunk-RFSHE3HL.js.map