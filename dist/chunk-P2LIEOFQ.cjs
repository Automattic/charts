"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }








var _chunkMXGLYWVPcjs = require('./chunk-MXGLYWVP.cjs');



var _chunkEMMSS5I5cjs = require('./chunk-EMMSS5I5.cjs');

// ../../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = _chunkEMMSS5I5cjs.__commonJS.call(void 0, {
  "../../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// src/hooks/use-deep-memo.ts
var import_fast_deep_equal = _chunkEMMSS5I5cjs.__toESM.call(void 0, require_fast_deep_equal(), 1);
var _react = require('react');
var useDeepMemo = (value) => {
  const ref = _react.useRef.call(void 0, value);
  if (!(0, import_fast_deep_equal.default)(ref.current, value)) {
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


// src/hooks/use-tooltip-portal-relocator.ts


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
      _optionalChain([child, 'access', _ => _.parentNode, 'optionalAccess', _2 => _2.removeChild, 'call', _3 => _3(child)]);
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
  _react.useEffect.call(void 0, () => {
    const container = _optionalChain([containerRef, 'optionalAccess', _4 => _4.current]);
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
      if (_chunkMXGLYWVPcjs.getColorDistance.call(void 0, candidateHsl, existingHsl) < MIN_COLOR_DISTANCE) {
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
  legend: {
    labelStyles: {
      color: "var(--jp-gray-80, #2c3338)"
    },
    containerStyles: {},
    shapeStyles: []
  },
  seriesLineStyles: [],
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
var GlobalChartsContext = /* @__PURE__ */ _react.createContext.call(void 0, null);
var GlobalChartsProvider = ({
  children,
  theme,
  portalContainer
}) => {
  const [charts, setCharts] = _react.useState.call(void 0, () => /* @__PURE__ */ new Map());
  const [hiddenSeries, setHiddenSeries] = _react.useState.call(void 0, () => /* @__PURE__ */ new Map());
  const wrapperRef = _react.useRef.call(void 0, null);
  useTooltipPortalRelocator(_nullishCoalesce(portalContainer, () => ( wrapperRef)));
  const providerTheme = _react.useMemo.call(void 0, () => {
    return theme ? _chunkMXGLYWVPcjs.mergeThemes.call(void 0, defaultTheme, theme) : defaultTheme;
  }, [theme]);
  const [colorCache, setColorCache] = _react.useState.call(void 0, () => ({
    colors: [],
    hues: [],
    existingHslColors: [],
    minHue: 360,
    maxHue: 0
  }));
  _react.useLayoutEffect.call(void 0, () => {
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
            const resolved = _chunkMXGLYWVPcjs.resolveCssVariable.call(void 0, color, wrapperRef.current);
            if (resolved === null || resolved === "") {
              continue;
            }
            colorValue = resolved;
          }
          if (colorValue.startsWith("#")) {
            resolvedColors.push(colorValue);
            const hslColor = _d3color.hsl.call(void 0, colorValue);
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
  const [groupToColorMap, setGroupToColorMap] = _react.useState.call(void 0, () => /* @__PURE__ */ new Map());
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
  const getChartData = _react.useCallback.call(void 0, (id) => {
    return charts.get(id);
  }, [charts]);
  const resolveColor = _react.useCallback.call(void 0, ({
    group,
    index,
    overrideColor
  }) => {
    if (overrideColor) {
      return _chunkMXGLYWVPcjs.normalizeColorToHex.call(void 0, overrideColor, wrapperRef.current, _chunkMXGLYWVPcjs.resolveCssVariable);
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
  const getElementStyles = _react.useCallback.call(void 0, ({
    data,
    index,
    overrideColor,
    legendShape
  }) => {
    const isSeriesData = data && typeof data === "object" && "data" in data && "options" in data;
    const isPointPercentageData = data && typeof data === "object" && "value" in data && typeof data.value === "number" && !("data" in data);
    return {
      color: resolveColor({
        group: _optionalChain([data, 'optionalAccess', _5 => _5.group]),
        index,
        overrideColor: overrideColor || isSeriesData && _optionalChain([data, 'optionalAccess', _6 => _6.options, 'optionalAccess', _7 => _7.stroke]) || isPointPercentageData && _optionalChain([data, 'optionalAccess', _8 => _8.color])
      }),
      lineStyles: isSeriesData ? _chunkMXGLYWVPcjs.getSeriesLineStyles.call(void 0, data, index, providerTheme) : {},
      glyph: _optionalChain([providerTheme, 'access', _9 => _9.glyphs, 'optionalAccess', _10 => _10[index]]),
      shapeStyles: isSeriesData ? _chunkMXGLYWVPcjs.getItemShapeStyles.call(void 0, data, index, providerTheme, legendShape) : {}
    };
  }, [providerTheme, resolveColor]);
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
  const isSeriesVisible = _react.useCallback.call(void 0, (chartId, seriesLabel) => {
    const chartHidden = hiddenSeries.get(chartId);
    return !chartHidden || !chartHidden.has(seriesLabel);
  }, [hiddenSeries]);
  const getHiddenSeries = _react.useCallback.call(void 0, (chartId) => {
    const set = hiddenSeries.get(chartId);
    return set ? new Set(set) : /* @__PURE__ */ new Set();
  }, [hiddenSeries]);
  const value = _react.useMemo.call(void 0, () => ({
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, GlobalChartsContext.Provider, {
    value,
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
      ref: wrapperRef,
      style: {
        display: "contents"
      },
      children
    })
  });
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
  const globalTheme = _optionalChain([context, 'optionalAccess', _11 => _11.theme]);
  return _nullishCoalesce(globalTheme, () => ( defaultTheme));
};

// src/hooks/use-xychart-theme.ts
var useXYChartTheme = (data) => {
  const theme = useGlobalChartsTheme();
  return _react.useMemo.call(void 0, () => {
    const seriesColors = (_nullishCoalesce(data, () => ( []))).map((series) => _optionalChain([series, 'access', _12 => _12.options, 'optionalAccess', _13 => _13.stroke])).filter((color) => Boolean(color));
    return _xychart.buildChartTheme.call(void 0, {
      ...theme,
      colors: [...seriesColors, ..._nullishCoalesce(theme.colors, () => ( []))]
    });
  }, [theme, data]);
};

// src/hooks/use-chart-data-transform.ts

var useChartDataTransform = (data) => {
  return _react.useMemo.call(void 0, () => {
    const firstPoint = _optionalChain([data, 'optionalAccess', _14 => _14[0], 'optionalAccess', _15 => _15.data, 'optionalAccess', _16 => _16[0]]);
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
          date = _chunkMXGLYWVPcjs.parseAsLocalDate.call(void 0, point.dateString);
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
  const xAxisStyles = orientation === "top" ? _optionalChain([theme, 'access', _17 => _17.axisStyles, 'optionalAccess', _18 => _18.x, 'optionalAccess', _19 => _19.top]) : _optionalChain([theme, 'access', _20 => _20.axisStyles, 'optionalAccess', _21 => _21.x, 'optionalAccess', _22 => _22.bottom]);
  const fontSize = resolveFontSize(_optionalChain([xAxisStyles, 'optionalAccess', _23 => _23.axisLabel, 'optionalAccess', _24 => _24.fontSize])) || resolveFontSize(_optionalChain([theme, 'access', _25 => _25.svgLabelSmall, 'optionalAccess', _26 => _26.fontSize])) || DEFAULT_FONT_SIZE;
  const tickLength = _nullishCoalesce(_optionalChain([xAxisStyles, 'optionalAccess', _27 => _27.tickLength]), () => ( DEFAULT_TICK_LENGTH));
  return {
    fontSize,
    tickLength
  };
};
var useChartMargin = (height, options, data, theme, horizontal = false) => {
  const yTicks = _react.useMemo.call(void 0, () => {
    const allDataPoints = data.flatMap((series) => series.data);
    if (horizontal) {
      return allDataPoints.map((d) => d.label || _optionalChain([options, 'access', _28 => _28.axis, 'optionalAccess', _29 => _29.y, 'optionalAccess', _30 => _30.tickFormat, 'call', _31 => _31(d.date.getTime(), 0, [])]));
    }
    const minY = Math.min(...allDataPoints.map((d) => d.value));
    const maxY = Math.max(...allDataPoints.map((d) => d.value));
    const yScale = _scale.createScale.call(void 0, {
      ...options.yScale,
      domain: [minY, maxY],
      range: [height, 0]
    });
    return _scale.getTicks.call(void 0, yScale, _optionalChain([options, 'access', _32 => _32.axis, 'optionalAccess', _33 => _33.y, 'optionalAccess', _34 => _34.numTicks]));
  }, [options, data, height, horizontal]);
  return _react.useMemo.call(void 0, () => {
    const defaultMargin = {
      top: DEFAULT_MARGIN_TOP,
      right: DEFAULT_MARGIN_RIGHT,
      bottom: DEFAULT_MARGIN_BOTTOM,
      left: DEFAULT_MARGIN_LEFT
    };
    const yAxisOrientation = _optionalChain([options, 'access', _35 => _35.axis, 'optionalAccess', _36 => _36.y, 'optionalAccess', _37 => _37.orientation]);
    const yAxisStyles = yAxisOrientation === "right" ? theme.axisStyles.y.right : theme.axisStyles.y.left;
    const yTickWidth = _chunkMXGLYWVPcjs.getLongestTickWidth.call(void 0, yTicks, _optionalChain([options, 'access', _38 => _38.axis, 'optionalAccess', _39 => _39.y, 'optionalAccess', _40 => _40.tickFormat]), yAxisStyles.axisLabel);
    const yMarginValue = (_nullishCoalesce(yTickWidth, () => ( DEFAULT_Y_TICK_WIDTH))) + (_nullishCoalesce(_optionalChain([yAxisStyles, 'optionalAccess', _41 => _41.tickLength]), () => ( 0)));
    if (yAxisOrientation === "right") {
      defaultMargin.right = yMarginValue;
    } else {
      defaultMargin.left = yMarginValue;
    }
    const xOrientation = _optionalChain([options, 'access', _42 => _42.axis, 'optionalAccess', _43 => _43.x, 'optionalAccess', _44 => _44.orientation]) === "top" ? "top" : "bottom";
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

function useElementSize({
  initialWidth = 0,
  initialHeight = 0
} = {}) {
  const [width, setWidth] = _react.useState.call(void 0, initialWidth);
  const [height, setHeight] = _react.useState.call(void 0, initialHeight);
  const observerRef = _react.useRef.call(void 0, null);
  const refCallback = _react.useCallback.call(void 0, (node) => {
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

var MIN_PIXEL_SIZE = 3;
var ZERO_PIXEL_SIZE = MIN_PIXEL_SIZE - 1;
var useZeroValueDisplay = (data, options = { enabled: false }) => {
  const { enabled, valueAxisLength } = options;
  return _react.useMemo.call(void 0, () => {
    if (!enabled || !valueAxisLength || valueAxisLength <= 0) return data;
    let maxAbsoluteValue = 0;
    for (const series of data) {
      for (const point of series.data) {
        if (point.value !== null && point.value !== 0) {
          maxAbsoluteValue = Math.max(maxAbsoluteValue, Math.abs(point.value));
        }
      }
    }
    if (maxAbsoluteValue === 0) return data;
    const minNonZeroValue = Math.min(
      MIN_PIXEL_SIZE / valueAxisLength * maxAbsoluteValue,
      maxAbsoluteValue
    );
    const zeroVisualValue = Math.min(
      ZERO_PIXEL_SIZE / valueAxisLength * maxAbsoluteValue,
      maxAbsoluteValue
    );
    return data.map((series) => ({
      ...series,
      data: series.data.map((point) => {
        if (point.value === 0) {
          return {
            ...point,
            visualValue: zeroVisualValue
          };
        }
        if (point.value === null) {
          return point;
        }
        const absValue = Math.abs(point.value);
        if (absValue < minNonZeroValue) {
          return {
            ...point,
            visualValue: Math.sign(point.value) * minNonZeroValue
          };
        }
        return point;
      })
    }));
  }, [data, enabled, valueAxisLength]);
};

// src/hooks/use-data-with-percentages.ts

var useDataWithPercentages = (data) => {
  return _react.useMemo.call(void 0, () => {
    const totalValue = data.reduce((sum, segment) => sum + segment.value, 0);
    return data.map((segment) => ({
      ...segment,
      percentage: totalValue > 0 ? segment.value / totalValue * 100 : 0
    }));
  }, [data]);
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
    const visibleDataMap = new Map(visibleData.map((d) => [d.label, d]));
    return data.map((segment) => {
      const isVisible = isSeriesVisible(chartId, segment.label);
      if (!isVisible) {
        return segment;
      }
      return visibleDataMap.get(segment.label) || segment;
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





















exports.useTooltipPortalRelocator = useTooltipPortalRelocator; exports.defaultTheme = defaultTheme; exports.GlobalChartsContext = GlobalChartsContext; exports.GlobalChartsProvider = GlobalChartsProvider; exports.useGlobalChartsContext = useGlobalChartsContext; exports.useChartId = useChartId; exports.useDeepMemo = useDeepMemo; exports.useChartMouseHandler = useChartMouseHandler; exports.useXYChartTheme = useXYChartTheme; exports.useChartDataTransform = useChartDataTransform; exports.useChartMargin = useChartMargin; exports.useElementSize = useElementSize; exports.useTextTruncation = useTextTruncation; exports.useZeroValueDisplay = useZeroValueDisplay; exports.useDataWithPercentages = useDataWithPercentages; exports.useInteractiveLegendData = useInteractiveLegendData; exports.usePrefersReducedMotion = usePrefersReducedMotion; exports.useChartRegistration = useChartRegistration; exports.useGlobalChartsTheme = useGlobalChartsTheme;
//# sourceMappingURL=chunk-P2LIEOFQ.cjs.map