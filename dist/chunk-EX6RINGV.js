import {
  LineChart
} from "./chunk-DKP5T4SQ.js";
import {
  withResponsive
} from "./chunk-OP6PHB2U.js";
import {
  useGlobalChartsTheme
} from "./chunk-65DPH4GD.js";

// src/charts/sparkline/sparkline.tsx
import clsx from "clsx";
import { useMemo, forwardRef } from "react";

// src/charts/sparkline/sparkline.module.scss
var sparkline_module_default = {
  "sparkline": "a8ccharts-o-3Z8B",
  "sparkline--empty": "a8ccharts-CbLbcd"
};

// src/charts/sparkline/sparkline.tsx
import { jsx as _jsx } from "react/jsx-runtime";
var DEFAULT_WIDTH = 100;
var DEFAULT_HEIGHT = 40;
var transformToSeriesData = (data, color, strokeWidth) => {
  const baseDate = new Date(2e3, 0, 1);
  return [{
    label: "sparkline",
    data: data.map((value, index) => ({
      date: new Date(baseDate.getTime() + index * 864e5),
      // Add days
      value
    })),
    options: {
      stroke: color,
      seriesLineStyle: strokeWidth ? {
        strokeWidth
      } : void 0
    }
  }];
};
var SparklineComponent = /* @__PURE__ */ forwardRef(({
  data,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  color,
  strokeWidth: strokeWidthProp,
  withGradientFill = true,
  gradient,
  className,
  chartId,
  margin: marginProp,
  animation
}, ref) => {
  const theme = useGlobalChartsTheme();
  const themeStrokeWidth = theme.sparkline?.strokeWidth ?? 1.5;
  const strokeWidth = strokeWidthProp ?? themeStrokeWidth;
  const seriesData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return transformToSeriesData(data, color, strokeWidth);
  }, [data, color, strokeWidth]);
  const finalMargin = useMemo(() => {
    const themeMargin = theme.sparkline?.margin ?? {
      top: 2,
      right: 2,
      bottom: 2,
      left: 2
    };
    const margin = marginProp ?? themeMargin;
    return {
      ...themeMargin,
      ...margin
    };
  }, [marginProp, theme.sparkline?.margin]);
  const seriesWithGradient = useMemo(() => {
    if (!gradient || seriesData.length === 0) {
      return seriesData;
    }
    return seriesData.map((series) => ({
      ...series,
      options: {
        ...series.options,
        gradient: {
          from: gradient.from || color || "#000000",
          to: gradient.to || "#ffffff",
          fromOpacity: gradient.fromOpacity ?? 0.5,
          toOpacity: gradient.toOpacity ?? 0
        }
      }
    }));
  }, [seriesData, gradient, color]);
  if (!data || data.length === 0) {
    return /* @__PURE__ */ _jsx("div", {
      ref,
      className: clsx("sparkline", sparkline_module_default.sparkline, sparkline_module_default["sparkline--empty"], className),
      style: {
        width,
        height
      }
    });
  }
  if (data.length === 1) {
    const cx = width / 2;
    const cy = height / 2;
    const resolvedColor = color || "#000000";
    return /* @__PURE__ */ _jsx("div", {
      ref,
      className: clsx("sparkline", sparkline_module_default.sparkline, sparkline_module_default["sparkline--single-point"], className),
      style: {
        width,
        height
      },
      children: /* @__PURE__ */ _jsx("svg", {
        width,
        height,
        "aria-hidden": "true",
        children: /* @__PURE__ */ _jsx("circle", {
          cx,
          cy,
          r: strokeWidth * 1.5,
          fill: resolvedColor
        })
      })
    });
  }
  return /* @__PURE__ */ _jsx("div", {
    ref,
    className: clsx("sparkline", sparkline_module_default.sparkline, className),
    children: /* @__PURE__ */ _jsx(LineChart, {
      data: seriesWithGradient,
      width,
      height,
      margin: finalMargin,
      chartId,
      withGradientFill,
      withTooltips: false,
      showLegend: false,
      gridVisibility: "none",
      options: {
        axis: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      },
      curveType: "monotone",
      animation
    })
  });
});
SparklineComponent.displayName = "SparklineComponent";
var SparklineUnresponsive = SparklineComponent;
SparklineUnresponsive.displayName = "SparklineUnresponsive";
var Sparkline = withResponsive(SparklineUnresponsive);

export {
  SparklineUnresponsive,
  Sparkline
};
//# sourceMappingURL=chunk-EX6RINGV.js.map