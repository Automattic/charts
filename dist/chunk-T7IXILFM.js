import {
  ChartLayout,
  useChartChildren
} from "./chunk-5CWC5Z5L.js";
import {
  Legend,
  SingleChartContext,
  useChartLegendItems,
  useSingleChartContext
} from "./chunk-WTQYGUNF.js";
import {
  AccessibleTooltip,
  useKeyboardNavigation
} from "./chunk-BPYKWMI7.js";
import {
  withResponsive
} from "./chunk-OP6PHB2U.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  useChartDataTransform,
  useChartId,
  useChartMargin,
  useChartRegistration,
  useGlobalChartsContext,
  useGlobalChartsTheme,
  usePrefersReducedMotion,
  useXYChartTheme
} from "./chunk-2I67QUIV.js";
import {
  attachSubComponents,
  isSafari
} from "./chunk-JJIMABHT.js";

// src/charts/line-chart/line-chart.tsx
import { formatNumberCompact, formatNumber } from "@automattic/number-formatters";
import { curveCatmullRom, curveLinear, curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleTime } from "@visx/scale";
import { XYChart, AreaSeries, Grid, Axis, DataContext as DataContext5 } from "@visx/xychart";
import { __ as __2 } from "@wordpress/i18n";
import clsx2 from "clsx";
import { differenceInHours, differenceInYears } from "date-fns";
import { useMemo as useMemo2, useContext as useContext4, forwardRef, useImperativeHandle, useState as useState4, useRef as useRef3, useCallback as useCallback2, createElement as _createElement } from "react";

// src/charts/private/default-glyph/default-glyph.tsx
import { DataContext } from "@visx/xychart";
import { useContext } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
var DefaultGlyph = (props) => {
  const {
    theme
  } = useContext(DataContext) || {};
  const position = props.position || "start";
  return /* @__PURE__ */ _jsx("circle", {
    cx: props.x,
    cy: props.y,
    r: props.size,
    fill: props.color,
    stroke: theme?.backgroundColor,
    strokeWidth: 1.5,
    paintOrder: "fill",
    ...props.glyphStyle
  });
};

// src/charts/line-chart/line-chart.module.scss
var line_chart_module_default = {
  "line-chart": "a8ccharts-v-oO8E",
  "line-chart--animated": "a8ccharts-QrkuTW",
  "rise": "a8ccharts--rxDU3",
  "line-chart__tooltip": "a8ccharts-Tu0rR-",
  "line-chart__annotation-label-popover": "a8ccharts--RSWXi",
  "line-chart__tooltip-date": "a8ccharts-Q-b5A1",
  "line-chart__tooltip-row": "a8ccharts-19N7T9",
  "line-chart__tooltip-label": "a8ccharts-HOAXrD",
  "line-chart__annotations-overlay": "a8ccharts-rQiY8O",
  "line-chart__annotation-label": "a8ccharts-8AKWOe",
  "line-chart__annotation-label-trigger-button": "a8ccharts-7mh3Cl",
  "line-chart__annotation-label-popover--visible": "a8ccharts-VAeVuJ",
  "line-chart__annotation-label-popover--safari": "a8ccharts-TEe-iV",
  "line-chart__annotation-label-popover-header": "a8ccharts-LAUpx7",
  "line-chart__annotation-label-popover-content": "a8ccharts-b76gEu",
  "line-chart__annotation-label-popover-close-button": "a8ccharts-LIpFoS"
};

// src/charts/line-chart/private/line-chart-annotation-label-popover.tsx
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import Gridicon from "gridicons";
import { useEffect, useId, useRef, useState } from "react";
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";
var POPOVER_BUTTON_SIZE = 44;
var LineChartAnnotationLabelWithPopover = ({
  title,
  subtitle,
  renderLabel,
  renderLabelPopover
}) => {
  const popoverId = useId();
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
  const [isPositioned, setIsPositioned] = useState(false);
  const isBrowserSafari = isSafari();
  useEffect(() => {
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
    } catch {
    }
  }, [isBrowserSafari]);
  return /* @__PURE__ */ _jsxs("div", {
    className: line_chart_module_default["line-chart__annotation-label"],
    children: [/* @__PURE__ */ _jsx2("button", {
      ref: buttonRef,
      popovertarget: popoverId,
      className: line_chart_module_default["line-chart__annotation-label-trigger-button"],
      style: {
        width: `${POPOVER_BUTTON_SIZE}px`,
        height: `${POPOVER_BUTTON_SIZE}px`,
        transform: `translate(${POPOVER_BUTTON_SIZE / 2}px, 0)`
      },
      "aria-label": title || __("View details", "jetpack-charts"),
      children: renderLabel({
        title,
        subtitle
      })
    }), /* @__PURE__ */ _jsx2("div", {
      ref: popoverRef,
      id: popoverId,
      popover: "auto",
      className: clsx(line_chart_module_default["line-chart__annotation-label-popover"], isPositioned && line_chart_module_default["line-chart__annotation-label-popover--visible"], isBrowserSafari && line_chart_module_default["line-chart__annotation-label-popover--safari"]),
      children: /* @__PURE__ */ _jsxs("div", {
        className: line_chart_module_default["line-chart__annotation-label-popover-header"],
        children: [/* @__PURE__ */ _jsx2("div", {
          className: line_chart_module_default["line-chart__annotation-label-popover-content"],
          children: renderLabelPopover({
            title,
            subtitle
          })
        }), /* @__PURE__ */ _jsx2("button", {
          popovertarget: popoverId,
          popovertargetaction: "hide",
          className: line_chart_module_default["line-chart__annotation-label-popover-close-button"],
          "aria-label": __("Close", "jetpack-charts"),
          children: /* @__PURE__ */ _jsx2(Gridicon, {
            icon: "cross",
            size: 16
          })
        })]
      })
    })]
  });
};
var line_chart_annotation_label_popover_default = LineChartAnnotationLabelWithPopover;

// src/charts/line-chart/private/line-chart-annotations-overlay.tsx
import { DataContext as DataContext2 } from "@visx/xychart";
import { useEffect as useEffect2, useState as useState2, useCallback } from "react";
import { jsx as _jsx3 } from "react/jsx-runtime";
var LineChartAnnotationsOverlay = ({
  children
}) => {
  const {
    chartRef,
    chartWidth,
    chartHeight
  } = useSingleChartContext();
  const [scales, setScales] = useState2(null);
  const [scalesStable, setScalesStable] = useState2(false);
  const createScaleSignature = useCallback((scaleData) => {
    const xDomain = scaleData.xScale.domain();
    const yDomain = scaleData.yScale.domain();
    const xRange = scaleData.xScale.range();
    const yRange = scaleData.yScale.range();
    return `${xDomain.join(",")}-${yDomain.join(",")}-${xRange.join(",")}-${yRange.join(",")}`;
  }, []);
  const getScalesData = useCallback(() => {
    if (chartRef?.current) {
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
  useEffect2(() => {
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
  if (!chartRef || !children || !chartWidth || !chartHeight) {
    return null;
  }
  if (!scales || !scalesStable) {
    return null;
  }
  const dataContextValue = {
    xScale: scales.xScale,
    yScale: scales.yScale,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    width: chartWidth,
    height: chartHeight
  };
  return /* @__PURE__ */ _jsx3(DataContext2.Provider, {
    value: dataContextValue,
    children: /* @__PURE__ */ _jsx3("svg", {
      width: chartWidth,
      height: chartHeight,
      className: line_chart_module_default["line-chart__annotations-overlay"],
      children
    })
  });
};
var line_chart_annotations_overlay_default = LineChartAnnotationsOverlay;

// src/charts/line-chart/private/line-chart-annotation.tsx
import { Annotation, CircleSubject, Connector, HtmlLabel, Label, LineSubject } from "@visx/annotation";
import { DataContext as DataContext3 } from "@visx/xychart";
import merge from "deepmerge";
import { useContext as useContext2, useRef as useRef2, useEffect as useEffect3, useState as useState3, useMemo } from "react";
import { jsx as _jsx4, jsxs as _jsxs2 } from "react/jsx-runtime";
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
  const annotationMaxWidth = maxWidth ?? ANNOTATION_MAX_WIDTH;
  const annotationHeight = height ?? ANNOTATION_INIT_HEIGHT;
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
  return {
    dx,
    dy,
    isFlippedHorizontally,
    isFlippedVertically
  };
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
  const providerTheme = useGlobalChartsTheme();
  const {
    xScale,
    yScale
  } = useContext2(DataContext3) || {};
  const labelRef = useRef2(null);
  const [height, setHeight] = useState3(null);
  const styles = merge(providerTheme.annotationStyles ?? {}, datumStyles ?? {});
  useEffect3(() => {
    if (labelRef.current?.getBBox) {
      const bbox = labelRef.current.getBBox();
      setHeight(bbox.height);
    }
  }, []);
  const positionData = useMemo(() => {
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
      maxWidth: styles?.label?.maxWidth,
      height
    });
    return {
      x: x2,
      y: y2,
      yMin: yMin2,
      yMax: yMax2,
      xMin: xMin2,
      xMax: xMax2,
      ...position
    };
  }, [datum, xScale, yScale, subjectType, styles?.label?.maxWidth, height, renderLabel]);
  if (!positionData) return null;
  const {
    x,
    y,
    yMin,
    yMax,
    xMin,
    xMax,
    dx,
    dy,
    isFlippedHorizontally,
    isFlippedVertically
  } = positionData;
  const getLabelY = () => {
    const labelY = styles?.label?.y;
    if (labelY === "start") return yMax;
    if (labelY === "end") return yMin;
    return labelY;
  };
  const getLabelX = () => {
    const labelX = styles?.label?.x;
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
    return isSafari() ? {
      transform: `translate(${x + (dx || 0) + (typeof labelPosition.x === "number" ? labelPosition.x - x : 0) - labelWidth}px, ${y + (dy || 0) + (typeof labelPosition.y === "number" ? labelPosition.y - y : 0) - labelHeight}px)`,
      width: labelWidth,
      height: labelHeight
    } : void 0;
  };
  return /* @__PURE__ */ _jsx4("g", {
    children: /* @__PURE__ */ _jsxs2(Annotation, {
      x,
      y,
      dx,
      dy,
      children: [/* @__PURE__ */ _jsx4(Connector, {
        ...styles?.connector
      }), subjectType === "circle" && /* @__PURE__ */ _jsx4(CircleSubject, {
        ...styles?.circleSubject
      }), subjectType === "line-vertical" && /* @__PURE__ */ _jsx4(LineSubject, {
        min: yMax,
        max: yMin,
        ...styles?.lineSubject,
        orientation: "vertical"
      }), subjectType === "line-horizontal" && /* @__PURE__ */ _jsx4(LineSubject, {
        min: xMin,
        max: xMax,
        ...styles?.lineSubject,
        orientation: "horizontal"
      }), renderLabel ? /* @__PURE__ */ _jsx4(HtmlLabel, {
        ...styles?.label,
        ...labelPosition,
        children: /* @__PURE__ */ _jsx4("div", {
          style: getSafariHTMLLabelPosition(),
          children: renderLabelPopover ? /* @__PURE__ */ _jsx4(line_chart_annotation_label_popover_default, {
            title,
            subtitle,
            renderLabel,
            renderLabelPopover
          }) : renderLabel({
            title,
            subtitle
          })
        })
      }) : /* @__PURE__ */ _jsx4("g", {
        ref: labelRef,
        children: /* @__PURE__ */ _jsx4(Label, {
          title,
          subtitle,
          ...styles?.label,
          ...labelPosition,
          horizontalAnchor: getHorizontalAnchor(subjectType, isFlippedHorizontally),
          verticalAnchor: getVerticalAnchor(subjectType, isFlippedVertically, y, yMax, height ?? ANNOTATION_INIT_HEIGHT)
        })
      })]
    })
  });
};
var line_chart_annotation_default = LineChartAnnotation;

// src/charts/line-chart/private/line-chart-glyph.tsx
import { DataContext as DataContext4 } from "@visx/xychart";
import { useContext as useContext3 } from "react";
var toNumber = (val) => {
  const num = typeof val === "number" ? val : parseFloat(val);
  return isNaN(num) ? void 0 : num;
};
var LineChartGlyph = ({
  data,
  index,
  color,
  glyphStyle,
  renderGlyph,
  accessors,
  position
}) => {
  const {
    xScale,
    yScale
  } = useContext3(DataContext4) || {};
  if (!xScale || !yScale) return null;
  if (data.data.length === 0) return null;
  const point = position === "start" ? data.data[0] : data.data[data.data.length - 1];
  const x = xScale(accessors.xAccessor(point));
  const y = yScale(accessors.yAccessor(point));
  if (typeof x !== "number" || typeof y !== "number") return null;
  const size = Math.max(0, toNumber(glyphStyle?.radius) ?? 4);
  return renderGlyph({
    key: `${position}-glyph-${data.label}`,
    index,
    datum: point,
    color,
    size,
    x,
    y,
    glyphStyle,
    position
  });
};
var line_chart_glyph_default = LineChartGlyph;

// src/charts/line-chart/line-chart.tsx
import { jsx as _jsx5, jsxs as _jsxs3 } from "react/jsx-runtime";
var X_TICK_WIDTH = 60;
var defaultRenderGlyph = (props) => {
  return /* @__PURE__ */ _createElement(DefaultGlyph, {
    ...props,
    key: props.key
  });
};
var toNumber2 = (val) => {
  const num = typeof val === "number" ? val : parseFloat(val);
  return isNaN(num) ? void 0 : num;
};
var getCurveType = (type, smoothing) => {
  if (!type) {
    return smoothing ? curveCatmullRom : curveLinear;
  }
  switch (type) {
    case "smooth":
      return curveCatmullRom;
    case "monotone":
      return curveMonotoneX;
    case "linear":
      return curveLinear;
    default:
      return curveLinear;
  }
};
var renderDefaultTooltip = (params) => {
  const {
    tooltipData
  } = params;
  const nearestDatum = tooltipData?.nearestDatum?.datum;
  if (!nearestDatum) return null;
  const tooltipPoints = Object.entries(tooltipData?.datumByKey || {}).map(([key, {
    datum
  }]) => ({
    key,
    value: datum.value
  })).sort((a, b) => b.value - a.value);
  return /* @__PURE__ */ _jsxs3("div", {
    className: line_chart_module_default["line-chart__tooltip"],
    children: [/* @__PURE__ */ _jsx5("div", {
      className: line_chart_module_default["line-chart__tooltip-date"],
      children: nearestDatum.date?.toLocaleDateString()
    }), tooltipPoints.map((point) => /* @__PURE__ */ _jsxs3("div", {
      className: line_chart_module_default["line-chart__tooltip-row"],
      children: [/* @__PURE__ */ _jsxs3("span", {
        className: line_chart_module_default["line-chart__tooltip-label"],
        children: [point.key, ":"]
      }), /* @__PURE__ */ _jsx5("span", {
        className: line_chart_module_default["line-chart__tooltip-value"],
        children: formatNumber(point.value)
      })]
    }, point.key))]
  });
};
var formatYearTick = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(void 0, {
    year: "numeric"
  });
};
var formatDateTick = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
};
var formatHourTick = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString(void 0, {
    hour: "numeric",
    hour12: true
  });
};
var getFormatter = (sortedData) => {
  const minX = Math.min(...sortedData.map((datom) => datom.data.at(0)?.date));
  const maxX = Math.max(...sortedData.map((datom) => datom.data.at(-1)?.date));
  const diffInHours = Math.abs(differenceInHours(maxX, minX));
  if (diffInHours <= 24) {
    return formatHourTick;
  }
  const diffInYears = Math.abs(differenceInYears(maxX, minX));
  if (diffInYears <= 1) {
    return formatDateTick;
  }
  return formatYearTick;
};
var guessOptimalNumTicks = (data, chartWidth, tickFormatter) => {
  const minX = Math.min(...data.map((datom) => datom.data.at(0)?.date));
  const maxX = Math.max(...data.map((datom) => datom.data.at(-1)?.date));
  const xScale = scaleTime({
    domain: [minX, maxX]
  });
  const upperBound = Math.min(
    data[0]?.data.length || 3,
    // A sane fallback to avoid NaN when no data is present
    Math.ceil(chartWidth / X_TICK_WIDTH)
  );
  let secondBestGuess = 1;
  for (let numTicks = upperBound; numTicks > 1; --numTicks) {
    const ticks = xScale.ticks(numTicks).map((d) => tickFormatter(d.getTime()));
    if (ticks.length > upperBound) {
      continue;
    }
    secondBestGuess = Math.max(secondBestGuess, ticks.length);
    const uniqueTicks = Array.from(new Set(ticks));
    if (uniqueTicks.length === 1) {
      return 1;
    }
    const hasConsecutiveDuplicate = ticks.some((tick, idx) => idx > 0 && tick === ticks[idx - 1]);
    if (hasConsecutiveDuplicate) {
      continue;
    }
    return ticks.length;
  }
  return secondBestGuess;
};
var validateData = (data) => {
  if (!data?.length) return "No data available";
  const hasInvalidData = data.some((series) => series.data.some((point) => isNaN(point.value) || point.value === null || point.value === void 0 || "date" in point && point.date && isNaN(point.date.getTime())));
  if (hasInvalidData) return "Invalid data";
  return null;
};
var LineChartScalesRef = ({
  chartRef,
  width,
  height,
  margin
}) => {
  const context = useContext4(DataContext5);
  useImperativeHandle(chartRef, () => ({
    getScales: () => {
      if (!context?.xScale || !context?.yScale) {
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
  }), [context, width, height, margin]);
  return null;
};
var LineChartInternal = /* @__PURE__ */ forwardRef(({
  data,
  chartId: providedChartId,
  width,
  height,
  className,
  margin,
  withTooltips = true,
  withTooltipCrosshairs,
  showLegend = false,
  legend = {},
  renderGlyph = defaultRenderGlyph,
  glyphStyle = {},
  withLegendGlyph = false,
  withGradientFill = false,
  smoothing = true,
  curveType,
  renderTooltip = renderDefaultTooltip,
  withStartGlyphs = false,
  withEndGlyphs = false,
  animation,
  options = {},
  onPointerDown = void 0,
  onPointerUp = void 0,
  onPointerMove = void 0,
  onPointerOut = void 0,
  children,
  gridVisibility,
  gap = "md"
}, ref) => {
  const legendInteractive = legend.interactive ?? false;
  const legendShape = legend.shape ?? "line";
  const legendPosition = legend.position ?? "bottom";
  const providerTheme = useGlobalChartsTheme();
  const theme = useXYChartTheme(data);
  const chartId = useChartId(providedChartId);
  const chartRef = useRef3(null);
  const [selectedIndex, setSelectedIndex] = useState4(void 0);
  const [isNavigating, setIsNavigating] = useState4(false);
  const internalChartRef = useRef3(null);
  const {
    legendChildren,
    nonLegendChildren
  } = useChartChildren(children, "LineChart");
  const [measuredChartHeight, setMeasuredChartHeight] = useState4();
  const handleContentHeightChange = useCallback2((contentHeight) => {
    const chartHeight = contentHeight > 0 ? contentHeight : height;
    setMeasuredChartHeight(chartHeight);
  }, [height]);
  useImperativeHandle(ref, () => ({
    getScales: () => internalChartRef.current?.getScales() || null,
    getChartDimensions: () => internalChartRef.current?.getChartDimensions() || {
      width: 0,
      height: 0,
      margin: {}
    }
  }), [internalChartRef]);
  const dataSorted = useChartDataTransform(data);
  const {
    getElementStyles,
    isSeriesVisible
  } = useGlobalChartsContext();
  const seriesWithVisibility = useMemo2(() => {
    if (!chartId || !legendInteractive) {
      return dataSorted.map((series, index) => ({
        series,
        index,
        isVisible: true
      }));
    }
    return dataSorted.map((series, index) => ({
      series,
      index,
      isVisible: isSeriesVisible(chartId, series.label)
    }));
  }, [dataSorted, chartId, isSeriesVisible, legendInteractive]);
  const allSeriesHidden = useMemo2(() => {
    return seriesWithVisibility.every(({
      isVisible
    }) => !isVisible);
  }, [seriesWithVisibility]);
  const {
    tooltipRef,
    onChartFocus,
    onChartBlur,
    onChartKeyDown
  } = useKeyboardNavigation({
    selectedIndex,
    setSelectedIndex,
    isNavigating,
    setIsNavigating,
    chartRef,
    totalPoints: dataSorted[0]?.data.length || 0
  });
  const chartOptions = useMemo2(() => {
    const formatter = options?.axis?.x?.tickFormat || getFormatter(dataSorted);
    return {
      axis: {
        x: {
          orientation: "bottom",
          numTicks: guessOptimalNumTicks(dataSorted, width, formatter),
          tickFormat: formatter,
          display: true,
          ...options?.axis?.x
        },
        y: {
          orientation: "left",
          numTicks: 4,
          tickFormat: formatNumberCompact,
          display: true,
          ...options?.axis?.y
        }
      },
      xScale: {
        type: "time",
        ...options?.xScale
      },
      yScale: {
        type: "linear",
        nice: true,
        zero: false,
        ...options?.yScale
      }
    };
  }, [options, dataSorted, width]);
  const tooltipRenderGlyph = useMemo2(() => {
    return (props) => {
      const seriesIndex = dataSorted.findIndex((series) => series.label === props.key || series.data.includes(props.datum));
      const seriesData = dataSorted[seriesIndex];
      const {
        color,
        glyph: themeGlyph
      } = getElementStyles({
        data: seriesData,
        index: seriesIndex
      });
      const propsWithResolvedColor = {
        ...props,
        color
      };
      return themeGlyph ? themeGlyph(propsWithResolvedColor) : renderGlyph(propsWithResolvedColor);
    };
  }, [dataSorted, renderGlyph, getElementStyles]);
  const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme);
  const error = validateData(dataSorted);
  const isDataValid = !error;
  const legendOptions = useMemo2(() => ({
    withGlyph: withLegendGlyph,
    glyphSize: Math.max(0, toNumber2(glyphStyle?.radius) ?? 4),
    renderGlyph
  }), [withLegendGlyph, glyphStyle?.radius, renderGlyph]);
  const legendItems = useChartLegendItems(dataSorted, legendOptions, legendShape);
  const chartMetadata = useMemo2(() => ({
    withGradientFill,
    smoothing,
    curveType,
    withStartGlyphs,
    withEndGlyphs,
    withLegendGlyph
  }), [withGradientFill, smoothing, curveType, withStartGlyphs, withEndGlyphs, withLegendGlyph]);
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "line",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const accessors = {
    xAccessor: (d) => d?.date,
    yAccessor: (d) => d?.value
  };
  if (error) {
    return /* @__PURE__ */ _jsx5("div", {
      className: clsx2("line-chart", line_chart_module_default["line-chart"]),
      children: error
    });
  }
  const legendElement = showLegend && /* @__PURE__ */ _jsx5(Legend, {
    orientation: legend.orientation ?? "horizontal",
    alignment: legend.alignment ?? "center",
    position: legendPosition,
    labelStyles: legend.labelStyles,
    itemClassName: legend.itemClassName,
    itemStyles: legend.itemStyles,
    shapeStyles: legend.shapeStyles,
    className: line_chart_module_default["line-chart__legend"],
    shape: legendShape,
    chartId,
    interactive: legendInteractive
  });
  return /* @__PURE__ */ _jsx5(SingleChartContext.Provider, {
    value: {
      chartId,
      chartRef: internalChartRef,
      chartWidth: width,
      chartHeight: measuredChartHeight || 0
    },
    children: /* @__PURE__ */ _jsx5(ChartLayout, {
      legendPosition,
      legendElement,
      legendChildren,
      gap,
      className: clsx2("line-chart", line_chart_module_default["line-chart"], {
        [line_chart_module_default["line-chart--animated"]]: animation && !prefersReducedMotion
      }, className),
      style: {
        width,
        height
      },
      trailingContent: nonLegendChildren,
      onContentHeightChange: handleContentHeightChange,
      children: ({
        contentHeight
      }) => {
        const chartHeight = contentHeight > 0 ? contentHeight : height;
        return /* @__PURE__ */ _jsx5("div", {
          role: "grid",
          "aria-label": __2("Line chart", "jetpack-charts"),
          tabIndex: 0,
          onKeyDown: onChartKeyDown,
          onFocus: onChartFocus,
          onBlur: onChartBlur,
          children: chartHeight > 0 && /* @__PURE__ */ _jsx5("div", {
            ref: chartRef,
            children: /* @__PURE__ */ _jsxs3(XYChart, {
              theme,
              width,
              height: chartHeight,
              margin: {
                ...defaultMargin,
                ...margin
              },
              xScale: chartOptions.xScale,
              yScale: chartOptions.yScale,
              onPointerDown,
              onPointerUp,
              onPointerMove,
              onPointerOut,
              pointerEventsDataKey: "nearest",
              children: [gridVisibility !== "none" && /* @__PURE__ */ _jsx5(Grid, {
                columns: false,
                numTicks: 4
              }), chartOptions.axis.x.display && /* @__PURE__ */ _jsx5(Axis, {
                ...chartOptions.axis.x
              }), chartOptions.axis.y.display && /* @__PURE__ */ _jsx5(Axis, {
                ...chartOptions.axis.y
              }), allSeriesHidden ? /* @__PURE__ */ _jsx5("text", {
                x: width / 2,
                y: chartHeight / 2,
                textAnchor: "middle",
                fill: providerTheme.gridStyles?.stroke || "#ccc",
                fontSize: "14",
                fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                children: __2("All series are hidden. Click legend items to show data.", "jetpack-charts")
              }) : null, seriesWithVisibility.map(({
                series: seriesData,
                index,
                isVisible
              }) => {
                if (!isVisible) {
                  return null;
                }
                const {
                  color,
                  lineStyles,
                  glyph
                } = getElementStyles({
                  data: seriesData,
                  index
                });
                const lineProps = {
                  stroke: color,
                  ...lineStyles
                };
                return /* @__PURE__ */ _jsxs3("g", {
                  children: [withGradientFill && /* @__PURE__ */ _jsx5(LinearGradient, {
                    id: `area-gradient-${chartId}-${index + 1}`,
                    from: color,
                    fromOpacity: 0.4,
                    toOpacity: 0.1,
                    to: providerTheme.backgroundColor,
                    ...seriesData.options?.gradient,
                    children: seriesData.options?.gradient?.stops?.map((stop, stopIndex) => /* @__PURE__ */ _jsx5("stop", {
                      offset: stop.offset,
                      stopColor: stop.color || color,
                      stopOpacity: stop.opacity ?? 1
                    }, `${stop.offset}-${stop.color || color}`))
                  }), /* @__PURE__ */ _jsx5(AreaSeries, {
                    dataKey: seriesData?.label,
                    data: seriesData.data,
                    ...accessors,
                    fill: withGradientFill ? `url(#area-gradient-${chartId}-${index + 1})` : "transparent",
                    renderLine: true,
                    curve: getCurveType(curveType, smoothing),
                    lineProps
                  }, seriesData?.label), withStartGlyphs && /* @__PURE__ */ _jsx5(line_chart_glyph_default, {
                    index,
                    data: seriesData,
                    color,
                    renderGlyph: glyph ?? renderGlyph,
                    accessors,
                    glyphStyle,
                    position: "start"
                  }), withEndGlyphs && /* @__PURE__ */ _jsx5(line_chart_glyph_default, {
                    index,
                    data: seriesData,
                    color,
                    renderGlyph: glyph ?? renderGlyph,
                    accessors,
                    glyphStyle,
                    position: "end"
                  })]
                }, seriesData?.label || index);
              }), withTooltips && /* @__PURE__ */ _jsx5(AccessibleTooltip, {
                detectBounds: true,
                snapTooltipToDatumX: true,
                snapTooltipToDatumY: true,
                showSeriesGlyphs: true,
                renderTooltip,
                renderGlyph: tooltipRenderGlyph,
                glyphStyle,
                showVerticalCrosshair: withTooltipCrosshairs?.showVertical,
                showHorizontalCrosshair: withTooltipCrosshairs?.showHorizontal,
                selectedIndex,
                tooltipRef,
                keyboardFocusedClassName: line_chart_module_default["line-chart__tooltip--keyboard-focused"],
                series: dataSorted
              }), /* @__PURE__ */ _jsx5(LineChartScalesRef, {
                chartRef: internalChartRef,
                width,
                height,
                margin
              })]
            })
          })
        });
      }
    })
  });
});
var LineChartWithProvider = /* @__PURE__ */ forwardRef((props, ref) => {
  const existingContext = useContext4(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx5(LineChartInternal, {
      ...props,
      ref
    });
  }
  return /* @__PURE__ */ _jsx5(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx5(LineChartInternal, {
      ...props,
      ref
    })
  });
});
LineChartWithProvider.displayName = "LineChart";
var LineChart = attachSubComponents(LineChartWithProvider, {
  Legend,
  AnnotationsOverlay: line_chart_annotations_overlay_default,
  Annotation: line_chart_annotation_default
});
var LineChartResponsive = attachSubComponents(withResponsive(LineChartWithProvider), {
  Legend,
  AnnotationsOverlay: line_chart_annotations_overlay_default,
  Annotation: line_chart_annotation_default
});

export {
  LineChart,
  LineChartResponsive
};
//# sourceMappingURL=chunk-T7IXILFM.js.map